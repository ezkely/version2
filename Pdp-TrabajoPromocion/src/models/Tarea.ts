import { v4 as uuid } from 'uuid';
import { validarEstructuraJSON } from '../funcionalidades-Puras/ValidacionesPuras';

// Constantes globales
export const ESTADOS_TAREA : string[] = ['Pendiente', 'En curso', 'Terminada' , "Cancelada"];
export const DIFICULTADES_TAREA : string[] = ['Baja: ⭐', 'Media: ⭐⭐', 'Alta: ⭐⭐⭐'];

/**
 * Interfaz principal que representa una Tarea.
 * Reemplaza a la antigua clase Tarea.
 */
export interface Tarea {
    id: string;
    titulo: string;
    descripcion: string;
    estado: string;
    dificultad: string;
    fechaCreacion: Date;
    fechaVencimiento?: Date;
    ultimaEdicion?: Date;
    eliminado: boolean;
}

/**
 * Factory function para crear una nueva Tarea.
 * Reemplaza al constructor de la clase.
 */
export function crearTarea(titulo: string, descripcion: string, estado: string, dificultad: string, fechaVencimiento?: Date): Tarea {
    return {
        id: uuid(),
        titulo: titulo,
        descripcion: descripcion,
        estado: estado || ESTADOS_TAREA[0],
        dificultad: dificultad || DIFICULTADES_TAREA[0],
        fechaCreacion: new Date(),
        fechaVencimiento: fechaVencimiento || undefined,
        eliminado: false
    };
}

/**
 * Convierte un objeto plano (JSON) en una Tarea válida.
 * Reemplaza a Tarea.fromJSON.
 */
export function tareaFromJSON(obj: any): Tarea {
    validarEstructuraJSON(obj);
    
    return {
        id: obj.id,
        titulo: obj.titulo,
        descripcion: obj.descripcion,
        estado: obj.estado,
        dificultad: obj.dificultad,
        fechaCreacion: new Date(obj.fechaCreacion),
        fechaVencimiento: obj.fechaVencimiento ? new Date(obj.fechaVencimiento) : undefined,
        ultimaEdicion: obj.ultimaEdicion ? new Date(obj.ultimaEdicion) : undefined,
        eliminado: obj.eliminado
    };
}

/**
 * Genera una representación en string de la tarea.
 * Reemplaza a tarea.toString().
 */
export function tareaToString(tarea: Tarea): string {
    return `---Título=${tarea.titulo}---\nID=${tarea.id}\n Descripción=${tarea.descripcion}\n Estado=${tarea.estado}\n Dificultad=${tarea.dificultad}\n Fecha de Creación=${tarea.fechaCreacion.toLocaleString()}\n Fecha de Vencimiento=${tarea.fechaVencimiento ? tarea.fechaVencimiento.toLocaleString() : 'No establecida'}\n Última Edición=${tarea.ultimaEdicion ? tarea.ultimaEdicion.toLocaleString() : 'No editada'}\n Eliminado=${tarea.eliminado}]`;
}

/**
 * Alterna el estado de eliminado y actualiza la fecha de edición.
 * Reemplaza a tarea.setElimado().
 */
export function toggleEliminado(tarea: Tarea): void {
    tarea.eliminado = !tarea.eliminado;
    tarea.ultimaEdicion = new Date();
}