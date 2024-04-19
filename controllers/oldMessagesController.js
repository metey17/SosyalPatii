
import { pool } from '../models/db.js';

function oldMessages(req, res) {
    const sender = req.body.sender;
    const receiver = req.body.receiver;

    let response = {};


        // İkinci sorguyu gerçekleştir
        pool.query('SELECT message, date, sender FROM messages WHERE sender = ? AND receiver = ?', [sender, receiver], (err, result) => {
            if (err) {
                console.error('Veritabanı hatası:', err);
                return res.status(500).send({ error: 'Veritabanı hatası: ' + err.message });
            }

            if (result.length > 0) {
                response.result = result;

                 }else {
                    // İlk sorgunun sonucu yoksa boş bir dizi ekle
                    response.result = [];
                }
                    // Dördüncü sorguyu gerçekleştir
                    pool.query('SELECT message, date, sender FROM messages WHERE sender = ? AND receiver = ?', [receiver, sender ], (err2, result2) => {
                        if (err2) {
                            console.error('Veritabanı hatası:', err2);
                            return res.status(500).send({ error: 'Veritabanı hatası: ' + err2.message });
                        }

                        if (result2.length > 0) {
                            response.result2 = result2;
                            // Tüm sorgular başarıyla tamamlandıysa, yanıtı gönder
                            
                        }else {
                            // İlk sorgunun sonucu yoksa boş bir dizi ekle
                            response.result2 = [];
                        }

                        return res.status(200).json(response);
                        
                    });
                  
                    
                });
            
      
        
    
}

export { oldMessages };