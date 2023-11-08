// const { expect } = require('chai');

// describe('TitulosAcademicos', function () {
//   let TitulosAcademicos;//contrato
//   let contrato;//instansias del contrato
//   let owner;//cuantas de eth
//   let addr1;//cuantas de eth
//   const nombreInstitucion = 'UCC';
//   const tipoTitulo = 'Licenciatura';

//   beforeEach(async () => {
//     [owner, addr1] = await ethers.getSigners();
//     TitulosAcademicos = await ethers.getContractFactory('TitulosAcademicos');
//     contrato = await TitulosAcademicos.deploy();
//     await contrato.deployed();
//   });

//   it('Emisión de título debe funcionar correctamente', async function () {
//     await contrato.connect(owner).emitirTitulo();
//     const titulo = await contrato.verificarTitulo(owner.address);
//     expect(titulo[0]).to.equal(nombreInstitucion);
//     expect(titulo[1]).to.equal(tipoTitulo);
//     expect(titulo[2]).to.not.equal(0);
//   });

//   it('Verificación de título debe funcionar correctamente', async function () {
//     await contrato.connect(owner).emitirTitulo();
//     const titulo = await contrato.verificarTitulo(owner.address);
//     expect(titulo[0]).to.equal(nombreInstitucion);
//     expect(titulo[1]).to.equal(tipoTitulo);
//     expect(titulo[2]).to.not.equal(0);
//   });

//   it('No se puede emitir un título duplicado', async function () {
//     await contrato.connect(owner).emitirTitulo();
//     await expect(contrato.connect(owner).emitirTitulo()).to.be.revertedWith('El estudiante ya tiene un título emitido.');
//   });

//   it('Verificación de título para estudiante sin título emitido', async function () {
//     const titulo = await contrato.verificarTitulo(addr1.address);
//     expect(titulo[0]).to.equal('');
//     expect(titulo[1]).to.equal('');
//     expect(titulo[2]).to.equal(0);
//   });
// });

//const { assert } = require('chai');

describe('TitulosAcademicos', function () {
  let TitulosAcademicos;
  let contrato;
  let owner;
  let addr1;
  const nombreInstitucion = 'UCC';
  const tipoTitulo = 'Licenciatura';

  beforeEach(async () => {
    [owner, addr1] = await ethers.getSigners();
    TitulosAcademicos = await ethers.getContractFactory('TitulosAcademicos');
    contrato = await TitulosAcademicos.deploy();
    await contrato.deployed();
  });

  it('Emisión de título debe funcionar correctamente', async function () {
    await contrato.connect(owner).emitirTitulo();
    const titulo = await contrato.verificarTitulo(owner.address);
    assert.strictEqual(titulo[0], nombreInstitucion, 'Nombre de la institución incorrecto');
    assert.strictEqual(titulo[1], tipoTitulo, 'Tipo de título incorrecto');
    assert.notStrictEqual(titulo[2], 0, 'La fecha de emisión debe ser distinta de cero');
  });

  it('Verificación de título debe funcionar correctamente', async function () {
    await contrato.connect(owner).emitirTitulo();
    const titulo = await contrato.verificarTitulo(owner.address);
    assert.strictEqual(titulo[0], nombreInstitucion, 'Nombre de la institución incorrecto');
    assert.strictEqual(titulo[1], tipoTitulo, 'Tipo de título incorrecto');
    assert.notStrictEqual(titulo[2], 0, 'La fecha de emisión debe ser distinta de cero');
  });

  it('No se puede emitir un título duplicado', async function () {
    await contrato.connect(owner).emitirTitulo();
    try {
      await contrato.connect(owner).emitirTitulo();
      assert.fail('Se esperaba una excepción al emitir un título duplicado');
    } catch (error) {
      assert.include(error.message, 'El estudiante ya tiene un título emitido.', 'Mensaje de error incorrecto');
    }
  });

  it('Verificación de título para estudiante sin título emitido', async function () {
    const titulo = await contrato.verificarTitulo(addr1.address);
    assert.strictEqual(titulo[0], '', 'Nombre de la institución no está vacío');
    assert.strictEqual(titulo[1], '', 'Tipo de título no está vacío');
    assert.strictEqual(titulo[2], 0, 'La fecha de emisión debe ser cero');
  });
});
