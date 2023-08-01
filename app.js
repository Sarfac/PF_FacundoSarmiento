/*
Simulador de tienda virtual en donde se imprimen los articulos guardados de un array llamado inventario en el DOM
el cual se pueden ordenar por mayor y menor precio, alfabeticamente y usar un buscador de nombre de articulos, todo esto modificando el DOM 
y mostrando el resultado en pantalla.
capturando eventos se pushearon articulos a un array llamado carrito en donde se pueden agregar y eliminar los productos agregados y tambien
guardando en el Storage el carrito para que quede guardado el carrito aun refrescando el navegador

modo oscuro

librerias
*/

//Declaracion de Variables arrays
let inventario=[]
let carrito=[]


//Captura de elementon en DOM
let inventarioDom=document.getElementById("inventario")
let buscador =document.getElementById("buscador")
let noCoincide= document.getElementById("buscado")
let domCarrito= document.getElementById("modal-body")
let botonCarrito= document.getElementById("botonCarrito")
let totalCarrito= document.getElementById("totalCarrito")
let selectOrden = document.getElementById("selectOrden")
let botonDarkMode = document.getElementById("botonDarkMode")
let botonLightMode = document.getElementById("botonLightMode")
let btnFinalizarCompra = document.getElementById("btnFinalizarCompra")


//Generacion de clase constructora
class Producto{
    constructor(id,nombre,precio,img){
        this.id=id
        this.nombre=nombre
        this.precio=precio
        this.img=img
        this.cant=1
      }
      //declaracion de funciones para sumas cantidadades en carrito
      sumarUnidad() {
        this.cant=this.cant+1 
        return this.cant
      }
      restarUnidad() {
         this.cant=this.cant-1 
         return this.cant
       }
}

//Declaracion de los objetos
const camiseta1 = new Producto(1,"Angular", 2000, "angular.jpg")
const camiseta2 = new Producto(2,"HTML", 4000, "html.jpg")
const camiseta3 = new Producto(3,"JavaScript", 2500, "js.jpg")
const camiseta4 = new Producto(4,"Bulma", 3000, "bulma.jpg")
const camiseta5 = new Producto(5,"Drupal", 4000, "drupal.jpg")
const camiseta6 = new Producto(6,"Git", 4500, "git.jpg")
const camiseta7 = new Producto(7,"GraphQL", 3000, "graph.jpg")
const camiseta8 = new Producto(8,"NodeJS", 3500, "node.jpg")
const camiseta9 = new Producto(9,"React", 2500, "react.jpg")
const camiseta10 = new Producto(10,"Redux", 2600, "redux.jpg")
const camiseta11 = new Producto(11,"Sass", 2700, "sass.jpg")
const camiseta12 = new Producto(12,"TypeScript", 4000, "ts.jpg")
const camiseta13 = new Producto(13,"Vue JS", 5000, "vue.jpg")
const camiseta14 = new Producto(14,"Word Press", 2500, "wp.jpg")

inventario.push(camiseta1,camiseta2,camiseta3,camiseta4,camiseta5,camiseta6,camiseta7,camiseta8,camiseta9,camiseta10
                  ,camiseta11,camiseta12,camiseta13,camiseta14)
      
                  
//Intento de crear un archivo JSON y comunicarse con esta archivo, no pude finalizarlo
//porque tenia errores, asi que mantengo la version en la que creaba los objetos

/* const cargarInventario = async()=>{
   const res = await fetch("inventario.json")
   const data = await res.json()

   for(let producto of data){
      let camiseta= new Producto(producto.id,producto.nombre,producto.precio,producto.img)
      inventario.push(camiseta)
   }

   console.log(inventario)
   localStorage.setItem("inventario",JSON.stringify(inventario))
   
}
if (localStorage.getItem("inventario")){
   inventario=JSON.parse(localStorage.getItem("inventario"))
}else{
   cargarInventario()
}
*/


//Guardando en el Storage el array inventarrio
if (localStorage.getItem("inventario")){
   inventario=JSON.parse(localStorage.getItem("inventario"))
}else{
   inventario.push(camiseta1,camiseta2,camiseta3,camiseta4,camiseta5,camiseta6,camiseta7,camiseta8,camiseta9,camiseta10
      ,camiseta11,camiseta12,camiseta13,camiseta14)
   localStorage.setItem("inventario",JSON.stringify(inventario))
}


