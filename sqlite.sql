CREATE TABLE tbMontadoras (
    id   INTEGER          PRIMARY KEY AUTOINCREMENT,
    nome VARCHAR (35, 35) 
);

CREATE TABLE tbModelo (
    id          INTEGER          PRIMARY KEY AUTOINCREMENT,
    modelo      VARCHAR (35, 35),
    idmontadora BIGINT
);

CREATE TABLE tbInfoVeiculo (
    id                   INTEGER      PRIMARY KEY AUTOINCREMENT,
    idmodelo             BIGINT,
    idmontadora          BIGINT,
    anofabricacao        INT,
    cores                VARCHAR (50),
    tipochassi           VARCHAR (30),
    suspensaodianteira   VARCHAR (30),
    suspensaotraseira    VARCHAR (30),
    pneusdianteiro       VARCHAR (30),
    pneutraseiro         VARCHAR (30),
    freiodianteiro       VARCHAR (30),
    freiotraseiro        VARCHAR (30),
    tipodofreio          VARCHAR (30),
    qtdcilindros         INT,
    diametro             DECIMAL,
    curso                DECIMAL,
    cilindrada           DECIMAL,
    potenciamaxima       DECIMAL,
    torquemaximo         DECIMAL,
    sistemadepartida     VARCHAR (30),
    tipodealimentacao    VARCHAR (30),
    combustivel          VARCHAR (30),
    sistemadetransmissao VARCHAR (30),
    cambio               VARCHAR (30),
    bateria              VARCHAR (30),
    taxadecompessao      DECIMAL,
    comprimento          DECIMAL,
    largura              DECIMAL,
    altura               DECIMAL,
    distanciaentreeixos  DECIMAL,
    distanciadosolo      DECIMAL,
    alturadoassento      DECIMAL,
    tanquedecombustivel  DECIMAL,
    peso                 DECIMAL
);
