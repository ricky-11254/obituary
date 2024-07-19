const express = require('express');
const bodyParser = require('body-parser');
const { Sequelize, DataTypes } = require('sequelize');

const router = express.Router();

// Database connection
const sequelize = new Sequelize('obituary_platform', 'root', '', {
  host: 'localhost',
  dialect: 'mysql'
});

// Define Obituary model
const Obituary = sequelize.define('Obituary', {
  name: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  date_of_birth: {
    type: DataTypes.DATEONLY,
    allowNull: false
  },
  date_of_death: {
    type: DataTypes.DATEONLY,
    allowNull: false
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  author: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  slug: {
    type: DataTypes.STRING(255),
    unique: true,
    allowNull: false
  }
});

// Sync model with database
sequelize.sync();

// Route for submitting obituary
router.post('/', async (req, res) => {
  try {
    const { name, date_of_birth, date_of_death, content, author } = req.body;

    // Basic validation
    if (!name || !date_of_birth || !date_of_death || !content || !author) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Generate slug
    const slug = `${name.toLowerCase().replace(/\s+/g, '-')}-${Date.now()}`;

    // Create obituary in database
    const obituary = await Obituary.create({
      name,
      date_of_birth,
      date_of_death,
      content,
      author,
      slug
    });

    res.status(201).json({
      message: 'Obituary submitted successfully',
      obituary
    });
  } catch (error) {
    console.error('Error submitting obituary:', error);
    res.status(500).json({
      message: 'An error occurred while submitting the obituary',
      error: error.message
    });
  }
});

module.exports = router;
