
      // Para obtener los elementos del HTML con getElementById
    
      const celeste = document.getElementById('celeste');
      const violeta = document.getElementById('violeta');
      const naranja = document.getElementById('naranja');
      const verde = document.getElementById('verde');
      const btnEmpezar = document.getElementById('btnEmpezar');
      const ULTIMO_NIVEL = 10;


      // Creamos la clase Juego

      class Juego { 
        constructor() {
          this.inicializar = this.inicializar.bind(this);
          this.inicializar();
          this.generarSecuencia();
          setTimeout(() => {
            this.siguienteNivel();
          }, 500)
        } 

        inicializar() {
          this.elegirColor = this.elegirColor.bind(this); // Aquí le decimos que siempre que sea this.elegirColor esté bindeado al this (clase Juego)
          this.siguienteNivel = this.siguienteNivel.bind(this);
          this.toggleBtnEmpezar();
          this.nivel = 1; // Inicializamos el nivel inicial
          this.colores = {
            celeste,
            violeta,
            naranja,
            verde
          } // Los colores para acceder mejor
        }

        toggleBtnEmpezar() {
          if(btnEmpezar.classList.contains('hide')) {
            btnEmpezar.classList.remove('hide');
          } else {
            btnEmpezar.classList.add('hide');
          }
        }

        // En generar secuencia vamos a hacer un array de números random

        generarSecuencia() {
          this.secuencia = new Array(ULTIMO_NIVEL).fill(0).map(n => Math.floor(Math.random() * 4));
        }

        // Siguiente Nivel llamará a iluminar secuencia (cada vez que se llegue a un nuevo nivel se iluminará la secuencia)
        siguienteNivel() {
          this.subnivel = 0;
          this.iluminarSecuencia();
          this.agregarEventosClick();
        }

        transformarNumeroAColor(numero) {
          switch(numero) {
            case 0:
              return 'celeste';
            case 1: 
              return 'violeta';
            case 2:
              return 'naranja';
            case 3: 
              return 'verde';
          }
        }

        transformarColorANumero(color) {
          switch(color) {
            case 'celeste':
              return 0;
            case 'violeta': 
              return 1;
            case 'naranja':
              return 2;
            case 'verde': 
              return 3;
          }
        }

        // Este método recorrerá el array de la secuencia hasta el nivel en el que está el usuario. 
        iluminarSecuencia() {
          for(let i = 0;  i < this.nivel; i++) {
            const color = this.transformarNumeroAColor(this.secuencia[i]); // Luego debemos llamar una función para que ilumine cada color en particular
            setTimeout(() => this.iluminarColor(color), 1000 * i);
          }
        }

        iluminarColor(color) {
          this.colores[color].classList.add('light');
          setTimeout(() => this.apagarColor(color), 350);
        }

        apagarColor(color) {
          this.colores[color].classList.remove('light');
        }

        // Aqui se le dice al navegador qué función tiene que ejecutar cuando se realice ese evento click
        // Es algo que JS le indica al navegador y es una función que se va a ejecutar de manera asíncrona, el navegador le dice
        // que paso el evento y tiene que pasar dicha función, y cuando JS no tenga tareas, lo ejecutará
        agregarEventosClick() {
          // self = this; Se suele usar la referencia a this, también _this
          this.colores.celeste.addEventListener('click', this.elegirColor); // Si no ponemos bind, tendrá a this como el botón que se oprime 
          this.colores.verde.addEventListener('click', this.elegirColor); 
          this.colores.naranja.addEventListener('click', this.elegirColor);
          this.colores.violeta.addEventListener('click', this.elegirColor);
        }

        eliminarEventosClick() {
          this.colores.celeste.removeEventListener('click', this.elegirColor);
          this.colores.verde.removeEventListener('click', this.elegirColor); 
          this.colores.naranja.removeEventListener('click', this.elegirColor);
          this.colores.violeta.removeEventListener('click', this.elegirColor);
        }


        // El navegador le dirá a JS que la llame cuando suceda el evento de click 
        // Cuando se llaman funciones manejadoras de eventos se llama con un parámetro ev o event
        elegirColor(ev) {
          const nombreColor = ev.target.dataset.color;
          const numeroColor = this.transformarColorANumero(nombreColor);
          this.iluminarColor(nombreColor);
          if(numeroColor === this.secuencia[this.subnivel]) {
            this.subnivel++;
            if(this.subnivel === this.nivel) {
              this.nivel++;
              this.eliminarEventosClick()
              if(this.nivel === (ULTIMO_NIVEL + 1)) {
                  this.ganoElJuego();
              } else {
                setTimeout(this.siguienteNivel, 1500);
              }
            }
          } else {
            this.perdioElJuego();
          }

        }

        ganoElJuego() {
          swal('Simón Dice', 'Felicitaciones, ganaste el juego!', 'success').then(this.inicializar);
        }

        perdioElJuego() {
          swal('Simón Dice', 'Lo lamentamos, perdiste :(', 'error').then(this.inicializar);
        }


        // El target muestra en que elemento se hizo el click (en HTML)
        // Hay que tener en cuenta que JS perderá un poco el contexto en la función elegirColor, esto tiene que ver con el this
        // y que no se pierda el this en las funciones si es que se usa. En la función, cada que hacemos click en un botón
        // (div) ese será this en ese contexto. 
        // Esto se puede evitar usando bind, que es juntar o unir, es decir, cuando le pasamos elegirColor le decimos que se
        // bindee o una con el this actual de la función de arriba, y así en elegir color this seguirá siendo Juego.
      }

      function empezarJuego() {
        var juego = new Juego();
      }

      // Clase 38:
      // Ahora generarmeos la secuencia de colores que el usuario tendrá que repetir a lo largo del juego, si la repite gana
      // y si se equivoca en algún nivel, pierde. 

      // Para ello definiremos un array de números que representarán los colores.
      // Del 0 al 3: 0 celeste, 1 violeta, 2 naranja, 3 verde.

      // Para ello añadimos en el constructor la función de la secuencia.

      // Clase 39:
      // Ya tenemos la secuencia que el usuario debe repetir, lo que debemos hacer ahora es cada vez que el usuario llegue a un
      // nuevo nivel, iluminaremos la secuencia hasta dicho nivel y el usuario debe repetirla. Que significa?
      // La secuencia tiene 10 números, pero en el primer nivel solo debe repetir 1 color, en el segundo nivel repetirá 2 colores,
      // en el tercero 3, y así sucesivamente hasta el último nivel 10 donde los repite todos.
      // Para ello en el constructor le decimos que pase al siguiente nivel

      // Clase 40:
      // Ahora que el usuario ya sabe qué secuencia repetir en cada nivel, obtengamos el input del usuario para ver si
      // el botón que toca es correcto o incorrecto según la secuencia que le tocó. Para eso iremos al método de siguienteNivel.

      // Clase 41:
      // Ahora que ya sabemos qué color tocó el usuario, debemos agregar la lógica para saber qué pasa con ese botón que tocó,
      // agregemos la lógica para ver qué pasa con ese botón que tocó. Tal vez el botón que tocó, es incorrecto, entonces pierde,
      // o tal vez es correcto y tiene que seguir repitiendo los números, los que siguen en la secuencia, y si hizo todos los de
      // la secuencia, debe pasar al siguiente nivel, y si llegó al último nivel y lo hizo bien, terminó el juego, ganó.
    
      // Clase 42: 
      // Ya tenemos la lógica principal del juego, ahora podríamos añadir detalles como avisarle al nivel que pasó,
      // y cuando llega al final ya sea porque perdió o por que ganó. 