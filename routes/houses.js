const express = require('express')

const router = express.Router();

const Account = require('../models/account')
const House = require('../models/house')

const {createHouse, uploadHouseImages, uploadHousePhotos} = require('../controllers/createHouse')

const auth = require('../middlewares/auth')
const houseInfo = require('../utils/house')

router.post('/', auth, (req, res, next)=>{
    req.body.landLord = req.user._id;
    next();
},uploadHouseImages, uploadHousePhotos, createHouse)

router.get('/houseInfo', (req, res)=>{
    res.json(houseInfo)
})

router.get('/town/:town', async (req, res)=>{
    try {
        const houses = await House.find({town: req.params.town})
        res.json(houses)
    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
})

router.get('/country/:country',async (req, res)=>{
    try {
        const houses = await House.find({
            country: req.params.country
        })
        res.json(houses)
    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
})

router.get('/landlord/:id', async (req, res)=>{
    try {
        const houses = await House.find({landLord: req.params.id});
        res.json(houses)
    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
})


module.exports = router