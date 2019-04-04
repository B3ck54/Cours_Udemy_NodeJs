const express = require ('express')
const bodyParser = require ('body-parser') //permet de parser les infos en body
const morgan = require ('morgan') // permet de tout savoir sur les requêtes
const app = express() // instannce de cette variable qu'on appelle app
const func = require ('function')


//app.use((req, res, next) => {
//   console.log('URL :' + req.url)
//   next();
//})


//Création d'un array qui contient +sieurs objets : Tous nos Membres
const members = [
    {
        id: 1,
        name: 'John'
    },

    {
        id: 2,
        name: 'Julie'
    },

    {
        id: 3,
        name: 'Jack'
    }
]

//pour récupérer les différents membres
console.log(members[0])

app.use(morgan('dev'));
app.use(bodyParser.json()); //pour parser le json
app.use(bodyParser.urlencoded ({ extended: true })); // il faut le mettre pour que ce soit bien interprété

//Première page qui va récupérer un seul membre
app.get('/api/v1/members/:id', (req, res) => {
    res.json(members[(req.params.id)-1].name) //.name pour voir simplement le nom de la personne et pas {"id:3","name" : "Jack"}
})

//récupérer tous les membres
app.get('/api/v1/members', (req, res) => {
    if(req.query.max != undefined && req.query.max > 0) { // si les params predefinies ap le point d'interrogation est defini
        res.json(func.success(members.slice(0,req.query.max))) // alors on met en place notre systeme qui contiendra le max

    } else if (req.query.max != undefined) {
        res.json(func.error('wrong max value'))
 
    } else {
        res.json(func.success(members)) //sinon on envoie tout l'objet
    }
   
})

//ajouter un membre
app.post('/api/v1/members', (req, res) => {

   // res.json(req.body)
    if (req.body.name) {

        let sameName = false

        for (let i= 0; i < members.length; i++ ) {
            if (members[i].name == req.body.name) {
                sameName = true
                break
            }
        }

        if (sameName) {
            res.json(func.error('name already taken'))
        } else {


        let member = {
            id: members.length+1,
            name: req.body.name
        }
        members.push (member)
        
        res.json(func.success(member))

    }

    } else {

        res.json(func.error('no name value'))
    }
})

app.listen(8080, () => console.log('Started on port 8080'))
