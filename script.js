/* =====================================================
   FECHA DEL EVENTO
   ===================================================== */

const fechaEvento =
    new Date("2026-11-14T14:00:00");


/* =====================================================
   CONTADOR
   ===================================================== */

const dias =
    document.getElementById("dias");

const horas =
    document.getElementById("horas");

const minutos =
    document.getElementById("minutos");

const segundos =
    document.getElementById("segundos");


function actualizarContador() {

    const ahora = new Date();

    const diferencia =
        fechaEvento - ahora;


    if (diferencia <= 0) {

        dias.textContent = "00";
        horas.textContent = "00";
        minutos.textContent = "00";
        segundos.textContent = "00";

        return;
    }


    const totalSegundos =
        Math.floor(
            diferencia / 1000
        );


    const diasRestantes =
        Math.floor(
            totalSegundos / 86400
        );


    const horasRestantes =
        Math.floor(
            (totalSegundos % 86400) / 3600
        );


    const minutosRestantes =
        Math.floor(
            (totalSegundos % 3600) / 60
        );


    const segundosRestantes =
        totalSegundos % 60;


    dias.textContent =
        String(diasRestantes)
            .padStart(2, "0");


    horas.textContent =
        String(horasRestantes)
            .padStart(2, "0");


    minutos.textContent =
        String(minutosRestantes)
            .padStart(2, "0");


    segundos.textContent =
        String(segundosRestantes)
            .padStart(2, "0");

}


actualizarContador();


setInterval(
    actualizarContador,
    1000
);


/* =====================================================
   BOTÓN DESCUBRIR
   ===================================================== */

const botonDescubrir =
    document.getElementById(
        "botonDescubrir"
    );


if (botonDescubrir) {

    botonDescubrir.addEventListener(
        "click",
        function () {

            const contador =
                document.getElementById(
                    "contador"
                );


            if (contador) {

                contador.scrollIntoView({
                    behavior: "smooth"
                });

            }

        }
    );

}


/* =====================================================
   MÚSICA
   ===================================================== */

const musica =
    document.getElementById(
        "musica"
    );


const botonMusica =
    document.getElementById(
        "botonMusica"
    );


let musicaActiva = false;


if (musica && botonMusica) {

    botonMusica.addEventListener(
        "click",
        function () {

            if (!musicaActiva) {

                musica
                    .play()
                    .then(() => {

                        musicaActiva = true;

                        botonMusica.textContent =
                            "🔊";

                    })
                    .catch(error => {

                        console.log(
                            "No se pudo reproducir la música:",
                            error
                        );

                    });

            } else {

                musica.pause();

                musicaActiva = false;

                botonMusica.textContent =
                    "♪";

            }

        }
    );

}


/* =====================================================
   PERSONALIZACIÓN DE INVITACIÓN
   ===================================================== */

const nombreInvitado =
    document.getElementById(
        "nombreInvitado"
    );


const cantidadBoletos =
    document.getElementById(
        "cantidadBoletos"
    );


/* =====================================================
   LEER PARÁMETRO DE LA URL
   ===================================================== */

const parametros =
    new URLSearchParams(
        window.location.search
    );


const identificador =
    parametros.get("invitado");


/* =====================================================
   BUSCAR INVITADO
   ===================================================== */

const invitado =
    invitados[identificador];


/* =====================================================
   MOSTRAR DATOS DEL INVITADO
   ===================================================== */

if (invitado) {

    if (nombreInvitado) {

        nombreInvitado.textContent =
            invitado.nombre;

    }


    if (cantidadBoletos) {

        cantidadBoletos.textContent =
            invitado.boletos;

    }

}


/* =====================================================
   ELEMENTOS DE BOLETOS DIGITALES
   ===================================================== */

const boletosDigitales =
    document.getElementById(
        "boletosDigitales"
    );


const boletosConfirmados =
    document.getElementById(
        "boletosConfirmados"
    );


const numeroBoletosConfirmados =
    document.getElementById(
        "numeroBoletosConfirmados"
    );


const textoBoletosConfirmados =
    document.getElementById(
        "textoBoletosConfirmados"
    );


/*
 * IMPORTANTE:
 *
 * Aquí NO mostramos todavía
 * los boletos confirmados.
 *
 * Solo aparecerán después
 * de que el invitado confirme.
 */


/* =====================================================
   CONFIRMACIÓN DE ASISTENCIA
   ===================================================== */

const formularioConfirmacion =
    document.getElementById(
        "formularioConfirmacion"
    );


const cantidadAsistentes =
    document.getElementById(
        "cantidadAsistentes"
    );


const numeroAsistentes =
    document.getElementById(
        "numeroAsistentes"
    );


const botonConfirmar =
    document.getElementById(
        "botonConfirmar"
    );


const mensajeConfirmacion =
    document.getElementById(
        "mensajeConfirmacion"
    );


/* =====================================================
   CREAR OPCIONES SEGÚN LOS BOLETOS
   ===================================================== */

if (
    invitado &&
    numeroAsistentes
) {

    for (
        let i = 1;
        i <= invitado.boletos;
        i++
    ) {

        const opcion =
            document.createElement(
                "option"
            );


        opcion.value = i;


        opcion.textContent =
            i === 1
                ? "1 persona"
                : `${i} personas`;


        numeroAsistentes.appendChild(
            opcion
        );

    }

}


