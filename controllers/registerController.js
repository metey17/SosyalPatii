import { pool } from '../models/db.js';

function registerController(req, res) {
    const { name, email, password } = req.body;

    // Veritabanında aynı e-posta adresine sahip bir kullanıcı olup olmadığını kontrol et
    const checkEmailQuery = 'SELECT * FROM users WHERE mail = ? || name= ?';
    pool.query(checkEmailQuery, [email,name], (err, result) => {
        if (err) {
            // Veritabanı hatası durumunda
            return res.status(500).send('Veritabanı hatası: ' + err.message);
        }

        // Eğer sonuç içeriyorsa, aynı e-posta adresine sahip bir kullanıcı var demektir
        if (result.length > 0) {
            return res.status(400).send('Bu e-posta adresi zaten kullanımda');
        }

        // Eğer sonuç içermiyorsa, yeni kullanıcıyı veritabanına kaydet
        const insertUserQuery = 'INSERT INTO users (name, mail, password) VALUES (?, ?, ?)';
        pool.query(insertUserQuery, [name, email, password], (err, result) => {
            if (err) {
                // Kayıt başarısız oldu
                return res.status(500).send('Kayıt olma sırasında bir hata oluştu');
            }
            // Kayıt başarılı oldu
            return res.status(200).send('Kayıt başarıyla tamamlandı');
        });
    });
}

export { registerController };
