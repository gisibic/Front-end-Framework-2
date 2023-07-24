const account = require('../models/accounts')
const fs = require('fs');
class accountController {
    account(req, res) {
        account.find({}).then((account) => {
            account = account.map((ac) => ac.toObject());
            // res.json({ account })
            res.render('account', { account: account })
        })
    }

    addNew(req, res) {
        res.render('adds/addAccounts')
    }
    screenUpdate(req, res, next) {
        account.findOne({ _id: req.params._id })
            .then((acc) => {
                res.render('updates/upAccounts', {
                    _id: acc._id,
                    name: acc.name,
                    email: acc.email,
                    password: acc.password,
                    date: acc.date,
                    image: acc.image
                })
            })
            .catch(next);
    }
    add(req, res) {
        fs.rename(req.file.path, 'uploads/' + req.file.originalname, function (err) {
            console.log(req.file.originalname);
        });
        const formData = req.body;

        if (req.file) {
            formData.image = 'http://localhost:3000/uploads/' + req.file.originalname;
        }
        console.log(req.body);
        const car = new account(formData);
        car.save()
            .then(() => res.redirect('/account'));
    }
    delete(req, res, next) {
        account.findByIdAndDelete({ _id: req.params._id })
            .then(() => {
                res.redirect('/account');
            })
            .catch(next);
    }
    login(req, res) {
        let email = req.body.email
        let password = req.body.password

        account.findOne({ email: email })
            .then(acc => {
                if (!acc) {
                    return res.status(401).json({ status: 'error', message: 'Tài khoản chưa tồn tại' })
                }
                if (acc.password !== password) {
                    return res.status(401).json({ status: 'error', message: 'Sai mật khẩu!!' });
                }
                return res.status(200).json({ status: 'success', acc });

            })
    }
}
module.exports = new accountController;