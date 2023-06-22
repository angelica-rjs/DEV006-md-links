/*export default () => {
  const fs = required('fs')
};*/

const path = require('path');
let fs = require('fs');

let allFiles = []

mdLink('C://Users/ange_/DEV006-md-links/prueban/', {validate: true})
/*-------------------------------------------------------- */
function mdLink(ruta, option = {validate: false}){
  return new Promise((resolve, reject) =>{
    validateParameter(ruta, option)
    ruta = generateRoute(ruta)
    // console.log('Ruta absoluta:', ruta);
    routeExists(ruta)
    let pathType= isDirectory(ruta)
    let filesMd
    if( pathType == true){
      const allFile = searchFiles(ruta)
      filesMd=getMds(allFile)
      //console.log(filesMd, "archivos que se enviaran a process file")
      filesMd.forEach((file) => {
        processFile(file, option)
      });
    }else{
      allFiles.push(ruta)
      filesMd= getMds(allFiles)
      console.log(filesMd, "archivos que se enviaran a process file")
      //const fileMd = filesMd[0];
      processFile(filesMd, option)
    }
  })
}

/*-------------------------------------------------------- */
function processFile(file, option){
  console.log(file);
  readFile(file)
    .then((data) => {
      //const links=  getLinks(data,file)
      if(option.validate === true){
        console.log("validate es true")
      }else{
        console.log("validate es false")
      }
     //console.log("los links encontrado: ",links)
    })
    .catch((error) => {
      console.error(error);
    });
  

}




//TERMINADAS    
function validateParameter(ruta, option){
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

function getLinks(content, file) {
  const regexMdLinks = /\[([^\[]+)\](\(.*\))/gm;
  const links = [];

  const matches = content.matchAll(regexMdLinks);
  for (const match of matches) {
    const [, text, href] = match;
    links.push({
      href: href.replace(/[()]/g, ''),
      text,
      file: file
    });
  }
  

  return links;
}
/*-------------- */