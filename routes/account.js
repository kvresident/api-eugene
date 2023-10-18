const express = require('express')

const router = express.Router();
const createHash = require('../utils/createHash.js')
const bcrypt = require('bcrypt')
const accountKey = process.env.accountsKey;
const Login = require('../models/login.js')
const auth = require('../middlewares/auth.js')

const Account = require('../models/account.js')

router.use(express.json())

router.post('/create', (req, res)=>{
    console.log(req.body)
    const account = req.body;
    for(let e of ['name', 'email', 'password', 'gender', 'phone', 'userName']){
        if(!account[e]){
            return res.status(403).json({error: 'missing `'+e+ '` in account details' })
        }
    }
    
    // Hash the password using bcrypt
    const password = bcrypt.hashSync(account.password, 10);

    // Generate a custom API key
    const accessKey =createHash({length:32, encoding:36});

    let user = new Account({...account, password, accessKey})
    user.save().then(ans=>{
        res.json(ans)
    }).catch(err=>{
        res.status(500).json({error: err})
    })
})

router.get('/id/:id', auth, (req, res)=>{
    const id = req.params.id;
    Account.findById(id).then(
        ans=>{
            res.json(ans)
        }
    ).catch(err=>{
        res.status(500).json({error: err})
    })
})

router.get('/all', (req, res)=>{
    Account.find().select({accessKey: 0}).then(ans=>{
        res.json(ans)
    }).catch(err=>{
        res.status(500).json({error: err})
    })
})

router.get('/public/:id', (req, res)=>{
    Account.findById(req.params.id)
    .select({name:1, gender:1, followers:1, followed:1, profilePicture: 1})
    .then(ans=>{
        res.json(ans);
    })
    .catch(err=>{
        res.status(500).json({error: err})
    })
})

router.post('/login',auth,async (req, res)=>{
    let {deviceName, deviceDescription, loginDescription, deviceType, os, authType, appType, email, password } =  req.body;

    Account.findOne({email})
    .then(account=>{
        let pwdOk = bcrypt.compareSync(password, account.password);
        if(!pwdOk){
            return res.status(403).json({error: 'wrong password'})
        }

        let login = new Login({ deviceName, deviceDescription, loginDescription, deviceType, os, startTime: new Date().toUTCString(), endTime: null, authType, appType, accountId: account._id});
    
        login.save().then(ans=>{
            account.loginInfo.push(ans._id)
            account.save().then(d=>{
                res.json(d)
            })
        })
    })
    .catch(err=>{
        console.log(err)
        res.status(500).json({error: err})
    })
    
})

router.get('/login/:id',auth, async (req, res)=>{
    Account.findById(req.params.id).select({loginInfo: 1}).then(d=>{
        Login.find().where('_id').in(d.loginInfo)
        .then(logins => {
            res.json(logins)
        })
    }).catch(err=>{
        console.log(err)
        res.status(500).json({error: err})
    })
})

router.post('/logout', auth, (req, res)=>{
    let {loginId, accountId} = req.body;
    Account.findById(accountId).then(account=>{
        Login.findByIdAndDelete(loginId).then(success=>{
            let index = account.loginInfo.indexOf(loginId);
            account.loginInfo.splice(index, 1);
            account.save().then(ans=>{
                res.json({success: 'logged out successfully'});
            })
        })
    }).catch(err=>{
        res.status(500).json({error: err})
    })
})

router.get('/usernames/:startsWith', (req, res)=>{
    let {startsWith} = req.params;
    Account.find().select({userName: 1}).then(userNames =>{
        res.json(userNames.map(e=>e.userName).filter(d=>d.startsWith(startsWith)))
    }).catch(err=>{
        console.log(err);
        res.status(500).json({error: err})
    })
})
router.use('/image-upload', require('./image-upload.js'))


module.exports = router