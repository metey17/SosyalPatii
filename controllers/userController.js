function getUserInfo(req, res) {
    // Token doğrulandıysa, kullanıcı bilgilerini gönder
    const userData = {
        name: req.decoded.name,
        email: req.decoded.email
    };
    res.json(userData);
}

export { getUserInfo };
