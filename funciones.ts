const readline = require("readline-sync");

export interface Tarea {
  titulo: string;
  estado: string;
  descripcion: string;
  fechaCreacion: Date;
  dificultad: string;
  fechaVencimiento: Date | null;
  ultimaEdicion: Date;
}

export function crearTarea(titulo: string, tareas: Tarea[]): void {
  if (!titulo.trim()) {
    console.log("El titulo no puede estar vacío. La tarea no se guarda.");
    return;
  }

  const tarea: Tarea = {
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
export function mostrarTodasTareas(tareas: Tarea[], orden: string): void {
    switch (orden) {
      case "1":
        console.log("Tus tareas en orden ascendente son: ");
        console.log("-------------------------------");
        tareas.sort((a, b) => a.titulo.localeCompare(b.titulo));
        break;
      case "2":
        console.log("Tus tareas en orden por fecha de vencimiento ascendente son: ");
        console.log("-------------------------------");
        tareas.sort((a, b) => (a.fechaVencimiento || new Date(0)).getTime() - (b.fechaVencimiento || new Date(0)).getTime());
        break;
      case "3":
        console.log("Tus tareas en orden por fecha de creacion ascendente son: ");
        console.log("-------------------------------");
        tareas.sort((a, b) => a.fechaCreacion.getTime() - b.fechaCreacion.getTime());
        break;
      default:
        console.log("Opcion de orden no valida. Se mostraran sin orden.");
    }
  
    tareas.forEach((tarea, index) => {
      const dificultadEmoji = obtenerEmojiDificultad(tarea.dificultad);
      console.log(`[${index + 1}] ${tarea.titulo} - Dificultad: ${dificultadEmoji}`);
    });
  }

export function mostrarTareasPendientes(tareas: Tarea[]): void {
    const tareasPendientes = tareas.filter(
      (tarea) => tarea.estado.toLowerCase() === "pendiente"
    );
  
    if (tareasPendientes.length === 0) {
      console.log("No hay tareas pendientes.");
      return;
    }
    console.log("Estas son todas tus tareas pendientes");
    console.log("-------------------------------");
    tareasPendientes.forEach((tarea, index) => {
      console.log(`[${index + 1}] ${tarea.titulo}`);
    });
  }

export function mostrarTareasEnCurso(tareas: Tarea[]): void {
    const tareasEnCurso = tareas.filter(
      (tarea) => tarea.estado.toLowerCase() === "en curso"
    );
    
    if (tareasEnCurso.length === 0) {
      console.log("No hay tareas en curso.");
      return;
    }
    console.log("Estas son todas tus tareas en curso");
    console.log("-------------------------------");
    tareasEnCurso.forEach((tarea, index) => {
      console.log(`[${index + 1}] ${tarea.titulo}`);
    });
  }

export function mostrarTareasTerminadas(tareas: Tarea[]): void {
    const tareasTerminadas = tareas.filter(
      (tarea) => tarea.estado.toLowerCase() === "terminada"
    );
  
    if (tareasTerminadas.length === 0) {
      console.log("No hay tareas terminadas.");
      return;
    }
    console.log("Estas son todas tus tareas terminadas");
    console.log("-------------------------------");
    tareasTerminadas.forEach((tarea, index) => {
      console.log(`[${index + 1}] ${tarea.titulo}`);
    });
  }

 export function mostrarTareasCanceladas(tareas: Tarea[]): void {
    const tareasCanceladas = tareas.filter(
      (tarea) => tarea.estado.toLowerCase() === "cancelada"
    );
  
    if (tareasCanceladas.length === 0) {
      console.log("No hay tareas canceladas.");
      return;
    }
    console.log("Estas son todas tus tareas canceladas");
    console.log("-------------------------------");
    tareasCanceladas.forEach((tarea, index) => {
      console.log(`[${index + 1}] ${tarea.titulo}`);
    });
  }

export function buscarTarea(tareas: Tarea[]): void {
    const busqueda = readline.question("Introduce el titulo de la tarea a buscar: ").toLowerCase();
    const tareasEncontradas = tareas.filter(tarea => tarea.titulo.toLowerCase().includes(busqueda));
    console.log(`\n\n\n`);
    if (tareasEncontradas.length === 0) {
      console.log(`No se encontraron tareas con el título que contiene "${busqueda}".`);
      return;
    }
  
    console.log(`Tareas encontradas con el titulo que contiene "${busqueda}":`);
    console.log("-------------------------------");
  
    tareasEncontradas.forEach((tarea, index) => {
      const dificultadEmoji = obtenerEmojiDificultad(tarea.dificultad);
      console.log(`[${index + 1}] ${tarea.titulo} - Dificultad: ${dificultadEmoji}`);
    });
  
    const opcionDetalle = readline.questionInt("Selecciona el numero de la tarea para ver detalles (0 para volver): ");
    
    if (opcionDetalle > 0 && opcionDetalle <= tareasEncontradas.length) {
      const indiceTarea = opcionDetalle - 1;
      const tareaSeleccionada = tareasEncontradas[indiceTarea];
  
      if (tareaSeleccionada) {
        const dificultadEnEmoji = obtenerEmojiDificultad(tareaSeleccionada.dificultad);
        console.log(
          `Titulo: ${tareaSeleccionada.titulo}\nDescripcion: ${tareaSeleccionada.descripcion}\nEstado: ${tareaSeleccionada.estado}\nFecha de creacion: ${tareaSeleccionada.fechaCreacion ? tareaSeleccionada.fechaCreacion.toLocaleDateString() : 'Null'}\nFecha de vencimiento: ${tareaSeleccionada.fechaVencimiento ? tareaSeleccionada.fechaVencimiento.toLocaleDateString() : 'Null'}\nDificultad: ${dificultadEnEmoji}\n\n\n`
        );
      } else {
        console.log("La tarea seleccionada es nula.");
      }
    }
  }

export  function cambiarEstado(tareas: Tarea[], tarea: string, nuevoEstado: string): void {
    for (let i = 0; i < tareas.length; i++) {
      if (tareas[i].titulo === tarea) {
        tareas[i].estado = nuevoEstado;
      }
    }
  }

export function detalles(tarea: Tarea[]): string {
    console.log("¿Deseas ver los detalles de alguna tarea?");
    let indiceTarea = readline.questionInt(
      "Introduce el número para verla o 0 para volver: "
    );
  
    if (indiceTarea === 0) {
      console.log("Seleccionaste volver");
      return "f";
    } else {
      indiceTarea--;
      const tareaSeleccionada = tarea[indiceTarea];
      if (tareaSeleccionada) {
        const dificultadEnEmoji = obtenerEmojiDificultad(tareaSeleccionada.dificultad);
        console.log(
          `Titulo: ${tareaSeleccionada.titulo}\nDescripcion: ${tareaSeleccionada.descripcion}\nEstado: ${tareaSeleccionada.estado}\nFecha de creacion: ${tareaSeleccionada.fechaCreacion ? tareaSeleccionada.fechaCreacion.toLocaleDateString() : 'Null'}\nFecha de vencimiento: ${tareaSeleccionada.fechaVencimiento ? tareaSeleccionada.fechaVencimiento.toLocaleDateString() : 'Null'}\nDificultad: ${dificultadEnEmoji}\n\n\n`
        );
        return 'a'
      } else {
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

export function editarTarea(tareas: Tarea[], indice: number): void {
    console.log(`Estás editando la tarea ${tareas[indice].titulo}`);
    console.log(
      "- Si deseas mantener los valores del atributo simplemente déjalo en blanco."
    );
    console.log("- Si deseas dejar en blanco un atributo, presiona Enter.");
  
    // Editar descripción
    const nuevaDescripcion = readline.question("1. Ingresa la descripción: ");
    if (nuevaDescripcion !== "") {
      tareas[indice].descripcion = nuevaDescripcion;
    }
  
    // Editar estado con opciones
    let nuevoEstado = readline.question(
      "2. Ingresa el estado (P: Pendiente, E: En curso, T: Terminada, C: Cancelada): "
    ).toUpperCase();
  
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
    let nuevaDificultad = readline.question(
      "3. Ingresa la dificultad (1: Fácil, 2: Medio, 3: Difícil): "
    );
  
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
    const nuevoVencimiento = readline.question("4. Vencimiento (YYYY/MM/DD): ");
    if (nuevoVencimiento !== "") {
      const vencimiento = new Date(nuevoVencimiento);
      if (!isNaN(vencimiento.getTime())) {
        tareas[indice].fechaVencimiento = vencimiento;
      } else {
        console.log("El formato no es correcto, la fecha no se cambió.");
      }
    }
  
    // Registrar la última edición
    tareas[indice].ultimaEdicion = new Date();
  }

export function obtenerEmojiDificultad(dificultad: string): string {
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