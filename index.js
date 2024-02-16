const express = require('express') //con express se puede inicar la creacion del back

const app = express()

app.get("/", (req, res) => { // get =cada vez que un cliente solicite un recurso  se realizara algo --dentro de los parentesis va lo que se va a solicitar los recursos
res.send("hola")
})

app.listen(8081, () => {
    console.log("servido funcionando")
})
