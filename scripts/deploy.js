async function main() {
    const TitulosAcademicos = await ethers.getContractFactory('TitulosAcademicos');
    const contrato = await TitulosAcademicos.deploy();
    await contrato.deployed();
    console.log('Contrato desplegado en:', contrato.address);
  }
  
  main()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });