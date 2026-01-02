export class Carrito {
    constructor() {
        // 1. Intentamos recuperar el carrito de la sesión actual
        // Si no existe, iniciamos un array vacío
        this.articulos = JSON.parse(localStorage.getItem('carrito')) || [];
    }

    add(elemento) {
        // 2. Buscamos si el producto ya existe en el array (por nombre o id)
        const articuloExistente = this.articulos.find(art => art.producto.nombre === elemento.nombre);

        if (articuloExistente) {
            // Si existe, sumamos 1 a la cantidad
            articuloExistente.cantidad++;
        } else {
            // Si no existe, lo agregamos con cantidad base 1
            this.articulos.push({
                producto: elemento,
                cantidad: 1
            });
        }

        // 3. ¡IMPORTANTE! Guardamos en sessionStorage inmediatamente
        this.guardarCarrito();

        alert(`¡${elemento.nombre} añadido! Tienes ${this.contarArticulos()} productos.`);
    }

    // Método auxiliar para guardar en el navegador
    guardarCarrito() {
        localStorage.setItem('carrito', JSON.stringify(this.articulos));
    }

    // Cuenta el total de items (ej: 2 pelotas + 1 camiseta = 3 items)
    contarArticulos() {
        return this.articulos.reduce((total, art) => total + art.cantidad, 0);
    }

    // Calcula el dinero total
    calcularTotal() {
        return this.articulos.reduce((total, item) => {
            // Limpiamos el precio si viene como texto ("100€" -> 100)
            const precioNum = typeof item.producto.precio === 'string'
                ? parseFloat(item.producto.precio.replace(/[^\d.-]/g, ''))
                : item.producto.precio;

            return total + (precioNum * item.cantidad);
        }, 0);
    }

    eliminar(elemento) {
        this.articulos = this.articulos.filter(art => art.producto.nombre !== elemento.nombre);
        this.guardarCarrito();
        this.dibujarCarrito();
        alert(`¡${elemento.nombre} eliminado! Tienes ${this.contarArticulos()} productos.`);
    }

    restar(elemento) {
        const articuloExistente = this.articulos.find(art => art.producto.nombre === elemento.nombre);
        if (articuloExistente) {
            articuloExistente.cantidad--;
            if (articuloExistente.cantidad <= 0) {
                this.eliminar(elemento);
            } else {
                this.guardarCarrito();
                this.dibujarCarrito();
                alert(`¡${elemento.nombre} restado! Tienes ${this.contarArticulos()} productos.`);
            }
        }
    }

    sumar(elemento) {
        const articuloExistente = this.articulos.find(art => art.producto.nombre === elemento.nombre);
        if (articuloExistente) {
            articuloExistente.cantidad++;
            this.guardarCarrito();
            this.dibujarCarrito();
            alert(`¡${elemento.nombre} sumado! Tienes ${this.contarArticulos()} productos.`);
        }
    }

    dibujarCarrito() {
        const fragment = document.createDocumentFragment();
        const contenedor = document.createElement("div");
        contenedor.className = "vista-carrito";

        // Título y Botón para cerrar o vaciar
        contenedor.innerHTML = "<h2>Tu Carrito</h2>";

        if (this.articulos.length === 0) {
            contenedor.innerHTML += "<p>El carrito está vacío.</p>";
        } else {
            // Crear Tabla
            const tabla = document.createElement("table");
            tabla.style.width = "100%";
            tabla.style.textAlign = "left";

            // Cabecera
            tabla.innerHTML = `
                <thead style="border-bottom: 1px solid #ccc;">
                    <tr>
                        <th>Producto</th>
                        <th>Precio Unit.</th>
                        <th>Cant.</th>
                        <th>Subtotal</th>
                    </tr>
                </thead>
            `;

            const tbody = document.createElement("tbody");

            this.articulos.forEach(item => {
                const fila = document.createElement("tr");
                fila.className = "carrito__item";

                // Conversión de precio segura
                const precioNum = typeof item.producto.precio === 'string'
                    ? parseFloat(item.producto.precio.replace(/[^\d.-]/g, ''))
                    : item.producto.precio;

                const subtotal = precioNum * item.cantidad;

                fila.innerHTML = `
                    <td class="carrito__item-nombre">${item.producto.nombre}</td>
                    <td class="carrito__item-precio">${precioNum}</td>
                    <td>
                        <button class="btn__restar" data-nombre="${item.producto.nombre}">-</button>
                        ${item.cantidad}
                        <button class="btn__sumar" data-nombre="${item.producto.nombre}">+</button>
                    </td>
                    <td><strong>${subtotal.toFixed(2)}</strong></td>
                    <td><button class="btn__eliminar" data-nombre="${item.producto.nombre}">Eliminar</button></td>
                `;
                tbody.appendChild(fila);
            });

            tabla.appendChild(tbody);
            contenedor.appendChild(tabla);

            // Mostrar el Total Final
            // Delegación de eventos para la tabla
            tabla.addEventListener('click', (e) => {
                if (e.target.classList.contains('btn__sumar')) {
                    const nombre = e.target.dataset.nombre;
                    const item = this.articulos.find(art => art.producto.nombre === nombre);
                    if (item) this.sumar(item.producto);
                }
                if (e.target.classList.contains('btn__restar')) {
                    const nombre = e.target.dataset.nombre;
                    const item = this.articulos.find(art => art.producto.nombre === nombre);
                    if (item) this.restar(item.producto);
                }
                if (e.target.classList.contains('btn__eliminar')) {
                    const nombre = e.target.dataset.nombre;
                    const item = this.articulos.find(art => art.producto.nombre === nombre);
                    if (item) this.eliminar(item.producto);
                }

                // Re-renderizado manual
                const containerEnDOM = document.querySelector(".container__carrito");
                if (containerEnDOM) {
                    containerEnDOM.innerHTML = "";
                    const nuevoContenido = this.dibujarCarrito();
                    containerEnDOM.appendChild(nuevoContenido);
                }
            });

            // Botón para vaciar carrito
            const btnVaciar = document.createElement("button");
            btnVaciar.textContent = "Vaciar Carrito";
            btnVaciar.className = "btn__vaciar";
            btnVaciar.onclick = () => {
                this.articulos = [];
                this.guardarCarrito();
                location.reload();
            };
            contenedor.appendChild(btnVaciar);

            // Botón Finalizar Pedido (EmailJS)
            const btnFinalizar = document.createElement("button");
            btnFinalizar.textContent = "Finalizar Pedido";
            btnFinalizar.className = "btn__finalizar";

            btnFinalizar.onclick = () => {
                // 1. Obtenemos los datos del usuario actual desde sessionStorage
                const datosUsuario = JSON.parse(sessionStorage.getItem("user"));

                // Verificamos que existan los datos para evitar errores
                if (!datosUsuario || !datosUsuario.email) {
                    alert("Error: No se encontró el email del usuario. Por favor, inicia sesión de nuevo.");
                    return;
                }

                // 2. Preparamos los parámetros para EmailJS
                const params = {
                    email_cliente: datosUsuario.email,
                    message: this.articulos.map(a => `${a.producto.nombre} (x${a.cantidad})`).join(", "),
                    total: this.calcularTotal().toFixed(2)
                };

                if (typeof emailjs !== 'undefined') {
                    emailjs.send('service_vra1lwg', 'template_mope6va', params)
                        .then(() => {
                            alert(`¡Pedido enviado con éxito a ${datosUsuario.email}!`);
                            this.articulos = [];
                            this.guardarCarrito();
                            location.reload();
                        }, (error) => {
                            alert('Fallo al enviar el pedido: ' + JSON.stringify(error));
                        });
                } else {
                    alert("Error: La librería EmailJS no está cargada.");
                }
            };
            contenedor.appendChild(btnFinalizar);
        }

        fragment.appendChild(contenedor);
        return fragment;
    }
}