//juego 2048 hecho por Alisson Carrillo y Allison Solano

const filas = 5;
const columnas = 4;
const matriz = [];
let valorPrimeraPieza;
let columna;
let index;
let valor;
let celdaP;
let mov = 0;
let startTime; 
var idInterval;
var idIntervalInicial;
// Inicializa la matriz con ceros o valores iniciales
for (let i = 0; i < filas; i++) {
    matriz[i] = new Array(columnas).fill(0);
}

//Funcion que solo actualiza la primera fila
function nuevapieza(fila, columna, nuevoValor) {
    matriz[fila][columna] = nuevoValor;

    //celda en tablero
    const celda = document.getElementById(`cuadro_${fila}_${columna}`);
    celda.style.backgroundColor = obtenerColor(nuevoValor);
    celda.innerHTML = `<p class=pieza>${nuevoValor}</p>`;
}
//colores para las piezas segun valor
function obtenerColor(valor) {
    switch (valor) {
        case 2:
            return '#E86C4F';
        case 4:
            return '#F4A24C';
        case 8:
            return '#BFDDCE';
        case 16:
            return '#027A76';
        case 32:
            return '#DF3B57';
        case 64:
            return '#C1839F';    
        case 128:
            return '#A1C084';
        case 256:
            return '#69A2B0';
        case 512:
            return '#659157';
        case 1024:
            return '#F4AC45';
        case 2048:
            return '#A61C3C';
        default:
            return '#027A76'; // Color predeterminado
    }
}
//generar las piezas
function piezaInicial(){
    index = Math.floor(Math.random() * 4);
    valorPrimeraPieza = numeroRandom(); // Almacena el valor aleatorio
    columna = 0;
    if(verificar(0,index)){
        console.log('game over');
        document.getElementById("gameOver").style.display="flex"; 
        clearInterval(idInterval);
        clearInterval(idIntervalInicial);
    } else if (ganador()){
        console.log('win');
        document.getElementById("win").style.display="flex"; 
        document.getElementById("win").style.fontSize = "140px";
        clearInterval(idInterval);
        clearInterval(idIntervalInicial);
    }
    else{
        nuevapieza(columna, index, valorPrimeraPieza);
    }
    
}
//game over
function verificar(fila, columna){
    if(matriz[fila][columna]!=0){
        return true;
    }
    return false; 
}
//funcion de ganar
function ganador(){
    for (let i = 0; i < filas; i++) {
      for (let j = 0; j < columnas; j++) {
            if(matriz[i][j]==2048){
                return true;
            }
      }
    }
  
    return false;
}  
//generar numeros de piezas
function numeroRandom() {
    let index = Math.floor(Math.random() * 6);
    let numeros = [2, 2, 4, 4, 8, 2];
    return numeros[index];
}
//logica general
function iniciarJuego() {
    startTimer();
    piezaInicial(); 
    idIntervalInicial=setInterval(function() {
        matriz[columna][index] = valorPrimeraPieza;     
        piezaInicial();
        actualizarPuntuacion();
    }, 5000); // Intervalo
    
}
// para obtener el valor en una casilla
function obtenerValorCasilla(columna, fila) {
    return matriz[fila][columna];
}
//limpiar las celdas despues de un movimiento
function limpiarCelda(fila, columna){
    const celda = document.getElementById(`cuadro_${fila}_${columna}`);
    celda.style.backgroundColor = "transparent";
    celda.innerHTML = "";
    matriz[fila][columna] = 0;
}


