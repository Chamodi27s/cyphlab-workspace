const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');
const { verifyToken, checkRole } = require('../middleware/authMiddleware');

// අලුත් Task එකක් හදන්න (Token එක බලනවා, PM/ADMIN ද බලනවා)
router.post('/', verifyToken, checkRole('ADMIN', 'PM'), taskController.createTask);

// ව්‍යාපෘතියකට අදාළ Tasks බලන්න (ලොග් වී ඇති ඕනෑම කෙනෙකුට)
router.get('/project/:projectId', verifyToken, taskController.getTasksByProject);

// Task එකේ Status එක අප්ඩේට් කරන්න (ලොග් වී ඇති ඕනෑම කෙනෙකුට)
router.put('/:taskId/status', verifyToken, taskController.updateTaskStatus);

module.exports = router;