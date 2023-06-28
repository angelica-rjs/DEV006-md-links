const { validateParameter, generateRoute, routeExists } = require('../');
const path = require('path');

/*describe('mdLinks', () => {

  it('should...', () => {
    console.log('FIX ME!');
  });

});*/


describe('validateParameter', () => {
  it('should throw an error if "ruta" parameter is null', () => {
    expect(() => {
      validateParameter(null);
    }).toThrow(TypeError, "La ruta no debe ser nula");
  });

  it('should throw an error if "option" parameter is not a valid object', () => {
    expect(() => {
      validateParameter("ruta/valida", "opción inválida");
    }).toThrow(TypeError, 'debe ingresar un objeto que contenga un booleano');
  });

  it('should throw an error if "option.validate" is not a boolean', () => {
    expect(() => {
      validateParameter("ruta/valida", { validate: "true" });
    }).toThrow(TypeError);
  });
});


describe('converting absolute path', () =>{
  it('if the path is absolute', () => {
    const absolutePath = 'C://Users/ange_/DEV006-md-links/prueban/';

    const result = generateRoute(absolutePath)
    expect(result).toEqual(absolutePath);
  })
  it('if the path is relative', () => {
    const prueba = generateRoute('./prueban')
    const result = 'C://Users/ange_/DEV006-md-links/prueban'
    expect(prueba).toBe(result)
  })
})

describe('check if path exists',()=>{
  it('if the path does not exist', () => {
    expect(() => {
      routeExists('C://Usersdss/ange_/DEV006-md-links/prueban/');
    }).toThrow(TypeError, "La ruta no dexiste");
  })

it('si la ruta existe', () =>{
  const result = 'C://Users/ange_/DEV006-md-links/prueban/'
  expect(routeExists(result)).toEqual(result)
})
})


