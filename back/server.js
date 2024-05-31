const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors())
app.use(express.json({ limit: '10mb' })); // Augmenter la limite à 10MB ou plus si nécessaire


const formSchema = mongoose.Schema({
    id : {type : Number, required : true},
    title : {type : String, required : true},
    author : {type : String, required : true},
    state : {type : String, required : true},
    pages : {type : Number, required : true},
    img : {type : String, required : false},
    category : {type : String, required : true},
    desc : {type : String, required : false},
    fav : {type : Boolean, required : false}
});
const form = mongoose.model('form', formSchema);
formSchema.index({title:1, author:1}, {unique : true});

const favSchema = mongoose.Schema({
    id : {type : Number, required : true}
})

const fav = mongoose.model('fav', favSchema)


mongoose.connect("mongodb://localhost:27017/BookBuddy")
    .then(async () => {
        console.log("Connecté à MongoDb.")
        app.post("/addBook" ,async (req, res) => {
            let id = await form.find({}, {id: 1, _id : 0}).sort({id: -1}).limit(1)
            try {
               id = id[0].id 
            } catch {
                id = id.id
            }
            
            console.log(id, "--------------------------------------->")
            let myId = id ? id + 1 : 1; 

            let json = req.body
            
            const data = new form({
                id : myId,
                title : json.title,
                author : json.author,
                state : json.state,
                pages : json.pages,
                img : json.img,
                category : json.category,
                desc : '',
                fav : false
            })

            data.save().then(()=> {
                console.log("Ajouté")
                res.send({msg : "Added"})
            }).catch((err)=> {
                if (err.code === 11000){
                    console.log(err.code, res.status)
                    res.send({msg : err.code})
                } else if (err.errors.pages) {
                    console.log(err.errors.pages)
                    res.send({msg : 'NaN'})
                } else {
                    console.log("aie aie aie", err)
                }
            })

    
        })

        app.post("/book/:id", async (req,res) =>{
            let value = req.params
            const findBook = await form.findOne({id : value.id})
            console.log(value, findBook )
            const data = new fav({
                id : findBook.id
            })
            data.save().then(()=> {
                console.log("Ajouté to fav")
                res.send({msg : "Added to fav"})
            }).catch((err)=> {
                console.log("ADD TO FAV ERROR :", err)
                res.send({msg : err})
            })

        })

        app.get('/book/:id', async (req,res) =>{
            let val = req.params;
            let regex = new RegExp(val.id, 'i')
            const datas = await form.find({
                $or : [
                    {title : {$regex :  regex }},
                    {author : {$regex : regex }}
                ]
            }).select('-_id -__v')
            console.log(datas)
            res.send({value : datas})
        })

        app.get('/books', async (req,res)=> {
            const datas = await form.find({}).select('-_id -__v')
            res.send({value : datas})
        })

        app.get('/favoris', async (req,res)=> {
            const datas = await fav.aggregate([
                {
                    $lookup: {
                        from: "forms", // Collection source
                        localField: "id", // Champ local à comparer
                        foreignField: "id", // Champ étranger dans la collection source
                        as: "book" // Nom du champ dans lequel stocker les données de la collection source
                    }
                },
                {
                    $project: {
                        _id: 0, // Je n'en veux pas
                        __v: 0 
                    }
                }
            ])
            const books = datas.map(element => element.book)
            console.log('favorisssss', books)
            res.send({value : datas})
        })




        app.put('/book/status/:id/:msg', async (req,res) => {
            try {
                const myId = req.params.id
                const myMsg = req.params.msg
                const result = await form.updateOne({id : myId}, {desc : myMsg})
                console.log({msg : "Updated"})
                res.send(result? {msg : "Updated"} : null)
            } catch(err) {
                console.log("PUT : ", err)
                res.send({msg : "Erreur survenue"})
            }
        })


        app.put('/book/favoris/:id', async (req,res) => {
            try {
                const myId = req.params.id
                const result = await form.updateOne({id : myId}, {fav : true})
                console.log({msg : "Add to Favoris"})
                res.send(result? {msg : "Add to Favoris"} : null)
            } catch(err) {
                console.log("PUT : ", err)
                res.send({msg : "Erreur survenue (Fav)"})
            }
        })
        app.put('/book/changeFavoris/:id', async (req,res) => {
            try {
                const myId = req.params.id
                const result = await form.updateOne({id : myId}, {fav : false})
                console.log({msg : "Remove from Favoris state"})
                res.send(result? {msg : "Remove from Favoris state"} : null)
            } catch(err) {
                console.log("PUT : ", err)
                res.send({msg : "Erreur survenue (ChangeFav)"})
            }
        })

        app.delete('/book/:id', async(req,res) =>{
            try {
                const myId = req.params.id
                const result = await fav.deleteOne({id : myId})
                console.log({msg : "Remove from Favoris state"})
                res.send(result? {msg : "Remove from Favoris state"} : null)
            } catch(err) {
                console.log("DELETE : ", err)
                res.send({msg : "Erreur survenue (ChangeFav)"})
            }
        })
    })


app.listen(PORT, () => {
    console.log("le serveur écoute bien sur le port", PORT, "à l'URL suivante : http://localhost:" + PORT.toString())
})