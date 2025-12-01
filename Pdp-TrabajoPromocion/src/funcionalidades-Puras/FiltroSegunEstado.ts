import { Tarea } from "../models/Tarea";

/**
 * Filtra la lista de tareas para excluir aquellas que han sido eliminadas lógicamente.
 * Utilizado para mostrar la lista general de tareas activas.
 * @param tareas - El arreglo completo de tareas.
 * @returns Un nuevo arreglo que contiene solo las tareas cuyo atributo 'eliminado' es false.
 */
function filtrarTodas(tareas : Tarea[]): Tarea[] {
    // Retorna solo las tareas que NO están marcadas como eliminadas
    return tareas.filter(tarea => tarea.eliminado === false);
}

/**
 * Filtra las tareas por un estado específico, asegurando también que no estén eliminadas.
 * @param tareas - El arreglo completo de tareas.
 * @param estado - El estado por el cual se desea filtrar (ej: "Pendiente", "En curso").
 * @returns Un nuevo arreglo con las tareas activas que coinciden con el estado proporcionado.
 */
function filtroBusqueda(tareas : Tarea[], estado:string) : Tarea[]{
    // La condición verifica dos cosas:
    // 1. Que la tarea no esté eliminada (Soft delete).
    // 2. Que el estado de la tarea coincida estrictamente con el argumento recibido.
    return tareas.filter(tarea => tarea.estado === estado);
}

function BusquedaTitulo(tareas : Tarea[], titulo:string) : Tarea | undefined{
    return tareas.find(tarea =>tarea.titulo.toLowerCase().includes(titulo.toLowerCase()));
}

export{ filtroBusqueda , filtrarTodas, BusquedaTitulo}