const moduloJuego = (() => {
    'use strict' 

    let deck            = [];
    let tipos           = ['C', 'D', 'H', 'S'],
        especiales      = ['A', 'J', 'Q', 'K'];
    let puntosJugadores = [];



    //Referencias del HTML
    const btnPedir = document.querySelector('#btnPedir');
    const btnNuevo = document.querySelector('#btnNuevo');
    const btnDetener = document.querySelector('#btnDetener');
    const divcartasJugadores = document.querySelectorAll('.board__cards__player');
    const marcador = document.querySelectorAll('.points');

    
    //Empezar el juego
    const inicializarJuego = (numJugadores = 2) => {
        console.clear();
        deck = crearDeck();  
        
        puntosJugadores = [];
        for (let i = 0; i < numJugadores; i++){
            puntosJugadores.push(0)
        }
        marcador.forEach(elem => elem.innerHTML = 0);
        divcartasJugadores.forEach(elem => elem.innerHTML = '');
        btnPedir.disabled = false;
    }
      
    //Crear baraja de cartas
    const crearDeck = () => {
        deck = [];
        for (let i = 2; i <= 10; i++){
            for (let tipo of tipos) {
                deck.push(i + tipo);
        }
        }
        for (let especial of especiales) {
            for (let tipo of tipos) {
                deck.push(especial + tipo);
            }
        }
  
        return _.shuffle(deck);
    }
  

    //Elegir una carta de la baraja

    const pedirCarta = () => {
        if (deck.length === 0) {
            throw 'No hay cartas en la baraja'
        }
        return  deck.shift();
    }

    //Obtener valor de la carta
    const valorCarta = ( carta ) => {
        const valor = carta.substring(0, carta.length - 1);
        return (isNaN(valor)) ?
            (valor === 'A') ? 11 : 10
            : Number(valor);

    } 


    //Turno : 0 = primer jugador y el último será la computadora
    const acumularPuntos = (carta, turno) => {
        puntosJugadores[turno] = puntosJugadores[turno] + valorCarta(carta);
        marcador[turno].innerText = puntosJugadores[turno];
        return puntosJugadores[turno]
    };

    const crearCarta = (carta, turno) => {
        const imagenCarta = document.createElement('img');
        imagenCarta.classList.add('card');
        imagenCarta.src = `assets/cartas/${carta}.png`;
        divcartasJugadores[turno].append(imagenCarta);
    }

    const determinarGanador = () => {
        const [puntosMinimos, puntosOrdenador] = puntosJugadores;
        setTimeout(() => {
            if (puntosMinimos === puntosOrdenador) {
                alert('Empate, vuelve a jugar')
            } else if (puntosMinimos >21){
            alert('Tio Gilito gana')
            } else if (puntosOrdenador > 21) {
                alert('¡¡Has ganado!!')
            } else {
                alert('Tio Gilito gana')
            }
        }, 300);
    }

    //Turno ordenador
    const turnoOrdenador = (puntosMinimos) => {
        let puntosOrdenador = 0;
        do {
            const carta = pedirCarta();
            puntosOrdenador = acumularPuntos(carta, puntosJugadores.length - 1);
            crearCarta(carta, puntosJugadores.length - 1);
    
        } while ((puntosOrdenador < puntosMinimos) && (puntosMinimos <= 21));
        determinarGanador()

    }

    //Eventos
    btnPedir.addEventListener('click', () => {
        btnDetener.disabled = false;

        const carta = pedirCarta();
        const puntosJugador = acumularPuntos(carta, 0);

        crearCarta(carta, 0)

        if (puntosJugador > 21) {
            console.warn('lo siento mucho, perdiste');
            btnPedir.disabled = true;
            btnDetener.disabled = true;
            turnoOrdenador(puntosJugador);
        } else if (puntosJugador === 21) {
            console.warn('21, genial, dificil de superar');
            btnPedir.disabled = true;
            btnDetener.disabled = true;
            turnoOrdenador(puntosJugador);
        }
    });

    btnDetener.addEventListener('click', () => {
        btnPedir.disabled = true;
        btnDetener.disabled = true;
        turnoOrdenador(puntosJugadores[0]);
    });

    btnNuevo.addEventListener('click', () => {
      
        inicializarJuego();
     
    });
 
    return {
        nuevoJuego: inicializarJuego
}
})();


