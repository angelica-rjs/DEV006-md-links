/*export default () => {
  const fs = required('fs')
};*/

const path = require('path');
let fs = require('fs');
//const markd = require('marked');
//console.log (marked( '#prueba!' ));
//const  JSDOM  = require('jsdom');

const MarkdownIt = require('markdown-it')
  const   md = new MarkdownIt();
//console.log(md.render('# hola!'));

let allFiles = []

mdLink('C://Users/ange_/DEV006-md-links/prueban/nn.md')
/*-------------------------------------------------------- */
function mdLink(ruta, option = {validate: false}){
  validate(ruta, option)
  ruta = generateRoute(ruta)
 // console.log('Ruta absoluta:', ruta);
  routeExists(ruta)
  let pathType= isDirectory(ruta)
  let filesMd
  if( pathType == true){
    const allFile = searchFiles(ruta)
    filesMd=getMds(allFile)
    console.log(filesMd, "archivos que se enviaran a process file")
    filesMd.forEach((file) => {
      processFile(file)
    });
  }else{
    allFiles.push(ruta)
    filesMd= getMds(allFiles)
    console.log(filesMd, "archivos que se enviaran a process file")
    const fileMd = filesMd[0];
    processFile(fileMd)
  }
 //TODO: crear una promesa y a regresar
}
/*-------------------------------------------------------- */
function processFile(file){
  console.log(file);
  readFile(file)
    .then((data) => {
      console.log("Contenido del archivo:", data);
      getLinks(data)
    })
    .catch((error) => {
      console.error(error);
    });
  

}

function getLinks(content){
  const regexMdLinks = /\[([^\[]+)\](\(.*\))/gm;
  const links = content.match(regexMdLinks)
  console.log(links)
}



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
    //console.log("es absoluta")
  }else{
    //console.log("es relativa")
    ruta = path.resolve(ruta);
    }
  return ruta
}

function routeExists(ruta){
  //sincrono
  try {
    fs.accessSync(ruta);
    //console.log("la ruta existe")
    return ruta
  } catch (error) {
    throw new TypeError("La ruta no existe")
  }
}

function isDirectory(ruta){
  if(fs.lstatSync(ruta).isDirectory()){
    //console.log("es un directorio")
    return true
  }else{
    //console.log("es un archivo")
  }
}

function searchFiles(directorio){
  const archivos = fs.readdirSync(directorio);

  if (archivos.length === 0) {
    //console.log('El directorio está vacío');
  }
  archivos.forEach((file) => {
    const fileObsolute = path.resolve(directorio, file);
    if (fs.lstatSync(fileObsolute).isDirectory()){
      const getRecursiveFiles =searchFiles(fileObsolute)
      allFiles.concat(getRecursiveFiles)
    }else{
      allFiles.push(fileObsolute)
    }
  });

  return allFiles;
}

function getMds(allfiles) {
  const archivosMd = allfiles.filter(archivo => {
    if (typeof archivo === "string" && archivo.split(".").pop() === "md") {
      //console.log("Es md: ",  archivo);
      return true;
    } else {
      //console.log("No es md: ", archivo);
      return false;
    }
  });

  allfiles.length = 0; 
  allFiles.push.apply(allfiles, archivosMd);
  

  if(allFiles.length > 0){
    //console.log("array filtrado: ", allFiles)
  return allfiles;
  }else{
    //console.log("fin del flujo, no se encontro md")
  }
}

function readFile(file) {
  return new Promise((resolve, reject) => {
    fs.readFile(file, 'utf-8', (err, data) => {
      if (err) {
        return reject("No fue posible leer el archivo");
      } else {
        resolve(data);
      }
    });
  });
}
/*-------------- */