let carrito = []
const contenedorMotos = document.getElementById('contenedorMotos')
const carritoItem = document.getElementById('carritoItem')
const precioTotal = document.getElementById('precioTotal')
const pagar = document.getElementById('pagarCarrito')

document.addEventListener('DOMContentLoaded', () => {
    if (localStorage.getItem('carrito')) {
        carrito = JSON.parse(localStorage.getItem('carrito'))
        actualizarCarrito()
        pagarCarrito()
        fetchData()
    }
})


//Funcíon para tomar los datos del archivo .json
const fetchData = async () => {
    const resp = await fetch('data.json')
    const data = await resp.json()
    // console.log(data)
    pintarData(data)
}

//Función para mostrar los productos de forma dinámica en el DOM
const pintarData = (data) => {
    data.forEach(producto => {
        const div = document.createElement('div')
        div.classList.add('moto')
        div.innerHTML = `
                            <img class="itemImagen" src="${producto.imagen}" alt="">
                            <h2 class="itemTitulo">${producto.marca}</h2>
                            <h3 class="itemModelo">${producto.modelo}</h3>
                            <p class="itemPrecio">$${producto.precio}</p>
                            <button id="boton${producto.id}" class="itemBoton">COMPRAR</button>
                            `
        
        contenedorMotos.appendChild(div)

        const boton = document.getElementById(`boton${producto.id}`)
        boton.addEventListener('click', () => {
        agregarAlCarrito(producto.id)
})
})
}

//Función para agregar elementos al carrito
const agregarAlCarrito = (motoId) => {
    const repetido = carrito.some (prod => prod.id === motoId)
    if (repetido) {
        const prod = carrito.map(prod => {
            if (prod.id === motoId) {
                prod.cantidad++

            }
        } )
    } else {
        const item = motos.find((moto)=> moto.id === motoId)
        carrito.push(item)
    }
    
    actualizarCarrito()
    // console.log(carrito)
}

//Funcíon para borrar elementos del carrito
const borrarDelCarrito = (prodId) => {
    const item = carrito.find((prod)=>prod.id === prodId)
    const indice = carrito.indexOf(item)
    carrito.splice(indice, 1)
    actualizarCarrito()
}

//Funcíon que actualiza el carrito cada vez que se realice algo en él
const actualizarCarrito = () => {
    carritoItem.innerHTML = ""
    carrito.forEach((prod) => {
        const div = document.createElement('div')
        div.classList.add('itemEnCarrito')
        div.innerHTML = `<img class="itemImg" src="${prod.imagen}" alt="">
                        <p class="itemTitulo">${prod.marca}</p>
                        <p class="itemModelo">${prod.modelo}</p>
                        <p class="itemPrecio">${prod.precio}</p>
                        <p class="itemCantidad">${prod.cantidad}</p>
                        <button onclick= "borrarDelCarrito(${prod.id})" class="botonBorrar">X</button>`
    carritoItem.appendChild(div)

    localStorage.setItem('carrito', JSON.stringify(carrito))
    })
    precioTotal.innerText = "$" + carrito.reduce((acc, prod) => acc + prod.precio*prod.cantidad, 0)
}

//Función para que al apretar el boton comprar salgan las alertas correspondientes
const pagarCarrito = () => {
    pagar.addEventListener('click', () => {
        if (carrito.length != 0) {
            Swal.fire({
            icon: 'success',
            title: '¡Gracias por su compra!',
            showConfirmButton: false,
            timer: 1500
        })
        carrito.length = 0
        actualizarCarrito()
        } else {
            Swal.fire ({
                icon: 'error',
                title: '¡Su carrito de compras esta vacio!',
                showConfirmButton: false,
                timer: 1500
            })
        }
    })
    
}
