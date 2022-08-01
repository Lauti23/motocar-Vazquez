
const motos = [
    {id:1, marca: "Honda", modelo: "CRF 300L", precio: 659375, imagen: "assets/imgs/honda/crf300l.jpg"},
    {id:2, marca: "Honda", modelo: "CRF 250R", precio: 1102960, imagen:"assets/imgs/honda/CRF250R.jpg"},
    {id:3, marca: "Honda", modelo: "CRF 450R", precio: 1162900, imagen: "assets/imgs/honda/CRF450R.jpg"},
    {id:4, marca: "Kawasaki", modelo: "KLX 250L", precio: 548482, imagen: "assets/imgs/kawasaki/klx250l.jpg"},
    {id:5, marca: "Kawasaki", modelo: "KX 250F", precio: 1060990, imagen: "assets/imgs/kawasaki/kx250f.jpg"},
    {id:6, marca: "Kawasaki", modelo: "KX 450F", precio: 1126936, imagen: "assets/imgs/kawasaki/kx450f.jpg"},
    {id:7, marca: "KTM", modelo: "EXC - F350", precio: 1192380, imagen: "assets/imgs/ktm/exc-f350.jpg"},
    {id:8, marca: "KTM", modelo: "SX 125", precio: 1039420, imagen: "assets/imgs/ktm/sx125.jpg"},
    {id:9, marca: "KTM", modelo: "SX 450", precio: 1322352, imagen: "assets/imgs/ktm/sx450.jpg"},
    {id:10, marca: "Suzuki", modelo: "RM-Z 250", precio: 1001055, imagen: "assets/imgs/suzuki/rm-z250.jpg"},
    {id:11, marca: "Suzuki", modelo: "RM-Z 450", precio: 1018670, imagen: "assets/imgs/suzuki/rm-z450.jpg"},
    {id:12, marca: "Suzuki", modelo: "RM-Z 450 2017", precio: 959095, imagen: "assets/imgs/suzuki/rm-z4502017.jpg"},
    {id:13, marca: "Yamaha", modelo: "WR 450", precio: 1198870, imagen: "assets/imgs/yamaha/wr450f.jpg"},
    {id:14, marca: "Yamaha", modelo: "YZ 250", precio: 995060, imagen: "assets/imgs/yamaha/yz250.jpg"},
    {id:15, marca: "Yamaha", modelo: "YZ 450", precio: 1155095, imagen: "assets/imgs/yamaha/yz450f.jpg"}
]
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
    }
})



motos.forEach(producto => {
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

const agregarAlCarrito = (motoId) => {
    const item = motos.find((moto)=> moto.id === motoId)
    carrito.push(item)
    actualizarCarrito()
    // console.log(carrito)
}

const borrarDelCarrito = (prodId) => {
    const item = carrito.find((prod)=>prod.id === prodId)
    const indice = carrito.indexOf(item)
    carrito.splice(indice, 1)
    actualizarCarrito()
}

const actualizarCarrito = () => {
    carritoItem.innerHTML = ""
    carrito.forEach((prod) => {
        const div = document.createElement('div')
        div.classList.add('itemEnCarrito')
        div.innerHTML = `<img class="itemImg" src="${prod.imagen}" alt="">
                        <p class="itemTitulo">${prod.marca}</p>
                        <p class="itemModelo">${prod.modelo}</p>
                        <p class="itemPrecio">${prod.precio}</p>
                        <button onclick= "borrarDelCarrito(${prod.id})" class="botonBorrar">X</button>`
    carritoItem.appendChild(div)

    localStorage.setItem('carrito', JSON.stringify(carrito))
    })
    precioTotal.innerText = "$" + carrito.reduce((acc, prod) => acc + prod.precio, 0)
}

const pagarCarrito = () => {
    pagar.addEventListener('click', () => {
        Swal.fire({
            icon: 'success',
            title: '¡Gracias por su compra!',
            showConfirmButton: false,
            timer: 1500
        })
        carrito.length = 0
        actualizarCarrito()
    })
}
