# GuiaMotos
# Portal de Cadastro & API Http para consultas

Basta rodar o arquivo "run.bat" e acessar o http://localhost

Métodos da API de veículos:
Todos os métodos retornar um objeto com duas propriedades em caso de erro, “msg” que contém a descrição do erro e “errn”, que contém o código do erro.
Exemplo: {“errn”:”1”, "msg":"database_error"}
Todos parâmetros são case_sensite (Yamaha é diferente de YAMAHA) e devem ser padronizados como URI (“Neo 125” fica “Neo%20125”)
A propriedade arqFoto do modelo é a imagem em base64 e deve ser convertido em imagem.
Exemplo (HTML): <img src="data:image/png;base64, <imagem em base64> />

Lista de Erros:
Código 1: Retornado quando ocorre algum erro durante a comunicação com o banco de dados da API: {“errn”:”1”, "msg":"database_error"}

Buscando a lista de Montadoras:
Descrição:
Retorna a lista de fabricantes
URL Exemplo:
http://guiamotos:81/api/busca
Parâmetros:
Nenhum
Valores retornados:
Lista de objetos com apenas uma propriedade, “nome”, que representa o nome da montadora, esse valor é utilizado para buscar a lista de veículos da montadora.
Exemplo: [{"nome":"Yamaha"}, {"nome":"Honda"}, {"nome":"Suzuki}]

Buscando lista de Veículos de uma Montadora:
Descrição:
Retorna a lista dos veículos cadastros sobre uma determinada montadora
URL Exemplo:
http://localhost/api/montadora/{nome_montadora}
Parâmetros:
•	Nome da Montadora 
Valores retornados:
Lista com os modelos cadastrados para a montadora contendo as principais informações de cada veículo como: id da montadora (idmontadora), id do veículo (id), nome do modelo (nomemodelo) e ano de fabricação (anofabricacao).

Buscando dados de um Modelo:
Descrição:
Retorna dados do modelo desejado
URL Exemplo:
http://localhost/api/busca/montadora/{nome_montadora}/modelo/{nome_modelo}/ano/{ano_modelo}
Parâmetros:
•	Nome da Montadora
•	Nome do Modelo
•	Ano Modelo
Valores retornados:
Dados do modelo solicitado.
Exemplo: {"id":29,"idmontadora":22,"anofabricacao":2018,"cores":"Vermelho, Preto, Branco","tipochassi":"Underbone","suspensaodianteira":"Garfo telescóipico","suspensaotraseira":"Balança Oscilante","pneusdianteiro":"Sem câmara 110/70","pneutraseiro":"Sem câmara 130/70","freiodianteiro":"Freio a disco simples","freiotraseiro":"Freio a disco hidráulico simples","tipodofreio":"ABS","qtdcilindros":1,"diametro":"58,0","curso":"58,7","cilindrada":160,"potenciamaxima":"15,1 cv x 8.000 rpm","torquemaximo":"1,5 kgf.m x 6.000 rpm","sistemadepartida":"Partida elétrica","tipodealimentacao":"Injeção eletrônica","combustivel":"Gasolina","sistemadetransmissao":"Automático","cambio":"ABS","bateria":"12v 6Ah","taxadecompessao":"10,5:1","comprimento":"1,95","largura":"0,74","altura":"1,11","distanciaentreeixos":"1,25","distanciadosolo":"0,13","alturadoassento":"0,76","tanquedecombustivel":"6,6","peso":127,"nomemodelo":"NMAX","usuarioCadastro":"geuso","arqFoto":<imagem em base64>}
