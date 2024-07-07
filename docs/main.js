let btnsClicked = []; 
let maxClicked = 2; 

// Asigno la funcion handleClick como manejador de clicks
document.querySelectorAll('.juego-memoria-btn').forEach(button => {
	button.addEventListener('click', handleClick); 
})

// Funcionalidad principal del juego
function handleClick(event) {
	const button = event.target;
	button.innerText = button.getAttribute('data-number'); 

	// Inserto el botón en el array de botones clicados si no lo contiene ya
	if (!btnsClicked.includes(button)) btnsClicked.push(button); 

	// Si se alcanzan los máximos clicks -> comparo botones y evito que el usuario de clicks
	if (btnsClicked.length === maxClicked) {
		disableButtons(); 
		compararBotones(); 
	}

	// Comprobar fin del juego -> Si todos los botones tienen algo 
	if (checkEndGame()) {
		setTimeout(() => {
			const winnerMessage = document.getElementById('winner-message');
			winnerMessage.classList.add('finished');
		}, 800)	
	}
}

// Comparar si ha acertado o no el usuario
function compararBotones() {
	const [btn1, btn2] = btnsClicked; 

	if (btn1.getAttribute('data-number') === btn2.getAttribute('data-number')) {
		// Los marco como coincidencia
		btn1.classList.add('selected'); 
		btn2.classList.add('selected'); 
		// Reactivar los botones despues de un pequeño retraso
		setTimeout(enableButtons, 500); 
	} else {
		// Añado estas clases por tema de estilos
		btn1.classList.add('not-coincidence'); 
		btn2.classList.add('not-coincidence'); 
		// Espera 1 segundo tras el click en el 2º btn para limpiarlo
		setTimeout(() => {
			notCoincidence(btn1, btn2); 
			enableButtons(); 
		}, 500);
		
	}
	btnsClicked = []; 
}

/*
 * Funciones auxiliares
 */

// Funcionalidad si no hay coincidencia
const notCoincidence = (btn1, btn2) => {
	btn1.innerText = '';
	btn2.innerText = '';
	btn1.classList.remove('selected');
	btn2.classList.remove('selected');
	btnsClicked = [];
	// Elimino las clases
	btn1.classList.remove('not-coincidence');
	btn2.classList.remove('not-coincidence');
}

// Comprobacion de si hemos acabado el juego
const checkEndGame = () => {
	const buttons = document.querySelectorAll('.juego-memoria-btn'); 
	for (let button of buttons) {
		if (!button.innerText) return false; 
	}
	return true; 
}

// Deshabilitar los botones 
const disableButtons = () => {
	document.querySelectorAll('.juego-memoria-btn').forEach(button => {
		button.disabled = true; 
	}); 
}

// Habilitar los botones 
const enableButtons = () => {
	document.querySelectorAll('.juego-memoria-btn').forEach(button => {
		button.disabled = false; 
	}); 
}