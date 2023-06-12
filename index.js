/*export default () => {
  const fs = required('fs')
};*/
//mdLink("","")

const path = require('path');
let fs = require('fs');



/*
function mdLink (ruta, option){
 
}

function validate(ruta, option){

 if( !path && typeof option === "boolean"){
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
route()






