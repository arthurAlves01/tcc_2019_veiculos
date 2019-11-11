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
$(document).ready(() => {
    $("#recuperaSenha").on("click", recuperaSenha)
})