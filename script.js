/* ============================================================
   CONFIGURA AQUÍ TU MENSAJE Y LOS DETALLES DE LA CARTA
   ============================================================ */

const NOMBRE = "mi amor";

const MENSAJE = `Mi nutria, mi amor, mi dirección y mi propósito.

Quería darte las gracias por pasar otro año conmigo, a pesar de que a veces tal vez no sea tan cute. Quería plasmar en esta carta lo mucho que te amo y que de verdad disfruto tu compañía.

Me has ayudado a darle dirección a mi vida y estaré eternamente agradecido por eso.

Me gusta demasiado que podemos ser completamente auténticos cuando estamos juntos, y valoro cómo cada día siempre vamos mejorando y ayudándonos para ser nuestra mejor versión.

Anteriormente me tocaba luchar solo, ser una nutria varada solita en medio del mar. Pero ahora que te encontré, sé a qué dirección ir en este inmenso océano, y no tengo miedo de afrontar cualquier reto siempre y cuando sea contigo.

Es curioso cómo ambos logramos conectar nuestros destinos. Definitivamente es algo que Dios hizo para que cada uno pudiera tener sentido en la vida, tener felicidad real que va más allá de aparentar, de todo el ruido que existe hoy en día.

Me gusta todo de ti: sos bonita, linda, inteligente y con un cuerpazo. Jamás dejaré que te sientas menos, porque tú vales demasiado; quiero que logres sentirte la más afortunada, así que lucharé para poder darte siempre lo mejor, porque es lo que te mereces al ser alguien con un corazón tan puro que hoy en día es tan difícil encontrar. Eres un tesoro que aprecio mucho.

Te amo demasiado y espero que siempre estemos juntos, que sigamos compartiendo recuerdos y éxitos, amor. Este es un año más, pero aún nos falta una vida juntos.

Quiero que sigamos construyendo un futuro juntos, siempre seremos los más prus. ¡Mi otter bonita!

Te deseo siempre todo lo mejor, porque tu felicidad siempre será mi felicidad. ¡Te amo mucho!`;

// Velocidad del efecto máquina de escribir (ms por carácter)
const VELOCIDAD_ESCRITURA_MS = 42;

// El mensaje se separa en fragmentos por línea en blanco (un párrafo = un fragmento).
// Cada fragmento se escribe con letra más grande que el anterior, y al terminar
// se desvanece para dar paso al siguiente.
const TAMANO_FUENTE_INICIAL_REM = 1.7;
const TAMANO_FUENTE_FINAL_REM = 3.3;

// Cuánto se queda un fragmento ya escrito en pantalla antes de desvanecerse (ms)
const PAUSA_ENTRE_FRAGMENTOS_MS = 10000;
// Duración del desvanecido entre fragmentos (ms) — debe coincidir con styles.css (.letter-text)
const DURACION_DESVANECIDO_MS = 550;

/* ============================================================
   FIN DE LA CONFIGURACIÓN
   ============================================================ */

const REDUCED_MOTION = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/* ---------------- Imágenes de nutrias (generadas por ti en Gemini) ---------------- */
// Relación ancho/alto real de cada PNG, para que floten sin deformarse.
const NUTRIA_IMG = {
  sola: { src: "assets/nutrias/sola.png", ratio: 640 / 348 },
  corazonPanza: { src: "assets/nutrias/corazon-panza.png", ratio: 640 / 348 },
  parejaManos: { src: "assets/nutrias/pareja-manos.png", ratio: 640 / 346 },
  asomada: { src: "assets/nutrias/asomada.png", ratio: 640 / 340 },
  corazonPareja: { src: "assets/nutrias/corazon-pareja.png", ratio: 640 / 571 },
};

function crearImgNutria(info, alt) {
  const img = document.createElement("img");
  img.src = info.src;
  img.alt = alt || "";
  img.draggable = false;
  return img;
}

/* ---------------- Utilidades ---------------- */
function rand(min, max) { return Math.random() * (max - min) + min; }
function choice(arr) { return arr[Math.floor(Math.random() * arr.length)]; }

/* ---------------- Capa de nutrias / burbujas ---------------- */
const capaNutrias = document.getElementById("otters-layer");
const capaBurbujas = document.getElementById("bubbles-layer");