//comprobando que no exisntan productos en el carrito de compras en Storage
if (localStorage.getItem("carro")){
   /* carrito=JSON.parse(localStorage.getItem("carro")) */
   console.log(`Existe`)
   for (let cami of JSON.parse(localStorage.getItem("carro"))){
      let camiStorage = new Producto(cami.id, cami.nombre, cami.precio, cami.img)
      carrito.push(camiStorage)
      console.log(camiStorage)
   }
   console.log(carrito)
   
}else{
   localStorage.setItem("carro", carrito)
   console.log(`No existe`)
}

//declaracion de funcion para mostrar el inventario en el DOM
function mostrarInventario(array){
    inventarioDom.innerHTML=``
    for(let camiseta of array){
        let nuevoProductoDiv=document.createElement("div")
        nuevoProductoDiv.className="col-12 col-md-6 col-lg-4"
        nuevoProductoDiv.innerHTML=`<div id="${camiseta.id}" class="card" style="width: 18rem;">
                                    <img class="card-img-top img-fluid" style="height: 200px;"src="img/${camiseta.img}" alt="${camiseta.titulo}}">
                                    <div class="card-body">
                                    <h3 class="card-title">${camiseta.nombre}</h3>
                                    <p class="">Precio: $ ${camiseta.precio}</p>
                                    <button id="botonCarrito${camiseta.id}" class="btn btn-outline-success">Agregar al carrito</button>
                                    </div>
                                    </div>`
    
        inventarioDom.appendChild(nuevoProductoDiv)
        let botonCarrito=document.getElementById(`botonCarrito${camiseta.id}`)
        botonCarrito.addEventListener("click",()=>{
            agregarCarrito(camiseta)
        })}
}

//llamado a la funcion para imprimir el inventario en el DOM
mostrarInventario(inventario)

//ordenar array del inventario
selectOrden.addEventListener("change", () => {
   console.log(selectOrden.value)
   switch(selectOrden.value){
      case "1":
         ordenarMayorMenor(inventario)
      break
      case "2":
         ordenarMenorMayor(inventario)
      break
      case "3":
         ordenarAlfabeticamenteTitulo(inventario)
      break
      default:
        mostrarInventario(inventario)
      break
   }
}
)

//Metodos de ordenamiento para el inventario
function ordenarMenorMayor(array){
   //copia del array, aplicar sort y no modificar el original
   const menorMayor = [].concat(array)
   console.log(menorMayor)
   //forma ascendente
   menorMayor.sort((a,b) => a.precio - b.precio)
   mostrarInventario(menorMayor)
 }
 
 function ordenarMayorMenor(array){
   const mayorMenor = [].concat(array)
   //forma descendente 
   mayorMenor.sort((a ,b) => b.precio - a.precio)
   mostrarInventario(mayorMenor)
 }
 
 function ordenarAlfabeticamenteTitulo(array){
   const arrayAlfabetico = [].concat(array)
   arrayAlfabetico.sort( (a,b) =>{
      if (a.nombre > b.nombre) {
         return 1
       }
       if (a.nombre < b.nombre) {
         return -1
       }
       // a must be equal to b
       return 0
   })
   mostrarInventario(arrayAlfabetico)
 }


//funcion del input de busqueda
function busqueda(valor, array){
   let buscado=array.filter((dato)=>dato.nombre.toLowerCase().includes(valor.toLowerCase()))
   if(buscado.length == 0){
      console.log(`No se encuantra`)
      mostrarInventario(buscado)
      noCoincide.innerHTML=`<h2>No Se encontraron resultados similares</h2>`
   }else{
      noCoincide.innerHTML=``
      mostrarInventario(buscado)
   }
}

// captura del evento del buscador
buscador.addEventListener("input",()=>{
   console.log(buscador.value)
   busqueda(buscador.value, inventario)
})

