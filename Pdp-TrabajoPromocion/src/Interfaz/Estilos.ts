// Archivo: Utils/Estilo.ts (o donde prefieras guardarlo)

/**
 * 🎨 CLASE DE ESTILOS VISUALES (ANSI ESCAPE CODES)
 * ------------------------------------------------
 * Esta clase contiene códigos estáticos para dar formato a la consola.
 * * ¿CÓMO USARLO?
 * Usamos "Template Strings" (las comillas ` `) e inyectamos la variable.
 * * Ejemplo: 
 * console.log(`${Estilo.CYAN}${Estilo.BOLD} Hola Mundo ${Estilo.RESET}`);
 * * 1. Estilo.COLOR -> Pinta el texto.
 * 2. Estilo.BOLD  -> Pone negrita.
 * 3. Estilo.RESET -> ¡IMPORTANTE! Apaga los estilos para no pintar todo lo demás.
 */

export class Estilo {
    static readonly RESET = "\x1b[0m";
    static readonly BOLD = "\x1b[1m";
    static readonly DIM = "\x1b[2m";
    static readonly ITALIC = "\x1b[3m";
    
    // Colores
    static readonly RED = "\x1b[31m";
    static readonly GREEN = "\x1b[32m";
    static readonly YELLOW = "\x1b[33m";
    static readonly CYAN = "\x1b[36m";
    static readonly WHITE = "\x1b[37m";
}


// actualmente en desuso xd era para probar algo xd xdx dxdxdxd xfdawfjqwe {    ktrp}