import {pool} from '../models/db.js';

function getBlog(req, res){
    const blogName = req.body.blogName;
   
    if(blogName){
        // Veritabanından tüm title ve description değerlerini almak için SQL sorgusu
        const sql = 'SELECT title, description, img_name, author, date FROM blogs WHERE title = ?';

        // Veritabanı bağlantısını kullanarak sorguyu yürüt
        pool.query(sql,[blogName], (err, result) => {
            if (err) {
                // Hata durumunda istemciye hata mesajı gönder
                return res.status(500).send({ error: 'Veritabanı hatası: ' + err.message });
            } else {
                // Başarılı olursa, alınan verileri istemciye gönder
                return res.status(200).json(result);
            }
        });
    }else{
        // Veritabanından tüm title ve description değerlerini almak için SQL sorgusu
         const sql = 'SELECT title, description, img_name, author, date FROM blogs';

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

         
}




import multer from 'multer'; 
import path from 'path'; // Dosya yolları için path kütüphanesini içe aktarın
import fs from 'fs';

import { fileURLToPath } from 'url';
import { dirname } from 'path';



const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Dosya yükleme için storage oluşturun
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const uploadDir = path.join(__dirname, '../public/assets/img/blog');
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
function setBlog(req, res) {
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
        const desc = req.body.msg;
        const author = req.body.author;
        const fileName = req.fileName;

        const currentDate = new Date(); // Şu anki tarih ve zaman
        const formattedDate = currentDate.toISOString().slice(0, 19).replace('T', ' '); // Tarih formatını düzenle
      

            // Veritabanına paylaşımı ekle
            pool.query('INSERT INTO blogs (title, description,img_name, author, date) VALUES (?, ?, ?, ?, ?)', [title, desc,fileName, author, formattedDate], (err, result) => {
                if (err) {
                    console.error('Veritabanı Hatası:', err);
                    return res.status(500).send({ error: 'Veritabanı hatası oluştu.' });
                }

                if (result.affectedRows === 1) {
                    return res.status(200).json('Blog başarılıyla paylasildi...');
                } else {
                    return res.status(500).send({ error: 'Veritabanı hatası oluştu.' });
                }
            });
        });
   
}






export { getBlog, setBlog };