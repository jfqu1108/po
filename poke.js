//declaraciones

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


const sectionVermapa = document.getElementById('ver-mapa') //canvas
const mapa = document.getElementById('mapa') // canvas


let pokemones = []  //arreglo
let ataqueJugador = []
let ataqueEnemigo = []
let opcionDePokemones
let inputFlareon
let inputLapras
let inputHaunter
let mascotaJugador
let mascotaJugadorObjeto
let ataquesPokemon
let ataquesPokemonEnemigo
let botonFuego
let botonAgua
let botonTierra
let botones = []
let victoriasJugador = 0
let victoriasEnemigo = 0
let indexAtaqueJugador
let indexAtaqueEnemigo
let vidasJugador = 3
let vidasEnemigo = 3


let lienzo = mapa.getContext("2d") //canvas  permite dibujar dentro del lienzo
let intervalo // para actualizar el canvas llamando una funcion constantemente por un tiempo estimado
let mapaBackground = new Image()
mapaBackground.src = './img/mapa.png'

let alturaBuscada
let anchoMapa = window.innerWidth - 20 // el innerwidth toma el ancho de la pantalla
const anchoMaximo = 350

//poner un ancho maximo

if (anchoMapa > anchoMaximo) {
    anchoMapa = anchoMaximo - 20
}

alturaBuscada = anchoMapa * 600 / 800

mapa.width = anchoMapa
mapa.height = alturaBuscada


//objeto instancia se contruye con una clase y un cosntructor y vienven desde la clase

class Pokemon { // la clase es el esquema para cada objeto
    constructor(nombre, foto, vida, fotoMapa) { //constuctor lo que va a contener el objeto sepuede añadir mas cosas
        this.nombre = nombre//el this llama la variable y el igual es para que e llene con la indformacion q queiero
        this.foto = foto
        this.vida = vida
        this.ataques = []
        //creacion de la imagen dentro del constructor
        this.ancho = 40 // tamaño de las cabezas de los pokemones
        this.alto = 40
        this.x = aleatorio(0, mapa.width - this.ancho)// aparicion alea toria en el mapa posicion en x usando ancho del mapa - ancho del pokemon para q no se salga
        this.y = aleatorio(0, mapa.height - this.alto)

        this.mapaFoto = new Image()
        this.mapaFoto.src = fotoMapa
        this.velocidadX = 0
        this.velocidadY = 0
    }
    pintarPokemon() {
        lienzo.drawImage(
            this.mapaFoto,
            this.x,
            this.y,
            this.ancho,
            this.alto
        )

    }
}

let flareon = new Pokemon('Flareon', './img/flareon.png', 3, './img/cabezaFlareon.png') // arreglo  dto
let lapras = new Pokemon('Lapras', './img/lapras.png', 3, './img/cabezaLapras.png')
let haunter = new Pokemon('Haunter', './img/haunter.png', 3, './img/cabezaHaunter.png')

//arreglo de enemigos 
let flareonEnemigo = new Pokemon('Flareon', './img/flareon.png', 3, './img/cabezaFlareon.png') // arreglo 
let laprasEnemigo = new Pokemon('Lapras', './img/lapras.png', 3, './img/cabezaLapras.png')
let haunterEnemigo = new Pokemon('Haunter', './img/haunter.png', 3, './img/cabezaHaunter.png')

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
    sectionVermapa.style.display = 'none'

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

    unirseAlJuego()

}
function unirseAlJuego() {
    fetch("http://localhost:8081/unirse") // genera la union backend juego
        .then(function (res) {
            //codigo para que me emuestre en texto lo del fetch
            if (res.ok)
                res.text()
                    .then(function (respuesta){
                        console.log(respuesta)
                    })
        })
}

