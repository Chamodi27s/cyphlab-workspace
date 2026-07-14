const db = require('../config/db');

// අලුත් Project එකක් සෑදීම (Admin සහ PM සඳහා පමණි)
exports.createProject = async (req, res) => {
    try {
        const { name, description } = req.body;
        const created_by = req.user.id; // Token එකෙන් ලබාගන්නා ලොග් වී ඇති අයගේ ID එක

        await db.query(
            'INSERT INTO projects (name, description, created_by) VALUES (?, ?, ?)',
            [name, description, created_by]
        );
        res.status(201).json({ message: 'ව්‍යාපෘතිය සාර්ථකව සෑදුවා!' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'සර්වර් දෝෂයක්.' });
    }
};

// සියලුම Projects බැලීම (ලොග් වී ඇති සියලු දෙනාටම)
exports.getAllProjects = async (req, res) => {
    try {
        const [projects] = await db.query('SELECT * FROM projects');
        res.status(200).json(projects);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'සර්වර් දෝෂයක්.' });
    }
};