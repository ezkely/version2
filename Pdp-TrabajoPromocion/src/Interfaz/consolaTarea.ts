import { Tarea } from "../models/Tarea";

/**
 * Función recursiva que genera un string con la lista numerada de los títulos de las tareas.
 * Útil para mostrar un menú de selección dinámico.
 * * **Salida en consola:**
 * ```text
 * [1] Comprar leche
 * [2] Estudiar TypeScript
 * [3] Pasear al perro
 * ```
 * @param tareas - Arreglo de tareas a listar.
 * @param longitud - La cantidad total de tareas (usualmente tareas.length).
 * @param contador - Índice actual para la recursividad (iniciar en 0).
 * @returns Un string concatenado con todos los títulos numerados.
 */
function mostrarTitulos(tareas: Tarea[]): string {
    return tareas.map((tarea, index) => {
        // Generamos la línea individual pura
        return ` [${index + 1}] ${tarea.titulo}`;
    }).join('\n'); // Unimos el array de líneas con el salto de línea
}

/**
 * Genera una representación visual detallada y formateada de una tarea específica.
 * Incluye bordes y secciones para facilitar la lectura.
 * * **Salida en consola:**
 * ```text
 * ========================================
 * DETALLE DE TAREA            
 * ========================================
 *
 * --------------------------------------------------
 * TÍTULO: APRENDER ANGULAR
 * --------------------------------------------------
 * > ID:           123e4567-e89b...
 *
 * DESCRIPCIÓN:
 * Repasar componentes y servicios.
 *
 * ESTADO Y DIFICULTAD:
 * • Estado:       En curso
 * • Dificultad:   Media: ⭐⭐ 
 *
 * FECHAS:
 * • Creación:     1/12/2025, 10:00:00
 * • Vencimiento:  5/12/2025, 00:00:00
 * • Últ. Edición: No editada
 * --------------------------------------------------
 *
 * ========================================
 * ```
 * @param tarea - El objeto Tarea del cual se extraerán los datos.
 * @returns Un string con el diseño completo de la ficha de la tarea.
 */
function mostrarTareaCompletas(tarea: Tarea): String {
    return "\n========================================\n" +
           "            DETALLE DE TAREA            \n" +
           "========================================\n" +
           "\n" +
           "   --------------------------------------------------\n" +
           "    TÍTULO: " + tarea.titulo.toUpperCase() + "\n" +
           "   --------------------------------------------------\n" +
           "    > ID:           " + tarea.id + "\n\n" +
           "    DESCRIPCIÓN:\n" +
           "    " + tarea.descripcion + "\n\n" +
           "    ESTADO Y DIFICULTAD:\n" +
           "    • Estado:       " + tarea.estado + "\n" +
           "    • Dificultad:   " + tarea.dificultad + "\n\n" +
           "    FECHAS:\n" +
           "    • Creación:     " + tarea.fechaCreacion.toLocaleString() + "\n" + 
           "    • Vencimiento:  " + (tarea.fechaVencimiento ? tarea.fechaVencimiento?.toLocaleString() : "No establecida") + "\n" +
           "    • Últ. Edición: " + (tarea.ultimaEdicion ? tarea.ultimaEdicion?.toLocaleString() : "No editada") + "\n" +
           "   --------------------------------------------------\n" + 
           "\n========================================";    
}

export {mostrarTitulos , mostrarTareaCompletas}