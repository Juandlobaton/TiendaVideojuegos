const express = require("./node_modules/express");
const appServer = express () ;
const myVideojuego = require ('./models/Videojuego')



// #Servicio Videojuego


// #GetFormatoVideojuego

appServer.get ('/Videojuego', (req, res) =>{

    res.json (myVideojuego);

});

// #GetUsuarios 

appServer.get ('/Videojuegos', (req, res) =>{

          console.log(req.body);     

       res.send(req.body);
});


// #PostVideojuego 

appServer.post ( '/addVideojuego',
(req,res) => { 

    if(req.body.nombre !== '' || req.body.apellido !== '') {
        respuesta = {
         error: true,
         codigo: 503,
         mensaje: 'El usuario ya fue creado previamente'
        };
        }        else {
            usuario = {
             nombre: req.body.nombre,
             apellido: req.body.apellido
            };
         }; 

         respuesta = {
            error: false,
            codigo: 200,
            mensaje: 'Usuario creado',
            respuesta: usuario
           };
    
    console.log(req.body);

    res.send (respuesta);
    }
);


appServer.post ( '/updateVideojuego/:idVideojuego', 
(req,res) => { 
    console.log(req.body);
    console.log(req.params.idVideojuego);
    res.send ('Videojuego agragado');
    }
);





appServer.listen (3000,
    () => {
        console.log('SERVER RUNNING ON PORT 3000');
    }
);
