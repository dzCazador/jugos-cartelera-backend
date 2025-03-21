//importamos dependencias 
import 'dotenv/config';
import * as joi from 'joi';

//Creamos una interfaz que se encargue de mejorar el tipado de nuestro codigo
interface EnvVars{
    PORT: number;
    SECRET_KEY: string;
}
 
//Schema Joi Config
const envsSchema = joi.object({
    PORT: joi.number().required(), //le damos tipo e indicamos que es requerido
    SECRET_KEY: joi.string().required(),

}
).unknown(true) 

//Validamos las variables de entorno retorna error y las variables
const {error, value}=envsSchema.validate(process.env);

//Si hay error, lanzamos una excepcion con el mensaje de error
if (error) throw new Error(`Config validation error: ${error.message}`);
const envVars:EnvVars = value;

//Exportamos las variables de entorno
export const envs = {
    port:envVars.PORT,
    secredKey:envVars.SECRET_KEY,
}

