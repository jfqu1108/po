const express = require('express') //con express se puede inicar la creacion del back

const app = express()
const jugadores = [] //constante vacia para que se registren los jugadores

class Jugador {
    constructor(id) {
        this.id = id
        
    }

}

app.get("/unirse", (req, res) => {  // el unirse es el primer endpoint donde se va a comunicar la pagina y el servidor
    // get =cada vez que un cliente solicite un recurso  se realizara algo --dentro de los parentesis va lo que se va a solicitar los recursos
    
    const id =`${Math.random()}`;

    const jugador = new Jugador(id) // se cree el nuevo jugador con el ID

    jugadores.push(jugador) // agrega a la lista de jugadores

    res.setHeader("Access-Control-Allow-Origin", "*") // soluciona el problema de acceso al origen

    res.send(id) //responda un id al jugador nuevo
})

app.listen(8081, () => {
    console.log("servido funcionando")
})
