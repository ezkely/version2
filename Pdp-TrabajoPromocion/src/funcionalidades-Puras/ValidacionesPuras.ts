import { Tarea } from "../models/Tarea";

/**
 * Verifica si un número es válido y está dentro del rango.
 * Función Pura.
 */
export function esNumeroValido(numero: number, min: number, max: number): boolean {
    return !Number.isNaN(numero) && numero >= min && numero <= max;
}

/**
 * Valida el título de una tarea (longitud y unicidad).
 * Función Pura.
 */
export function validarTitulo(titulo: string, tareas: Tarea[]): boolean {
    const longitudValida = titulo.length > 0 && titulo.length <= 100;
    // Acceso directo a propiedad titulo en lugar de getTitulo()
    const existe = tareas.some(tarea => tarea.titulo.toLowerCase() === titulo.toLowerCase());
    return longitudValida && !existe;
}

/**
 * Valida la descripción de una tarea (longitud).
 * Función Pura.
 */
export function validarDescripcion(descripcion: string): boolean {
    return descripcion.length <= 500;
}

/**
 * Verifica si una tarea está vencida respecto a una fecha de referencia.
 * Función Pura.
 */
export function esTareaVencida(tarea: Tarea, fechaReferencia: Date): boolean {
    const vencimiento = tarea.fechaVencimiento;
    if (!vencimiento) {
        return false;
    }
    return new Date(vencimiento).getTime() <= fechaReferencia.getTime();
}

/**
 * Filtra las tareas que no han sido eliminadas lógicamente.
 * Función Pura.
 */
export function filtrarActivas(tareas: Tarea[]): Tarea[] {
    return tareas.filter(item => item.eliminado !== true);
}

/**
 * Valida que un objeto tenga las propiedades requeridas para ser una Tarea.
 * Función Pura (lanza error si no es válido, o retorna true).
 */
export function validarEstructuraJSON(obj: any): boolean {
    if (obj.id === undefined) throw new Error("Falta 'id' en el JSON.");
    if (obj.titulo === undefined) throw new Error("Falta 'titulo' en el JSON.");
    if (obj.descripcion === undefined) throw new Error("Falta 'descripcion' en el JSON.");
    if (obj.estado === undefined) throw new Error("Falta 'estado' en el JSON.");
    if (obj.dificultad === undefined) throw new Error("Falta 'dificultad' en el JSON.");
    if (obj.fechaCreacion === undefined) throw new Error("Falta 'fechaCreacion' en el JSON.");
    if (obj.eliminado === undefined) throw new Error("Falta 'eliminado' en el JSON.");
    return true;
}
