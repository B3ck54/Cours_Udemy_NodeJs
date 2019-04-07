

// // synchrone
// console.log('Début')
// console.log('Fin')

/* ********************************************************************** */

// // Asynchrone
// console.log('Début')
// setTimeout(() => {
//     console.log('In timout')
// }, 1500 )
// console.log('Fin')

/* ********************************************************************** */

// // probleme asynchrone sous forme de fonction --> on utilisera 3 nouveaux patterns
// // EXEMPLE CALLBACK
// console.log('Début')
// getMember((member) => {
//     console.log(member)
// })
// console.log('Fin')


// function getMember(next) {
//     setTimeout (() => {
//         next('Member 1')
//     },1500)
// }

/* ********************************************************************** */

// // EXEMPLE CALLBACK AVEC +SIEURS FONCTIONS ANONYMES EN MEME TPS
// console.log('Début')
// getMember((member) => {
//     console.log(member)
//     getArticles(member, (articles) => {
//         console.log (articles)
//     })
// })
// console.log('Fin')


// function getMember(next) {
//     setTimeout (() => {
//         next('Member 1')
//     },1500)
// }
// function getArticles (member, next) { //on appelle getArticles une fois que getMember sera exécuté
//     setTimeout (() => {
//         next ([1,2,3])
//     },1500)
// }

/* ********************************************************************** */

// LES PROMESSES
// console.log ('Début')
// new Promise((resolve, reject) => {

//     setTimeout (() => {
//         resolve('All good.')
//         //reject(new Error('Error during...'))
//     },1500)
// })
// .then(message => console.log(message))
// .catch (err => console.log(err.message))

// console.log('Fin')

/* ********************************************************************** */

// //UTILISATIONS DES PROMESSES
// console.log('Début')

// getMember()
// .then(member => getArticles(member))
// .then(articles => console.log(articles))
// .catch(err => console.log(err.message))

// function getMember(member) {
//     return new Promise ((resolve, reject) => {

//         setTimeout (() => {
//             console.log('Member 1')
//             resolve('Member 1')
//         },1500)
//     }) 
// }

// function getArticles (member) { //on appelle getArticles une fois que getMember sera exécuté
//     return new Promise ((resolve, reject) => {

//         setTimeout (() => {
//             // resolve ([1,2,3])
//             reject (new Error ('Error during getArticles()'))

//         },1500)
//     })
// }

// console.log('Fin')

/* ********************************************************************** */

// // PROMESSES EN PARALLELE
// console.log ('Début')

// let p1 = new Promise ((resolve, reject) => {
//     setTimeout(() => {
//         resolve ('p1')
//     }, 1500)
// })

// let p2 = new Promise ((resolve, reject) => {
//     setTimeout(() => {
//         resolve ('p2')
//     }, 1500)
// })
// Promise.all([p1, p2])
// .then (result => console.log(result))


// console.log('Fin')

/* ********************************************************************** */

// AWAIT & ASYNC
console.log ('Début');

    getMember()  
        .then(member => getArticles(member))
        .then(articles => console.log(articles))

    (async() => {
        try {  
            let member = await getMember ()
            let articles = await getArticles (member)
            console.log(articles)
        } catch {
            console.log(err.message)
        }
    })()

   

    function getMember() {
        return new Promise ((resolve, reject) => {
            setTimeout(() =>{
                resolve ('Member 1')
            }, 1500)
        })
    }

    function getArticles (member) {
        return new Promise ((resolve, reject) => {
            setTimeout(() => {
                resolve([1, 2, 3])
            }, 1500)
        })
    }

console.log('Fin')

/* ********************************************************************** */



