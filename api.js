const express = require('express');
const router = express.Router();
const crud = require("./crud.js") //Funções do db que retornam promisses

router.use(express.json());
router.use(express.urlencoded({ extended: true }));
router.get("/busca/", (req,res) => {
    //Teste da URL
    //http://localhost/api/busca?key=teste&fabricante=honda&modelo=forza%20250&ano=2005
    res.setHeader('Content-Type', 'application/json');
    let _apiKey = "djxwj3qr3usu34s";
    let _key = req.query.key;
    let _fab = req.query.fabricante;
    let _mod = req.query.modelo;
    let _ano = req.query.ano;
    if(_key!=_apiKey) {
        res.json({"msg":"chave_invalida","errn":"1"});
        return;
    }
    if(_fab==undefined) {
        //retornar lista de fabricantes
        crud.buscaFabricantes()
        .then(
            (data) => {
                res.send(data)
            }
        )
        .catch(
            (err) => {
                res.json({"err":err,"errn":"2"})
            }
        )
        return;
    }
    if(_mod==undefined) {
        //retornar lista de modelos da fabricante
        crud.buscaModelos(_fab)
        .then(
            (data) => {
                res.send(data)
            }
        )
        .catch(
            (err) => {
                res.json({"err":err,"errn":"3"})
            }
        )
        return;
    }
    if(_ano==undefined) {
        //retornar lista com todos os anos de fabricação do modelo
        crud.buscaAnomodelo(_fab,_mod)
        .then(
            (data) => {
                res.send(data)
            }
        )
        .catch(
            (err) => {
                res.json({"err":err,"errn":"4"})
            }
        )
        return;
    }
    crud.buscaDadosVeiculo(_fab,_mod,_ano)
        .then(
            (data) => {
                res.send(data)
            }
        )
        .catch(
            (err) => {
                res.json({"err":err,"errn":"5"})
            }
        )
})
router.get("/*", (req,res) => {
    res.json({"msg":"teste api"})
})

module.exports = router;