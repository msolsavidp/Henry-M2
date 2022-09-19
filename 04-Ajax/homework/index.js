/*RECORDATORIO: Para manipular un elemento de html en con jquery debes usar $('#id-elemento') agregandole como arguemnto el id del elemento que quieres manipular*/

//1- Utilizar el evento click en un boton (Ver Amigos) para que al hacer click aparezca en el DOM una lista con todos los amigos que el servidor nos devolverá al hacer un GET a la ruta http://localhost:5000/amigos
let btnAmigos =  document.querySelector('#boton');
const ulAmigos = document.querySelector('#lista');

function showFriends(){
        //antes de mostrar la lista, la vacía por si antes ya había una
    ulAmigos.innerHTML='';
    //fetch se usa cuando no usamos jquery, se le pasan dos parametros la URL y el tipo de solicitud (get, post ...) si no le aclaramos toma que es un GET por default
    fetch('http://localhost:5000/amigos')
    .then (res => res.json())
    .then (amigos => {
        for (let i = 0; i< amigos.length; i++){
            //Otra forma de hacerlo: 
            let li= `<li>${amigos[i].name}<button onclick='deleteFriend(${amigos[i].id})'> x </button></li>`
            ulAmigos.innerHTML = ulAmigos.inerHTML + li;
            //let li = document.createElement('li');
            // li.innerText = amigos[i].name;
            // ulAmigos.append(li);
        }
    })
}

function deleteFriend(idFriend){

    if (typeof idFriend !== 'number'){
        idFriend = inputDelete.value;
        inputDelete.value = '';
        }
  
    fetch(`http://localhost:5000/amigos/${idFriend}`, {method:'DELETE'})
        .then (res => res.json())
        .then (() => {
        spanDelete.innerText = 'Amigo eliminado exitosamente';
        //para que se ejecute la función nuevamente y actualice sola la lista de amigos
        showFriends();
    })
}

btnAmigos.addEventListener('click', showFriends);

/*$('#boton').click(function(){
$.get('http://localhost:5000/amigos', function (){
    array.forEach(element => {
       let friendsList = document.createElement('div');
       friendsList.className = 'friendsList';
       let friendsItem = document.createElement('span');
       //friendsItem.innerHTML = 
    });
}); 
  });*/

//2- Un campo de busqueda (input) que reciba el id de un amigo y un boton "buscar".
// Al hacer click en el boton, buscaremos el amigo que tiene ese id en el servidor, y lo mostraremos en el DOM. 
//Para conseguir los datos de un amigo en particular del servidor, puedes hacer un GET nuestro servidor concatenando el id del amigo que queremos encontrar, Por ej: http://localhost:5000/amigos/1 le pediria al servidor el amigo con id = 1
const input = document.querySelector('#input');
const search = document.querySelector('#search');
const span = document.querySelector ('#amigo');

search.addEventListener('click', function(){
    let idAmigo = input.value;
    //para que la barra del input quede en blanco una vez que apretamos el boton
    input.value = '';
    fetch(`http://localhost:5000/amigos/${idAmigo}`)
    .then (res => res.json())
    .then (amigo => {
        span.innerText = amigo.name;
    })
})

/*3- Un input que reciba el id de un amigo y un boton "borrar". Al hacer click en el boton, borraremos el amigo del servidor haciendo un DELETE a nuestro servidor, concatenando el id del usuario que queremos borrar. Por ej: http://localhost:5000/amigos/2 le pediria al servidor el amigo con id = 2*/
const inputDelete = document.querySelector('#inputDelete');
const friendDelete = document.querySelector('#delete');
const spanDelete = document.querySelector('#success')

friendDelete.addEventListener('click', deleteFriend)