function validaForm() {
    let modelo = document.getElementById("nomeModelo");
    if(modelo.value==="") {
        alert("Informe o nome do modelo!")
        return false
    }
    return true
}