// movimiento con flechas
document.addEventListener('keydown', function(event) {

    switch (event.key) {
        case 'ArrowUp':
            console.log('Tecla arriba presionada');
            valor = obtenerValorCasilla(index, columna - 1);
            if (columna > 0 && valor == valorPrimeraPieza) {
                mov++;
                columna--;
                mostrarMovimientos();
                valorPrimeraPieza = valorPrimeraPieza * 2;
                nuevapieza(columna, index, valorPrimeraPieza);
                limpiarCelda(columna + 1, index);
            } else if (columna > 0 && (valor == 0 || valor === undefined)) {
                mov++;
                columna--;
                mostrarMovimientos();
                nuevapieza(columna, index, valorPrimeraPieza);
                limpiarCelda(columna + 1, index);
            } else {
                nuevapieza(columna, index, valorPrimeraPieza);
            }
            break;
        case 'ArrowDown':
            console.log('Tecla abajo presionada');
            valor = obtenerValorCasilla(index, columna+1);
            if (columna < filas - 1 && valor == valorPrimeraPieza) {
                mov++;
                columna++;
                mostrarMovimientos();
                valorPrimeraPieza = valorPrimeraPieza*2;
                nuevapieza(columna, index, valorPrimeraPieza);
                limpiarCelda(columna - 1, index);
            } else if (columna < filas - 1 && (valor == 0 || valor == undefined)){
                mov++;
                columna++;
                mostrarMovimientos();
                nuevapieza(columna, index, valorPrimeraPieza);
                limpiarCelda(columna - 1, index);
            }else{
                nuevapieza(columna, index, valorPrimeraPieza);
            }
            break;
        case 'ArrowLeft':
            console.log('Tecla izquierda presionada');
            valor = obtenerValorCasilla(index-1, columna);
            if (index > 0 && valor == valorPrimeraPieza) {
                mov++;
                index--;
                mostrarMovimientos();
                valorPrimeraPieza = valorPrimeraPieza*2;
                nuevapieza(columna, index, valorPrimeraPieza);
                limpiarCelda(columna, index + 1);
            } else if (index > 0 && (valor == 0 || valor == undefined)) {
                mov++;
                index--;
                mostrarMovimientos();
                nuevapieza(columna, index, valorPrimeraPieza);
                limpiarCelda(columna, index + 1);
            } else {
                nuevapieza(columna, index, valorPrimeraPieza);
            }
            break;
        case 'ArrowRight':
            console.log('Tecla derecha presionada');
            valor = obtenerValorCasilla(index+1, columna);
            if (index < columnas - 1 && valor == valorPrimeraPieza) {
                mov++;
                index++;
                mostrarMovimientos();
                valorPrimeraPieza = valorPrimeraPieza*2;
                nuevapieza(columna, index, valorPrimeraPieza);
                limpiarCelda(columna, index - 1);
            } else if (index < columnas - 1 && (valor == 0 || valor == undefined)){
                mov++;
                index++;
                mostrarMovimientos();
                nuevapieza(columna, index, valorPrimeraPieza);
                limpiarCelda(columna, index - 1);
            } else {
                nuevapieza(columna, index, valorPrimeraPieza);
            }
            break;
    }
});

//tiempo en el juego
  function startTimer() {
      console.log('El script juegotimer.js se está ejecutando');
      startTime = new Date();
  
      idInterval= setInterval(updateTimer, 1000);
  }
  
  function updateTimer() {
      const timerElement = document.getElementById('timer');
      const currentTime = new Date();
      const elapsedMilliseconds = currentTime - startTime;
      const elapsedSeconds = Math.floor(elapsedMilliseconds / 1000);
  
      const minutes = Math.floor(elapsedSeconds / 60);
      const seconds = elapsedSeconds % 60;
  
      const formattedTime = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  
      timerElement.textContent = `Tiempo: ${formattedTime}`;
  }
  //puntuacion
  function actualizarPuntuacion() {

    const puntuacionElement = document.getElementById("puntuacion");

    const puntuacion = calcularPuntuacion();
  

    puntuacionElement.textContent = `Puntuación: ${puntuacion}`;
  }
 


function calcularPuntuacion() {
    let puntuacion = 0;
  
    for (let i = 1; i < filas; i++) {
      for (let j = 0; j < columnas; j++) {
        puntuacion += matriz[i][j];
      }
    }
  
    return puntuacion;
  }
//movimientos
function mostrarMovimientos(){
    const movimientosElement = document.getElementById("movimientos");
    movimientosElement.textContent = `Movimientos: ${mov}`;
}
iniciarJuego();