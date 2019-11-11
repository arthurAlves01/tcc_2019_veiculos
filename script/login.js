function recuperaSenha() {
    var user = $("#user").val();
    if(user=="") {
        alert("Informe o nome de usuário")
        return;
    }
    $.ajax({
        url : '/recuperaSenha',
        type : 'POST',
        data : {
            "u" : $("#user").val()
        },
        dataType:'json'
    })
    .then((data) => {
        alert("Nova senha enviada para o e-mail cadastrado!")
    })
    .catch((req) => {
        alert("Usuário não encontrado!")
    })
}
function login() {
    var user = $("#user").val();
    var pw = $("#pw").val();
    if(user==""||pw=="") {
        alert("Informe o nome de usuário e senha!")
        return;
    }
    $.ajax({
        url : '/login',
        type : 'POST',
        data : {
            "user" : $("#user").val(),
            "pw" : $("#pw").val()
        }
    })
    .then(
        (data) => {
            window.location.href = "/"
        },
        (req,err) => {
            alert("Usuário ou senha incorretos!")
            $("#pw").val("")
        }
    )
}
$(document).ready(() => {
    $("#recuperaSenha").on("click", recuperaSenha)
    $("#enviarLogin").on("click", login)
    $("#user").on("keypress", function(e) {
        if(e.charCode==13) {
            login()
        }
    })
    $("#pw").on("keypress", function(e) {
        if(e.charCode==13) {
            login()
        }
    })
})