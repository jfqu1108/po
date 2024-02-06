const sectionSeleccionarAtaque = document.getElementById('seleccionar-ataque')
const sectionReiniciar = document.getElementById('reiniciar')
const botonMascotaJugador = document.getElementById('boton-mascota')
const botonReiniciar = document.getElementById('boton-reiniciar')
sectionReiniciar.style.display = 'none'

const contenedorAtaques = document.getElementById('contenedorAtaques')

const sectionSeleccionarMascota = document.getElementById('seleccionar-mascota')


const spanMascotaJugador = document.getElementById('mascota-jugador')

const spanMascotaEnemigo = document.getElementById('mascota-enemigo')

const spanVidasJugador = document.getElementById('vidas-jugador')
const spanVidasEnemigo = document.getElementById('vidas-enemigo')

const sectionMensajes = document.getElementById('resultado')
const ataquesDelJugador = document.getElementById('ataques-del-jugador')

const ataquesDelEnemigo = document.getElementById('ataques-del-enemigo')

const contenedorTarjetas = document.getElementById('contenedorTarjetas') // es el que va contener la informacion de las tarjetas que estaban en el html 


let pokemones = []  //arreglo
let ataqueJugador = []
let ataqueEnemigo = []
let opcionDePokemones
let inputFlareon
let inputLapras
let inputHaunter
let mascotaJugador
let ataquesPokemon
let ataquesPokemonEnemigo
let botonFuego
let botonAgua
let botonTierra
let botones = []
let vidasJugador = 3
let vidasEnemigo = 3

//objeto instancia se contruye con una clase y un cosntructor y vienven desde la clase

class Pokemon { // la clase es el esquema para cada objeto
    constructor(nombre, foto, vida) { //constuctor lo que va a contener el objeto sepuede añadir mas cosas
        this.nombre = nombre
        this.foto = foto
        this.vida = vida
        this.ataques = []
    }
}

let flareon = new Pokemon('Flareon', './img/flareon.png', 3) //objeto 
let lapras = new Pokemon('Lapras', './img/lapras.png', 3)
let haunter = new Pokemon('Haunter', './img/haunter.png', 3)

//pokemones.push(flareon, lapras, haunter)   push inyecta informacion al arreglo


//objetos literarios se construyen desde cero sin ningun tipo de clase y solo guardan informacion 

flareon.ataques.push(
    { nombre: '🔥', id: 'boton-fuego' },
    { nombre: '🔥', id: 'boton-fuego' },
    { nombre: '🔥', id: 'boton-fuego' },
    { nombre: '💧', id: 'boton-agua' },
    { nombre: '🌱', id: 'boton-tierra' },
)

lapras.ataques.push(
    { nombre: '💧', id: 'boton-agua' },
    { nombre: '💧', id: 'boton-agua' },
    { nombre: '💧', id: 'boton-agua' },
    { nombre: '🔥', id: 'boton-fuego' },
    { nombre: '🌱', id: 'boton-tierra' },
)

haunter.ataques.push(
    { nombre: '🌱', id: 'boton-tierra' },
    { nombre: '🌱', id: 'boton-tierra' },
    { nombre: '🌱', id: 'boton-tierra' },
    { nombre: '💧', id: 'boton-agua' },
    { nombre: '🔥', id: 'boton-fuego' },

)

pokemones.push(flareon, lapras, haunter);

function iniciarJuego() {

    sectionSeleccionarAtaque.style.display = 'none'

    pokemones.forEach((pokemon) => {
        opcionDePokemones = `
        <input type="radio" name="mascota" id=${pokemon.nombre} />
        <label class="tarjeta-de-mokepon" for=${pokemon.nombre}>
            <p>${pokemon.nombre}</p>
            <img src=${pokemon.foto} alt=${pokemon.nombre}>
        </label>
        `
        contenedorTarjetas.innerHTML += opcionDePokemones // es el encargado de qeu se impriman las tarjetas que estan

        inputFlareon = document.getElementById('Flareon')
        inputLapras = document.getElementById('Lapras')
        inputHaunter = document.getElementById('Haunter')

    });

    botonMascotaJugador.addEventListener('click', seleccionarMascotaJugador)

    botonReiniciar.addEventListener('click', reiniciarJuego)
}

function seleccionarMascotaJugador() {

    sectionSeleccionarMascota.style.display = 'none'
    sectionSeleccionarAtaque.style.display = 'flex'

    if (inputFlareon.checked) {
        spanMascotaJugador.innerHTML = inputFlareon.id // sirve para impirmir en HTML
        mascotaJugador = inputFlareon.id // almacen el nombre del personaje para usar en otra funcion
    } else if (inputLapras.checked) {
        spanMascotaJugador.innerHTML = inputLapras.id
        mascotaJugador = inputLapras.id
    } else if (inputHaunter.checked) {
        spanMascotaJugador.innerHTML = inputHaunter.id
        mascotaJugador = inputHaunter.id
    } else {
        alert('Selecciona una mascota')
    }

    extraerAtaques(mascotaJugador) //funcion con parametro

    seleccionarMascotaEnemigo()
}

