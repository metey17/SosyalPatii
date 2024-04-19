import { pool } from '../models/db.js';

function messageController(req,res) {
    const target = req.body.target;
    const your = req.body.your;
    const messages = req.body.desc;


    const currentDate = new Date();
    const formattedDate = `${currentDate.getFullYear()}-${(currentDate.getMonth() + 1).toString().padStart(2, '0')}-${currentDate.getDate().toString().padStart(2, '0')} ${currentDate.getHours().toString().padStart(2, '0')}:${currentDate.getMinutes().toString().padStart(2, '0')}`;

    pool.query('SELECT id FROM users WHERE name = ?', [your], (err1, result1) => {
        if(result1.length > 0){
            const userId = result1[0].id;
            pool.query('SELECT id, img_name FROM users WHERE name = ?', [target], (err2, result2) => {
                if(result2.length > 0){
                    // const targetId = result2[0].id;
                    const img = result2[0].img_name;
                    pool.query('SELECT id FROM conversation WHERE name = ? AND userId = ?', [target, userId], (err3, result3) => {
                        if(result3.length === 0){
        
                            pool.query('INSERT INTO conversation(name, img_name, userId) VALUES(?, ?, ?)', [target, img, userId], (err4, result4) => {
        
                            })
                        }
                    })
                }
            })
        }
    })
    


    pool.query('SELECT id FROM users WHERE name = ?', [target], (err5, result5) => {
        if(result5.length > 0){
            const userId2 = result5[0].id;
            pool.query('SELECT id, img_name FROM users WHERE name = ?', [your], (err6, result6) => {
                if(result6.length > 0){
                    // const targetId = result2[0].id;
                    const img2 = result6[0].img_name;
                    pool.query('SELECT id FROM conversation WHERE name = ? AND userId = ?', [your, userId2], (err7, result7) => {
                        if(result7.length === 0){
        
                            pool.query('INSERT INTO conversation(name, img_name, userId) VALUES(?, ?, ?)', [your, img2, userId2], (err8, result8) => {
        
                            })
                        }
                    })
                }
            })
        }
    })


    
    const sql = 'INSERT INTO messages (message, sender, receiver, date) VALUES (?, ?, ?, ?)';
    pool.query(sql, [messages, your, target, formattedDate], (err, result) => {
        if (err) {
            console.error('Veritabanı hatası:', err.message);
            return res.status(500).send({ error: 'Veritabanı hatası: ' + err.message });
            // Hata durumunda uygun bir işlem yapın
        } else {
       
            return res.status(200).send('Mesaj gonderildi');
            // Başarılı bir şekilde eklendiyse
        }
    });
}

export { messageController };