function seleccionarMascotaJugador() {

    sectionSeleccionarMascota.style.display = 'none'
    //sectionSeleccionarAtaque.style.display = 'flex'

    //canvas
    sectionVermapa.style.display = 'flex'
    //intervalo = setInterval(pintarCanvas, 50)

    iniciarMapa()

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

    //iniciar recorrido del mapa
    sectionVermapa.style.display = 'flex'
    intervalo = setInterval(pintarCanvas, 50)

    iniciarMapa()


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
                boton.disabled = true
            } else if (e.target.textContent === '💧') {
                ataqueJugador.push('AGUA')
                console.log('ataqueJugador')
                boton.style.backgroundColor = '#112f58'
                boton.disabled = true
            } else {
                ataqueJugador.push('TIERRA')
                console.log('ataqueJugador')
                boton.style.backgroundColor = '#112f58'
                boton.disabled = true
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
    let ataqueAleatorio = aleatorio(0, ataquesPokemonEnemigo.length - 1) // aument a medida que aumenten los ataques

    if (ataqueAleatorio == 0 || ataqueAleatorio == 1) {
        ataqueEnemigo.push('FUEGO') // si sale el ataque uno agregalos al arreglo
    } else if (ataqueAleatorio == 2 || ataqueAleatorio == 3) {
        ataqueEnemigo.push('AGUA')
    } else {
        ataqueEnemigo.push('TIERRA')
    }
    console.log(ataqueEnemigo)
    iniciarPelea()
}
//secuencia de 5 ataques para definir el ganador

function iniciarPelea() {
    //inicio de validacion
    if (ataqueJugador.length === 5) {
        combate();
    }
}

function indexAmbosOponentes(jugador, enemigo) { //sirve para imprimir el ataque que se eligio
    indexAtaqueJugador = ataqueJugador[jugador] //estas variables van a guardar el ataque del jugador
    indexAtaqueEnemigo = ataqueEnemigo[enemigo]
}

function combate() {

    //un for para que recorarra el arreglo del jugador y de la maquina 
    for (let index = 0; index < ataqueJugador.length; index++) {
        if (ataqueJugador[index] === ataqueEnemigo[index]) {
            indexAmbosOponentes(index, index) //impime el ataque de cada jugador
            crearMensaje("empate")
        }
        else if (ataqueJugador[index] === 'FUEGO' && ataqueEnemigo[index] === 'TIERRA') {
            indexAmbosOponentes(index, index)
            crearMensaje("Ganaste")
            victoriasJugador++
            spanVidasJugador.innerHTML = victoriasJugador
        }
        else if (ataqueJugador[index] === 'AGUA' && ataqueEnemigo[index] === 'FUEGO') {
            indexAmbosOponentes(index, index)
            crearMensaje("Ganaste")
            victoriasJugador++
            spanVidasJugador.innerHTML = victoriasJugador
        }
        else if (ataqueJugador[index] === 'TIERRA' && ataqueEnemigo[index] === 'AGUA') {
            indexAmbosOponentes(index, index)
            crearMensaje("Ganaste")
            victoriasJugador++
            spanVidasJugador.innerHTML = victoriasJugador
        }
        else {
            indexAmbosOponentes(index, index)
            crearMensaje("Perdiste")
            victoriasEnemigo++
            spanVidasEnemigo.innerHTML = victoriasEnemigo
        }

    }

    revisarVidas()
}

function revisarVidas() {
    if (victoriasJugador == victoriasEnemigo) {
        crearMensajeFinal("Empate :/")
    } else if (victoriasJugador > victoriasEnemigo) {
        crearMensajeFinal("GANASTE 🎊")
    }
    else {
        crearMensajeFinal('Lo siento, perdiste :(')
    }
}
//añadiendo mensaje
function crearMensaje(resultado) {

    let nuevoAtaqueDelJugador = document.createElement('p') // se usan parrafos para que no se repita el texto
    let nuevoAtaqueDelEnemigo = document.createElement('p')

    sectionMensajes.innerHTML = resultado
    nuevoAtaqueDelJugador.innerHTML = indexAtaqueJugador
    nuevoAtaqueDelEnemigo.innerHTML = indexAtaqueEnemigo

    ataquesDelJugador.appendChild(nuevoAtaqueDelJugador)
    ataquesDelEnemigo.appendChild(nuevoAtaqueDelEnemigo)
}

function crearMensajeFinal(resultadoFinal) {

    sectionMensajes.innerHTML = resultadoFinal

    sectionReiniciar.style.display = 'block'
}

