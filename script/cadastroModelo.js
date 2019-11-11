function validaForm() {
    let modelo = document.getElementById("nomeModelo");
    if($("#nomeModelo").val()==""||$("#anoFabricacao").val()=="") {
        alert("Informe o nome do modelo e o ano de fabricação!")
        return false
    }
    let montadora, nomeModelo, anoFabricacao;
    montadora = $("#montadora").val();
    nomeModelo = $("#nomeModelo").val();
    anoFabricacao = $("#anoFabricacao").val();
    $.ajax({
        url : '/validaModelo',
        type : 'GET',
        data : {
            "montadora" : montadora,
            "nomeModelo" : nomeModelo,
            "anoFabricacao" : anoFabricacao
        }
    })
    .then(
        (data) => {
            console.log(data)
            cadastraModelo()
        },
        (req,err) => {
            alert("Modelo já cadastrado!")
        }
    )
}
function cadastraModelo() {
    $("#cadastro").get()[0].submit()
}
$(document).ready(() => {
    $("#submeter").on("click", (e) => {
        e.preventDefault();
        validaForm();
    })
})
