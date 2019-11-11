const sql = require("sqlite3")
const db = new sql.Database("portal.db")
const fs = require('fs');
const path = require("path");
const c = require("crypto")

//Criptografa o parametro informado como sha256
function getSha256(v) {
    let md5 = c.createHash("sha256")
    md5.update(v);
    let _hash = md5.digest("hex")
    return _hash;
}

//Cria senha aleatoria com a quantidade de caracteres do parametro l
//
function makepw(l) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < l; i++ ) {
       result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
 }

// function to encode file data to base64 encoded string
function base64_encode(file) {
    if(fs.existsSync(file)) {
        var bitmap = fs.readFileSync(file);
        return new Buffer.from(bitmap).toString('base64');
    } else {
        return false;
    }
}
//Retorna o e-mail de cadastro do usuario
function recuperaSenha(u) {
    return new Promise((resolve,reject) => {
        let sqlValida = "SELECT EMAIL from tbUser where user = ?"
        let stmValida = db.prepare(sqlValida)
        stmValida.get([u], (err, row) => {
            if(err) reject(new Error(err))
            else if(row==undefined) reject(new Error("usuario_nao_encontrado"))
            else {
                let ns = makepw(10);
                let sqlNovaSenha = "UPDATE tbUser set pw = ? where user = ?";
                let stmNovaSenha = db.prepare(sqlNovaSenha)
                stmNovaSenha.run([getSha256([ns,u.substr(0,3)].join(";")),u], (err) => {
                    if(err) reject(new Error(err))
                    else resolve([row, ns])
                })
            }
        })
    })
}
//Cadastra usuario no portal
function cadastraUsuario(u,s,e) {
    return new Promise((resolve,reject) => {
        let sqlValida = "select user from tbUser where user = ? and email = ?"
        let stmValida = db.prepare(sqlValida)
        stmValida.get([u,e],(err, row) => {
            if(err) reject(new Error(err))
            else if(row!==undefined) reject(new Error("usuario_ja_cadastrado"))
            else {
                let sqlInsert = "INSERT INTO tbUser(user,pw,email) values(?,?,?);"
                let stmInsert = db.prepare(sqlInsert);
                stmInsert.run([u,getSha256([s,u.substr(0,3)].join(";")),e], (err) => {
                    if(err) reject(new Error(err))
                    else resolve("usuario_cadastrado_sucesso")
                })
            }
        })
    })
}

//Cadastra um montadora no banco de dados
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

//Inclui os dados de um novo modelo no banco de dados
function addVeiculo(dados, usuario){
    return new Promise((resolve,reject) => {
        let stm = db.prepare("INSERT INTO tbInfoVeiculo (usuarioCadastro, idmontadora, nomemodelo,anofabricacao,cores,tipoChassi,suspensaodianteira,suspensaotraseira,pneusdianteiro,pneutraseiro,freiodianteiro,freiotraseiro,tipodofreio,qtdcilindros,diametro,curso,cilindrada,potenciamaxima,torquemaximo,sistemadepartida,tipodealimentacao,combustivel,sistemadetransmissao,cambio,bateria,taxadecompessao,comprimento,largura,altura,distanciaentreeixos,distanciadosolo,alturadoassento,tanquedecombustivel,peso,arqFoto) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)")
        let p = dados;
        stm.run([usuario, p.montadora,p.nomeModelo,p.anoFabricacao,p.cores,p.tipoChassi,p.suspDianteira,p.suspTraseira,p.pnDianteiro,p.pnTraseiro,p.frDianteiro,p.frTraseiro,p.tpFreio,p.qtdCilindros,p.diametro,p.curso,p.cilindrada,p.potMax,p.tqMax,p.stPartida,p.tpAlimentacao,p.combustivel,p.stTransmissao,p.cambio,p.bateria,p.txCompress,p.comprimento,p.largura,p.altura,p.distEixos,p.distSolo,p.altAs,p.tqComb,p.peso,p.arqFoto], (err) => {
            if(err) {
                reject(err);
            }
            resolve(p.nomeModelo);//Confirmar veiculos
        })
    })
}

//Retorna dados dos veiculos cadastrados
function listaModelos(){
    return new Promise((resolve,reject) => {
        let qry = `
        select 
            usuarioCadastro, tbinfoveiculo.id, nomemodelo, tbmontadoras.nome, anofabricacao, cores, tipochassi, suspensaodianteira, suspensaotraseira, pneusdianteiro, pneutraseiro, freiodianteiro, freiotraseiro, tipodofreio,
            qtdcilindros, diametro, curso, cilindrada, potenciamaxima, torquemaximo, sistemadepartida, tipodealimentacao, combustivel, sistemadetransmissao, cambio, bateria, 
            taxadecompessao, comprimento, largura, altura, distanciaentreeixos, distanciadosolo, alturadoassento, tanquedecombustivel, peso, arqFoto
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

//Retorna montadoras cadastradas
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

//Autentica os dados do usuário
function validaLogin(u,s) {
    return new Promise((resolve,reject) => {
        let qry = "select * from tbUser where user = ? and pw = ?";
        let stm = db.prepare(qry);
        stm.get([u,getSha256([s,u.substr(0,3)].join(";"))], (err, row) => {
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

//Funcções utilizadas pela API
//Retorna lista de montadoras cadastradas
function buscaFabricantes() {
    return new Promise((resolve,reject) => {
        let sql = "select nome from tbMontadoras";
        let stm = db.prepare(sql);
        stm.all((err, rows) => {
            if(err) reject("1")
            if(rows==false) reject("2")
            else resolve(rows)
        })
    })
}

function buscaModelos(_mon) {
    return new Promise((resolve,reject) => {
        let sql_busca_id_montadora = "select id from tbMontadoras where nome = ?"
        let stm = db.prepare(sql_busca_id_montadora)
        stm.get([_mon], (err, row) => {
            if(err) reject("1")
            else if(row==undefined) reject("3")
            else {
                let sql_busca_veiculos = "select idmontadora, id, nomemodelo, anofabricacao from tbInfoVeiculo where idmontadora = ?";
                let stm = db.prepare(sql_busca_veiculos)
                stm.all([row.id], (err, rows) => {
                    if(err) reject("1")
                    else if(rows==false) reject("4")
                    else resolve(rows)
                })
            }
        })
    })
}
function buscaDadosVeiculo(_mon,_mod,_ano) {
    return new Promise((resolve,reject) => {
        let sql_busca_id_montadora = "select id from tbMontadoras where nome = ?"
        let stm = db.prepare(sql_busca_id_montadora)
        stm.get([_mon], (err, row) => {
            if(err) reject("1")
            else if(row==undefined) reject("3")
            else {
                let sql = "select * from tbInfoVeiculo where idmontadora = ? and nomemodelo = ? and anofabricacao = ?"
                let stm = db.prepare(sql)
                stm.get([row.id, _mod,_ano], (err, row) => {
                    if(err) reject("1")
                    else if(row==undefined) reject("5")
                    else {
                        row.arqFoto = base64_encode(path.join(__dirname, "/fotos", _mon, row.arqFoto));
                        resolve(row)
                    }
                })
            }
        })
    })
}
//
module.exports = {
    addMontadora: addMontadora,
    addVeiculo: addVeiculo,
    listaModelos: listaModelos,
    validaLogin: validaLogin,
    listaMontadoras: listaMontadoras,
    buscaFabricantes: buscaFabricantes,
    buscaModelos: buscaModelos,
    buscaDadosVeiculo: buscaDadosVeiculo,
    cadastraUsuario: cadastraUsuario,
    recuperaSenha: recuperaSenha
};