/* =====================================================
   MOSTRAR / OCULTAR CANTIDAD
   ===================================================== */

const opcionesAsistencia =
    document.querySelectorAll(
        'input[name="asistencia"]'
    );


opcionesAsistencia.forEach(
    opcion => {

        opcion.addEventListener(
            "change",
            function () {

                if (
                    this.value === "si"
                ) {

                    if (cantidadAsistentes) {

                        cantidadAsistentes.style.display =
                            "block";

                    }

                } else {

                    if (cantidadAsistentes) {

                        cantidadAsistentes.style.display =
                            "none";

                    }


                    if (numeroAsistentes) {

                        numeroAsistentes.value =
                            "";

                    }

                }

            }
        );

    }
);


/* =====================================================
   CONFIRMAR ASISTENCIA
   ===================================================== */

if (botonConfirmar) {

    botonConfirmar.addEventListener(
        "click",
        function () {

            /* =========================================
               OBTENER RESPUESTA
               ========================================= */

            const asistencia =
                document.querySelector(
                    'input[name="asistencia"]:checked'
                );


            /* =========================================
               VALIDAR RESPUESTA
               ========================================= */

            if (!asistencia) {

                alert(
                    "Por favor selecciona una opción."
                );

                return;

            }


           /* =========================================
   NO ASISTIRÁN
   ========================================= */

if (
    asistencia.value === "no"
) {

    /* =========================================
       ENVIAR NO ASISTENCIA A GOOGLE SHEETS
       ========================================= */

    fetch(
        "https://script.google.com/macros/s/AKfycbyoHUh1Ny-2APatEfQxKD339b2I6UAKatmt0XRe1oGHadbjGHQG--GXkd52YeY9Y3IS/exec",
        {
            method: "POST",

            mode: "no-cors",

            body: JSON.stringify({

                accion:
                    "confirmar",

                idInvitado:
                    identificador,

                asistencia:
                    "No",

                personas:
                    0

            })
        }
    )

    .then(() => {

        console.log(
            "No asistencia enviada a Google Apps Script."
        );


        /* =================================
           OCULTAR FORMULARIO
           ================================= */

        if (formularioConfirmacion) {

            formularioConfirmacion.style.display =
                "none";

        }


        /* =================================
           MOSTRAR MENSAJE
           ================================= */

        if (mensajeConfirmacion) {

            mensajeConfirmacion.hidden =
                false;

        }

    })

    .catch(error => {

        console.error(
            "Error al enviar no asistencia:",
            error
        );


        alert(
            "No se pudo enviar la respuesta."
        );

    });


    return;

}
            /* =========================================
               SÍ ASISTIRÁN
               ========================================= */

            const cantidad =
                Number(
                    numeroAsistentes
                        ? numeroAsistentes.value
                        : 0
                );


            /* =========================================
               VALIDAR CANTIDAD
               ========================================= */

            if (!cantidad) {

                alert(
                    "Selecciona cuántas personas asistirán."
                );

                return;

            }


            /* =========================================
               SEGURIDAD
               ========================================= */

            if (
                !invitado
            ) {

                alert(
                    "No se encontró la información de esta invitación."
                );

                return;

            }


            if (
                cantidad > invitado.boletos
            ) {

                alert(
                    `Esta invitación tiene un máximo de ${invitado.boletos} boletos.`
                );

                return;

            }


            /* =========================================
               MOSTRAR BOLETOS CONFIRMADOS
               ========================================= */

            if (
                boletosConfirmados &&
                numeroBoletosConfirmados &&
                textoBoletosConfirmados
            ) {

                numeroBoletosConfirmados.textContent =
                    cantidad;


                textoBoletosConfirmados.textContent =
                    cantidad === 1
                        ? "boleto"
                        : "boletos";


                boletosConfirmados.hidden =
                    false;

            }


            /* =========================================
               ACTUALIZAR BOLETOS DIGITALES
               ========================================= */

            if (
                boletosDigitales
            ) {

                boletosDigitales.textContent =
                    cantidad === 1
                        ? "1 boleto"
                        : `${cantidad} boletos`;

            }


            /* =========================================
               ENVIAR A GOOGLE SHEETS
               ========================================= */

            fetch(
                "https://script.google.com/macros/s/AKfycbyoHUh1Ny-2APatEfQxKD339b2I6UAKatmt0XRe1oGHadbjGHQG--GXkd52YeY9Y3IS/exec",
                {
                    method: "POST",

                    mode: "no-cors",

                    body: JSON.stringify({

                        accion:
                            "confirmar",

                        idInvitado:
                            identificador,

                        personas:
                            cantidad

                    })
                }
            )

            .then(() => {

                console.log(
                    "Confirmación enviada a Google Apps Script."
                );


                /* =================================
                   OCULTAR FORMULARIO
                   ================================= */

                if (formularioConfirmacion) {

                    formularioConfirmacion.style.display =
                        "none";

                }


                /* =================================
                   MOSTRAR MENSAJE
                   ================================= */

                if (mensajeConfirmacion) {

                    mensajeConfirmacion.hidden =
                        false;

                }

            })

            .catch(error => {

                console.error(
                    "Error al enviar confirmación:",
                    error
                );


                alert(
                    "No se pudo enviar la confirmación."
                );

            });

        }
    );

}