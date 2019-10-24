var express = require('express');
var router = express.Router();
const crud = require("./crud.js") //Funções do db que retornam promisses

router.use(express.json());
router.use(express.urlencoded({ extended: true }));
router.get("/busca/veiculo/item/:fabricante/:modelo/:ano", (req,res) => {
    res.setHeader('Content-Type', 'application/json');
    let _fab = req.params.fabricante;
    let _mod = req.params.modelo;
    let _ano = req.params.ano;
    if(_fab) {
        res.json({"msg":"informar_fabricante","errn":"1"})
    }
})


module.exports = router;