function reiniciarJuego() {
    location.reload()
}

function aleatorio(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}

//pintar la mascota del jugador

function pintarCanvas() {
    // pintar mascotas
    mascotaJugadorObjeto.x = mascotaJugadorObjeto.x + mascotaJugadorObjeto.velocidadX; // si tiene velocidad en x se actualiza en x
    mascotaJugadorObjeto.y = mascotaJugadorObjeto.y + mascotaJugadorObjeto.velocidadY;

    lienzo.clearRect(0, 0, mapa.width, mapa.height)
    lienzo.drawImage(
        mapaBackground,
        0,
        0,
        mapa.width,
        mapa.height)

    // pintar mascota
    mascotaJugadorObjeto.pintarPokemon()
    //pintar la mascota del enemigo
    flareonEnemigo.pintarPokemon()
    laprasEnemigo.pintarPokemon()
    haunterEnemigo.pintarPokemon()

    //solo se van a revisar las colisiones si las mascotas tienen movimiento osea velocidad en x y y

    //genera las colisionesF
    if (mascotaJugadorObjeto.velocidadX !== 0 || mascotaJugadorObjeto.velocidadY !== 0) {
        revisarColision(flareonEnemigo)
        revisarColision(laprasEnemigo)
        revisarColision(haunterEnemigo)
    }


    //movimiento de los pokemones
}
function moverArriba() {
    mascotaJugadorObjeto.velocidadY = -5
}

function moverIzquierda() {
    mascotaJugadorObjeto.velocidadX = -5
}

function moverAbajo() {
    mascotaJugadorObjeto.velocidadY = 5
}

function moverDerecha() {
    mascotaJugadorObjeto.velocidadX = 5
}

//funcion para detener el movimiento
function detenerMovimiento() {
    mascotaJugadorObjeto.velocidadX = 0
    mascotaJugadorObjeto.velocidadY = 0
}

function teclaPresionada(event) {
    switch (event.key) {  // key es el valor quse se va usar para comparar 
        case 'ArrowUp':  // es donde va la tecla 
            moverArriba();
            break;
        case 'ArrowLeft':
            moverIzquierda();
            break;
        case 'ArrowDown':
            moverAbajo();
            break;
        case 'ArrowRight':
            moverDerecha();
            break;
        default:
            break;

    }

}

function iniciarMapa() {

    mascotaJugadorObjeto = obtenerObjetoMascota();
    // incrementar tamaño del mapa

    window.addEventListener('keydown', teclaPresionada)
    window.addEventListener('keyup', detenerMovimiento)
}
// funcion para pintar las mascotas
function obtenerObjetoMascota() {
    for (let i = 0; i < pokemones.length; i++) {
        if (mascotaJugador === pokemones[i].nombre) {
            return pokemones[i]
        }

    }
}

function revisarColision(enemigo) {
    const arribaEnemigo = enemigo.y
    const abajoEnemigo = enemigo.y + enemigo.alto
    const izquierdaEnemigo = enemigo.x
    const derechaEnemigo = enemigo.x + enemigo.ancho

    const arribaMascota = mascotaJugadorObjeto.y
    const abajoMascota = mascotaJugadorObjeto.y + mascotaJugadorObjeto.alto
    const izquierdaMascota = mascotaJugadorObjeto.x
    const derechaMascota = mascotaJugadorObjeto.x + mascotaJugadorObjeto.ancho


    if (
        abajoMascota < arribaEnemigo ||
        arribaMascota > abajoEnemigo ||
        derechaMascota < izquierdaEnemigo ||
        izquierdaMascota > derechaEnemigo
    ) {
        return
    }
    //detiene el movimiento cuando hay colision
    detenerMovimiento()

    clearInterval(intervalo) //limpiar el intervalo

    //desaparecer el mapa cuando haya colision para iniciar ataque
    sectionSeleccionarAtaque.style.display = 'flex';
    sectionVermapa.style.display = 'none';
    seleccionarMascotaEnemigo(enemigo);

    //alert("hay colision" + enemigo.nombre);
}
window.addEventListener('load', iniciarJuego)
