const express = require('express');
const router = express.Router();
const projectController = require('../controllers/projectController');
const { verifyToken, checkRole } = require('../middleware/authMiddleware');

// POST request එකක් ආවොත් Token එක බලනවා, ඊටපස්සේ Role එක ADMIN හෝ PM ද බලනවා
router.post('/', verifyToken, checkRole('ADMIN', 'PM'), projectController.createProject);

// GET request එකක් ආවොත් Token එක විතරක් බලනවා
router.get('/', verifyToken, projectController.getAllProjects);

module.exports = router;