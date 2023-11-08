// SPDX-License-Identifier: MIT OR Apache-2.0
pragma solidity ^0.8.0;

contract TitulosAcademicos {
    struct Titulo {
        address estudiante;
        string nombreInstitucion;
        string tipoTitulo;
        uint256 fechaEmision;
    }   

    mapping(address => Titulo) public titulos;

    event TituloEmitido(address indexed estudiante, string nombreInstitucion, string tipoTitulo, uint256 fechaEmision);

    function emitirTitulo(
        string memory _nombreInstitucion,
        string memory _tipoTitulo
    ) public {
        require(titulos[msg.sender].estudiante == address(0), "El estudiante ya tiene un titulo emitido.");
        require(bytes(_nombreInstitucion).length > 0, "El nombre de la institucion no puede estar vacio.");
        require(bytes(_tipoTitulo).length > 0, "El tipo de titulo no puede estar vacio.");

        uint256 fechaEmision = block.timestamp;
        titulos[msg.sender] = Titulo(msg.sender, _nombreInstitucion, _tipoTitulo, fechaEmision);
        emit TituloEmitido(msg.sender, _nombreInstitucion, _tipoTitulo, fechaEmision);
    }

    function verificarTitulo(address _estudiante) public view returns (string memory, string memory, uint256) {
        require(titulos[_estudiante].estudiante != address(0), "El estudiante no tiene un titulo emitido.");
        Titulo memory titulo = titulos[_estudiante];
        return (titulo.nombreInstitucion, titulo.tipoTitulo, titulo.fechaEmision);
    }
}