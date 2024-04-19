import { pool } from '../models/db.js';

function chatIdController(req, res) {
    const userName = req.body.userName;
    const yourName = req.body.yourName;

    const sql = 'SELECT id FROM users WHERE name = ?';

    let userIDs = {};

    // userName için kullanıcı ID'sini al
    pool.query(sql, [userName], (err, result) => {
        if (err) {
            return res.status(500).send({ error: 'Veritabanı hatası: ' + err.message });
        }

        if (result.length === 0) {
            return res.status(401).send('Bu kullanıcı bulunamadı !!!');
        } else {
            userIDs.userName = result[0].id;
            
            // yourName için kullanıcı ID'sini al
            pool.query(sql, [yourName], (err, result) => {
                if (err) {
                    return res.status(500).send({ error: 'Veritabanı hatası: ' + err.message });
                }

                if (result.length === 0) {
                    return res.status(401).send('Bu kullanıcı bulunamadı !!!');
                } else {
                    userIDs.yourName = result[0].id;

                    // Her iki kullanıcı ID'sini istemciye geri gönder
                    return res.status(200).json(userIDs);
                }
            });
        }
    });
}

export { chatIdController };
