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

    divCampo.className="cardCampo";


    nombre.textContent=campo.nombre;
    imagen.src=campo.imagen;
    categoria.textContent=campo.categoria;
    precio.textContent=campo.precio;
    descripcion.textContent=campo.descripcion;
    ubicacion.textContent=campo.ubicacion;
    medidas.textContent="Ancho:" + campo.medidas.ancho +" Largo:"+ campo.medidas.largo + " ("+ campo.medidas.unidad+")";


    divCampo.appendChild(nombre);
    divCampo.appendChild(imagen);
    divCampo.appendChild(categoria);
    divCampo.appendChild(precio);
    divCampo.appendChild(descripcion);
    divCampo.appendChild(ubicacion);
    divCampo.appendChild(medidas);

    return divCampo;


}

const creaCards= (campos) => {
    const containerCampos=document.getElementById("container");
    campos.forEach(element => {
        containerCampos.appendChild(creaCard(element));
    });

    return containerCampos;
}

const main = () =>  {

    compruebaUsuario();
    cargarCampos();

}

document.addEventListener("DOMContentLoaded",main);