//
function agregarCarrito(producto){
   let elemtAgregado=carrito.find((elem)=>elem.id==producto.id) 

   if(elemtAgregado==undefined){
      carrito.push(producto)
      console.log(carrito)
      Toastify({
         text: `Se agrego al carrito`,
         position: "center",
         duration: 2000
         }).showToast();
   }
   /* else{
      Swal.fire({
         icon: 'error',
         title: `El producto ${producto.nombre}  ya esta en carrito`,
       })
   } */
   localStorage.setItem("carro", JSON.stringify(carrito))
}


//declaracion de la funcion para imprimir el carrito cuando de apreta en boton
function imprimirCarrito(array){
   domCarrito.innerHTML=``
   array.forEach(element => {
      domCarrito.innerHTML+=`<div class="card" id="card${element.id}" style="width: 18rem;">
                              <img src="img/${element.img}" class="card-img-top" alt="${element.img}">
                              <div class="card-body">
                              <h5 class="card-title">${element.nombre}</h5>
                              <p class="card-text">Precio: ${element.precio}</p>
                              <p>Total de unidades: ${element.cant}</p>
                              <button type="button" class="btn btn-success" id="btnSumar${element.id}">+1</button>
                              <button type="button" class="btn btn-danger" id="btnRestar${element.id}">-1</button>
                              <a href="#" class="btn btn-primary" id="btneliminar${element.id}">Eliminar</a>
                              </div>
                           </div>`
   })

   array.forEach((cardCarrito)=>{
      // evento boton agregar unidad
      document.getElementById(`btnSumar${cardCarrito.id}`).addEventListener("click",()=>{
         cardCarrito.sumarUnidad()
         imprimirCarrito(array)
         calcTotalCarrito(array)
         localStorage.setItem("carro",JSON.stringify(array))
         
      })
      //evento boton restar unidad
      document.getElementById(`btnRestar${cardCarrito.id}`).addEventListener("click",()=>{
         cardCarrito.restarUnidad()
         imprimirCarrito(array)
         calcTotalCarrito(array)
         
         if (cardCarrito.cant==0){
            let card =document.getElementById(`card${cardCarrito.id}`)
            card.remove()
            let cardEliminar= array.find((producto)=>producto.id==cardCarrito.id)
            let posicion=array.indexOf(cardEliminar)
            array.splice(posicion,1)

         localStorage.setItem("carro",JSON.stringify(array))
         calcTotalCarrito(carrito)
         }
      })
      //evento boton eliminar del carrito
      document.getElementById(`btneliminar${cardCarrito.id}`).addEventListener("click",()=>{
         let card =document.getElementById(`card${cardCarrito.id}`)
         card.remove()
         let cardEliminar= array.find((producto)=>producto.id==cardCarrito.id)
         let posicion=array.indexOf(cardEliminar)
         array.splice(posicion,1)

         localStorage.setItem("carro",JSON.stringify(array))
         calcTotalCarrito(carrito)
      })
      
   })
   ;
}
//llamada a la funcion de imprimir carrito apretando el boton 
botonCarrito.addEventListener("click",()=>{
   imprimirCarrito(carrito)
   calcTotalCarrito(carrito)
})

function calcTotalCarrito(array){
   let total=0
   totalCarrito.innerHTML=``
   array.forEach((elemen)=>{
      total=total+(elemen.precio * elemen.cant)
    
   })
   totalCarrito.innerHTML+=`<h3>Total de compra: $ ${total}</h3>`
}

//evento finalizar compra
btnFinalizarCompra.addEventListener("click",()=>{
   Swal.fire(`Muchas gracias por su compra 
            Pronto nos podremos en contacto`)
})

 // implementando darkmode y guardado en el storage para la proxima visita: 
//consulta localStorage
let modoOscuro = localStorage.getItem("modoOscuro")
console.log(modoOscuro)

if(modoOscuro == "true"){
   document.body.classList.add("darkMode")
}

botonDarkMode.addEventListener("click", ()=>{
   //agregar clase de modo oscuro
   document.body.classList.add("darkMode")
   localStorage.setItem("modoOscuro", true)
})

botonLightMode.addEventListener("click", ()=>{
   //elimina class darkMode
   document.body.classList.remove("darkMode")
   localStorage.setItem("modoOscuro", false)
})
 