//Activo el dirname para tener la ruta absoluta.
import { dirname } from 'path'
import { fileURLToPath } from "url";
export const  __dirname = dirname(fileURLToPath(import.meta.url));