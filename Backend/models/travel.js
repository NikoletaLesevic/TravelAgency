var mongoose = require('mongoose')
var Schema = mongoose.Schema

var TravelSchema = new Schema({
    drzava: {type: String, reqired: true},
    grad: {type: String, reqired: true},
    datumPolaska: {type: String, reqired: true},
    brojDana: {type: Number, reqired: true},
    opis: {type: String, reqired: true},
    cena: {type: Number, reqired: true}
})

var TravelModel = mongoose.model('travel',TravelSchema)

TravelModel.sacuvaj = function sacuvaj(reqBody)
{
    var travel = new TravelModel({
        drzava: reqBody.drzava,
        grad: reqBody.grad,
        datumPolaska: reqBody.datumPolaska,
        brojDana: reqBody.brojDana,
        opis: reqBody.opis,
        cena: reqBody.cena
    })


    travel.save((err)=>{
        if (err)
            console.log(err.stack)
    })

    return travel
}

module.exports = TravelModel