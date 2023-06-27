const validateParameter= require('../');
const generateRoute = require('../')

/*describe('mdLinks', () => {

  it('should...', () => {
    console.log('FIX ME!');
  });

});*/


describe('validateParameter', () => {
  it('should throw an error if "ruta" parameter is null', () => {
    expect(() => {
      validateParameter(null, { validate: true });
    }).toThrow(TypeError);
  });

  it('should throw an error if "option" parameter is not a valid object', () => {
    expect(() => {
      validateParameter("ruta/valida", "opción inválida");
    }).toThrow(TypeError);
  });

  it('should throw an error if "option.validate" is not a boolean', () => {
    expect(() => {
      validateParameter("ruta/valida", { validate: "true" });
    }).toThrow(TypeError);
  });
});

/*describe('converting absolute path', () =>{
  it('if the path is absolute', () => {
    const absolutePath = 'C://Users/ange_/DEV006-md-links/prueban/';
    const result = generateRoute(absolutePath)
    expect(result).toEqual(absolutePath);
  })
})*/


