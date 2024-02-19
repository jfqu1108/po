//importando librerias

const express = require('express') //con express se puede inicar la creacion del back
const cors = require('cors')

const app = express()

app.use(cors()) //desabilita los errores de origen 

app.use(express.json()) // habilitar peticiones post para que el JSON soporte las soporte


const jugadores = [] //constante vacia para que se registren los jugadores

class Jugador {
    constructor(id) {
        this.id = id

    }
    asignarPokemon(pokemon){
        this.pokemon = pokemon
    }

}

class Pokemon{
    constructor(nombre){
        this.nombre = nombre
    }
}



app.get("/unirse", (req, res) => {  // el unirse es el primer endpoint donde se va a comunicar la pagina y el servidor
    // get =cada vez que un cliente solicite un recurso  se realizara algo --dentro de los parentesis va lo que se va a solicitar los recursos

    const id = `${Math.random()}`;

    const jugador = new Jugador(id) // se cree el nuevo jugador con el ID

    jugadores.push(jugador) // agrega a la lista de jugadores

    res.setHeader("Access-Control-Allow-Origin", "*") // soluciona el problema de acceso al origen

    res.send(id) //responda un id al jugador nuevo
})

//porgramando el servicio 

app.post("/pokemon/:jugadorId", (req, res) => {
    const jugadorId = req.params.jugadorId || ""// extraer los dato del jugador en el console .log
    const nombre = req.body.pokemon || ""
    const pokemon = new Pokemon (nombre)

    const jugadorIndex = jugadores.findIndex((jugador) =>jugadorId === jugador.id)

    if (jugadorIndex >= 0) { // para validar si el jugador existe
        jugadores[jugadorIndex].asignarPokemon(pokemon)
    }

    console.log(jugadores) //aceder jugadorid
    console.log(jugadorId)
    res.end()
})


app.listen(8081, () => {
    console.log("servido funcionando")
})
