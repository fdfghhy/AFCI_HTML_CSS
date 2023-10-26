"use strict"
/*
    Par défaut, toute programmation en Javascript est dite "Synchrone", c'est-à-dire que tout le fonctionnement de la page et plus précisément de Javascript
    attend la fin d'une instruction avant de passer à la suivante. 
*/

for (let i = 0; i < 1_000_000_000; i++) {
    if(i === 999_999_999) {
        console.log("1.Synchrone : Fin de la boucle");
    }
}
console.log("2.Bonjour après la boucle Synchrone");

/*
    Mais JS peut gérer de la programmation asynchrone.
    C'est-à-dire qu'il peut continuer d'exécuter du code alors qu'une autre partie est toujours en train de travailler.
    On a pu voir cela avec fetch. 
*/
fetch("test1.json").then(r=> {
    for (let i = 0; i < 1_000_000_000; i++) {
        if(i === 999_999_999) {
            console.log("3.Synchrone : Fin de la boucle");
        }
    }
}) 
console.log("4.Bonjour après la boucle Synchrone");

/*
    Une fonction retourne soit une valeur (number, array ...) soit rien (undefined).
    Il s'avère que fetch retourne bien quelque chose.
    Il retourne une "promise"
*/

let request = fetch("test1.json"); //Retourne un objet promise 
console.log(request);

/*
    Dans cet objet "Promise" on a trois méthodes principales :
        - .then() qui va prendre une fonction callback qui sera appelé une fois la promesse tenue (réussite)
        - .catch() qui va prendre une fonction callback, qui sera appelée si la promesse est rejetée (échec)
        - .finally() qui prendra une fonction callback qui sera appelé une fois la promesse traitée (réussite ou échec)
*/

// La fonction callback reçoit la réponse du fetch
request.then(res=>console.log("then", res));
// La fonction callback reçoit l'erreur du fetch
request.catch(err=>console.log('catch', err))
// La fonction callback ne reçoit rien du tout (il fait juste l'action demandée)
request.finally(test=>console.log('finally', test))

/*
    à noté que chacun d'entre eux, retourne une promesse, ils sont donc chainable :
    request.then(callback).catch(callback).finally(callback)

    Il est possible de résoudre plusieurs promesses en même temps.
    Pour cela, on utilisera la méthode ".all()" de l'objet "Promise".
    Méthode à laquelle on donnera un tableau contenant toutes les promesses à résoudre.

    Une fois toute résolue, le .then() recevra un tableau contenant toutes les réponses
*/
let r1 = fetch("test1.json")
let r2 = fetch("test2.json")

Promise.all([r1, r2]).then(res=> {
    /* Si elles sont de même type (ici des fetchs), on peut les résoudres avec un foreach */
    console.log(res);
    res.forEach((r)=>{
        if (r.ok) {
            r.json().then(data=>console.log(data.prop));
        }
    })
})

/*
    on trouvera aussi la méthode "Promise.race()" et "Promise.any()" qui prendront elles aussi un tableau de promesse.
    Mais au contraire de ".all()", elles ne rendront que la première promesse à s'exécuter (la plus rapide).

    La différence entre les 2 se fait au niveau du .catch()   :
        - ".race()" lancera le catch si la plus rapide des promesse retourne une erreur
        - ".any()" lancera le catch si toutes les promesses retournent une erreur  

        On peut créer nos propres promesses :
        Lorsque l'on crée une promesse, elle prend une fonction callback avec 2 arguments 

        Ces 2 arguments réprésentent respectivement la fonction callback qui sera donnée au then et celle donné au catch
*/
let random = new Promise(function(resolve, reject) {
    let r = Math.floor(Math.random()*10);
    if (r < 5) {
        resolve("Bravo, r est plus petit que 5 !")
    }
    else {
        reject("Désolé, r est plus grand que 5 !")
    }
})
console.log(random);
random  .then(res=>console.log("then", res))
        .catch(err=>console.log('catch', err))
        .finally(()=>console.log("finally", "Mon random est terminé"));

/*
    Exemple d'utilisation de promesse :
*/
function burger1() {
    pain1();
    sauce1();
    viande1();
    salade1();
    console.log("Le burger est servi !");
}
function pain1() {
    setTimeout(() => console.log("Le pain est grillé et placé"), 1000)
}
function sauce1() {console.log("La sauce est versé")}
function salade1() {console.log("La salade est placé")}
function viande1() {
    setTimeout(() => console.log("La viande est cuite et placée"), 3000)
}
//console.log(burger1());
// Ici nous obtenons le pain est grillé et placé avant la viande est cuite et placée (cela ne fonctionne pas très bien) lorsque l'on marque dans la console burger1()

// Avec promesse : 
function pain2() {
    return new Promise(resolve=>setTimeout(()=>resolve("Le pain est grillé et placé"), 1000));
}
function viande2() {
    return new Promise(resolve=>setTimeout(()=>resolve("La viande est grillé et placé"), 3000));
}
function sauce2() {
    return new Promise(resolve=>setTimeout(()=>resolve("La sauce est versée")));
}
function salade2() {
    return new Promise(resolve=>setTimeout(()=>resolve("La salade est placée")));
}
function burger2() {
    pain2().then(pain=>{
        console.log(pain);                                                  
        sauce2().then(sauce=>{
            console.log(sauce);
            viande2().then(viande=>{
                console.log(viande);
                salade2().then(salade=>{
                    console.log(salade);
                    console.log("Le burger est servi !");
                })
            })
        })
    })
}
console.log(burger2());
// Tout est bien placé dans l'ordre 