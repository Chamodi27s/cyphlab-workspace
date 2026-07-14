const db = require('../config/db');

// 1. අලුත් Task එකක් සෑදීම (Admin සහ PM සඳහා)
exports.createTask = async (req, res) => {
    try {
        const { title, description, project_id, assigned_to } = req.body;

        await db.query(
            'INSERT INTO tasks (title, description, project_id, assigned_to) VALUES (?, ?, ?, ?)',
            [title, description, project_id, assigned_to]
        );
        res.status(201).json({ message: 'Task එක සාර්ථකව නිර්මාණය කර පවරන ලදී!' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'සර්වර් දෝෂයක්.' });
    }
};

// 2. අදාළ Project එකකට ඇති Tasks සියල්ල බැලීම
exports.getTasksByProject = async (req, res) => {
    try {
        const { projectId } = req.params;
        const [tasks] = await db.query('SELECT * FROM tasks WHERE project_id = ?', [projectId]);
        res.status(200).json(tasks);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'සර්වර් දෝෂයක්.' });
    }
};

// 3. Task එකක Status එක වෙනස් කිරීම (Team Member සහ අනිත් අයට)
exports.updateTaskStatus = async (req, res) => {
    try {
        const { taskId } = req.params;
        const { status } = req.body; // 'TODO', 'IN_PROGRESS', 'DONE'

        // Status එක නිවැරදි දැයි පරීක්ෂා කිරීම
        const validStatuses = ['TODO', 'IN_PROGRESS', 'DONE'];
        if (!validStatuses.includes(status)) {
            return res.status(400).json({ message: 'වැරදි Status එකක් ලබා දී ඇත.' });
        }

        await db.query('UPDATE tasks SET status = ? WHERE id = ?', [status, taskId]);
        res.status(200).json({ message: 'Task එකේ ප්‍රගතිය යාවත්කාලීන කළා!' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'සර්වර් දෝෂයක්.' });
    }
};