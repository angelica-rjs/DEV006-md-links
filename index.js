/*export default () => {
  const fs = required('fs')
};*/

const path = require('path');
let fs = require('fs');

let allFiles = []

mdLink('C://Users/ange_/DEV006-md-links/directorio1')
/*-------------------------------------------------------- */
function mdLink(ruta, option = {validate: false}){
  validate(ruta, option)
  ruta = generateRoute(ruta)
  console.log('Ruta absoluta:', ruta);
  routeExists(ruta)
  let pathType= isDirectory(ruta)
  if( pathType == true){
    //directorio
    const result = searchFiles(ruta)
    console.log("todos los archivos del directorio: ", result)
    //console.log("resultado de searchFiles: ",result)

  }else{
    //Archivo
    getExtension(ruta)
  }
  //leerArchivo(ruta)
 //TODO: crear una promesa y a regresar
}
/*-------------------------------------------------------- */


function getExtension(ruta){
  let routes = []

  if(ruta.split(".").pop() == "md"){
    routes.push(ruta)
    console.log("es md")
    //se retorna en un array
    console.log(routes[0])
  }else{
    console.log("no es md")
    //TODO: se debe acabar el flujo ? que pasa si hay mas archivo esperando validar?
  }

}

//TODO: revisar leerArchivo y cambiar nombre 
async function leerArchivo(ruta){
  //Para este proyecto te sugerimos no utilizar la versión síncrona de 
  //la función para leer archivos, readFileSync, y en cambio intentar 
  //resolver este desafío de manera asíncrona.
  // TODO: asincrono
  fs.readFile(ruta, 'utf-8', (err, data) => {
    if (err){
       throw err;}
    console.log("El contenido es: ", data);
    // BLOQUEO: ¿Debo aca obtener los link?
    //TODO: Debe retornar algo ?
    
  })
}

/* obtener todos los .md de un diretorio 
 files.forEach(file => {
  if (path.extname(file) == ".md")
    console.log(file);
}) */



//TERMINADAS    
function validate(ruta, option){
  if(ruta == null){
    throw new TypeError("La ruta no debe ser nula")
  }
  if(typeof option === "boolean"){
    throw new TypeError("debe ingresar un booleano")
  }
}

function generateRoute(ruta){
  if (path.isAbsolute(ruta)){
    console.log("es absoluta")
  }else{
    console.log("es relativa")
    ruta = path.resolve(ruta);
    }
  return ruta
}

function routeExists(ruta){
  //sincrono
  try {
    fs.accessSync(ruta);
    console.log("la ruta existe")
    return ruta
  } catch (error) {
    throw new TypeError("La ruta no existe")
  }
}

function isDirectory(ruta){
  if(fs.lstatSync(ruta).isDirectory()){
    console.log("es un directorio")
    return true
  }else{
    console.log("es un archivo")
    
  }
}

function searchFiles(directorio){
  const archivos = fs.readdirSync(directorio);

  if (archivos.length === 0) {
    console.log('El directorio está vacío');
  }
  archivos.forEach((file) => {
    const fileObsolute = path.resolve(directorio, file);
    if (fs.lstatSync(fileObsolute).isDirectory()){
      const getRecursiveFiles =searchFiles(fileObsolute)
      allFiles.concat(getRecursiveFiles)
    }else{
      const route ={
        ruta: file,
      }
      allFiles.push(route)
    }
  });

  return allFiles;
}