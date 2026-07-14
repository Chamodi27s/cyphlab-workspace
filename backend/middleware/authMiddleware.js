const jwt = require('jsonwebtoken');

// Token එක නිවැරදිදැයි පරීක්ෂා කිරීම
exports.verifyToken = (req, res, next) => {
    let token = req.headers['authorization'];
    
    if (!token) {
        return res.status(403).json({ message: 'Token එකක් ලබා දී නැත! කරුණාකර ලොග් වන්න.' });
    }

    if (token.startsWith('Bearer ')) {
        token = token.slice(7, token.length).trimLeft();
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: 'Token එක අවලංගුයි!' });
        }
        req.user = decoded; // { id, role } අදාළ පරිශීලකයාගේ විස්තර මෙහි ගබඩා වේ
        next();
    });
};

// පරිශීලකයාගේ තනතුර (Role) පරීක්ෂා කිරීම
exports.checkRole = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return res.status(403).json({ message: 'මෙම ක්‍රියාව කිරීමට ඔබට අවසර නැත!' });
        }
        next();
    };
};