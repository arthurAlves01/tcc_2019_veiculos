const express = require('express');
const app = express();
const crud = require("./crud.js") //Funções do db que retornam promisses
const session = require("express-session")
const api = require("./api.js")

app.set('view engine', 'pug')
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(session({
  secret: '9pf48z74ur',
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false }
}))

app.use("/api", api)

app.get(["/","/*"], (req, res, next) => {
    if(req.session.loggedin||req.path.substring(0,5)=="/css/"||req.path.substring(0,5)=="/script/") {
        next()
    } else {
        res.render("login")
    }
})

app.get("/",(req,res) => {
    res.render("home", {user: req.session.username})
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
    crud.listaMontadoras()
        .then((data) => {
            res.render("cadastraVeiculo", {montadoras: data, usuario: req.session.username})
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
            res.send(err)
        })
})

app.use(express.static(__dirname))

app.listen(80, function () {
  console.log('Example app listening on port 80!');
});