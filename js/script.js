// **** Script getUserMedia()

//Seleccionamos el primer objeto vídeo del DOM, donde cargaremos
//el stream que genere nuestra webcam
var output = document.getElementById('output');
output.autoplay = true;
//Comprobamos la compatibilidad de nuestro navegador con User Media
if (tieneUserMedia()) {
    console.log("The browser supports UserMedia");
} else {
    throw new Error('Ooooppssss: getUserMedia() is not supported in your browser');
}

//Comprueba los diferentes motores que dan soporte
function tieneUserMedia() {
    return !!(navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia);
}

//Similar a cuando usamos prefijos de CSS, usamos variables 
//para contener los posibles objetos usados por cada navegador 

navigator.getUserMedia  = navigator.getUserMedia || navigator.webkitGetUserMedia ||
                          navigator.mozGetUserMedia || navigator.msGetUserMedia;


window.URL = window.URL || window.webkitURL;

//Comprobamos si existe getUserMedia y si no lanzamos un error
if (navigator.getUserMedia) {
    //Le pasamos un array con video y/o audio para acceder a webcam y micro respectivamente. Después una
    //función que se ejecutará a modo de callback y otra a modo de fallback.
    navigator.getUserMedia({video: true, audio: true}, exito, error);
    //Llámamos getUserMedia, pedimos acceso a vídeo. Si tenemos éxito llamamos una función y si no lanzamos un error.
} else {
    error();
}

//Si soportamos getUserMedia y damos permiso, nuestro tag de video mostrará el stream que recogemos.
//esta función recibe un parámetro que es el stream de video y/o audio recogido por los dispositivos.
function exito(stream) {
    output.src = window.URL.createObjectURL(stream);
}

//Nuestro error lanza un simple mensaje alert.
function error(e) {
    throw new Error("You don't let me show you userMedia");
}


// **** Script CSS3 Filters 

var FILTER_VALS = {};
var el = document.getElementById('output');

function set(filter, value) {
  FILTER_VALS[filter] = typeof value == 'number' ? Math.round(value * 10) / 10 : value;
  if (value == 0 || (typeof value == 'string' && value.indexOf('0') == 0)) {
    delete FILTER_VALS[filter];
  }
  render();
}

function render() {
  var vals = [];
  Object.keys(FILTER_VALS).sort().forEach(function(key, i) {
    vals.push(key + '(' + FILTER_VALS[key] + ')');
  });
  var val = vals.join(' ');
  el.style.webkitFilter = val;
  document.querySelector('output').textContent = '-webkit-filter: ' + (val ? val : 'none') + ';';
}