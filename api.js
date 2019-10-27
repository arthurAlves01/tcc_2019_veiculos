var express = require('express');
var router = express.Router();
const crud = require("./crud.js") //Funções do db que retornam promisses

router.use(express.json());
router.use(express.urlencoded({ extended: true }));
router.get("/busca/veiculo/item/:key/:fabricante/:modelo/:ano", (req,res) => {
    res.setHeader('Content-Type', 'application/json');
    let _key = req.params.key;
    let _fab = req.params.fabricante;
    let _mod = req.params.modelo;
    let _ano = req.params.ano;
    if(_key) {
        res.json({"msg":"chave_invalida","errn":"1"})
    }
    if(_fab) {
        
    }
})


module.exports = router;