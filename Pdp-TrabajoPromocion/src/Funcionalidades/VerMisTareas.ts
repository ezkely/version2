import PromptSync from "prompt-sync";
import { DIFICULTADES_TAREA, Tarea ,ESTADOS_TAREA} from "../models/Tarea";  
import { OrdenTareasASC, VerMisTareas,EditarY_N, PreguntaEditar } from "../Interfaz/Consola";
import { pedirNumero , Confirmacion} from "./Verificadores";
import { gestor } from "../logica/Gestor";
import { filtroBusqueda, filtrarTodas } from "../funcionalidades-Puras/FiltroSegunEstado"
import { OrdenadorTareas } from "../funcionalidades-Puras/ObjetoOrdenamiento";
import { mostrarTitulos , mostrarTareaCompletas } from "../Interfaz/ConsolaTarea";
import { validate } from "uuid";

// Inicialización de la entrada por consola
const prompt = PromptSync();

/**
 * Función principal para visualizar y gestionar las tareas existentes.
 * Permite filtrar, ordenar, ver detalles y editar tareas específicas.
 * * @param tareas - Instancia del gestor que contiene la lista de tareas.
 */
function verMisTareas( tareas : gestor ):void{

    console.clear();

    // --- VARIABLES DE USO INTERNO ---

    // Obtiene una copia de todas las tareas del gestor
    let todasLasTareas : Tarea [] = tareas.getItems();  

    let opcionVerTareas : number ; // Variable principal para capturar la opción numérica del usuario
    
    const Ordenador = new OrdenadorTareas; // Objeto encargado de la lógica de ordenamiento
    
    let tareasfiltradas : Tarea[] = []; // Almacena las tareas resultantes del primer filtro (por estado/dificultad)
    
    let tareasfiltradasOrdenanadas : Tarea[] = []; // Almacena las tareas filtradas y posteriormente ordenadas
    
    let tareaSeleccionada : Tarea ; // Almacena la tarea específica que el usuario decide ver/editar

    let validacion : boolean ; // Controla el bucle de edición para permitir múltiples cambios seguidos
    
    let index : number; // Guarda el índice seleccionado por el usuario para buscar en el arreglo
    
    let dato : string; // Variable auxiliar para capturar entradas de texto (título, descripción)
    
    let datonumerico : number; // Variable auxiliar para capturar entradas numéricas (estados, dificultades)

    let datoFecha : Date ; // Variable auxiliar para construir fechas
    //-------------------------------------------------------------
    // 1. SELECCIÓN DE FILTRO (¿Qué tareas quiero ver?)
    //-------------------------------------------------------------
    console.log(VerMisTareas()); // Muestra el menú de filtros (Todas, Alta, Media, Baja, Salir)

    opcionVerTareas = pedirNumero("" , 1 , 5 , false);

    // Lógica de filtrado según la dificultad o mostrar todas
    switch(opcionVerTareas){
        case 1:
            tareasfiltradas = filtrarTodas(tareas.getItems()); // Retorna todas las tareas sin filtrar
        break;
        case 2:
            tareasfiltradas = filtroBusqueda(tareas.getItems() ,ESTADOS_TAREA[0] ); // Filtra  pendientes
        break;
        case 3:
            tareasfiltradas= filtroBusqueda(tareas.getItems(), ESTADOS_TAREA[1]); // Filtra en curso
        break
        case 4:
            tareasfiltradas = filtroBusqueda(tareas.getItems(), ESTADOS_TAREA[2]); // Filtra termiandas
        break;
        case 5:
            console.log("\n Volviendo al menú principal...");
            prompt("\n Presione Enter para continuar...");
            return; // Sale de la función si elige volver al menú
    }

    //-------------------------------------------------------------
    // 2. SELECCIÓN DE ORDENAMIENTO (¿Cómo las quiero ver?)
    //-------------------------------------------------------------
    console.clear();
    console.log(OrdenTareasASC()); // Muestra menú de criterios de orden (Título, Vencimiento, Creación, Dificultad)
    opcionVerTareas = pedirNumero("" , 1 , 5, false);

    // Lógica de ordenamiento aplicada al arreglo ya filtrado
    switch(opcionVerTareas){
        case 1:
            tareasfiltradasOrdenanadas = Ordenador.porTitulo(tareasfiltradas);
        break;
        case 2 :
            tareasfiltradasOrdenanadas = Ordenador.porFechaVencimiento(tareasfiltradas);
        break;
        case 3 : 
            tareasfiltradasOrdenanadas = Ordenador.porFechaCreacion(tareasfiltradas);
        break;
        case 4 :
            tareasfiltradasOrdenanadas = Ordenador.porDificultad(tareasfiltradas, DIFICULTADES_TAREA)
        break;
    }

    //-------------------------------------------------------------
    // 3. SELECCIÓN DE TAREA ESPECÍFICA
    //-------------------------------------------------------------
    console.clear();
    console.log("\n========================================");
    console.log("       RESULTADOS DE LA BÚSQUEDA        ");
    console.log("========================================\n");
    
    // Muestra la lista numerada de títulos para que el usuario elija
    console.log(mostrarTitulos(tareasfiltradasOrdenanadas));

    // Validación: Si el filtro no arrojó resultados, no hay nada que seleccionar
    if (tareasfiltradasOrdenanadas.length === 0) {
        console.log("\n [i] No se encontraron tareas con ese criterio.");
        prompt("\n Presione Enter para continuar...");
        return;
    }

    console.log("\n----------------------------------------");
    // El usuario selecciona el índice de la tarea que quiere inspeccionar
    index = pedirNumero("Indique la tarea que desea visualizar" , 1 , tareasfiltradasOrdenanadas.length, false);

    //-------------------------------------------------------------
    // 4. VISUALIZACIÓN DETALLADA
    //-------------------------------------------------------------
    console.clear();

    // Reconstruimos la tarea desde JSON/Objeto para asegurar tener sus métodos
    // Nota: index-1 convierte la selección humana (1,2,3) a índice de array (0,1,2)
    tareaSeleccionada = tareasfiltradasOrdenanadas[index-1];
    
    // Muestra todos los detalles de la tarea seleccionada
    console.log(mostrarTareaCompletas(tareaSeleccionada));

    prompt("\n Presione Enter para continuar...");

    //-------------------------------------------------------------
    // 5. MÓDULO DE EDICIÓN
    //-------------------------------------------------------------
    
    // Pregunta si desea editar la tarea visualizada
    opcionVerTareas = Confirmacion(EditarY_N())

    if(opcionVerTareas == 0){
        console.clear();
        console.log("Volviendo al menu")
        prompt("\n Presione Enter para continuar...");
        return; // Sale si no quiere editar
    }

    // Bucle de edición: Permite realizar múltiples cambios en la misma sesión
    do{
        console.clear();
        // Muestra el estado actual de la tarea antes de editar
        console.log(mostrarTareaCompletas(tareaSeleccionada));
        
        validacion = true ; // Mantiene el bucle activo por defecto
        
        // Muestra menú de campos editables (Título, Descripción, Estado, Dificultad, Vencimiento, Salir)
        opcionVerTareas = pedirNumero(PreguntaEditar() , 1 , 6, false);
        
        switch(opcionVerTareas){

            case 1: // EDITAR TÍTULO
                console.clear();
                dato = prompt("Ingrese el título de la tarea (max 100 caracteres): ")?.trim() ||"";
                
                // Validación: Longitud y unicidad (no puede llamarse igual a otra tarea activa)
                while(dato.length == 0 || dato.length > 100 || todasLasTareas.some(tarea => (tarea.titulo.toLowerCase() === dato.toLowerCase() ) && (tarea.estado != "true") )){
                    console.log("\n [!] Título inválido. Intente nuevamente.")
                    dato = prompt("Ingrese el título de la tarea (max 100 caracteres): ")?.trim() ||"";
                }
                
                tareaSeleccionada.titulo = dato; // Actualiza en memoria local
                tareaSeleccionada.ultimaEdicion = new Date(); // Actualiza fecha de última edición
                
                prompt("\n Presione Enter para continuar...");
            break;

            case 2: // EDITAR DESCRIPCIÓN
                console.clear();
                dato = prompt("Ingrese la descripción (Opcional, max 500 caracteres): ")?.trim() ||"";
                
                // Validación de longitud
                while(dato.length > 500){
                    console.log("\n [!] Descripción inválida. Intente nuevamente.")
                    dato = prompt("Ingrese la descripción (max 500 caracteres): ")?.trim() ||"";
                }
                tareaSeleccionada.descripcion = dato;
                tareaSeleccionada.ultimaEdicion = new Date();


                prompt("\n Presione Enter para continuar...");
            break;

            case 3: // EDITAR ESTADO
                console.clear();
                // Muestra lista de estados disponibles
                for(let i:number = 0 ; i<ESTADOS_TAREA.length ; i++ ){ console.log( (i+1)+" ) " + ESTADOS_TAREA[i])}
                
                datonumerico = pedirNumero("Seleccione el nuevo estado actual - Apretar ENTER la dejara en pendiente -" , 1 , ESTADOS_TAREA.length , true);
                
                tareaSeleccionada.estado = ESTADOS_TAREA[datonumerico-1];
                tareaSeleccionada.ultimaEdicion = new Date();


                prompt("\n Presione Enter para continuar...");
            break;

            case 4: // EDITAR DIFICULTAD
                console.clear();
                // Muestra lista de dificultades
                for(let i:number = 0 ; i<DIFICULTADES_TAREA.length ; i++ ){ console.log( (i+1)+" ) " + DIFICULTADES_TAREA[i])}
                
                datonumerico=pedirNumero("Seleccione la nueva dificultad. - Apretar ENTER la dejara en Baja: ⭐ - " , 1 , DIFICULTADES_TAREA.length , true);
                
                tareaSeleccionada.dificultad = DIFICULTADES_TAREA[datonumerico-1];
                tareaSeleccionada.ultimaEdicion = new Date();

                prompt("\n Presione Enter para continuar...");
            break;

            case 5: // EDITAR FECHA DE VENCIMIENTO
                console.clear();
                console.log("\n--- Ingrese la fecha ---");
        
                let año : number = pedirNumero("Porfavor indique el año de vencimiento\n" , 2025 , 2035 , false);
                let mes : number = pedirNumero("Porfavor indique el mes de vencimiento \n" , 1 , 12 , false);
                let dia : number = pedirNumero("Porfavor indique el dia de vencimiento \n" , 1 , 31 , false);
                
                // Nota: new Date(año, mes, dia) usa mes base 0 si no se corrige, verificar lógica interna de Date
                datoFecha = new Date(año, mes, dia); 
                
                tareaSeleccionada.fechaVencimiento = datoFecha;
                tareaSeleccionada.ultimaEdicion = new Date();

                prompt("\n Presione Enter para continuar...");
            break;

            case 6: // SALIR DEL SUBMENÚ DE EDICIÓN
                console.clear();
                tareas.actItem();
                console.log("Volviendo al menu principal");
                prompt("\n Presione Enter para continuar...");
                validacion = false; // Rompe el bucle de edición
            break;
        }
    }while(validacion);
    
}

export {verMisTareas as vertarea}