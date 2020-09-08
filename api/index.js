const express = require("express");
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

let videoJuego = {
    id:'',
    titulo:'',
    estudio: '',
    anioLanzamiento: 0,
    descripcion: '',
    edadMinima : 0,
};
var videoJuegos = [];
let autoincrement = -1;

let respuesta = {
    error: false,
    codigo: 200,
    mensaje: ''
};

app.get('/', function(req, res) {
    respuesta = {
     error: true,
     codigo: 200,
     mensaje: 'Punto de inicio, Servidor OK'
    };
    res.send(respuesta);
});

app.get('/videoJuego', function (req, res) {
    respuesta = {
        error: false,
        codigo: 200,
        mensaje: ''
    };
    if(videoJuegos === []) {
        respuesta = {
            error: true,
            codigo: 501,
            mensaje: 'El video Juego no ha sido creado'
        };
    } else {
        respuesta = {
            error: false,
            codigo: 200,
            mensaje: 'respuesta del videoJuego',
            respuesta: videoJuegos
        };
    }
    res.send(respuesta);
});

app.post('/videoJuego', function (req, res) {
    if(!req.body.titulo || !req.body.estudio || !req.body.anioLanzamiento || !req.body.descripcion || !req.body.edadMinima) {
        respuesta = {
            error: true,
            codigo: 502,
            mensaje: 'El campo titulo,estudio,año Lanzamiento,descripcion y edad Minima son requeridos'
        };
    } else {
        videoJuego = videoJuegos.find(videoJuegox => videoJuegox.titulo === req.body.titulo);
        if(videoJuego !== undefined) {
            respuesta = {
                error: true,
                codigo: 501,
                mensaje: "Video Juego Previamente Creado"
            };
        } else {
            autoincrement +=1;

            console.log(autoincrement);
            videoJuego = {
                id:autoincrement,
                titulo:req.body.titulo,
                estudio: req.body.estudio,
                anioLanzamiento: req.body.anioLanzamiento,
                descripcion: req.body.descripcion,
                edadMinima : req.body.edadMinima,
            };

            videoJuegos[autoincrement] = videoJuego;
            respuesta = {
                error: false,
                codigo: 200,
                mensaje: 'videoJuego creado',
                respuesta: videoJuego
            };
        }
    }
    res.send(respuesta);
});


app.put('/videoJuego', function (req, res) {

    if(!req.body.titulo || !req.body.estudio || !req.body.anioLanzamiento || !req.body.descripcion || !req.body.edadMinima) {
        respuesta = {
            error: true,
            codigo: 502,
            mensaje: 'El campo titulo,estudio,año lanzamiento, descripcion y edad minima son requeridos'
        };
    } else {
        if (videoJuegos !== []){
            videoJuego = videoJuegos.find(videoJuegox => videoJuegox.titulo === req.body.titulo);
            if(videoJuego === undefined) {
                respuesta = {
                    error: true,
                    codigo: 501,
                    mensaje: 'El videoJuego no ha sido creado'
                };
            } else {
                videoJuego.estudio = req.body.estudio;
                videoJuego.anioLanzamiento = req.body.anioLanzamiento;
                videoJuego.descripcion = req.body.descripcion;
                videoJuego.edadMinima = req.body.edadMinima;
                videoJuegos[videoJuego.id] = videoJuego;
    
                respuesta = {
                    error: false,
                    codigo: 200,
                    mensaje: 'videoJuego actualizado',
                    respuesta: videoJuego
                };
            }
        }else{
            respuesta = {
                error: true,
                codigo: 501,
                mensaje: 'El videoJuego no ha sido creado'
            };
        }

    }
    res.send(respuesta);
});

app.delete('/videoJuego', function (req, res) {
    videoJuego = videoJuegos.find(videoJuegox => videoJuegox.titulo === req.body.titulo);
    if (videoJuegos !== []){
        if(videoJuego === undefined) {
            respuesta = {
                error: true,
                codigo: 501,
                mensaje: 'El videoJuego no ha sido creado'
            };
        } else {
            respuesta = {
                error: false,
                codigo: 200,
                mensaje: 'videoJuego eliminado'
            };
            videoJuegos.splice(videoJuego.id, 1);
        }
    }else{
        respuesta = {
            error: true,
            codigo: 501,
            mensaje: 'El videoJuego no ha sido creado'
        };
    }
    res.send(respuesta);
});

app.use(function(req, res, next) {
    respuesta = {
        error: true, 
        codigo: 404, 
        mensaje: 'URL no encontrada'
    };
    res.status(404).send(respuesta);
});

app.listen(3000, () => {
    console.log("El servidor está inicializado en el puerto 3000");
});

app.post('/hola', function (req, res) {
    res.send('[POST]Saludos desde express');
});

