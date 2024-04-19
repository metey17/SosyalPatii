import { pool } from '../models/db.js';

function getConverse(req, res) {
    const name = req.body.name;

   
         // Veritabanından tüm title ve description değerlerini almak için SQL sorgusu
         pool.query('SELECT id FROM users WHERE name = ? ',[name], (err, result) => {
            if(result.length > 0){
                const id = result[0].id;
             
                pool.query('SELECT name, img_name FROM conversation WHERE userId = ? ',[id], (err2, result2) => {
                    if (err2) {
                        // Hata durumunda istemciye hata mesajı gönder
                        return res.status(500).send({ error: 'Veritabanı hatası: ' + err2.message });
                    } else {
                        if(result2.length > 0){
                          
                        return res.status(200).json(result2);

                        }else{
                            console.log('Kullanici yok')
                        }
                       
                        
                        
                    }
                });
            }
         })

    // Veritabanı bağlantısını kullanarak sorguyu yürüt
   

   
}

export { getConverse };
