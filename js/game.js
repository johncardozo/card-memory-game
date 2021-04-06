const fichas = [
  "🎱",
  "🏈",
  "⚽️",
  "🏀",
  "⚽️",
  "🏈",
  "⚾️",
  "🎾",
  "🏐",
  "🏉",
  "⚾️",
  "🎱",
  "🏀",
  "🎾",
  "🏐",
  "🏉",
];
let ficha1 = null;
let ficha2 = null;
let numeroJugada = 1;
let puntos = 0;
let juegoTerminado = false;
let cantidadJugadas = 0;

// Obtiene los elementos de la página
const tablero = document.getElementById("tablero");
const mensaje = document.getElementById("mensaje");

const clickFicha = (e) => {
  // Si el juego ya terminó no ejecuta nada
  if (juegoTerminado) {
    return;
  }

  // Obtiene la ficha
  const ficha = e.target;
  // Obtiene el valor de la ficha
  const valor = ficha.getAttribute("data-valor");

  // Verifica si es la jugada 1
  if (numeroJugada === 1) {
    // Verifica si previamente se hicieron las 2 jugadas
    if (ficha1 !== null && ficha2 !== null) {
      // Obtiene los valores de las fichas jugadas previamente
      let valor1 = ficha1.getAttribute("data-valor");
      let valor2 = ficha2.getAttribute("data-valor");

      // Compara los valores de la fichas jugadas previamente
      if (valor1 !== valor2) {
        // Oculta los valores en las fichas jugadas
        ficha1.textContent = "";
        ficha2.textContent = "";
        // Reinicializa las fichas
        ficha1 = null;
        ficha2 = null;
      }
    }
    // Muestra el valor de la ficha
    ficha.textContent = valor;
    // Guarda la ficha 1
    ficha1 = ficha;
    // Guarda la jugada
    numeroJugada = 2;
  } else if (numeroJugada === 2) {
    // Muestra el valor de la ficha
    ficha.textContent = valor;
    // Guarda la ficha 2
    ficha2 = ficha;
    // Guarda la jugada
    numeroJugada = 1;
    // Verifica si previamente se hicieron las 2 jugadas
    if (ficha1 !== null && ficha2 !== null) {
      // Obtiene los valores de las fichas jugadas previamente
      let valor1 = ficha1.getAttribute("data-valor");
      let valor2 = ficha2.getAttribute("data-valor");

      // Compara los valores de la fichas jugadas previamente
      if (valor1 === valor2) {
        puntos++;
      }
    }
  }
  // Se actualizan las jugadas en la página
  cantidadJugadas++;
  mensaje.textContent = `Jugadas: ${cantidadJugadas}`;

  // Verifica si el juego ya terminó
  if (puntos === fichas.length / 2) {
    mensaje.textContent = `Terminaste el juego en ${cantidadJugadas} jugadas`;
    juegoTerminado = true;
  }
};

const generarTablero = () => {
  // Recorre las fichas
  fichas.forEach((ficha) => {
    // Crea un div por cada ficha
    const divFicha = document.createElement("div");
    // Asigna la clase CSS para que se vea como una ficha
    divFicha.classList.add("ficha");
    // Asigna el valor de la ficha al div
    divFicha.setAttribute("data-valor", ficha);
    // Asigna la función click a la ficha
    divFicha.addEventListener("click", clickFicha);
    // Agrega la ficha al tablero
    tablero.appendChild(divFicha);
  });
};

generarTablero();
