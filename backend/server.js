const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const app = express();
app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

const JWT_SECRET = 'umesh_secret_key_12345';

// --- MOVIES DATABASE SETUP & ROUTES ---
const moviesFilePath = path.join(__dirname, 'movies.json');

const getMoviesData = () => {
    if (!fs.existsSync(moviesFilePath)) {
        fs.writeFileSync(moviesFilePath, JSON.stringify([], null, 2));
    }
    try {
        const data = fs.readFileSync(moviesFilePath, 'utf8');
        return data ? JSON.parse(data) : [];
    } catch (e) {
        return [];
    }
};

const saveMoviesData = (movies) => {
    fs.writeFileSync(moviesFilePath, JSON.stringify(movies, null, 2));
};

// 1. Get all movies
app.get('/api/movies', (req, res) => {
    console.log('📥 GET /api/movies request received');
    res.status(200).json(getMoviesData());
});

// 2. Add a new movie
app.post('/api/movies', (req, res) => {
    try {
        console.log('📥 POST /api/movies request received:', req.body.title);
        const movies = getMoviesData();
        const uniqueId = Date.now().toString();
        
        const newMovie = {
            _id: uniqueId,
            id: uniqueId, // Both IDs supported for safety
            title: req.body.title || 'Untitled Movie',
            description: req.body.description || '',
            director: req.body.director || '',
            actors: Array.isArray(req.body.actors) ? req.body.actors : [],
            posterUrl: req.body.posterUrl || '',
            videoUrl: req.body.videoUrl || '',
            genre: req.body.genre || 'Drama',
            year: req.body.year || 2026,
            rating: req.body.rating || 'U/A',
            duration: req.body.duration || '2h',
            createdAt: new Date().toISOString()
        };

        movies.unshift(newMovie);
        saveMoviesData(movies);
        console.log('✅ Movie saved successfully!');
        res.status(201).json(newMovie);
    } catch (err) {
        console.error('❌ Error saving movie:', err.message);
        res.status(500).json({ error: err.message });
    }
});

// 3. Update movie
app.put('/api/movies/:id', (req, res) => {
    try {
        let movies = getMoviesData();
        const { id } = req.params;
        let updatedMovie = null;

        movies = movies.map(m => {
            if (m._id === id || m.id === id) {
                updatedMovie = { ...m, ...req.body, _id: id, id: id };
                return updatedMovie;
            }
            return m;
        });

        saveMoviesData(movies);
        res.status(200).json(updatedMovie || { message: 'Updated' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// 4. Delete movie
app.delete('/api/movies/:id', (req, res) => {
    try {
        let movies = getMoviesData();
        const { id } = req.params;
        movies = movies.filter(m => m._id !== id && m.id !== id);
        saveMoviesData(movies);
        console.log(`🗑️ Movie with ID ${id} deleted`);
        res.status(200).json({ message: 'Deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


// --- USERS DATABASE & SECURE AUTH ROUTES (WITH HASHING) ---
const USERS_FILE = path.join(__dirname, 'users.json');

const getUsersData = () => {
  try {
    if (!fs.existsSync(USERS_FILE)) {
      fs.writeFileSync(USERS_FILE, JSON.stringify([], null, 2));
    }
    const data = fs.readFileSync(USERS_FILE, 'utf8');
    return data ? JSON.parse(data) : [];
  } catch (e) {
    return [];
  }
};

const saveUsersData = (users) => {
    fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2));
};

// Get all users route
app.get('/api/users', (req, res) => {
  try {
    const users = getUsersData();
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 1. SECURE SIGNUP ROUTE (Password Hashed with Bcrypt)
app.post('/api/auth/signup', async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const users = getUsersData();

        const existingUser = users.find(u => u.email === email);
        if (existingUser) {
            return res.status(400).json({ success: false, message: 'User already exists with this email!' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = { 
            id: Date.now().toString(), 
            name: name || 'User',
            email, 
            password: hashedPassword 
        };

        users.push(newUser);
        saveUsersData(users);

        res.status(201).json({ success: true, message: 'Signup successful!', user: { email, name: newUser.name } });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});

// 2. SECURE LOGIN ROUTE (Verify Hashed Password & Return JWT)
app.post('/api/auth/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const users = getUsersData();

        const user = users.find(u => u.email === email);
        if (!user) {
            return res.status(400).json({ success: false, message: 'Invalid email or password!' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ success: false, message: 'Invalid email or password!' });
        }

        const token = jwt.sign({ userId: user.id, email: user.email }, JWT_SECRET, { expiresIn: '7d' });

        res.status(200).json({ 
            success: true, 
            message: 'Login successful!', 
            token, 
            name: user.name || 'User',
            user: { email } 
        });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Aamar Odisha Backend Running on port ${PORT}`);
});