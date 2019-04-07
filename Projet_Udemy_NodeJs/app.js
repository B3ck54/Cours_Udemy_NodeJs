const express = require ('express')
const bodyParser = require ('body-parser') //permet de parser les infos en body
const morgan = require ('morgan') // permet de tout savoir sur les requêtes
const app = express() // instannce de cette variable qu'on appelle app
const {success, error} = require ('function')
const config = require ('./config') // ./ car il n'est pas dans notre module


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

// création d'un router
let MembersRouter = express.Router() //on  crée un router avec un objet Router et on l'éxécute ()

// on va lui dire sur quel URL il va agir (voir les functions en bas de mon code au dessus du app.listen)

//pour récupérer les différents membres
console.log(members[0])

app.use(morgan('dev'));
app.use(bodyParser.json()); //pour parser le json
app.use(bodyParser.urlencoded ({ extended: true })); // il faut le mettre pour que ce soit bien interprété


//-------------------------------------METHODE DELETE -  PUT - SUPPRIME ET MODIFIE UN MEMBRE-----------------------------------------------------//

// on réunit tout en une seule route
MembersRouter.route('/:id') // prend en compte tous les parametres

    //Première page qui va récupérer un seul membre avec son id
    .get((req, res) => {
        // res.json(members[(req.params.id)-1].name) }) //.name pour voir simplement le nom de la personne et pas {"id:3","name" : "Jack"}

        let index = getIndex(req.params.id);

        // test en fonction du type de la variable
        if (typeof(index) == 'string') { // string renvoit le message d'erreur
            res.json(error(index))
        } else {
            res.json(success(members[index])) // la on récupère bien le membre
        }
    })


    //modifier un membre avec son id
    .put((req, res) => {
    // il faut 2 variables  : l'id et le nouveau name qu'on va mettre au membre
    // on regarde si l'id est existant
    let index = getIndex(req.params.id);

        if (typeof(index) == 'string') { // string renvoit le message d'erreur
            res.json(error(index))
        } else {
            
            let same = false

            //boucle pour verifier que le nom n'est pas déjà pris
            for (let i = 0; i < members.length; i++)  {
                // on regarde si l'id est différent et voir pour le nom
                if(req.body.name == members[i].name && req.params.id != members[i].id) { // alors ça nous pose un probleme
                // on renvoit une erreur / on crée une variable d'erreur afin de la traiter juste après (voir let same)
                same = true
                break // ça sert à rien de continuer de tourner
                }
            }

            if (same) { // si c'est vrai il y a une erreur
                res.json(error('same name')) 
            } else { // il n'y a pas d'erreur // on renvoit l'erreur
                members[index].name = req.body.name // on lui change son nom
                res.json(success(true)) // c'est bon tout va bien
            }    
        }
            
    })

    //suppression d'un membre avec son id
    .delete ((req, res) => {
        // test si l'id existe
        let index = getIndex(req.params.id);

        if (typeof(index) == 'string'){
            res.json(error(index))
        } else { // s'il n'y a pas d'erreur on supprime la personne
            members.splice(index,1) // si supp l'index va changer pour les autres car il y a un decalage
            res.json(success(members))
        }
    })

//-------------------------------------METHODE GET - TOUS LES MEMBRES ET POST - AJOUTE UN MEMBRE-----------------------------------------------------//


    // on réunit tout en une seule route
MembersRouter.route('/') // prend en compte tous les parametres
    //récupérer tous les membres
    .get((req, res) => {
        if(req.query.max != undefined && req.query.max > 0) { // si les params predefinies ap le point d'interrogation est defini
            res.json(success(members.slice(0,req.query.max))) // alors on met en place notre systeme qui contiendra le max

        } else if (req.query.max != undefined) {
            res.json(error('wrong max value'))
    
        } else {
            res.json(success(members)) //sinon on envoie tout l'objet
        }
    
    })

    //ajouter un membre
    .post((req, res) => {

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
                res.json(error('name already taken'))
            } else {


            let member = {
                id: createID(),
                name: req.body.name
            }
            members.push (member)
            
            res.json(success(member))

        }

        } else {

            res.json(error('no name value'))
        }
    })

app.use(config.routeAPI + 'members', MembersRouter)

app.listen(config.port, () => console.log('Started on port ' + config.port))




//----------------------------------FUNCTIONS-----------------------------------------------------//

// fonction pour récupérer les membres - On va récupérer les membres lié à l'index pour recup l'id
function getIndex (id)
{
    for (let i = 0; i < members.length; i++) // boucle qui va boucler la constante members
    {
        if (members [i].id == id)
        return i
    }
    return 'wrong id'
}

// fonction qui prend le dernier id et qui lui ajoute 1
function createID()
{
    // on recupere notre dernier element de members
    return members[members.length-1].id+1 // -1 car ça commence a 0 -- pour avoir son id : .id et +1 pour avoir le nouvel id
}

