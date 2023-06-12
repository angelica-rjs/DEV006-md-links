/*export default () => {
  const fs = required('fs')
};*/
//mdLink("","")

const path = require('path');
let fs = require('fs');

function prueba(){
let ruta = '/hola.txt'
mdLink(ruta);
}

function mdLink(ruta){
  if (path.isAbsolute(ruta)){
    console.log("es absoluta")
  }else{
    route(ruta)
  }
 
}
prueba();


/*function validate(ruta, option){

const ruta = "./hola.txt";
  const option = true;
  if( ruta  !== null && typeof option === "boolean"){
    if (path.isAbsolute(ruta)){

    }else{
      route(ruta)
    }
  }else{
    TypeError("debe recibir dos argumento")
  }
  
}*/





function route(ruta){
  //"./hola.txt"
  const rutaRelativa = ruta;
  const rutaAbsoluta = path.resolve(rutaRelativa);
  console.log('Ruta absoluta:', rutaAbsoluta);
}
//route()






