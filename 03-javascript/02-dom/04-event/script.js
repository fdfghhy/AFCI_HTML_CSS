"use strict";

function test(e) {
    console.log(e);
}
const h1 = document.querySelector('header > h1');
/*
    Lorsqu'un utilisateur intéragie avec la page, il bouge la souris, il clique, il tape au clavier, il scroll...
    Cela produit un évènement, nous allons pouvoir dire à javascript d'écouter ces évènements et de faire une action à ce moment.

    Pour cela, plusieurs méthode, la première étant :
    .addEventListener("event", fonction)
    Il prendra en premier paramètre le nom de l'événement à écouter (toujours en minuscule) et en second la fonction à lancer lorsque l'évènement ce produit.
*/
// Dès qu'on click sur le h1, on obtient un message dans la console
h1.addEventListener("click", test)
/*
    Par défaut, addEventListener va passer à la fonction donné, un paramètre contenant un objet correspondant à l'événement. 
    Ici un objet "Click" qui contient entre autre.
        La position de la souris au clique
        La cible de l'événement (où on a cliqué)

    On peut ajouter autant d'événement que l'on souhaite sur un même élément.
    On peut aussi utiliser des fonctions anonyme fléché.
*/
let x=0;
h1.addEventListener("click", function(e){
    let r = Math.floor(Math.random()*360);  // 360 pour 360 deg
    e.target.style.transform = `rotate(${r}deg)`;       // e est la fonction test que nous avons déclarer plus haut, nous sommes obligés de mettre e car "e" pour événement
    x++;
    if(x===5)e.target.style.color = "red"; // Au bout de 5 click, le h1 devient rouge
})
/*
    On peut aussi ajouter un événement via la propriété qui correspond.
    Chaque élément HTML a de multiples propriété commençant par "on" suivi du nom de l'événement (onclick, on load...)
    Si cette propriété est remplie avec une fonction, cela aura le même effet.
*/
const menu1 = document.querySelector(".menu1");
menu1.onclick = test;
// On ne peut ajouter qu'un seul événement sur une propriété :
menu1.onclick = (e)=>{
    if(e.target.style.fontSize === "")
        e.target.style.fontSize="2em";  //grossit quand au click dessus
    else
        e.target.style.fontSize="";
}
/*
    Une 3e façon d'ajouter un écouteur d'événement existe, mais celle-ci est plutôt déconseillé car mélangeant HTML et JS.
    L'exemple se trouve dans le HTML sur "menu 2"

    Si on souhaite supprimer un écouteur d'événement, pour l'attribut, il suffit de le vider :
*/
menu1.onclick = ""   // l'événement de grossisement mit avant ne fonctionne plus

/* 
    Pour le addEventListener, on utilisera removeEventListener, en lui donnant les même paramètres: 
*/
h1.removeEventListener("click", test); // retire le texte apparaissant dans la console lorsque l'on clique
// Petit défaut, on ne peut retirer que les event utilisant une fonction nommé.

//? ------------------------ Input Event ------------------------
const div1 = document.querySelector('.div1');
const input1 = div1.querySelector('input');
const btn1 = div1.querySelector('button');
/*
    L'événement "input" réagis à chaque modification d'un élément de formulaire (input, textarea, checkbox, radio...)
    Il existe aussi l'événement "change" qui réagi une fois l'input validé (par exemple sur un textarea, ou un input:text, cela sera une fois l'input quitté)
*/
input1.addEventListener("input", (e)=>{
   /* console.log(e); récupére info dans la console */
    /*
    Sur tous les éléments HTML de formulaire, on trouvera l'attribut "value" qui permet de récupérer son contenue (sa valeur)
   */
    console.log(e.target.value);
    if(e.target.value !="")
        btn1.textContent = e.target.value; /* écrit le texte que l'on écrit dans la console */
    else
        btn1.textContent = "Clique moi !"; /* Le bouton change : il devient le texte que l'on écrit */
})

//? ---------------------------- Options ----------------------------
/*
    On peut ajouter des options à notre addEventListener
    Pour cela on ajoutera un objet "{}"
        ElementHTML.addEventListener("event", function,{option:valeur});
*/
btn1.addEventListener("click",()=>h1.textContent=input1.value,{once:true}); // Quand l'on écrit dans le texte clique moi! et quon valide, le h1 deivent ce qu'on l'a écrit mais marche qu'une fois (once)