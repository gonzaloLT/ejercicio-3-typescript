"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.obtenerEmojiDificultad = exports.editarTarea = exports.detalles = exports.cambiarEstado = exports.buscarTarea = exports.mostrarTareasCanceladas = exports.mostrarTareasTerminadas = exports.mostrarTareasEnCurso = exports.mostrarTareasPendientes = exports.mostrarTodasTareas = exports.crearTarea = void 0;
var readline = require("readline-sync");
function crearTarea(titulo, tareas) {
    if (!titulo.trim()) {
        console.log("El titulo no puede estar vacío. La tarea no se guarda.");
        return;
    }
    var tarea = {
        titulo: titulo,
        estado: "pendiente",
        descripcion: "",
        fechaCreacion: new Date(),
        dificultad: "facil",
        fechaVencimiento: null,
        ultimaEdicion: new Date()
    };
    tareas.push(tarea);
}
exports.crearTarea = crearTarea;
function mostrarTodasTareas(tareas, orden) {
    switch (orden) {
        case "1":
            console.log("Tus tareas en orden ascendente son: ");
            console.log("-------------------------------");
            tareas.sort(function (a, b) { return a.titulo.localeCompare(b.titulo); });
            break;
        case "2":
            console.log("Tus tareas en orden por fecha de vencimiento ascendente son: ");
            console.log("-------------------------------");
            tareas.sort(function (a, b) { return (a.fechaVencimiento || new Date(0)).getTime() - (b.fechaVencimiento || new Date(0)).getTime(); });
            break;
        case "3":
            console.log("Tus tareas en orden por fecha de creacion ascendente son: ");
            console.log("-------------------------------");
            tareas.sort(function (a, b) { return a.fechaCreacion.getTime() - b.fechaCreacion.getTime(); });
            break;
        default:
            console.log("Opcion de orden no valida. Se mostraran sin orden.");
    }
    tareas.forEach(function (tarea, index) {
        var dificultadEmoji = obtenerEmojiDificultad(tarea.dificultad);
        console.log("[".concat(index + 1, "] ").concat(tarea.titulo, " - Dificultad: ").concat(dificultadEmoji));
    });
}
exports.mostrarTodasTareas = mostrarTodasTareas;
function mostrarTareasPendientes(tareas) {
    var tareasPendientes = tareas.filter(function (tarea) { return tarea.estado.toLowerCase() === "pendiente"; });
    if (tareasPendientes.length === 0) {
        console.log("No hay tareas pendientes.");
        return;
    }
    console.log("Estas son todas tus tareas pendientes");
    console.log("-------------------------------");
    tareasPendientes.forEach(function (tarea, index) {
        console.log("[".concat(index + 1, "] ").concat(tarea.titulo));
    });
}
exports.mostrarTareasPendientes = mostrarTareasPendientes;
function mostrarTareasEnCurso(tareas) {
    var tareasEnCurso = tareas.filter(function (tarea) { return tarea.estado.toLowerCase() === "en curso"; });
    if (tareasEnCurso.length === 0) {
        console.log("No hay tareas en curso.");
        return;
    }
    console.log("Estas son todas tus tareas en curso");
    console.log("-------------------------------");
    tareasEnCurso.forEach(function (tarea, index) {
        console.log("[".concat(index + 1, "] ").concat(tarea.titulo));
    });
}
exports.mostrarTareasEnCurso = mostrarTareasEnCurso;
function mostrarTareasTerminadas(tareas) {
    var tareasTerminadas = tareas.filter(function (tarea) { return tarea.estado.toLowerCase() === "terminada"; });
    if (tareasTerminadas.length === 0) {
        console.log("No hay tareas terminadas.");
        return;
    }
    console.log("Estas son todas tus tareas terminadas");
    console.log("-------------------------------");
    tareasTerminadas.forEach(function (tarea, index) {
        console.log("[".concat(index + 1, "] ").concat(tarea.titulo));
    });
}
exports.mostrarTareasTerminadas = mostrarTareasTerminadas;
function mostrarTareasCanceladas(tareas) {
    var tareasCanceladas = tareas.filter(function (tarea) { return tarea.estado.toLowerCase() === "cancelada"; });
    if (tareasCanceladas.length === 0) {
        console.log("No hay tareas canceladas.");
        return;
    }
    console.log("Estas son todas tus tareas canceladas");
    console.log("-------------------------------");
    tareasCanceladas.forEach(function (tarea, index) {
        console.log("[".concat(index + 1, "] ").concat(tarea.titulo));
    });
}
exports.mostrarTareasCanceladas = mostrarTareasCanceladas;
function buscarTarea(tareas) {
    var busqueda = readline.question("Introduce el titulo de la tarea a buscar: ").toLowerCase();
    var tareasEncontradas = tareas.filter(function (tarea) { return tarea.titulo.toLowerCase().includes(busqueda); });
    console.log("\n\n\n");
    if (tareasEncontradas.length === 0) {
        console.log("No se encontraron tareas con el t\u00EDtulo que contiene \"".concat(busqueda, "\"."));
        return;
    }
    console.log("Tareas encontradas con el titulo que contiene \"".concat(busqueda, "\":"));
    console.log("-------------------------------");
    tareasEncontradas.forEach(function (tarea, index) {
        var dificultadEmoji = obtenerEmojiDificultad(tarea.dificultad);
        console.log("[".concat(index + 1, "] ").concat(tarea.titulo, " - Dificultad: ").concat(dificultadEmoji));
    });
    var opcionDetalle = readline.questionInt("Selecciona el numero de la tarea para ver detalles (0 para volver): ");
    if (opcionDetalle > 0 && opcionDetalle <= tareasEncontradas.length) {
        var indiceTarea = opcionDetalle - 1;
        var tareaSeleccionada = tareasEncontradas[indiceTarea];
        if (tareaSeleccionada) {
            var dificultadEnEmoji = obtenerEmojiDificultad(tareaSeleccionada.dificultad);
            console.log("Titulo: ".concat(tareaSeleccionada.titulo, "\nDescripcion: ").concat(tareaSeleccionada.descripcion, "\nEstado: ").concat(tareaSeleccionada.estado, "\nFecha de creacion: ").concat(tareaSeleccionada.fechaCreacion ? tareaSeleccionada.fechaCreacion.toLocaleDateString() : 'Null', "\nFecha de vencimiento: ").concat(tareaSeleccionada.fechaVencimiento ? tareaSeleccionada.fechaVencimiento.toLocaleDateString() : 'Null', "\nDificultad: ").concat(dificultadEnEmoji, "\n\n\n"));
        }
        else {
            console.log("La tarea seleccionada es nula.");
        }
    }
}
exports.buscarTarea = buscarTarea;
function cambiarEstado(tareas, tarea, nuevoEstado) {
    for (var i = 0; i < tareas.length; i++) {
        if (tareas[i].titulo === tarea) {
            tareas[i].estado = nuevoEstado;
        }
    }
}
exports.cambiarEstado = cambiarEstado;
function detalles(tarea) {
    console.log("¿Deseas ver los detalles de alguna tarea?");
    var indiceTarea = readline.questionInt("Introduce el número para verla o 0 para volver: ");
    if (indiceTarea === 0) {
        console.log("Seleccionaste volver");
        return "f";
    }
    else {
        indiceTarea--;
        var tareaSeleccionada = tarea[indiceTarea];
        if (tareaSeleccionada) {
            var dificultadEnEmoji = obtenerEmojiDificultad(tareaSeleccionada.dificultad);
            console.log("Titulo: ".concat(tareaSeleccionada.titulo, "\nDescripcion: ").concat(tareaSeleccionada.descripcion, "\nEstado: ").concat(tareaSeleccionada.estado, "\nFecha de creacion: ").concat(tareaSeleccionada.fechaCreacion ? tareaSeleccionada.fechaCreacion.toLocaleDateString() : 'Null', "\nFecha de vencimiento: ").concat(tareaSeleccionada.fechaVencimiento ? tareaSeleccionada.fechaVencimiento.toLocaleDateString() : 'Null', "\nDificultad: ").concat(dificultadEnEmoji, "\n\n\n"));
            return 'a';
        }
        else {
            console.log("La tarea seleccionada es nula.");
            return "f";
        }
        /*  if (tarea[indiceTarea]) {
           const dificultadEnEmoji = obtenerEmojiDificultad(tarea[indiceTarea].dificultad);
           const fechaCreacionString = tarea[indiceTarea].fechaCreacion ? tarea[indiceTarea].fechaCreacion.toLocaleDateString() : 'Null';
           const fechaVencimientoString = tarea[indiceTarea].fechaVencimiento ? tarea[indiceTarea].fechaVencimiento.toLocaleDateString() : 'Null';
     
           console.log(
             `Titulo: ${tarea[indiceTarea].titulo}\nDescripcion: ${tarea[indiceTarea].descripcion}\nEstado: ${tarea[indiceTarea].estado}\nFecha de creación: ${fechaCreacionString}\nFecha de vencimiento: ${fechaVencimientoString}\nDificultad: ${dificultadEnEmoji}\n\n\n`
           ); */
        /*   return "a";
        } else {
          console.log("La tarea seleccionada es nula o indefinida.");
          return "f";
        } */
    }
}
exports.detalles = detalles;
function editarTarea(tareas, indice) {
    console.log("Est\u00E1s editando la tarea ".concat(tareas[indice].titulo));
    console.log("- Si deseas mantener los valores del atributo simplemente déjalo en blanco.");
    console.log("- Si deseas dejar en blanco un atributo, presiona Enter.");
    // Editar descripción
    var nuevaDescripcion = readline.question("1. Ingresa la descripción: ");
    if (nuevaDescripcion !== "") {
        tareas[indice].descripcion = nuevaDescripcion;
    }
    // Editar estado con opciones
    var nuevoEstado = readline.question("2. Ingresa el estado (P: Pendiente, E: En curso, T: Terminada, C: Cancelada): ").toUpperCase();
    switch (nuevoEstado) {
        case "P":
            tareas[indice].estado = "pendiente";
            break;
        case "E":
            tareas[indice].estado = "en curso";
            break;
        case "T":
            tareas[indice].estado = "terminada";
            break;
        case "C":
            tareas[indice].estado = "cancelada";
            break;
        default:
            console.log("Valor no válido, se mantendrá el estado actual.");
    }
    // Editar dificultad con opciones
    var nuevaDificultad = readline.question("3. Ingresa la dificultad (1: Fácil, 2: Medio, 3: Difícil): ");
    switch (nuevaDificultad) {
        case "1":
            tareas[indice].dificultad = "facil";
            break;
        case "2":
            tareas[indice].dificultad = "medio";
            break;
        case "3":
            tareas[indice].dificultad = "dificil";
            break;
        default:
            console.log("Valor no válido, se mantendrá la dificultad actual.");
    }
    // Editar vencimiento
    var nuevoVencimiento = readline.question("4. Vencimiento (YYYY/MM/DD): ");
    if (nuevoVencimiento !== "") {
        var vencimiento = new Date(nuevoVencimiento);
        if (!isNaN(vencimiento.getTime())) {
            tareas[indice].fechaVencimiento = vencimiento;
        }
        else {
            console.log("El formato no es correcto, la fecha no se cambió.");
        }
    }
    // Registrar la última edición
    tareas[indice].ultimaEdicion = new Date();
}
exports.editarTarea = editarTarea;
function obtenerEmojiDificultad(dificultad) {
    switch (dificultad.toLowerCase()) {
        case "facil":
            return "★☆☆";
        case "medio":
            return "★★☆";
        case "dificil":
            return "★★★";
        default:
            return "";
    }
}
exports.obtenerEmojiDificultad = obtenerEmojiDificultad;
