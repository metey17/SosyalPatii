import mysql from 'mysql';

// MySQL bağlantısı için gerekli bilgiler
const dbConfig = {
    host: 'localhost',
    user: 'root', // MySQL kullanıcı adı
    password: '', // MySQL şifre
    database: 'pet' // Veritabanı adı
};

// MySQL bağlantı havuzunu oluştur
const pool = mysql.createPool(dbConfig);

// Bağlantı havuzundan bir bağlantı al
function getConnection(callback) {
    pool.getConnection(function(err, connection) {
        if (err) {
            throw err;
        }
        callback(connection);
    });
}

export { pool };
