import { OrdenTareasASC } from "../Interfaz/Consola";
import { Tarea, ESTADOS_TAREA, DIFICULTADES_TAREA } from "../models/Tarea";

function contarPorEstado(tareas: Tarea[], estado: string): number {
    return Math.ceil((tareas.reduce((count, tarea) => {
        return count + (tarea.estado.toLocaleLowerCase() === estado.toLocaleLowerCase() ? 1 : 0);
    }, 0)/ tareas.length) * 100);
}

function contarPorDificultad(tareas: Tarea[], dificultad: string): number {
    return Math.ceil((tareas.reduce((count, tarea) => {
        return count + (tarea.dificultad.toLocaleLowerCase() === dificultad.toLocaleLowerCase()  ? 1 : 0);
    }, 0)/ tareas.length) * 100);
} 


export { contarPorEstado, contarPorDificultad };
