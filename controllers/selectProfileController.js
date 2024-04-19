import {pool} from '../models/db.js';


function selectProfile(req, res) {
    const bringName = req.body.user;



    const sql2 = 'SELECT name, description,city, img_name FROM users WHERE name = ?';

    // Kullanıcılar arasında bir konuşma olup olmadığını kontrol et
    pool.query(sql2, [bringName], (err, result) => {
        if (err) {
            return res.status(500).send({ error: 'Veritabanı hatası: ' + err.message });
        } else {
            if (result.length > 0) {
                const userData = {
                    name: result[0].name,
                    description: result[0].description,
                    city: result[0].city,
                    imgName: result[0].img_name
                };

                return res.status(200).json(userData);
                
            } else {
                return res.status(404).send({ error: 'Kullanıcı bulunamadı.' });
            }
        }
    });
}

export { selectProfile };
