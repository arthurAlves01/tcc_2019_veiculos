const sql = require("sqlite3")
const db = new sql.Database("portal.db")

function addMontadora(montadora) {
    return new Promise((resolve,reject) => {
        let stmValidacao = db.prepare("select * from tbMontadoras where nome = ?")
        stmValidacao.get([montadora], (err, row) => {
            if(row !== undefined) {
                reject("Montadora já cadastrada!")
            } else {
                let stm = db.prepare("INSERT INTO tbMontadoras (nome) VALUES (?)")
                stm.run([montadora], (err) => {
                    if(err) {
                        reject(err);
                    }
                    resolve(montadora); //Confirmar montadora
                })
            }
        })
    })
}

function addVeiculo(dados, usuario){
    return new Promise((resolve,reject) => {
        let stm = db.prepare("INSERT INTO tbInfoVeiculo (usuarioCadastro, idmontadora, nomemodelo,anofabricacao,cores,tipoChassi,suspensaodianteira,suspensaotraseira,pneusdianteiro,pneutraseiro,freiodianteiro,freiotraseiro,tipodofreio,qtdcilindros,diametro,curso,cilindrada,potenciamaxima,torquemaximo,sistemadepartida,tipodealimentacao,combustivel,sistemadetransmissao,cambio,bateria,taxadecompessao,comprimento,largura,altura,distanciaentreeixos,distanciadosolo,alturadoassento,tanquedecombustivel,peso) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)")
        let p = dados;
        stm.run([usuario, p.montadora,p.nomeModelo,p.anoFabricacao,p.cores,p.tipoChassi,p.suspDianteira,p.suspTraseira,p.pnDianteiro,p.pnTraseiro,p.frDianteiro,p.frTraseiro,p.tpFreio,p.qtdCilindros,p.diametro,p.curso,p.cilindrada,p.potMax,p.tqMax,p.stPartida,p.tpAlimentacao,p.combustivel,p.stTransmissao,p.cambio,p.bateria,p.txCompress,p.comprimento,p.largura,p.altura,p.distEixos,p.distSolo,p.altAs,p.tqComb,p.peso], (err) => {
            if(err) {
                reject(err);
            }
            resolve(p.nomeModelo);//Confirmar veiculos
        })
    })
}

function listaVeiculos(){
    return new Promise((resolve,reject) => {
        let qry = `
        select 
            usuarioCadastro, tbinfoveiculo.id, nomemodelo, tbmontadoras.nome, anofabricacao, cores, tipochassi, suspensaodianteira, suspensaotraseira, pneusdianteiro, pneutraseiro, freiodianteiro, freiotraseiro, tipodofreio,
            qtdcilindros, diametro, curso, cilindrada, potenciamaxima, torquemaximo, sistemadepartida, tipodealimentacao, combustivel, sistemadetransmissao, cambio, bateria, 
            taxadecompessao, comprimento, largura, altura, distanciaentreeixos, distanciadosolo, alturadoassento, tanquedecombustivel, peso 
        from tbInfoVeiculo inner join tbmontadoras on tbinfoveiculo.idmontadora = tbmontadoras.id
        `
        db.all(qry, (err,data) => {
            if(err) {
                reject(err);
            }
            resolve(data);
        })
    })
}

function listaMontadoras() {
    return new Promise((resolve,reject) => {
        db.all("Select * from tbMontadoras", (err,data) => {
            if(err) {
                reject(err)
            }
            resolve(data)
        })
    })
}

function validaLogin(u,s) {
    return new Promise((resolve,reject) => {
        let qry = "select * from tbUser where user = ? and pw = ?";
        let stm = db.prepare(qry);
        stm.get([u,s], (err, row) => {
            if(err) {
                reject(err);
            }
            if(row !== undefined) {
                resolve(true);
            } else {
                reject(403)
            }
        })
    })
}
module.exports = {
    addMontadora: addMontadora,
    addVeiculo: addVeiculo,
    listaVeiculos: listaVeiculos,
    validaLogin: validaLogin,
    listaMontadoras: listaMontadoras
};