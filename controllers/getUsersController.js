import { pool } from '../models/db.js';

function getUsers(req, res) {


   
         // Veritabanından tüm title ve description değerlerini almak için SQL sorgusu
    const sql = 'SELECT name, mail, password, city FROM users ';

    // Veritabanı bağlantısını kullanarak sorguyu yürüt
    pool.query(sql, (err, result) => {
        if (err) {
            // Hata durumunda istemciye hata mesajı gönder
            return res.status(500).send({ error: 'Veritabanı hatası: ' + err.message });
        } else {
            // Başarılı olursa, alınan verileri istemciye gönder
            return res.status(200).json(result);
        }
    });

   
}

export { getUsers };
