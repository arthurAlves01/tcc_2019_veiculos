const express = require('express');
const app = express();
const crud = require("./crud.js") //Funções do db que retornam promisses
const session = require("express-session")
const api = require("./api.js")
const path = require("path")
const c = require("crypto")

function getSha256(v) {
    let md5 = crypto.createHash("md5")
    md5.update(v);
    let _hash = md5.digest("hex")
    return _hash;
}

app.set('view engine', 'pug')

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(session({
  secret: '9pf48z74ur',
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false }
}))

app.use("/css", express.static("css"))
app.use("/img", express.static("img"))
app.use("/script", express.static("script"))
app.use("/api", api)

app.get("/login", (req,res) => {
    if(req.session.loggedin) {
        res.redirect("/")
    } else {
        res.render("login")
    }
})

app.get(["/","/*"], (req, res, next) => {
    if(req.session.loggedin) {
        next()
    } else {
        res.redirect("/login")
    }
})

app.get("/",(req,res) => {
    let usuario = req.session.username.toLowerCase();
    usuario = usuario[0].toUpperCase() + usuario.substr(1)
    res.render("home", {user: usuario})
})

app.post("/login", (req,res) => {
	let user = req.body.user;
	let pw = req.body.pw;
    crud.validaLogin(user,pw)
        .then(() => {
            req.session.username = user;
            req.session.loggedin = true;
            res.status(200).redirect("/")
        })
        .catch((err) => {
            res.sendStatus(err)
        })
})

app.get("/cadastraVeiculo", (req,res) => {
    function campo(id, texto) {
        this.id = id;
        this.texto = texto;
    }
    let listaCampos = [
        new campo("arqFoto", "Nome Arquivo Foto"),
        new campo("nomeModelo", "Nome do Modelo"),
        new campo("anoFabricacao", "Ano de Fabricação"),
        new campo("cores", "Cores"),
        new campo("tipoChassi", "Tipo Chassi"),
        new campo("suspDianteira", "Suspenção Dianteira"),
        new campo("suspTraseira", "Suspensão Traseira"),
        new campo("pnDianteiro", "Pneu Dianteiro"),
        new campo("pnTraseiro", "Pneu Traseiro"),
        new campo("frDianteiro", "Freio Dianteiro"),
        new campo("frTraseiro", "Freio Traseiro"),
        new campo("tpFreio", "Tipo de Freio"),
        new campo("qtdCilindros", "Quantidade de Cilindros"),
        new campo("diametro", "Diâmetro"),
        new campo("curso", "Curso"),
        new campo("cilindrada", "Cilindrada"),
        new campo("potMax", "Potência Máxima"),
        new campo("tqMax", "Torque Máximo"),
        new campo("stPartida", "Sistema de Partida"),
        new campo("tpAlimentacao", "Tipo de Alimentação"),
        new campo("combustivel", "Combustível"),
        new campo("stTransmissao", "Sistema de Transmissão"),
        new campo("cambio", "Cãmbio"),
        new campo("bateria", "Bateria"),
        new campo("txCompress", "Taxa de Compressão"),
        new campo("comprimento", "Comprimento"),
        new campo("largura", "Largura"),
        new campo("altura", "Altura"),
        new campo("distEixos", "Distância entre Eixos"),
        new campo("distSolo", "Distância do Solo"),
        new campo("altAs", "Altura do Assento"),
        new campo("tqComb", "Tanque de Combustível"),
        new campo("peso", "Peso")
    ]
    crud.listaMontadoras()
        .then((data) => {
            res.render("cadastraModelo", {montadoras: data, usuario: req.session.username, campos: listaCampos})
        })
        .catch((err) => {
            res.send(err)
        })
})

app.post("/add/veiculo", (req,res) => {
    let dados = req.body;
    crud.addVeiculo(dados, req.session.username)
        .then((data) => {
            res.render("confirmaVeiculo", {nomeVeiculo: data})
        })
        .catch((err) => {
            res.send(err)
        })
})

app.get("/listar/modelos", (req,res) => {
  let headers = [
    'Usuário Cadastro','ID', 'Modelo','Montadora','Ano Fab.','Cores','Tipo Chassi','Susp. Diant.','Susp. Trase.','Pn. Diant.','Pn. Tras.','Freio Diant.','Freio Trase.','Tipo Freio','Qtd. Cili.',
    'Diametro', 'Curso','Cilindrada','Pot. Max.','Torque Max.','Sist. Parti.','Tp. Alim.','Comb.','Sist. Trans.','Cambio','Bateria','Tx. Compres.','Comprimento','Largura','Altura',
    'Dist. Eixos','Dist. Solo','Alt. Solo','Tq. Comb.','Peso','Arquivo Foto'
  ]
  crud.listaVeiculos()
    .then((data) => {
        res.render('exibeModelos', {modelos: data, h: headers})
    })
    .catch((err) => {
        res.send(err)
    })
})

app.get("/cadastraMontadora", (req,res) => {
    res.render("cadastraMontadora")
})

app.post("/add/montadora", (req,res) => {
    let montadora = req.body.nomeMontadora;
    crud.addMontadora(montadora)
        .then((data) => {
            res.render("confirmaMontadora", {nomeMontadora: data})
        })
        .catch((err) => {
            res.render("montadoraJaCadastrada")
        })
})

app.get("/sair", (req,res) => {
    req.session.destroy(() => {
        res.redirect("/")
    })
})
//app.use("/",) 404

app.listen(80, function () {
  console.log('Example app listening on port 80!');
});