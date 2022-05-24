var express = require('express')
var Travel = require('../models/travel')
var passport = require('./config/passport')

var router = express.Router()

router.get("/",
    //passport.authenticate('jwt', {session:false}), 
    async (req, res, next)=>
{ 
    var travels = await Travel.find()
    res.send(travels)
})

router.get("/:id",
    //passport.authenticate('jwt', {session:false}),
    async (req, res, next)=>
{ 
    var travel = await Travel.findById(req.params.id)
    res.send(travel)
})

router.post("/", 
    //passport.authenticate('jwt', {session:false}),
    //passport.authorizeRoles('ADMIN'),
    (req, res)=>{
    res.send(Travel.sacuvaj(req.body))
})

router.put("/", 
    //passport.authenticate('jwt', {session:false}),
    (req, res)=>{
    var travel = {
        drzava: req.body.drzava,
        grad: req.body.grad,
        datumPolaska: req.body.datumPolaska,
        brojDana: req.body.brojDana,
        opis: req.body.opis,
        cena: req.body.cena
    }
    Travel.findByIdAndUpdate(req.body._id, { $set: travel, new: true }, (err, tr) => {
        if (!err) res.status(200).send(tr);
        
    });
})

/*router.delete("/:id", 
    //passport.authenticate('jwt', {session:false}),
    async (req, res, next)=>{
    await Travel.findByIdAndDelete(req.params.id).then((review) => {
        res.send('Obrisana');
      });
})*/

router.delete("/:id", async (req, res)=>{
    Travel.findByIdAndRemove(req.params.id, (err) => {
        if (!err) 
            res.status(200).send(true);
    });
})

module.exports = router