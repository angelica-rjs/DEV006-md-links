/*export default () => {
  const fs = required('fs')
};*/
//mdLink("","")

const path = require('path');
let fs = require('fs');


mdLink('C://Users/ange_/DEV006-md-links/hola.txt')

function mdLink(ruta, option = {validate: false}){
  validate(ruta, option)
  ruta = generateRoute(ruta)
  console.log('Ruta absoluta:', ruta);
  routeExists(ruta)
  //TODO: Verificar si es directorio o archivo
  esRutaoArchivo(ruta)

  //TODO: recore (procesa)la ruta 

  //TODO: crear una promesa y a regresar
}

function validate(ruta){
  if(ruta == null){
    throw new TypeError("La ruta no debe ser nula")
  }
}

function generateRoute(ruta){
  if (path.isAbsolute(ruta)){
    console.log("es absoluta")
  }else{
    ruta = path.resolve(ruta);
    }
  return ruta
}

function routeExists(ruta){
  try {
    fs.accessSync(ruta);
    console.log("la ruta existe")
    return ruta
  } catch (error) {
    throw new TypeError("La ruta no existe")
  }
}


/*function esRutaoArchivo(ruta){
  if(fs.lstatSync(ruta).isDirectory()){
    console.log("es un directorio")
  }else{
    console.log("es un archivo")
  }

}*/
