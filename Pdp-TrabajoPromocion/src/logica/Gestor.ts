import { readFromFile,writeToFile } from "../utils/FileFunction";
import { Tarea, tareaFromJSON, toggleEliminado } from "../models/Tarea";
import { filtrarActivas } from "../funcionalidades-Puras/ValidacionesPuras";

/**
 * Clase Gestor: Actúa como el administrador de estado y persistencia.
 * Mantiene la lista de tareas en memoria y se encarga de guardar/cargar
 * los datos en el archivo JSON correspondiente.
 */
export class gestor {

    private name: string;   // Ruta o nombre del archivo JSON de persistencia
    private items: Tarea[]= []; // Arreglo en memoria que contiene las instancias de Tarea

    constructor(name: string){
        this.name = name;
        this.load(); // Carga los datos del archivo inmediatamente al instanciar la clase
    }

    /**
     * Lee el archivo JSON y convierte los objetos planos en instancias reales de la clase Tarea.
     * Esto es fundamental para recuperar los métodos (getters/setters) que se pierden en el JSON.
     */
    // esto cambio ya que las tareas se cargan pero de manera obj que es totalmente diferente a la clase tarea 
    // expliacion https://chatgpt.com/share/692aafab-d70c-8001-ba3b-c56c86831afc esta a final 
    private load():void{
        //cargar las tareas desde el archivo JSON
        const data = readFromFile(this.name);
        // Transformamos cada objeto genérico (any) en una instancia de Tarea usando el método estático fromJSON
        this.items = data.map((obj: any) => tareaFromJSON(obj));
    }

    /**
     * Guarda el estado actual del arreglo 'items' en el archivo físico.
     * Se llama automáticamente después de cada modificación (add, update, delete).
     */
    private save():void{
        //guardar las tareas en el archivo JSON
        writeToFile(this.name, this.items);
    }

    /**
     * Agrega una nueva tarea al listado y actualiza el archivo.
     * @param item - La nueva instancia de Tarea a agregar.
     */
    public addItem(item: Tarea):void{
        this.items.push(item);
        this.save();
    }

    /**
     * Busca una tarea por su ID y la reemplaza con la versión editada.
     * @param id - El UUID de la tarea a modificar.
     * @param editTarea - La instancia de Tarea con los datos ya modificados.
     * @returns true si la operación fue exitosa, false si el ID no existe.
     */
   public actItem():boolean{
        this.save();
        return true;
    }

    /**
     * Realiza un "Borrado Lógico" (Soft Delete).
     * No elimina el objeto del array, sino que cambia su propiedad 'eliminado' a true.
     * @param tareaid - El UUID de la tarea a "eliminar".
     * @returns true si se encontró y marcó como eliminada, false si no existe.
     */
    public deleteItem(tareaid: string): boolean{
        const index = this.getIndexById(tareaid);
        if(index === -1){
            return false; // Tarea no encontrada
        }
        // Cambia el estado interno de la tarea
        toggleEliminado(this.items[index]);
        this.save();
        return true;
    }

    /**
     * Método auxiliar para buscar la posición de una tarea en el arreglo.
     * @param tareaid - El UUID a buscar.
     * @returns El índice numérico (0...N) o -1 si no se encuentra.
     */
    public getIndexById(tareaid: string): number { // funcion pura 
        return this.items.findIndex(tarea => tarea.id === tareaid);
    }

    /**
     * Retorna el arreglo completo de tareas cargadas en memoria.
     */
    public getItems(): Tarea[] {
    // 1. Usa filter() para crear un nuevo array.
    // 2. Solo incluye los objetos donde 'item.eliminado' NO sea 'true'.
    //    (Es decir, donde sea 'false' o la propiedad no exista/sea null/undefined)
    return filtrarActivas(this.items);
  }   

}