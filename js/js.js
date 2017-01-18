var y = 10; // altura inicial y0=10%, debe leerse al iniciar si queremos que tenga alturas diferentes dependiendo del dispositivo
var v = 0;
var g = 1.622;
var a = g;
var dt = 0.016683;
var timer = null;
var timerFuel = null;
var fuel = 100;
var playing = true;

//al cargar por completo la página...
window.onload = function() {
    //definición de eventos
    //mostrar menú móvil
    document.getElementById("showm").onclick = function() {
        document.getElementsByClassName("c")[0].style.display = "block";
        stop();
    }
    //ocultar menú móvil
    document.getElementById("hidem").onclick = function() {
        document.getElementsByClassName("c")[0].style.display = "none";
        start();
    }
    //encender/apagar el motor al hacer click en la pantalla
    //encender/apagar al apretar/soltar una tecla
    document.onkeydown = motorOn;
    document.onkeyup = motorOff;


}
start();

//Definición de funciones
function start() {
    timer = setInterval(function() {
        moverNave();
    }, dt * 1000);
}

function stop() {
    clearInterval(timer);
    end = false;
}

function moverNave() {
    v += a * dt;
    document.getElementById("velocidad").innerHTML = v.toFixed(1);
    y += v * dt;
    document.getElementById("altura").innerHTML = (70 - y).toFixed(1);

    //mover hasta que top sea un 70% de la pantalla
    if (y < 70) {
        document.getElementById("nave").style.top = y + "%";
    } else {
        stop();
        final();
        playing = false;
        clearInterval(timerFuel);
    }
}

function motorOn() {
    if (playing) {
        a = -g;
        if (timerFuel == null)
            timerFuel = setInterval(function() {
                actualizarFuel();
            }, 10);
        document.getElementById("naven").style.display = "none";
        document.getElementById("fuego").style.display = "block";
    }
}

function motorOff() {
    if (playing) {
        a = g;
        clearInterval(timerFuel);
        timerFuel = null;
        document.getElementById("naven").style.display = "block";
        document.getElementById("fuego").style.display = "none";
    }

}

function actualizarFuel() {
    //Aquí hay que cambiar el valor del marcador de Fuel...
    if (fuel > 0) {
        fuel -= 0.1;
        document.getElementById("fuel").innerHTML = fuel.toFixed(1);
    } else {
        motorOff();
        document.getElementById("fuel").innerHTML = 0;

    }
}

function reiniciarJuego() {
    location.reload();
}

function mostrarAyuda() {
    document.getElementById("ayuda").style.display = "block";
    document.getElementById("acerca").style.display = "none";
    stop();
	playing=false;
}

function ocultarAyuda() {
    document.getElementById("ayuda").style.display = "none";
    reiniciarJuego();
}

function mostrarAcerca() {
    document.getElementById("acerca").style.display = "block";
    document.getElementById("ayuda").style.display = "none";
    stop();
	playing=false;
}

function ocultarAcerca() {
    document.getElementById("acerca").style.display = "none";
    reiniciarJuego();
}

function final() {
    if (v > 5) {
        document.getElementById("naven").style.display = "none";
        document.getElementById("fuego").style.display = "none";
        document.getElementById("gameover").style.display = "block";
        document.getElementById("dep").style.display = "block";
    } else {
        document.getElementById("win").style.display = "block";
        document.getElementById("fuego").style.display = "none";
        document.getElementById("naven").style.display = "block";
    }
}

function ocultarOver() {
    document.getElementById("gameover").style.display = "none";
    reiniciarJuego();
}

function ocultarWin() {
    document.getElementById("win").style.display = "none";
    reiniciarJuego();
}