function extraerAtaques(mascotaJugador) { // el parametro se usa como variable interna
    let ataques
    for (let i = 0; i < pokemones.length; i++) {
        if (mascotaJugador === pokemones[i].nombre) { // me  trae la informacion del nombre
            ataques = pokemones[i].ataques // para que atraiga los ataques del pokemon 
        }
    }
    mostrarAtaques(ataques) // funcion para mostrar ataques
}

function mostrarAtaques(ataques) {
    ataques.forEach((ataque) => { //por cada ataque que exita en el arreglo de ataques  dentro de ataques hace
        ataquesPokemon = `
        <button id= ${ataque.id} class="boton-de-ataque BAtaque">${ataque.nombre}</button>
        `
        contenedorAtaques.innerHTML += ataquesPokemon
    })
    botonFuego = document.getElementById('boton-fuego')
    botonAgua = document.getElementById('boton-agua')
    botonTierra = document.getElementById('boton-tierra')
    botones = document.querySelectorAll('.BAtaque')// sirve para que seleccione todos los elementos que tengan algo en una misma clase

}
// creando la secuencia de ataques
function secuenciaAtaque() {
    botones.forEach((boton) => {
        boton.addEventListener('click', (e) => {
            if (e.target.textContent === '🔥') {
                ataqueJugador.push('FUEGO')
                console.log('ataqueJugador')
                boton.style.backgroundColor = '#112f58'
            } else if (e.target.textContent === '💧') {
                ataqueJugador.push('AGUA')
                console.log('ataqueJugador')
                boton.style.backgroundColor = '#112f58'
            } else {
                ataqueJugador.push('TIERRA')
                console.log('ataqueJugador')
                boton.style.backgroundColor = '#112f58'
            }
            console.log(ataqueJugador)
            ataqueAleatorioEnemigo() // va aqui para que cuando el jugador ataque, la maquina ataque de una vez
        })

    })
}

function seleccionarMascotaEnemigo() {
    let mascotaAleatoria = aleatorio(0, pokemones.length - 1);// para que cada vez que agregue un pokemon en el arreglo, este se adiciones de una a la seleccion el menos uno es para que me de el arreglo real

    spanMascotaEnemigo.innerHTML = pokemones[mascotaAleatoria].nombre// permite la seleccion aleatoria mediante el arreglo
    ataquesPokemonEnemigo = pokemones[mascotaAleatoria].ataques// selecciona el ataque del arreglo
    secuenciaAtaque()
}

function ataqueAleatorioEnemigo() {
    let ataqueAleatorio = aleatorio(0, ataqueAleatorioEnemigo.length - 1) // aument a medida que aumenten los ataques

    if (ataqueAleatorio == 0 || ataqueAleatorio == 1) {
        ataqueEnemigo.push('FUEGO') // si sale el ataque uno agregalos al arreglo
    } else if (ataqueAleatorio == 2 || ataqueAleatorio == 3) {
        ataqueEnemigo.push('AGUA')
    } else {
        ataqueEnemigo.push('TIERRA')
    }
    console.log(ataqueEnemigo)

    combate()
}

function combate() {

    if (ataqueEnemigo == ataqueJugador) {
        crearMensaje("EMPATE")
    } else if (ataqueJugador == 'FUEGO' && ataqueEnemigo == 'TIERRA') {
        crearMensaje("GANASTE")
        vidasEnemigo--
        spanVidasEnemigo.innerHTML = vidasEnemigo
    } else if (ataqueJugador == 'AGUA' && ataqueEnemigo == 'FUEGO') {
        crearMensaje("GANASTE")
        vidasEnemigo--
        spanVidasEnemigo.innerHTML = vidasEnemigo
    } else if (ataqueJugador == 'TIERRA' && ataqueEnemigo == 'AGUA') {
        crearMensaje("GANASTE")
        vidasEnemigo--
        spanVidasEnemigo.innerHTML = vidasEnemigo
    } else {
        crearMensaje("PERDISTE")
        vidasJugador--
        spanVidasJugador.innerHTML = vidasJugador
    }

    revisarVidas()
}

function revisarVidas() {
    if (vidasEnemigo == 0) {
        crearMensajeFinal("FELICITACIONES! Ganaste :)")
    } else if (vidasJugador == 0) {
        crearMensajeFinal('Lo siento, perdiste :(')
    }
}
//añadiendo mensaje
function crearMensaje(resultado) {

    let nuevoAtaqueDelJugador = document.createElement('p') // se usan parrafos para que no se repita el texto
    let nuevoAtaqueDelEnemigo = document.createElement('p')

    sectionMensajes.innerHTML = resultado
    nuevoAtaqueDelJugador.innerHTML = ataqueJugador
    nuevoAtaqueDelEnemigo.innerHTML = ataqueEnemigo

    ataquesDelJugador.appendChild(nuevoAtaqueDelJugador)
    ataquesDelEnemigo.appendChild(nuevoAtaqueDelEnemigo)
}

function crearMensajeFinal(resultadoFinal) {

    sectionMensajes.innerHTML = resultadoFinal

    botonFuego.disabled = true
    botonAgua.disabled = true
    botonTierra.disabled = true

    sectionReiniciar.style.display = 'block'
}

function reiniciarJuego() {
    location.reload()
}

function aleatorio(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}

window.addEventListener('load', iniciarJuego)
