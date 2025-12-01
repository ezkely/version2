import { Tarea } from "../models/Tarea";

/**
 * Muestra el menú principal de la aplicación.
 * Contiene las opciones de navegación centrales para gestionar las tareas.
 * * **Salida en consola:**
 * ```text
 * ========================================
 * MENÚ PRINCIPAL              
 * ========================================
 * [1] - Ver Mis Tareas
 * [2] - Buscar Tarea
 * [3] - Agregar Tarea
 * [4] - Eliminar Tarea
 * [5] - Salir
 * ========================================
 * ```
 * @returns Un string formateado con las opciones del menú principal.
 */
function menu(): string {
    return "\n" +
    "========================================\n" +
    "            MENÚ PRINCIPAL              \n" +
    "========================================\n" +
    "   [1] - Ver Mis Tareas\n" +
    "   [2] - Buscar Tarea\n" +
    "   [3] - Agregar Tarea\n" +
    "   [4] - Eliminar Tarea\n" +
    "   [5] - Estadisticas\n" +
    "   [6] - Consultas extras\n" +
    "   [7] - Salir\n" +
    "========================================";
}

/**
 * Muestra el submenú para filtrar las tareas al visualizarlas.
 * Permite al usuario seleccionar si quiere ver todas o filtrar por estado.
 * * **Salida en consola:**
 * ```text
 * --- FILTRAR TAREAS ---
 *
 * [1] Todas
 * [2] Pendientes
 * [3] En curso
 * [4] Terminadas
 * [6] Volver al menú principal
 * ```
 * @returns El string con las opciones de filtrado.
 */
function VerMisTareas(): string {
    return "\n" +
    "--- FILTRAR TAREAS ---\n" +
    "\n" +
    "   [1] Todas\n" +
    "   [2] Pendientes\n" +
    "   [3] En curso\n" +
    "   [4] Terminadas\n" +
    "   [5] Volver al menú principal\n";
}

/**
 * Muestra las opciones disponibles para ordenar la lista de tareas.
 * Los criterios incluyen título, fechas y dificultad.
 * * **Salida en consola:**
 * ```text
 * --- ORDENAR POR ---
 *
 * [1] Título ascendente
 * [2] Fecha de vencimiento ascendente
 * [3] Fecha de creación ascendente
 * [4] Dificultad (de baja a alta)
 * [5] Volver al menú principal
 * ```
 * @returns El string con las opciones de ordenamiento.
 */
function OrdenTareasASC(): string {
    return "\n" +
    "--- ORDENAR POR ---\n" +
    "\n" +
    "   [1] Título ascendente\n" +
    "   [2] Fecha de vencimiento ascendente\n" +
    "   [3] Fecha de creación ascendente\n" +
    "   [4] Dificultad (de baja a alta)\n" +
    "   [5] Volver al menú principal\n";
}

/**
 * Muestra el menú de estadísticas y métricas.
 * Ofrece conteos totales y porcentajes desglosados.
 * * **Salida en consola:**
 * ```text
 * --- ESTADÍSTICAS ---
 *
 * [1] Total de tareas
 * [2] Porcentaje de tareas por estado
 * [3] Porcentaje de tareas por dificultad
 * [4] Volver al menú principal
 * ```
 * @returns El string con las opciones del menú de estadísticas.
 */
function menuEstad(): string {
    return "\n" +
    "========================================\n" +
    "          ESTADISTICA              \n" +
    "========================================\n" +
    "   [1] - Total de Tareas\n" +
    "   [2] - Porcentaje de Tareas por estado\n" +
    "   [3] - Porcentaje de Tareas por dificultad\n" +
    "   [4] - Volver al menú principal\n" +
    "========================================";
}

/**
 * Muestra el menú de consultas avanzadas o específicas.
 * Permite acceder a listas predefinidas como tareas de alta prioridad o vencidas.
 * * **Salida en consola:**
 * ```text
 * --- CONSULTAS AVANZADAS ---
 *
 * [1] Tareas de alta prioridad
 * [2] Tareas relacionadas
 * [3] Listado de tareas vencidas
 * [4] Prioridad de todas las Tareas
 * [5] Volver al menu principal
 * ```
 * @returns El string con las opciones de consultas avanzadas.
 */
function menuConsultas(): string {
    return "\n" +
    "========================================\n" +
    "         CONSULTAS EXTRAS              \n" +
    "========================================\n" +
    "   [1] - Tareas de alta prioridad\n" +
    "   [2] - Tareas relacionadas\n" +
    "   [3] - Listado de tareas vencidas\n" +
    "   [4] - Prioridad de todas las Tareas\n" +
    "   [5] - Volver al menú principal\n" +
    "========================================";
}

/**
 * Muestra el menú de selección de campos para editar una tarea.
 * Se utiliza dentro del flujo de edición para que el usuario elija qué atributo modificar.
 * * **Salida en consola:**
 * ```text
 * --- EDITAR CAMPO ---
 *
 * [1] Título
 * [2] Descripción
 * [3] Estado
 * [4] Dificultad
 * [5] Fecha de vencimiento
 * [6] Volver al menú principal
 * ```
 * @returns El string con los campos editables de la tarea.
 */
function PreguntaEditar(): string {
    return "\n" +
    "--- EDITAR CAMPO ---\n" +
    "\n" +
    "   [1] Título\n" +
    "   [2] Descripción\n" +
    "   [3] Estado\n" +
    "   [4] Dificultad\n" +
    "   [5] Fecha de vencimiento\n" +
    "   [6] Volver al menú principal\n";
}

/**
 * Retorna un mensaje simple para solicitar confirmación de edición.
 * * **Salida en consola:**
 * ```text
 * - Desea editar la tarea? (Y/N)
 * ```
 * @returns El string con la pregunta de confirmación (Y/N).
 */
function EditarY_N (): string{
    return "- Desea editar la tarea? (Y/N)\n"
}


export { 
    menu, 
    VerMisTareas, 
    OrdenTareasASC, 
    PreguntaEditar,
    EditarY_N,
    menuEstad,
    menuConsultas
};