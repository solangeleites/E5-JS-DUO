const d = document;
// contenedor de productos 
const $containerProductos = d.getElementById('containerProductos')
// contenedor de categorias y las categorias
const $containerCategorias = d.querySelector('.container__categorias')
const $listaDeCategorias = d.querySelectorAll('.category')
// para el carrito hay que traernos: 
const $carritoContainer = d.getElementsByClassName('carrito-container')
const $carritoMenu = d.getElementsByClassName('carrito')
const $total = d.getElementsByClassName('total')
const $comprar = d.getElementsByClassName('btn-comprar')
const $vaciarCarrito = d.getElementsByClassName('btn-vaciarcarrito')
const $carrito = d.getElementById('carrito');
// boton de ver más
const $verMas = d.getElementsByClassName('btn-vermas')
// modal
const $modal = d.getElementsByClassName('add-modal');
//! ------------------------------------------------------------------------------------
// Vamos a setear el array para el carrito
let carrito = JSON.parse(localStorage.getItem('carrito'))  || [];
// Vamos a crear la funcion para guardar en el LS
const saveLS = listaDeCarrito => {
    localStorage.setItem('carrito', JSON.stringify(listaDeCarrito))
}
//! ------------------------------------------------------------------------------------

// Tercero creamos la función para el renderizado de los productos del array
const renderProducto = producto => {
    const { id, name, description, price, image } = producto;
    return `<div class="section__container" id="containerProductos">

                <div class="cards populares">
                    <img src="${image}" alt="${name}" class="pizza">
                    <div class="container__text left">         
                        <h3 class="tittle__pizza">${name}</h3>
                        <p class="subtitulo__pizza">${description}</p>

                            <div class="container__price__button">
                                <h2 class="price__pizza left"> $ ${price}</h2>
                                <button class="button button__pizza" <button class="btn-add"
                                data-id='${id}'
                                data-name='${name}'
                                data-bid='${price}'
                                data-img='${image}'>Agregar</button>
                            </div>
                    </div>
                </div>
            </div>`
};

;
// const renderFiltradoDeProductos = category => {
//     const listaDeProductos = productos.filter(producto => producto.category === category);
//     containerProductos.innerHTML = listaDeProductos.map(renderProducto).join('');
// };


// Segundo creamos la funcion de renderProductosDividivos para renderizar los 6 primeros productos.
// Le pasamos como parametro el index de 0. 
// Le decimos al contenedor de productos  que con el innerHTML le agregue los productos divididos en 6. (Esto lo sacamos del controlador de productos que se encuentra en dataJS)
// Luego hacemos un map para recorrer el array de productos y le pasamos la funcion renderProducto para que nos devuelva el html de cada producto.
// Luego le agregamos el join para nos quite las comas.
const renderProductosDivididos = (index = 0) => {
    $containerProductos.innerHTML += controladorDeProductos.dividirProductos[index].map(renderProducto).join('');
}

// Octavo paso: vamos a crear la funcion del paso septmo para renderizar los productos filtrados.
// Le pasamos como parametro la categoria.
// vamos a guardar en una variable los productos filtrados.
// ENtonces buscamos en el array de productos, los productos que tengan la misma categoria que la que le pasamos por parametro.
// Luego le decimos al contenedor de productos que nos cambie el html por la variable que guardamos que es la de los productos filtrados. Uso el map para recorrer el array y le paso la funcion renderProducto para que me devuelva el html de cada producto. Y le agrego el join para que me quite las comas.

const renderDeProductosFiltrados = category => {
    const listaDeProductos = productos.filter(producto =>  producto.category === category);
    if(!listaDeProductos.length) $containerProductos.innerHTML = `<small>Lo sentimos, actualmente no tenemos stock.</small>`
    else $containerProductos.innerHTML = listaDeProductos.map(renderProducto).join('');
}



// Primero 
// Le paso como parametro el index de 0 y otro parametro que va a ser la categoria undefined por defecto.
// Le decimos con el if si no tenes categoria, renderizame los productos divididos. 
//! No renderizaba porque habia puesto el return despues de la llave.
const renderTodosLosProductos = (index = 0, category = undefined) => {
    if(!category){
        renderProductosDivididos(index);
        return;
    }
    renderDeProductosFiltrados(category);
}

//Septimo paso, aca vamos a crear la funcion del boton de ver mas,  para que se muestre cuando haya productos que mostrar y para que se oculte cuando no haya mas productos que mostrar.
// Esta funcion va a recibir como parametro una categoria
//Y le vamos a decir que si no tiene categoria (el parametro que le pasamos) que se muestre el boton de ver mas.

const cambiarEstadoBtnVerMas = (categoriaSeleccionada) => {
    if(!categoriaSeleccionada){
        $verMas[0].style.display = 'block';
        return;
    }
    $verMas[0].style.display = 'none';
}


// Sexto vamos a crear la funcion que le va a cambiar el colorcito de fondo cuando  tengamos seleccionada una categoria.
// vamos a guardar en una variable la lista de categorias que nos trajimos del html
// Luego, lo vamos a convertir en un array con el spread operator. 
// Despues vamos a hacer un forEach para recorrer el array de categorias. Le vamos a pasar una categoria como parametro. Y le vamos a decir que: Si la categoria que le pasamos como parametro no tiene el dataset(qe viene del data del html). category que es igual a la categoria seleccionada, le vamos a sacar la clase active. Y si no, le vamos a agregar la clase active.
// Y chan chan, funca 🤍

const botonActivado = (categoriaSeleccionada) => {
    const $containerCategorias = [... $listaDeCategorias]

    $containerCategorias.forEach((categoria) => {
        if(categoria.dataset.category !== categoriaSeleccionada){
            categoria.classList.remove('active')
            return;
        }
        categoria.classList.add('active')
    })
}

// Quinto vamos a crear la funcion para cambiar la categoria seleccionada que mencionamos en el cuarto paso.
// Vamos a guardar en una variable la categoria que tenemos seleccionada
// Luego lo que vamos a hacer es: Cambiarle el colorcito de fondo al boton seleccionado. Para eso vamos a tener que crear una funcion *****Vamos al paso sexto aca****** y pasarle como parametro la caterogia que tenemos seleccionada que fue la que guardamos en una variable.
// Tambien en esta misma funcion vamos a utilizarla para  para crear otra funcion que va a ser la del boton de ver mas. Que lo que tenemos que hacer con esta es que si hay mas productos para mostrar me muestro el boton de ver más y si no los hay, que no me lo muestre. *******vayamos al septimo paso********

const cambiarCatSeleccionada = (e) => {
    const categoriaSeleccionada = e.target.dataset.category;
    botonActivado(categoriaSeleccionada);
    cambiarEstadoBtnVerMas(categoriaSeleccionada);
}

// Cuarto realizamos la logica de los filtros
// Sí, lo que estas clickeando no contiene la clase 'category' no hagas nada,(return)
// Si no vamos a ejecutar una funcion, vamos al paso quinto, luego volvemos.

const aplicarFiltro = (e) => {
    if(!e.target.classList.contains('category')) return;
    cambiarCatSeleccionada(e)
    if(!e.target.dataset.category){
        $containerProductos.innerHTML = "";
        renderTodosLosProductos();
    }else {
        renderTodosLosProductos(0, e.target.dataset.category)
    }
}





// Funcion inicializadora
const init = () => {
    renderTodosLosProductos();
    $containerCategorias.addEventListener('click', aplicarFiltro)

}
init();