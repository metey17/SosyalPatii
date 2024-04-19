import { pool } from '../models/db.js'; // Veritabanı bağlantı modülünü içe aktarın
import multer from 'multer'; // Dosya yükleme işlemleri için Multer kütüphanesini içe aktarın
import path from 'path'; // Dosya yolları için path kütüphanesini içe aktarın
import fs from 'fs';

import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Dosya yükleme için storage oluşturun
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const uploadDir = path.join(__dirname, '../public/assets/img/sharing1');
        fs.mkdirSync(uploadDir, { recursive: true }); // Dizin oluşturuldu (varsa tekrar oluşturulmaz)
        cb(null, uploadDir);
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const fileName = file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname);
        req.fileName = fileName; // Dosya adını request nesnesine ekle
        cb(null, fileName);
    }
});

// Multer ayarları
const upload = multer({
    storage: storage,
    limits: { fileSize: 10000000 }, // Dosya boyutu sınırı (10MB)
    fileFilter: (req, file, cb) => {
        const allowedExtensions = ['.jpg', '.jpeg', '.png'];
        const ext = path.extname(file.originalname).toLowerCase();
        if (allowedExtensions.includes(ext)) {
            cb(null, true);
        } else {
            cb(new Error('Geçersiz dosya türü. Yalnızca JPEG, JPG ve PNG dosyalarına izin verilir.'));
        }
    }
});

// Dosya yükleme işlemini gerçekleştiren fonksiyon
function setSharingData(req, res) {
    upload.single('file')(req, res, async (err) => {
        if (err instanceof multer.MulterError) {
            // Multer hatası
            console.error('Multer Hatası:', err);
            return res.status(400).send({ error: 'Dosya yükleme sırasında bir hata oluştu.' });
        } else if (err) {
            // Diğer hatalar
            console.error('Diğer Hata:', err);
            return res.status(500).send({ error: 'Beklenmeyen bir hata oluştu.' });
        }

        // Dosya yükleme başarılı
        const title = req.body.title;
        const desc = req.body.desc;
        const user = req.body.user;
        const opti = req.body.opti;
        const fileName = req.fileName;

        // Kullanıcı kimliğini al

        pool.query('SELECT id FROM users WHERE name = ?', [user], (err2, result2) => {
            if (err2) {
                console.error('Veritabanı Hatası:', err2);
                return res.status(500).send({ error: 'Veritabanı hatası oluştu.' });
            }

            if (result2.affectedRows === 1) {
                return res.status(200).send('Başarılı');
            } else {
                const userId = result2[0].id;
           
       
      

            // Veritabanına paylaşımı ekle
            pool.query('INSERT INTO sharing1 (title, description,img_name,type, userId) VALUES (?, ?, ?, ?, ?)', [title, desc,fileName,opti, userId], (err, result) => {
                if (err) {
                    console.error('Veritabanı Hatası:', err);
                    return res.status(500).send({ error: 'Veritabanı hatası oluştu.' });
                }

                if (result.affectedRows === 1) {
                    return res.status(200).send('Başarılı');
                } else {
                    return res.status(500).send({ error: 'Veritabanı hatası oluştu.' });
                }
            }); 
        }
        });
        
    })
}

export { setSharingData };