function spawnNadadora() {
  const conCorazon = Math.random() < 0.35;
  const info = conCorazon ? NUTRIA_IMG.corazonPanza : NUTRIA_IMG.sola;
  const el = document.createElement("div");
  el.className = "floaty swimmer" + (Math.random() < 0.5 ? " left" : "");
  const width = rand(80, 145);
  el.style.width = width + "px";
  el.style.height = (width / info.ratio) + "px";
  el.style.top = rand(6, 70) + "vh";
  el.style.animationDuration = rand(14, 24) + "s";
  el.appendChild(crearImgNutria(info, "Nutria flotando"));
  capaNutrias.appendChild(el);
  el.addEventListener("animationend", () => el.remove());
}

function spawnPareja() {
  const info = NUTRIA_IMG.parejaManos;
  const el = document.createElement("div");
  const left = Math.random() < 0.5;
  el.className = "floaty pair" + (left ? " left" : "");
  const width = rand(140, 220);
  el.style.width = width + "px";
  el.style.height = (width / info.ratio) + "px";
  el.style.top = rand(8, 62) + "vh";
  el.style.animationDuration = rand(20, 30) + "s";
  el.appendChild(crearImgNutria(info, "Pareja de nutrias tomadas de la mano"));
  capaNutrias.appendChild(el);
  el.addEventListener("animationend", () => el.remove());
}

function spawnAsomada() {
  const info = NUTRIA_IMG.asomada;
  const borde = choice(["left", "right", "bottom"]);
  const el = document.createElement("div");
  el.className = "floaty peeker";
  const width = rand(110, 170);
  const size = width;
  el.style.width = width + "px";
  el.style.height = (width / info.ratio) + "px";
  el.appendChild(crearImgNutria(info, "Nutria asomándose"));

  const oculto = -(size * 0.6);
  if (borde === "left") {
    el.style.left = oculto + "px";
    el.style.top = rand(15, 75) + "vh";
    el.style.animationName = "peek-side-left";
  } else if (borde === "right") {
    el.style.right = oculto + "px";
    el.style.top = rand(15, 75) + "vh";
    el.style.animationName = "peek-side";
  } else {
    el.style.bottom = oculto + "px";
    el.style.left = rand(10, 80) + "vw";
    el.style.animationName = "peek-bottom";
  }
  el.style.animationDuration = rand(5, 7) + "s";
  capaNutrias.appendChild(el);
  el.addEventListener("animationend", () => el.remove());
}

function spawnBurbuja() {
  const el = document.createElement("div");
  const esCorazon = Math.random() < 0.35;
  const size = rand(10, 26);
  if (esCorazon) {
    el.className = "mini-heart";
    el.textContent = choice(["💗", "💕", "💓", "🩷"]);
    el.style.fontSize = size + "px";
  } else {
    el.className = "bubble";
    el.style.width = size + "px";
    el.style.height = size + "px";
  }
  el.style.left = rand(4, 96) + "vw";
  el.style.animationDuration = rand(7, 13) + "s";
  capaBurbujas.appendChild(el);
  el.addEventListener("animationend", () => el.remove());
}

let intervalos = [];
function iniciarFondoAnimado() {
  if (REDUCED_MOTION) {
    // Versión estática y suave: solo algunas nutrias fijas, sin bucles constantes
    for (let i = 0; i < 3; i++) spawnNadadora();
    spawnPareja();
    spawnBurbuja();
    return;
  }
  spawnNadadora(); spawnPareja(); spawnBurbuja();
  intervalos.push(setInterval(spawnNadadora, rand(3200, 4500)));
  intervalos.push(setInterval(spawnPareja, rand(9000, 13000)));
  intervalos.push(setInterval(spawnAsomada, rand(6000, 9000)));
  intervalos.push(setInterval(spawnBurbuja, 900));
}

/* ---------------- Sobre ---------------- */
const envolvente = document.getElementById("envelope");
const pantallaSobre = document.getElementById("envelope-screen");
const pantallaCarta = document.getElementById("letter-screen");
const botonReplay = document.getElementById("replay-btn");

envolvente.addEventListener("click", abrirSobre);

function abrirSobre() {
  if (envolvente.classList.contains("opening")) return;
  envolvente.classList.add("opening");
  envolvente.setAttribute("disabled", "true");

  intentarReproducirMusica();

  setTimeout(() => {
    pantallaSobre.classList.remove("active");
    pantallaCarta.classList.add("active");
    botonReplay.hidden = false;
    iniciarEscrituraCarta();
  }, REDUCED_MOTION ? 250 : 900);
}

