import { Tarea, ESTADOS_TAREA, DIFICULTADES_TAREA } from "../models/Tarea";
const Logic = require('logicjs');

const lvar = Logic.lvar,
eq = Logic.eq,
and = Logic.and,
or = Logic.or,
run = Logic.run;



// -------------------------------------------------------------------

// 2. Helper puro con declaración de función tradicional
function calcularDiasRestantes(fechaVencimiento: Date, fechaActual:Date): number {; 

    const diffTiempo = fechaVencimiento.getTime() - fechaActual.getTime();
    const diffDias = Math.ceil(diffTiempo / (1000 * 60 * 60 * 24));
    return diffDias;
}

// -------------------------------------------------------------------

/**
 * @description Infiere la prioridad de una tarea usando reglas de logicjs, 
 * basadas en el vencimiento y la dificultad.
 * * @param tarea La tarea a evaluar.
 * @returns El nivel de prioridad inferido.
 */
function asignarPrioridadLogica(tarea: Tarea,fechaActual:Date): string {
    const dificultad: string = tarea.dificultad; 
    const vencimiento: Date | undefined = tarea.fechaVencimiento;
    
    // Manejo de caso sin fecha de vencimiento
    if (!vencimiento) {
        return "Media"; 
    }

    const diasRestantes: number = calcularDiasRestantes(vencimiento, fechaActual);

    // 1. Declarar la Variable Lógica (la incógnita que buscamos)
    const P = lvar(); 

    // 2. Definir las Reglas Lógicas (Goals)
    
    // --- REGLA A: Alta --- (Vence en <= 2 días Y Dificultad Alta)
    const reglaAlta = and(
        eq(diasRestantes <= 4, true),
        eq(dificultad, 'Alta: ⭐⭐⭐'), 
        eq(P, "Alta")
    );
    
    // --- REGLA B: MEDIA --- (Vence en <= 6 días O Dificultad Media)
    const reglaMedia = and( 
        eq(diasRestantes <= 8, true),
        eq(dificultad, 'Media: ⭐⭐'),
        eq(P, "Media")
    );

    // --- REGLA C: BAJA --- (Vence en más de 6 días Y Dificultad Baja)
    const reglaBaja = and(
        eq(diasRestantes > 8, true),
        eq(dificultad, 'Baja : ⭐'),
        eq(P, "Baja")
    );

    // 3. Ejecutar el Motor Lógico
    const consulta = or(reglaAlta, reglaMedia, reglaBaja);

    const resultados: string[] = run(consulta, P);

    // 4. Devolver el resultado inferido
    if (resultados.length > 0) {
        return resultados[0];
    }
    
    // Si ninguna regla estricta se cumple, es NORMAL
    return "Baja"; 
}

// Exportamos la función usando la declaración tradicional
export { asignarPrioridadLogica, calcularDiasRestantes };