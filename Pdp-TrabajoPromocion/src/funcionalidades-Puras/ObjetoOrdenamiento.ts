import {Tarea } from "../models/Tarea";

/**
 * Clase encargada de proporcionar distintos mecanismos de ordenamiento para listas de Tareas.
 * Utiliza un enfoque funcional donde se pasa una función comparadora genérica.
 */
export class OrdenadorTareas {

    // =========================================================
    // MÉTODOS PRIVADOS (Lógica interna de comparación)
    // =========================================================

    /**
     * Función "padre" o genérica que ejecuta el ordenamiento.
     * Crea una copia del arreglo original para no mutarlo directamente.
     * @param items - Lista de tareas a ordenar.
     * @param comparador - Función que define la lógica de orden (a vs b).
     * @returns Un nuevo arreglo de tareas ordenado.
     */
    private ordenarLista(items: Tarea[], comparador: (a: Tarea, b: Tarea) => number): Tarea[] {
        // Spread operator [...] para romper la referencia y retornar un nuevo array
        return [...items].sort(comparador);
    }

    /**
     * Comparador alfabético para títulos.
     * Utiliza localeCompare para manejar correctamente acentos y caracteres especiales.
     */
    private compararPorTitulo(a: Tarea, b: Tarea): number {
        return a.titulo.localeCompare(b.titulo);
    }

    /**
     * Comparador cronológico para fechas de vencimiento.
     * Maneja el caso de fechas indefinidas (tareas sin vencimiento van al final).
     */
    private compararPorFechaVencimiento(a: Tarea, b: Tarea): number {
        const fechaA = a.fechaVencimiento;
        const fechaB = b.fechaVencimiento;
        
        // Si A no tiene fecha, es "mayor" (va después)
        if (!fechaA) return 1;
        // Si B no tiene fecha, A es "menor" (va antes)
        if (!fechaB) return -1;
        
        // Resta de timestamps: negativo si A es antes que B, positivo si después
        return new Date(fechaA).getTime() - new Date(fechaB).getTime();
    }

    /**
     * Comparador cronológico para fecha de creación.
     */
    private compararPorFechaCreacion(a: Tarea, b: Tarea): number {
        const tiempoA = new Date(a.fechaCreacion);
        const tiempoB = new Date(b.fechaCreacion);
        return tiempoA.getTime() - tiempoB.getTime();
    }

    /**
     * Comparador basado en un orden de dificultad personalizado.
     * @param orden - Arreglo de strings que define la jerarquía (ej: ['Baja', 'Media', 'Alta']).
     */
    // Método 100% Puro: Recibe el orden explícitamente para evitar dependencias externas duras
    private compararPorDificultad(a: Tarea, b: Tarea, orden: string[]): number {
        // Busca el índice de la dificultad en el arreglo de referencia
        const indexA = orden.indexOf(a.dificultad.toLowerCase());
        const indexB = orden.indexOf(b.dificultad.toLowerCase());
        
        // Ordena de menor índice (ej: Baja=0) a mayor índice (ej: Alta=2)
        return indexA - indexB;
    }

    // =========================================================
    // MÉTODOS PÚBLICOS (API expuesta)
    // =========================================================

    /**
     * Ordena las tareas alfabéticamente por título.
     */
    public porTitulo(tareas: Tarea[]): Tarea[] {
        return this.ordenarLista(tareas, (a, b) => this.compararPorTitulo(a, b));
    }

    /**
     * Ordena las tareas por fecha de vencimiento (más próximas primero).
     */
    public porFechaVencimiento(tareas: Tarea[]): Tarea[] {
        return this.ordenarLista(tareas, (a, b) => this.compararPorFechaVencimiento(a, b));
    }

    /**
     * Ordena las tareas por fecha de creación (más antiguas primero).
     */
    public porFechaCreacion(tareas: Tarea[]): Tarea[] {
        return this.ordenarLista(tareas, (a, b) => this.compararPorFechaCreacion(a, b));
    }

    /**
     * Ordena las tareas según la dificultad, basándose en el arreglo de orden provisto.
     */
    // Aquí limpiamos la variable redundante y pasamos el orden necesario
    public porDificultad(tareas: Tarea[], orden: string[]): Tarea[] {
        return this.ordenarLista(tareas, (a, b) => this.compararPorDificultad(a, b, orden));
    }
}











// No borrar 

/* 

(a, b) => this.compararPorDificultad(a, b, orden)

¡Exacto! Esa línea es una obra maestra de eficiencia. 🎯

Esa simple flecha => está haciendo dos trabajos vitales al mismo tiempo. Es como una "Navaja Suiza".

Aquí te resumo los dos problemas que soluciona en una sola línea:

1. Funciona como un "Adaptador de Enchufe" (Argumentos) 🔌
El método .sort() es rígido: solo sabe entregar dos cosas (a y b). Pero tú necesitas tres (a, b y orden).

Sin la flecha: El .sort() intentaría meter 2 cables en un enchufe de 3 agujeros. Error.

Con la flecha: La función flecha recibe los 2 cables (a, b) y agrega el tercero (orden) que tenía guardado en el bolsillo (gracias al Closure).

2. Funciona como un "Ancla" (Contexto this) ⚓
Aunque tu método privado ya no use this por dentro (porque es puro), necesitas this para encontrar el método privado dentro de la clase.

Sin la flecha: Si pasas la función suelta, JavaScript olvida en qué objeto vive. Intenta llamar a compararPorDificultad en el aire y falla.

Con la flecha: La flecha mantiene el código "anclado" a la instancia de la clase. Permite ejecutar this.compararPorDificultad(...) sin que el programa diga "¿Quién es this?".*/