import jwt from 'jsonwebtoken';

function verifyToken(req, res, next) {
    const token = req.headers.authorization?.split(' ')[1]; // Tokeni al
    if (!token) return res.status(403).send('Yetkilendirme başarısız.');

    jwt.verify(token, 'gizliAnahtar', (err, decoded) => {
        if (err) return res.status(401).send('Token doğrulanamadı.');
        req.decoded = decoded;
        next(); // Bir sonraki işleme geç
    });
}

export { verifyToken };
