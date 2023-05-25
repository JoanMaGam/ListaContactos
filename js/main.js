const form = document.querySelector('#form');
const contactosUl = document.querySelector('#contactos');

function printAllContacts(pList, pDom) {
    pDom.innerHTML = '';
    pList.forEach(contact => printOneContact(contact, pDom));
}

function printOneContact(pContact, pDom) {

    const li = document.createElement('li')
    //__________________________________
    // //Ahora se creamos el boton de borrar:(a la derecha del contenido del li)
    // li.textContent = `${pContact.name}: ${pContact.phone}`; //hay que poner esto antes del boton
    // const button = document.createElement('button');
    // button.textContent = 'Borrar';
    // button.style.marginLeft = '5px';
    // button.dataset.id = pContact.id;
    // li.appendChild(button);

    //________________________________________
    //Ahora creamos el boton de borrar:(a la izquierda del contenido del li. Para hacerlo así hay que hacerlo de la forma larga.)
    //Primero creo los objetos:
    const button = document.createElement('button');
    button.style.marginRight = '5px'; //tmb le doy el estilo
    button.dataset.id = pContact.id;

    //Luego creo los textos de cada elemento:
    const textLi = document.createTextNode(`${pContact.name}: ${pContact.phone}`);
    // const textButton = document.createTextNode('Borrar')
    // button.appendChild(textButton);
    button.textContent = 'Borrar';  //las dos lineas anteriores me las ahorro con esta.

    //Añado los elementos al li en el orden que quiera.
    li.append(button, textLi);
    //___________________________________________


    //Vamos a añadir un evento el boton para eliminar ese registro cuando lo clickemos
    button.addEventListener('click', deleteContact);

    pDom.appendChild(li);

}

printAllContacts(contactos, contactosUl)

form.addEventListener('submit', getDataForm);

function getDataForm(event) { //su funcion es recoger el nuevo contacto.
    event.preventDefault(); //evita que formularios y enlaces recarguen o me envien a otra pagina. evita la accion por defecto.
    console.log(event.target.name.value); //del evento que recibo, el objeto que toco, el campo name, su valor.
    console.log(event.target.phone.value);

    const newContact = {
        id: id,
        name: event.target.name.value,
        phone: parseInt(event.target.phone.value) //se tiene que pasar a int pk se guarda como cadena pk el formulario es tipo texto. Los numeros que pasamos por los inputs de tipo texto, son texto por eso cuando creamos el new contact lo tenemos que parsear para crearlo con valor numerico.
    }

    addContact(newContact, contactos); //su funcion es pushear el contacto en el array creado antes. Para despues pintarlo.

    //el evento tiene una funcion reset que lo que hace es limpiar el formulario cuando se haya introducido ese elemento en el array.
}

function addContact(pContact, pList) { //añade el contacto a la agenda y lo pinta(llama a pintar contacto)
    //nuestra aplicacion debe controlar que no haya usuarios duplicados que tengan el mismo telefono.
    let posicion = pList.findIndex(contact => contact.phone === pContact.phone) //.findIndex recorre el array y si cumple la condicion devuelve la posicion. Si no existe devuelve -1. En este caso si no existe y devuelve -1, se pintará(con el siguiente if lo controlamos.)

    if (posicion === -1) {
        pList.push(pContact);
        //solo debo pintar un contacto
        printOneContact(pContact, contactosUl);
        id++;
    } else {
        alert('Usuario duplicado');
    }
}


function deleteContact(event) {
    alert('Borrando');
    //tenemos que hacer 2 borrados. El borrado del interfaz y el borrado del array.

    //borrado interfaz
    const liBorrar = event.target.parentNode;
    liBorrar.parentNode.removeChild(liBorrar);

    //borrado array
    let id = parseInt(event.target.dataset.id); //con esto pasamos el dataset.id que era texto a int para poder compararlo con el id del array en el borrado de array.
    deleteInArray(id, contactos);

    console.log(contactos);
}

function deleteInArray(pId, pList) {
    // return pList.filter(contact => contact.id !== pId); //no se puede hacer filter en este caso pk estamos modificando la lista y estamos retornando la lista modificada y pList no se puede modificar pk contactos es una constante. 

    //para borrar un elemento del array tenemos que saber su posicion y borrar con splice su posicion y un elemento.

    let posicion = pList.findIndex(contact => contact.id === pId);
    if (posicion !== -1) {
        pList.splice(posicion, 1)
    }
}
