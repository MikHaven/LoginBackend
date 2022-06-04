const mongoose = require('mongoose');
const Account = mongoose.model('accounts');

module.exports = app => {
    // Routes
    //http://localhost:8000/auth?userId=Horse&page=2
    //http://localhost:8000/auth?userId=<script>alert("hello")</script>&page=2
    //http://localhost:13756/account?username=MikHaven&password=password
    app.get('/account', async (req, res) => {
        //console.log(req.query);
        //console.log("Hello " + req.query.userId + "! It is " + Date.now());
        const { rUsername, rPassword } = req.query;
        console.log(rUsername);
        console.log(rPassword);
        if (rUsername == null || rPassword == null) {
            res.send('Invalid Credentials');
        }
        else {
            var userAccount = await Account.findOne({ rUsername: rUsername });
            if (userAccount == null) {
                res.send('creating new account ... for ' + rUsername);
                var newAccount = new Account({
                    username: rUsername,
                    password: rPassword,
                    lastAuthenticaion: Date.now(),
                });
                await newAccount.save();
                //res.send(newAccount);
                return;
            }
            else {
                if (rPassword == userAccount.password) {
                    userAccount.lastAuthenticaion = Date.now(),
                        await userAccount.save();
                    res.send('hello ' + rUsername + ' welcome back.');
                }
                else {
                    res.send('hello ' + rUsername + ' password invalid.');
                }
            }
        }
    });
};