const compruebaUsuario= () => {

    const usuario=sessionStorage.getItem("user");

    if (window.location.pathname.includes("login.html")) {
        return;
    }

    if(!usuario){
        window.location.href="login.html";
    }
}


const cargarCampos= async () => {
    const campos= await fetch("http://localhost:3008/campos").then(res => res.json());
    console.log(campos);
    if (campos) {
        creaCards(campos);
    }else{
        alert("error al cargar los campos");
    }
}


const creaCard= (campo) => {

    const divCampo=document.createElement("div");
    const nombre=document.createElement("h2");
    const imagen=document.createElement("img");
    const categoria=document.createElement("p");
    const precio=document.createElement("p");
    const descripcion=document.createElement("p");
    const ubicacion=document.createElement("p");
    const medidas=document.createElement("p");
    const alquilar=document.createElement("button")

    divCampo.className="cardCampo";


    nombre.textContent=campo.nombre;
    imagen.src=campo.imagen;
    categoria.innerHTML=`<strong> Categoria: </strong> ${campo.categoria}`;
    precio.innerHTML=`<strong> Precio: </strong> ${campo.precio}`;
    descripcion.innerHTML=`<strong> Descripcion: </strong> ${campo.descripcion}`;
    ubicacion.innerHTML=`<strong> Ubicación: </strong> ${campo.ubicacion}`;
    medidas.innerHTML=`<strong> Medidas: </strong> Ancho: ${campo.medidas.ancho} Largo: ${campo.medidas.largo} (${campo.medidas.unidad})`;
   // medidas.textContent="Ancho:" + campo.medidas.ancho +" Largo:"+ campo.medidas.largo + " ("+ campo.medidas.unidad+")";
    alquilar.textContent="Alquilar";

    alquilar.className="btn__alquilar";

    divCampo.appendChild(nombre);
    divCampo.appendChild(imagen);
    divCampo.appendChild(categoria);
    divCampo.appendChild(precio);
    divCampo.appendChild(descripcion);
    divCampo.appendChild(ubicacion);
    divCampo.appendChild(medidas);
    divCampo.appendChild(alquilar);

    return divCampo;


}

const creaCards= (campos) => {
    const containerCampos=document.getElementById("container");
    campos.forEach(element => {
        containerCampos.appendChild(creaCard(element));
    });

    return containerCampos;
}


const cargarPerfil= () => {
    
    document.getElementById("seccion1").remove();
    document.getElementById("container").remove();

    cardPerfil();

}

const cardPerfil= () => {
    const user=JSON.parse(sessionStorage.getItem("user")); // session storage es una cadena de texto debo usar JSON.parse para tratarla como un array de objetos


    const container=document.createElement("div");
    const divPerfil=document.createElement("div");
    const idUser=document.createElement("p");
    const nombre=document.createElement("p");
    const imgUser=document.createElement("img");
    const titulo=document.createElement("h2");


    idUser.innerHTML=`<strong>ID de usuario: </strong> ${user.id}`;
    nombre.innerHTML=`<strong>Nombre: </strong> ${user.user}`;
    imgUser.src="./images/imagen.png";
    titulo.textContent="Perfil de Usuario";

    divPerfil.appendChild(titulo);
    divPerfil.appendChild(imgUser);
    divPerfil.appendChild(idUser);
    divPerfil.appendChild(nombre);
    

    divPerfil.className="div__perfil";
    container.className="container__perfil"

    document.body.appendChild(container);
    container.appendChild(divPerfil);

}


const main = () =>  {

    compruebaUsuario();
    cargarCampos();

    document.getElementById("perfil").addEventListener("click",() =>{
        cargarPerfil();
    });

    document.getElementById("inicio").addEventListener("click",() =>{
        window.location.href="index.html";
    });
    

}

document.addEventListener("DOMContentLoaded",main);