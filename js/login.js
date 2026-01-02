



const valida= async (objetoUsuario) => {
    
    const datosUsers= await fetch("http://localhost:3008/users").then(res => res.json());

    const usuarioEncontrado=datosUsers.find(usuario => usuario.email===objetoUsuario.email && usuario.password===objetoUsuario.password);

    if (usuarioEncontrado) {

        const objUsuario={
            id: usuarioEncontrado.id,
            email: usuarioEncontrado.email,
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
        
        // Cloudflare crea automáticamente un input oculto con este nombre
        const turnstileResponse = document.querySelector('[name="cf-turnstile-response"]').value;

        // 2. Verificar si el usuario superó el captcha
        if (!turnstileResponse) {
            alert("Por favor, completa la verificación de seguridad (Captcha).");
            return; // Bloqueamos el inicio de sesión
        }
        const email=document.getElementById("email").value;
        const pass=document.getElementById("pass").value;
        const objetoUsuario={email: email,password: pass}
        valida(objetoUsuario);

    })

}

document.addEventListener("DOMContentLoaded",main);