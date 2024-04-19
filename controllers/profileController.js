import {pool} from "../models/db.js";

function editProfile(req, res) {
    const name = req.body.name;
    const user = req.body.user;
    const city = req.body.city;
    const email = req.body.email;
    const password = req.body.password;
    const about = req.body.about;
    const avatar = req.body.avatar;

    console.log(name,user,email,password,about,avatar)

    const sql = 'UPDATE users SET name = ?, password = ?, mail = ?, img_name = ?, description = ?, city = ? WHERE name = ?';

    // const sql = 'INSERT INTO users (name, password, mail, img_name, description) VALUES (?, ?, ?, ?, ?)'

    // Kullanıcılar arasında bir konuşma olup olmadığını kontrol et
    pool.query(sql, [name, password, email, avatar, about,city, user], (err, result) => {
        if (err) {
            return res.status(500).send({ error: 'Veritabanı hatası: ' + err.message });
        }else{
            return res.status(200).send({ success: 'Verileriniz Basari ile guncellendi' });
        }

    });

}





function deleteProfile(req, res) {
    const remove = req.body.remove;


    const sql2 = 'DELETE FROM users WHERE name = ?';


    // Kullanıcılar arasında bir konuşma olup olmadığını kontrol et
    pool.query(sql2, [remove], (err, result) => {
        if (err) {
            return res.status(500).send({ error: 'Veritabanı hatası: ' + err.message });
        }else{
            return res.status(200).send({ success: 'Verileriniz Basari ile guncellendi' });
        }

    });

}

export {editProfile,  deleteProfile };