// Inicializacion de variables
let tarjetas_destapadas = 0; 
let tarjeta1 = null; 
let tarjeta2 = null; 
let primerResultado = null; 
let segundoResultado = null; 
let movimientos = 0; 
let aciertos = 0; 
let temporizador = false; 
let timer = 30; 
let tiempoSetInterval = null; 

// Apuntando a documento HTML
let mostrarMovimientos = document.getElementById("movimientos"); 
let mostrarAciertos = document.getElementById("aciertos"); 
let mostrarTiempo = document.getElementById("t-restante"); 

// Array de numeros aleatorios
let numeros = [1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8]; 
numeros = numeros.sort(() => {
	return Math.random()-0.5
}); 

// Funcion principal
function destapar(id_boton) {
	if (temporizador == false) {
		contarTiempo(); 
		temporizador = true; 
	}

	// Aumentar contador de tarjetas destapadas
	tarjetas_destapadas++; 
	
	if (tarjetas_destapadas == 1) {
		// Mostrar primer numero
		tarjeta1 = document.getElementById(id_boton); 
		primerResultado = numeros[id_boton]
		tarjeta1.innerHTML = primerResultado; 

		// Deshabilitar el primer botón
		tarjeta1.disabled = true; 
	} else if (tarjetas_destapadas == 2) {
		// Mostrar segundo numero
		tarjeta2 = document.getElementById(id_boton); 
		segundoResultado = numeros[id_boton]; 
		tarjeta2.innerHTML = segundoResultado; 

		// Deshabilitar el segundo botón
		tarjeta2.disabled = true; 

		// Incrementar y mostrar movimientos
		movimientos++; 
		mostrarMovimientos.innerHTML = `Movimientos ${movimientos}`; 

		// Comprobar resultados
		if (primerResultado == segundoResultado) {
			// Resetear contador de tarjetas
			tarjetas_destapadas = 0; 

			// Aumentar y mostrar acierto
			aciertos++; 
			mostrarAciertos.innerHTML = `Aciertos ${aciertos}`; 

			// Comprobar si el juego ha acabado
			if (aciertos == 8) {
				// Detener contador
				clearInterval(tiempoSetInterval); 
				mostrarAciertos.innerHTML = `Aciertos: ${aciertos} 🥳`;
				mostrarMovimientos.innerHTML = `Movimientos: ${movimientos} 🥳`; 
				mostrarTiempo.innerHTML = `Fantástico 🔥 ¡Solo tardaste ${30-timer} segundos!`; 
			}
		} else {
			// Mostrar momentaneamente valores y volver a tapar
			// setTimeout -> Ejecutar algo despues de cierto tiempo
			setTimeout(() => {
				// Reiniciar contenido botones
				tarjeta1.innerHTML = ''; 
				tarjeta2.innerHTML = ''; 
				// Volver a habilitar botones
				tarjeta1.disabled = false; 
				tarjeta2.disabled = false; 
				// Resetear el contador
				tarjetas_destapadas = 0; 
			}, 800); 
		}
	}
}

const contarTiempo = () => {
	tiempoSetInterval = setInterval(() => {
		timer--;
		mostrarTiempo.innerHTML = `Tiempo: ${timer} segundos`;  
		// Parar el contador -> El jugador perdió
		if (timer == 0) {
			clearInterval(tiempoSetInterval); 
			bloquearTarjetas(); 
		}
	}, 1000); 
}

const bloquearTarjetas = () => {
	for (let i=0; i<=15; i++) {
		let tarjetaBloqueada = document.getElementById(i); 
		tarjetaBloqueada.innerHTML = numeros[i]; 
		tarjetaBloqueada.disabled = true; 
	}
}

function resetGame() {
	for (let i=0; i<=15; i++) {
		let btn = document.getElementById(i); 
		btn.innerHTML = ''; 
		btn.disabled = false; 
	}
	tarjetas_destapadas = 0; 
	aciertos = 0; 
	movimientos = 0; 
	timer = 30; 
	
	clearInterval(tiempoSetInterval); 
	mostrarAciertos.innerHTML = `Aciertos: ${aciertos}`;
	mostrarMovimientos.innerHTML = `Movimientos: ${movimientos}`; 
	mostrarTiempo.innerHTML = `Tiempo: ${timer} segundos`; 
}