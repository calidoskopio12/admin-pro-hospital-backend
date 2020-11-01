const path = require('path');
const fs = require('fs');

const { response } = require("express");
const { v4: uuidv4 } = require('uuid');
const { actualizarImagen } = require("../helpers/actualizar-imagen");


const fileUploads = (req, res = response) => {

    const tipo = req.params.tipo;
    const id = req.params.id;

    const tipoValidos = ['hospitales', 'medicos', 'usuarios'];

    //Validar Tipo
    if (!tipoValidos.includes(tipo)) {
        return res.status(400).json({
            ok: false,
            msg: 'No es un médico, hospital o usuario (tipo)'
        });
    }

    //Validar que haya un archivo
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).json({
            ok: false,
            msg: 'No hay ningun archivo'
        });
    }

    //Pocesar la imagen

    const file = req.files.imagen;

    const nombreCortado = file.name.split('.');
    const extensionArchivo = nombreCortado[nombreCortado.length - 1];

    //Validar extensión

    const extensionesValida = ['jpg', 'jpeg', 'png', 'gif'];

    if (!extensionesValida.includes(extensionArchivo)) {
        return res.status(400).json({
            ok: false,
            msg: 'No es una extensión permitida'
        });
    }

    //Generar nombre archivo

    const nombreArchivo = `${uuidv4()}.${extensionArchivo}`;

    //Path para guardar la imágen

    const path = `./uploads/${tipo}/${nombreArchivo}`;


    //Mover la imágen

    file.mv(path, (error) => {
        if (error) {
            console.log(error)
            return res.status(500).json({
                ok: false,
                msg: 'Error al mover la imágen'
            });
        }

        //Actualizar en la base de datos

        actualizarImagen(tipo, id, nombreArchivo);

        res.json({
            ok: true,
            msg: 'Archivo subido',
            nombreArchivo
        });
    });



}

const retornaImagen = (req, res = response) => {

    const tipo = req.params.tipo;
    const foto = req.params.foto;

    const pathImg = path.join(__dirname, `../uploads/${tipo}/${foto}`);

    //Imágen por defecto

    if (fs.existsSync(pathImg)) {
        res.sendFile(pathImg);
    } else {
        const pathImg = path.join(__dirname, `../uploads/no-img.jpg`);
        res.sendFile(pathImg);

    }



}

module.exports = {
    fileUploads,
    retornaImagen
}