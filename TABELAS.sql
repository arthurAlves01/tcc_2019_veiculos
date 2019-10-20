CREATE TABLE tbMontadoras(
Id BIGINT IDENTITY(1,1) PRIMARY KEY,
Nome VARCHAR(35)
)

CREATE TABLE tbModelo(
Id BIGINT IDENTITY(1,1) PRIMARY KEY,
Modelo VARCHAR(35),
IdMontadora BIGINT
)

CREATE TABLE tbInfoVeiculo(
Id BIGINT IDENTITY(1,1) PRIMARY KEY,
IdModelo BIGINT,
IdMontadora BIGINT,
AnoFabricacao INT,
Cores VARCHAR(50),
TipoChasi VARCHAR(30),
SuspensaoDianteira VARCHAR(30),
SuspensaoTraseira VARCHAR(30),
PneusDianteiro VARCHAR(30),
PneuTraseiro VARCHAR(30),
FreioDianteiro VARCHAR(30),
FreioTraseiro VARCHAR(30),
TipodoFreio VARCHAR(30),
QTDCilindros int,
Diametro DECIMAL,
Curso DECIMAL,
Cilindrada DECIMAL,
PotênciaMaximo DECIMAL, 	
TorqueMaximo DECIMAL,
Sistemadepartida VARCHAR(30),
TipodeAlimentação  VARCHAR(30),
Combustivel  VARCHAR(30),
SistemadeTransmissão   VARCHAR(30),
Cambio  VARCHAR(30),
Bateria VARCHAR(30),
TaxadeCompressao DECIMAL,
Comprimento DECIMAL,
Largura DECIMAL,
Altura DECIMAL,
DistanciaEntreEixos DECIMAL,
DistanciaDoSolo DECIMAL,
AlturaDoAssento DECIMAL,
TanqueDeCombustivel DECIMAL,
Peso DECIMAL
)