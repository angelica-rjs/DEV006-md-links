/*export default () => {
  const fs = required('fs')
};*/
//mdLink("","")

const path = require('path');
let fs = require('fs');


mdLink('C://Users/ange_/DEV006-md-links/hola.txt')

function mdLink(ruta, option = {validate: false}){
  //valido con campos de entrada
  validate(ruta, option)

  //llamo a funcion para generar ruta absoluta
  ruta = generateRoute(ruta)

  console.log('Ruta absoluta:', ruta);
  //verifico si la ruta existe
  routeExists(ruta)
  //llamo a isDirectory para ver si es direcotrio o archivo
  const pathType=isDirectory(ruta)
  /*if( pathType == true){

  }else{

  }*/
 

  //TODO: crear una promesa y a regresar
}

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

function isDirectory(ruta){
  if(fs.lstatSync(ruta).isDirectory()){
    console.log("es un directorio")
    return true
  }else{
    console.log("es un archivo")
    return false
  }
}