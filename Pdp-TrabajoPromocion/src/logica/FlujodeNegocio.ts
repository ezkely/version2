import { gestor } from "../logica/Gestor";
import { Tarea, tareaToString } from "../models/Tarea";
import { contarPorDificultad,contarPorEstado } from "../funcionalidades-Puras/Estadistica";
import { asignarPrioridadLogica } from "../funcionalidades-Puras/Prioridad";
import { esTareaVencida } from "../funcionalidades-Puras/ValidacionesPuras";

function manejoEstadisticas(opcion: number, tareas: Tarea[],estados:string[],dificultades:string[]): string | void {
    
    switch (opcion) {
        case 1:
            return(`\n Total de Tareas: ${tareas.length}`);
        case 2:
            return ("\n Porcentaje de Tareas por estado:\n" + estados.map(estado => 
                `- ${estado} = ${contarPorEstado(tareas, estado)} %`
            ).join('\n'));
        case 3:
            return ("\n Porcentaje de Tareas por dificultad:\n" + dificultades.map(dificultad => 
                `- ${dificultad} = ${contarPorDificultad(tareas, dificultad)} %`
            ).join('\n'));
 
        case 4:
            return " Volver al menú principal";

    }
}
function manejoConsultas(opcion: number, tareas:Tarea[],fecha:Date): string | void {
    switch (opcion) {
        case 1:
            return "\n Tareas de alta prioridad:\n"+tareas.filter(tarea => asignarPrioridadLogica(tarea,fecha) === "Alta").map(tarea => tareaToString(tarea))
            .join('\n----------------------------------------\n');
        case 2:
            return "\n Tareas relacionadas:";
            // Lógica para mostrar tareas relacionadas
            break;
        case 3:
            let aux=tareas.filter(tarea => esTareaVencida(tarea, fecha));
            if(aux.length === 0){
                return "\n No hay tareas vencidas.";
            }
            return "\n Tareas vencidas\n"+aux.map(tarea => tareaToString(tarea))
            .join('\n----------------------------------------\n');
        case 4:
            return "\n Tareas de alta prioridad:\n" + tareas
            .map(tarea => {
                // 1. Calculamos la prioridad de la tarea
                const prioridad = asignarPrioridadLogica(tarea, fecha);
                
                // 2. Devolvemos una cadena formateada que incluye el TÍTULO y la PRIORIDAD
                return `${tarea.titulo} (Prioridad: ${prioridad})`; 
            })
            // 3. Unimos todas las cadenas generadas con tu separador
            .join('\n----------------------------------------\n');
        case 5:
            return " Volver al menú principal";
    }
}

function manejoEliminar(gestorTareas: gestor,tarea:Tarea): string{
    const exito = gestorTareas.deleteItem(tarea.id);
    if(exito){
        return("\n [OK] Tarea eliminada exitosamente.");
    }  else{
        return("\n [!] Error al eliminar la tarea.");
    }
}
export { manejoEstadisticas, manejoConsultas, manejoEliminar };

