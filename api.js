const express = require('express');
const router = express.Router();
const crud = require("./crud.js") //Funções do db que retornam promisses

router.use(express.json());
router.use(express.urlencoded({ extended: true }));

router.get("/busca", mainFunc)
router.get("/busca/montadora/:montadora", mainFunc)
router.get("/busca/montadora/:montadora/modelo/:modelo/ano/:ano", mainFunc)

function getErro(n) {
    let ERROS = {
        "1":"database_error",//Erro de execução da query
        "2":"notfound_lista_montadoras",//Nenhuma montadora encontrada
        "3":"notfound_dados_montadora",//Montadora não encontrada no banco de dados
        "4":"notfound_lista_veiculos",//Nenhum veiculo encontrado cadastrado com essa montadora
        "5":"notfound_dados_veiculo"//Nenhum veiculo encontrado com os dados informados
    }
    return {
        "errn": n,
        "msg": ERROS[n]
    }
}
function mainFunc(req,res) {

    res.setHeader('Content-Type', 'application/json');
    let _mon = req.params.montadora;
    let _mod = req.params.modelo;
    let _ano = req.params.ano;
    if(_mon==undefined) {
        //retornar lista de fabricantes
        crud.buscaFabricantes()
        .then(
            (data) => {
                res.status(200).send(data)
            }
        )
        .catch(
            (err) => {
                res.status(400).json(getErro(err))
            }
        )
        return;
    }
    if(_mod==undefined) {
        //retornar lista de modelos da fabricante
        crud.buscaModelos(_mon)
        .then(
            (data) => {
                res.status(200).json(data)
            }
        )
        .catch(
            (err) => {
                res.status(400).json(getErro(err))
            }
        )
        return;
    }
    if(_ano==undefined) {
        //Erro se não informar o ano modelo
        res.json(getErro(err))
        return;
    }
    crud.buscaDadosVeiculo(_mon,_mod,_ano)
        .then(
            (data) => {
                res.status(200).send(data)
            }
        )
        .catch(
            (err) => {
                res.status(400).json(getErro(err))
            }
        )
}

module.exports = router;