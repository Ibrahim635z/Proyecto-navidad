import { Carrito } from "./carrito.js";

// Variables Globales
let todosLosCampos = [];
let paginaActual = 1;
const elementosPorPagina = 8;
let cargando = false;
const miCarrito = new Carrito();

const compruebaUsuario = () => {

    const usuario = sessionStorage.getItem("user");

    if (window.location.pathname.includes("login.html")) {
        return;
    }

    if (!usuario) {
        window.location.href = "login.html";
    }
}


const cargarCampos = async () => {
    const campos = await fetch("http://localhost:3008/campos").then(res => res.json());
    console.log(campos);
    todosLosCampos = campos;
    if (campos) {
        creaCards(campos);
    } else {
        alert("error al cargar los campos");
    }
}

// const pintarPagina = (pagina) => {
//     const inicio = (pagina - 1) * elementosPorPagina;
//     const fin = inicio + elementosPorPagina;
//     const camposAPintar = todosLosCampos.slice(inicio, fin);

//     if (camposAPintar.length > 0) {
//         creaCards(camposAPintar);
//     } else {
//         alert("No hay más campos");
//         window.removeEventListener('scroll', handleScroll);
//     }
//     cargando = false;
//     document.getElementById("loader").style.display = "none";
// }

// // 3. Lógica del Scroll
// const handleScroll = () => {
//     const { scrollTop, scrollHeight, clientHeight } = document.documentElement;

//     // Si estamos cerca del final (200px antes) y no estamos cargando
//     if (scrollTop + clientHeight >= scrollHeight - 200 && !cargando) {
//         cargando = true;
//         document.getElementById("loader").style.display = "block"; // Mostrar loader

//         // Timeout para simular carga y que se vea el efecto (opcional si es local)
//         setTimeout(() => {
//             paginaActual++;
//             pintarPagina(paginaActual);
//         }, 500);
//     }
// };

// const activarScrollInfinito = () => {
//     window.addEventListener('scroll', handleScroll);
// }


const creaCard = (campo) => {

    const divCampo = document.createElement("div");
    const nombre = document.createElement("h2");
    const imagen = document.createElement("img");
    const categoria = document.createElement("p");
    const precio = document.createElement("p");
    const descripcion = document.createElement("p");
    const ubicacion = document.createElement("p");
    const medidas = document.createElement("p");
    const alquilar = document.createElement("button");
    const detalles = document.createElement("button");

    divCampo.className = "cardCampo";


    nombre.textContent = campo.nombre;
    imagen.src = campo.imagen;
    categoria.innerHTML = `<strong> Categoria: </strong> ${campo.categoria}`;
    precio.innerHTML = `<strong> Precio: </strong> ${campo.precio}`;

    // medidas.textContent="Ancho:" + campo.medidas.ancho +" Largo:"+ campo.medidas.largo + " ("+ campo.medidas.unidad+")";

    alquilar.textContent = "Alquilar";
    alquilar.className = "btn__alquilar";

    alquilar.addEventListener("click", () => {
        miCarrito.add(campo);
    });

    detalles.textContent = "Detalles";
    detalles.className = "btn__detalles";

    detalles.addEventListener("click", () => {
        descripcion.innerHTML = `<strong> Descripcion: </strong> ${campo.descripcion}`;
        ubicacion.innerHTML = `<strong> Ubicación: </strong> ${campo.ubicacion}`;
        medidas.innerHTML = `<strong> Medidas: </strong> Ancho: ${campo.medidas.ancho} Largo: ${campo.medidas.largo} (${campo.medidas.unidad})`;
    });

    divCampo.appendChild(nombre);
    divCampo.appendChild(imagen);
    divCampo.appendChild(categoria);
    divCampo.appendChild(precio);
    divCampo.appendChild(descripcion);
    divCampo.appendChild(ubicacion);
    divCampo.appendChild(medidas);
    divCampo.appendChild(alquilar);
    divCampo.appendChild(detalles);

    return divCampo;


}

const creaCards = (campos) => {
    const containerCampos = document.getElementById("container");
    campos.forEach(element => {
        containerCampos.appendChild(creaCard(element));
    });

    return containerCampos;
}


const cargarPerfil = () => {

    limpiarPantalla();
    cardPerfil();

}

