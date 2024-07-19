const express = require('express');
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

// Synchronize model with database
(async () => {
  try {
    await sequelize.authenticate();
    console.log('Database connection has been established successfully.');
    await Obituary.sync(); // Ensure the table exists
    console.log('Obituary model was synchronized successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
})();

// Route for viewing all obituaries
router.get('/', async (req, res) => {
  try {
    const obituaries = await Obituary.findAll({
      order: [['createdAt', 'DESC']]
    });
    res.json(obituaries);
  } catch (error) {
    console.error('Error retrieving obituaries:', error);
    res.status(500).json({
      message: 'An error occurred while retrieving obituaries',
      error: error.message
    });
  }
});

module.exports = router;

