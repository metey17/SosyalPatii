import { pool } from '../models/db.js';

function getSharingData(req, res) {
    const value = req.body.value;
    const name = req.body.name;

    if(value){
         // Veritabanından tüm title ve description değerlerini almak için SQL sorgusu
    const sql = 'SELECT title, description, img_name FROM sharing1 WHERE title = ?';

    // Veritabanı bağlantısını kullanarak sorguyu yürüt
    pool.query(sql,[value], (err, result) => {
        if (err) {
            // Hata durumunda istemciye hata mesajı gönder
            return res.status(500).send({ error: 'Veritabanı hatası: ' + err.message });
        } else {
            // Başarılı olursa, alınan verileri istemciye gönder
            return res.status(200).json(result);
        }
    });

    }
    else if(name){
        // Veritabanından tüm title ve description değerlerini almak için SQL sorgusu
   const sql = 'SELECT id FROM users WHERE name = ?';

   // Veritabanı bağlantısını kullanarak sorguyu yürüt
   pool.query(sql,[name], (err, result) => {
       if (err) {
           // Hata durumunda istemciye hata mesajı gönder
           return res.status(500).send({ error: 'Veritabanı hatası: ' + err.message });
       } else {

        if(result.length > 0){
            const id = result[0].id;

            const sql = 'SELECT title, description, img_name FROM sharing1 WHERE userId = ?';

        // Veritabanı bağlantısını kullanarak sorguyu yürüt
        pool.query(sql,[id], (err, result) => {
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
   });

   }else{

    const sql = 'SELECT title, description,img_name, userId, type FROM sharing1 WHERE type = "cat-find" ';

    pool.query(sql,  (err, result) => {
      if (err) {
        return res.status(500).send({ error: 'Veritabanı hatası: ' + err.message });
      } else {
        const data = []; // Sonuçları saklamak için bir dizi oluştur
    
        // Her bir paylaşım için
        result.forEach(sharing => {
          const sharingData = {
            title: sharing.title,
            description: sharing.description,
            img_name: sharing.img_name,
            type:sharing.type
          };
    
          // Kullanıcı bilgilerini almak için ayrı bir sorguda userId kullan
          const userSql = 'SELECT name, city FROM users WHERE id = ?';
          pool.query(userSql, [sharing.userId], (err, userResult) => {
            if (err) {
              console.error('Kullanıcı sorgusu hatası:', err.message);
              return; // Hata durumunda devam etme
            }
    
            if (userResult.length > 0) {
              sharingData.name = userResult[0].name;
              sharingData.city = userResult[0].city;
            }
    
            // İşlenen her paylaşımı ana diziye ekle
            data.push(sharingData);
          
    
            // Tüm paylaşımlar işlendiğinde
            if (data.length === result.length) {
              return res.status(200).json(data);
            }
          });
        });
      }
    });
    


       
    }
   
}

function getDogData(req, res){
    const sql = 'SELECT title, description,img_name, userId, type FROM sharing1 WHERE type = "dog-find" ';

    pool.query(sql,  (err, result) => {
      if (err) {
        return res.status(500).send({ error: 'Veritabanı hatası: ' + err.message });
      } else {
        const data = []; // Sonuçları saklamak için bir dizi oluştur
    
        // Her bir paylaşım için
        result.forEach(sharing => {
          const sharingData = {
            title: sharing.title,
            description: sharing.description,
            img_name: sharing.img_name,
            type:sharing.type
          };
    
          // Kullanıcı bilgilerini almak için ayrı bir sorguda userId kullan
          const userSql = 'SELECT name, city FROM users WHERE id = ?';
          pool.query(userSql, [sharing.userId], (err, userResult) => {
            if (err) {
              console.error('Kullanıcı sorgusu hatası:', err.message);
              return; // Hata durumunda devam etme
            }
    
            if (userResult.length > 0) {
              sharingData.name = userResult[0].name;
              sharingData.city = userResult[0].city;
            }
    
            // İşlenen her paylaşımı ana diziye ekle
            data.push(sharingData);
          
    
            // Tüm paylaşımlar işlendiğinde
            if (data.length === result.length) {
              return res.status(200).json(data);
            }
          });
        });
      }
    });
    


       
    }
   


    function getDogHaving(req, res){
        const sql = 'SELECT title, description,img_name, userId, type FROM sharing1 WHERE type = "dog-having" ';
    
        pool.query(sql,  (err, result) => {
          if (err) {
            return res.status(500).send({ error: 'Veritabanı hatası: ' + err.message });
          } else {
            const data = []; // Sonuçları saklamak için bir dizi oluştur
        
            // Her bir paylaşım için
            result.forEach(sharing => {
              const sharingData = {
                title: sharing.title,
                description: sharing.description,
                img_name: sharing.img_name,
                type:sharing.type
              };
        
              // Kullanıcı bilgilerini almak için ayrı bir sorguda userId kullan
              const userSql = 'SELECT name, city FROM users WHERE id = ?';
              pool.query(userSql, [sharing.userId], (err, userResult) => {
                if (err) {
                  console.error('Kullanıcı sorgusu hatası:', err.message);
                  return; // Hata durumunda devam etme
                }
        
                if (userResult.length > 0) {
                  sharingData.name = userResult[0].name;
                  sharingData.city = userResult[0].city;
                }
        
                // İşlenen her paylaşımı ana diziye ekle
                data.push(sharingData);
              
        
                // Tüm paylaşımlar işlendiğinde
                if (data.length === result.length) {
                  return res.status(200).json(data);
                }
              });
            });
          }
        });
        
    
    
           
        }
       

        


        function getCatHaving(req, res){
            const sql = 'SELECT title, description,img_name, userId, type FROM sharing1 WHERE type = "cat-having" ';
        
            pool.query(sql,  (err, result) => {
              if (err) {
                return res.status(500).send({ error: 'Veritabanı hatası: ' + err.message });
              } else {
                const data = []; // Sonuçları saklamak için bir dizi oluştur
            
                // Her bir paylaşım için
                result.forEach(sharing => {
                  const sharingData = {
                    title: sharing.title,
                    description: sharing.description,
                    img_name: sharing.img_name,
                    type:sharing.type
                  };
            
                  // Kullanıcı bilgilerini almak için ayrı bir sorguda userId kullan
                  const userSql = 'SELECT name, city FROM users WHERE id = ?';
                  pool.query(userSql, [sharing.userId], (err, userResult) => {
                    if (err) {
                      console.error('Kullanıcı sorgusu hatası:', err.message);
                      return; // Hata durumunda devam etme
                    }
            
                    if (userResult.length > 0) {
                      sharingData.name = userResult[0].name;
                      sharingData.city = userResult[0].city;
                    }
            
                    // İşlenen her paylaşımı ana diziye ekle
                    data.push(sharingData);
                  
            
                    // Tüm paylaşımlar işlendiğinde
                    if (data.length === result.length) {
                      return res.status(200).json(data);
                    }
                  });
                });
              }
            });
            
        
        
               
            }
           
        




export { getSharingData, getDogData, getCatHaving, getDogHaving };