/* ---------------- Máquina de escribir con tamaño creciente ---------------- */
const elementoTexto = document.getElementById("letter-text");
const areaFinal = document.getElementById("final-area");
const elementoPapel = document.querySelector(".paper");
const otterHug = document.getElementById("otter-hug");
const botonAmor = document.getElementById("love-btn");

let timeoutEscritura = null;

// El mensaje se parte en fragmentos por cada línea en blanco (un párrafo = un fragmento)
function partirEnFragmentos(mensaje) {
  return mensaje
    .split(/\n\s*\n/)
    .map((f) => f.trim())
    .filter(Boolean);
}

function iniciarEscrituraCarta() {
  // Reset visual
  elementoTexto.innerHTML = "";
  elementoTexto.classList.remove("fade-out");
  otterHug.hidden = true;
  otterHug.classList.remove("show");
  otterHug.innerHTML = "";
  botonAmor.hidden = true;
  botonAmor.classList.remove("show");
  clearTimeout(timeoutEscritura);

  const fragmentos = partirEnFragmentos(MENSAJE);
  mostrarFragmento(fragmentos, 0);
}

// Cuánto espacio vertical hay disponible para el texto dentro de la hoja
// (le resta el alto del área final, que siempre está reservado aunque oculto)
function espacioDisponibleParaTexto() {
  const estilos = getComputedStyle(elementoPapel);
  const padVertical = (parseFloat(estilos.paddingTop) || 0) + (parseFloat(estilos.paddingBottom) || 0);
  const alturaContenido = elementoPapel.clientHeight - padVertical;
  const alturaAreaFinal = areaFinal.getBoundingClientRect().height;
  return Math.max(90, alturaContenido - alturaAreaFinal - 24);
}

// Prueba el fragmento completo a un tamaño y lo va achicando hasta que quepa
// sin salirse de la hoja (nunca por debajo del tamaño inicial configurado).
function tamanoQueCabe(texto, tamanoIdeal) {
  let tam = tamanoIdeal;
  const disponible = espacioDisponibleParaTexto();
  elementoTexto.style.fontSize = tam.toFixed(2) + "rem";
  elementoTexto.textContent = texto;
  while (tam > TAMANO_FUENTE_INICIAL_REM && elementoTexto.scrollHeight > disponible) {
    tam -= 0.1;
    elementoTexto.style.fontSize = tam.toFixed(2) + "rem";
  }
  return tam;
}

function mostrarFragmento(fragmentos, indice) {
  const progreso = fragmentos.length > 1 ? indice / (fragmentos.length - 1) : 1;
  const tamIdeal = TAMANO_FUENTE_INICIAL_REM + (TAMANO_FUENTE_FINAL_REM - TAMANO_FUENTE_INICIAL_REM) * progreso;
  tamanoQueCabe(fragmentos[indice], tamIdeal);
  elementoTexto.innerHTML = "";
  elementoTexto.classList.remove("fade-out");

  const caracteres = Array.from(fragmentos[indice]);
  const total = caracteres.length;

  const cursor = document.createElement("span");
  cursor.className = "cursor";
  cursor.textContent = " ";
  elementoTexto.appendChild(cursor);

  const agregarCaracter = (ch) => {
    const nodo = ch === "\n" ? document.createElement("br") : document.createTextNode(ch);
    elementoTexto.insertBefore(nodo, cursor);
  };

  if (REDUCED_MOTION) {
    caracteres.forEach(agregarCaracter);
    cursor.remove();
    pasarAlSiguienteFragmento(fragmentos, indice);
    return;
  }

  let i = 0;
  function escribirSiguiente() {
    if (i >= total) {
      cursor.remove();
      pasarAlSiguienteFragmento(fragmentos, indice);
      return;
    }
    agregarCaracter(caracteres[i]);
    const pausaExtra = (caracteres[i] === "." || caracteres[i] === "," || caracteres[i] === "\n") ? 5 : 1;
    i++;
    timeoutEscritura = setTimeout(escribirSiguiente, VELOCIDAD_ESCRITURA_MS * pausaExtra);
  }
  escribirSiguiente();
}

