import express from 'express';
import bodyParser from 'body-parser';
import http from 'http';
import { Server } from 'socket.io';



const app = express();
const server = http.createServer(app);
const io = new Server(server);


const port = 55000;
const port2 = 35000;

import { loginController } from './controllers/loginController.js';
import { registerController } from './controllers/registerController.js';
import { verifyToken } from './controllers/authMiddleware.js';
import { getUserInfo } from './controllers/userController.js';
import { chatIdController } from './controllers/chatIdController.js';
import { messageController } from './controllers/messageController.js';
import { oldMessages } from './controllers/oldMessagesController.js';
import { editProfile, deleteProfile } from './controllers/profileController.js';
import { selectProfile } from './controllers/selectProfileController.js';
import { getCatHaving, getDogData, getDogHaving, getSharingData } from './controllers/selectSharingController.js';
import { setSharingData } from './controllers/setSharingController.js';
import { getUsers } from './controllers/getUsersController.js';
import { getBlog, setBlog } from './controllers/blogController.js';
import { getConverse } from './controllers/converseController.js';
import { editPost, removePost } from './controllers/editPost.js';


app.use(bodyParser.json({ limit: '50mb' })); // 50 MB'a kadar izin ver
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use(bodyParser.urlencoded({ extended: true }));

app.set('views', './views');
app.use(express.static('public'));
app.set('view engine', 'ejs');





let connectedUsers = [];

io.on('connection', (socket) => {
  console.log('Yeni bir kullanıcı bağlandı');

  // Yeni kullanıcı bağlandığında, kullanıcı adını al ve bağlı kullanıcılar listesine ekle
  socket.on('join', (username) => {
    connectedUsers.push({ username: username.username, socketId: socket.id });
    console.log(username.username + ' adlı kullanıcı sohbete katıldı');
  });

  // Yeni mesaj alındığında
  socket.on('newMessage', (data) => {
    let targetUser = data.username;
    let yourName = data.yourname;
    let message = data.message;
    // console.log(connectedUsers);
    // console.log(targetUser, yourName, message);

    // Hedef kullanıcının soket ID'sini bul
    const targetSocket = connectedUsers.find(user => user.username === targetUser)?.socketId;

    if (targetSocket) {
      // Hedef kullanıcıya mesajı gönder
      io.to(targetSocket).emit('newMessage', { username: targetUser, message, yourname:yourName });
      console.log('"' + message + '" mesajı ' + targetUser + ' kullanıcısına gönderildi');
    } else {
      console.log(targetUser + ' adında bir kullanıcı bulunamadı.');
    }
  });

  // Bağlantı kesildiğinde
  socket.on('disconnect', () => {
    console.log('Bir kullanıcı ayrıldı');

    // Bağlantısı kesilen kullanıcıyı listeden sil
    connectedUsers = connectedUsers.filter(user => user.socketId !== socket.id);
  });
});



//looking for vets clinic in google map api
app.post("/veterinary-clinics", async (req, res) => {
    const { latitude, longitude } = req.body;

    // Google Maps API'ye istek gönderin ve JSON yanıtını alın.
    const response = await getVeterinaryClinics(latitude, longitude);
  
    // JSON yanıtını istemciye gönderin.
    res.status(200).json(response);
  });
  
  app.listen(3000);
  
  async function getVeterinaryClinics(latitude, longitude) {
    const apiKey = "AIzaSyCxKH0S26_fO3lEXA8d5JqPGVC40kaaZQs";
    const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${latitude},${longitude}&radius=5000&type=veterinary_care&key=${apiKey}`;
  
    const response = await fetch(url);
    const data = await response.json();
    console.log(data)
  
    return data.results;
  }






// get requests -------------------------
app.get('/', (req, res) => {
    res.render('index');
});

app.get('/about', (req, res) => {
    res.render('hakkimizda');
});

app.get('/contact', (req, res) => {
    res.render('iletisim');
});

app.get('/login', (req, res) => {
    res.render('giris');
});

app.get('/register', (req, res) => {
    res.render('kayit-ol');
});

app.get('/cat-find-partner', (req, res) => {
    res.render('kedi-esbulma');
});

app.get('/dog-find-partner', (req, res) => {
    res.render('kopek-esbulma');
});

app.get('/cat-adoption', (req, res) => {
    res.render('kedi-sahiplendirme');
});

app.get('/dog-adoption', (req, res) => {
    res.render('kopek-sahiplendirme');
});

app.get('/chat', (req, res) => {
    res.render('chatPage');
});

app.get('/profile', (req, res) => {
    res.render('profile');
});

app.get('/blog', (req, res) => {
    res.render('blog');
});

app.get('/blog-detail', (req, res) => {
    res.render('blog-detay');
});

app.get('/admin', (req, res) => {
    res.render('admin');
});

app.get('/vets', (req, res) => {
    res.render('veteriner');
});


// post requests -------------------------
app.post('/login', loginController);
app.post('/register', registerController);
app.post('/getUserInfo', verifyToken, getUserInfo);
app.post('/getUserId', chatIdController);
app.post('/getOldMessages', oldMessages);
app.post('/setMessage', messageController);
app.post('/editProfile', editProfile);
app.post('/deleteProfile', deleteProfile);
app.post('/selectProfile', selectProfile);
app.post('/selectSharing', getSharingData);
app.post('/getDogData', getDogData);
app.post('/getDogHaving', getDogHaving);
app.post('/getCatHaving', getCatHaving);
app.post('/setSharing', setSharingData);
app.post('/getUsers', getUsers);
app.post('/getBlog', getBlog);
app.post('/setBlog', setBlog);
app.post('/getConverse', getConverse);
app.post('/editPost', editPost);
app.post('/removePost', removePost);








server.listen(port, () => {
    console.log(`Sunucu ${port} portunda çalışıyor`);
});