const limpiarPantalla = () => {
    const seccion1 = document.getElementById("seccion1");
    const container = document.getElementById("container");
    const containerPerfil = document.querySelector(".container__perfil"); // Por si ya existe
    const containerCarrito = document.querySelector(".container__carrito"); // Por si ya existe
    const galeria = document.querySelector(".galeria__imagenes"); // Por si existe

    if (seccion1) seccion1.remove();
    if (container) container.innerHTML = ""; // Es mejor vaciarlo que borrarlo si quieres reutilizar el ID
    if (containerPerfil) containerPerfil.remove();
    if (containerCarrito) containerCarrito.remove();
    if (galeria) galeria.remove();
}

const cardPerfil = () => {
    const user = JSON.parse(sessionStorage.getItem("user")); // session storage es una cadena de texto debo usar JSON.parse para tratarla como un array de objetos


    const container = document.createElement("div");
    const divPerfil = document.createElement("div");
    const idUser = document.createElement("p");
    const nombre = document.createElement("p");
    const imgUser = document.createElement("img");
    const titulo = document.createElement("h2");


    idUser.innerHTML = `<strong>ID de usuario: </strong> ${user.id}`;
    nombre.innerHTML = `<strong>Nombre: </strong> ${user.user}`;
    imgUser.src = "./images/imagen.png";
    titulo.textContent = "Perfil de Usuario";

    divPerfil.appendChild(titulo);
    divPerfil.appendChild(imgUser);
    divPerfil.appendChild(idUser);
    divPerfil.appendChild(nombre);


    divPerfil.className = "div__perfil";
    container.className = "container__perfil"

    document.body.appendChild(container);
    container.appendChild(divPerfil);

}


const mostrarCarrito = () => {
    limpiarPantalla(); // Quitamos lo que haya en pantalla

    const container = document.createElement("div");
    container.className = "container__carrito";

    const titulo = document.createElement("h2");
    titulo.textContent = "Tu Carrito de Compras";
    container.appendChild(titulo);

    // Llamamos al método de la clase que nos devuelve el fragmento HTML
    const contenidoCarrito = miCarrito.dibujarCarrito();
    container.appendChild(contenidoCarrito);

    document.body.appendChild(container);
}


const mostrarSobreNosotros = () => {
    limpiarPantalla();

    const galeria = document.createElement("div");
    const img1 = document.createElement("img");
    const img2 = document.createElement("img");
    const img3 = document.createElement("img");
    const img4 = document.createElement("img");
    const img5 = document.createElement("img");


    galeria.className = "galeria__imagenes";

    img1.src = "./images/imagen.png";
    img2.src = "./images/imagen.png";
    img3.src = "./images/imagen.png";
    img4.src = "./images/imagen.png";
    img5.src = "./images/imagen.png";

    galeria.appendChild(img1);
    galeria.appendChild(img2);
    galeria.appendChild(img3);
    galeria.appendChild(img4);
    galeria.appendChild(img5);

    document.body.appendChild(galeria);

}

const filtroCategoria = () => {
    const filtro = document.getElementById("filtro-categoria");
    const valor = filtro.value;
    return valor;
}

const cargarCamposFiltrados = async () => {

    container.innerHTML = "";
    const valor = filtroCategoria();
    if (valor === "todos") {
        cargarCampos();
    } else {
        const camposFiltrados = todosLosCampos.filter(campo => campo.categoria === valor);
        creaCards(camposFiltrados);
    }
}

const main = () => {

    compruebaUsuario();
    cargarCampos();

    document.getElementById("perfil").addEventListener("click", () => {
        cargarPerfil();
    });

    document.getElementById("inicio").addEventListener("click", () => {
        window.location.href = "index.html";
    });

    document.getElementById("carrito").addEventListener("click", () => {
        mostrarCarrito();
    });

    document.getElementById("sobre__nosotros").addEventListener("click", () => {
        mostrarSobreNosotros();
    })

    document.getElementById("cerrar__sesion").addEventListener("click", () => {
        sessionStorage.clear();
        window.location.href = "login.html";
    })

    document.getElementById("filtro-categoria").addEventListener("change", () => {
        cargarCamposFiltrados();
    })
}

document.addEventListener("DOMContentLoaded", main);