
const inventario=[];
const carrito=[]

let inventarioDom=document.getElementById("inventario")

class Producto{
    constructor(id,nombre,precio,img){
        this.id=id
        this.nombre=nombre
        this.precio=precio
        this.img=img
    }
}

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

inventario.push(camiseta1,camiseta2,camiseta3,camiseta4,camiseta5,camiseta6,camiseta7,
                camiseta8,camiseta9,camiseta10,camiseta11,camiseta12,camiseta13,camiseta14)

console.log(inventario)


function agregarCarrito(producto){
    carrito.push(producto)
    console.log(carrito)
}

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
        })

        }

}

mostrarInventario(inventario)

//ordenar array del inventario
let selectOrden = document.getElementById("selectOrden")

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
      if (a.titulo > b.titulo) {
         return 1
       }
       if (a.titulo < b.titulo) {
         return -1
       }
       // a must be equal to b
       return 0
   })
   mostrarInventario(arrayAlfabetico)
 }

 //DARKMODE: 
let botonDarkMode = document.getElementById("botonDarkMode")
let botonLightMode = document.getElementById("botonLightMode")

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
 