function pasarAlSiguienteFragmento(fragmentos, indice) {
  const esUltimo = indice >= fragmentos.length - 1;
  const pausa = REDUCED_MOTION ? 250 : PAUSA_ENTRE_FRAGMENTOS_MS;

  timeoutEscritura = setTimeout(() => {
    if (esUltimo) {
      secuenciaFinal();
      return;
    }
    elementoTexto.classList.add("fade-out");
    timeoutEscritura = setTimeout(() => {
      mostrarFragmento(fragmentos, indice + 1);
    }, REDUCED_MOTION ? 80 : DURACION_DESVANECIDO_MS);
  }, pausa);
}

/* ---------------- Secuencia final ---------------- */
function secuenciaFinal() {
  otterHug.innerHTML = "";
  otterHug.appendChild(crearImgNutria(NUTRIA_IMG.corazonPareja, "Dos nutrias abrazadas formando un corazón"));
  otterHug.hidden = false;
  requestAnimationFrame(() => otterHug.classList.add("show"));

  setTimeout(() => {
    botonAmor.hidden = false;
    requestAnimationFrame(() => botonAmor.classList.add("show"));
    explosionCorazones(REDUCED_MOTION ? 10 : 34);
  }, REDUCED_MOTION ? 150 : 500);
}

botonAmor.addEventListener("click", () => {
  explosionCorazones(REDUCED_MOTION ? 12 : 40);
  botonAmor.animate(
    [{ transform: "scale(1)" }, { transform: "scale(1.15)" }, { transform: "scale(1)" }],
    { duration: 320, easing: "ease-out" }
  );
});

/* ---------------- Explosión de corazones ---------------- */
const capaExplosion = document.getElementById("heart-burst-layer");
const emojisCorazon = ["💕", "💖", "💗", "💓", "❤️", "🩷", "🦦"];

function explosionCorazones(cantidad) {
  const origenX = window.innerWidth / 2;
  const origenY = window.innerHeight * (botonAmor.hidden ? 0.5 : botonAmor.getBoundingClientRect().top / window.innerHeight);

  for (let i = 0; i < cantidad; i++) {
    const el = document.createElement("span");
    el.className = "burst-heart";
    el.textContent = choice(emojisCorazon);
    const size = rand(1, 2.4);
    el.style.fontSize = size + "rem";
    el.style.left = origenX + "px";
    el.style.top = origenY + "px";

    const angulo = rand(0, Math.PI * 2);
    const distancia = rand(80, 320);
    const dx = Math.cos(angulo) * distancia;
    const dy = Math.sin(angulo) * distancia - 60;
    const rot = rand(-60, 60);
    el.style.setProperty("--end-transform", `translate(${dx}px, ${dy}px) scale(1) rotate(${rot}deg)`);
    el.style.animationDuration = rand(0.9, 1.6) + "s";

    capaExplosion.appendChild(el);
    el.addEventListener("animationend", () => el.remove());
  }
}

/* ---------------- Volver a leer ---------------- */
botonReplay.addEventListener("click", () => {
  iniciarEscrituraCarta();
  pantallaCarta.scrollTo?.({ top: 0, behavior: "smooth" });
});

/* ---------------- Música ---------------- */
const musica = document.getElementById("bg-music");
const botonMusica = document.getElementById("music-toggle");
musica.volume = 0.6;

// Se llama en el primer toque a la carta (gesto del usuario), así el navegador
// sí permite reproducir audio aunque no se haya tocado el botón de música.
function intentarReproducirMusica() {
  if (!musica.paused) return;
  musica.play().then(() => {
    botonMusica.textContent = "⏸";
    botonMusica.setAttribute("aria-label", "Pausar música");
  }).catch(() => {
    // Aún no existe assets/music.mp3, o el navegador la bloqueó igual.
    // El botón de música se puede usar para reintentar manualmente.
  });
}

botonMusica.addEventListener("click", () => {
  if (musica.paused) {
    musica.play().then(() => {
      botonMusica.textContent = "⏸";
      botonMusica.setAttribute("aria-label", "Pausar música");
    }).catch(() => {
      // No hay archivo de música todavía (assets/music.mp3) o el navegador lo bloqueó
      botonMusica.textContent = "🔇";
      setTimeout(() => { botonMusica.textContent = "🎵"; }, 1200);
    });
  } else {
    musica.pause();
    botonMusica.textContent = "🎵";
    botonMusica.setAttribute("aria-label", "Reproducir música");
  }
});

/* ---------------- Arranque ---------------- */
document.addEventListener("DOMContentLoaded", () => {
  iniciarFondoAnimado();
});
