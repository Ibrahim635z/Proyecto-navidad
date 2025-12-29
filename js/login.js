



const valida= async (objetoUsuario) => {
    
    const datosUsers= await fetch("http://localhost:3008/users").then(res => res.json());

    const usuarioEncontrado=datosUsers.find(usuario => usuario.email===objetoUsuario.user && usuario.password===objetoUsuario.pass);

    if (usuarioEncontrado) {

        const objUsuario={
            id: usuarioEncontrado.id,
            user: usuarioEncontrado.email,
            password: usuarioEncontrado.password
        }

        sessionStorage.setItem("user",JSON.stringify(objUsuario));
        window.location.href="index.html";
        console.log(objUsuario);
        return objUsuario;
    }else{
        alert("Usuario no encontrado");
        return null;
    }

}



const main = () => {

    document.getElementById("btn").addEventListener("click",(event) =>{

        event.preventDefault();
        
        const user=document.getElementById("email").value;
        const pass=document.getElementById("pass").value;
        const objetoUsuario={user: user,pass: pass}
        valida(objetoUsuario);

    })

}

document.addEventListener("DOMContentLoaded",main);