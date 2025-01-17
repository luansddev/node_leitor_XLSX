const XLSX = require('xlsx');
const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'xlsx_files', 'SPDadosCriminais_2024.xlsx');
const outputFolderPath = path.join(__dirname, 'dados_SSP');

// Constante para o nome do arquivo de saída
const outputFileName = 'dados_SSP_geoloc.txt';

// Constante para os nomes das cidades
const CITIES = ["ADAMANTINA", "ADOLFO", "AGUAI", "AGUAS DA PRATA", "AGUAS DE LINDOIA", "AGUAS DE SANTA BARBARA", "AGUAS DE SAO PEDRO", "AGUDOS", "ALAMBARI", "ALFREDO MARCONDES", "ALTAIR", "ALTINOPOLIS", "ALTO ALEGRE", "ALUMINIO", "ALVARES FLORENCE", "ALVARES MACHADO", "ALVARO DE CARVALHO", "ALVINLANDIA", "AMERICANA", "AMERICO BRASILIENSE", "AMERICO DE CAMPOS", "AMPARO", "ANALANDIA", "ANDRADINA", "ANGATUBA", "ANHEMBI", "ANHUMAS", "APARECIDA", "APARECIDA D OESTE", "APIAI", "ARACARIGUAMA", "ARACATUBA", "ARACOIABA DA SERRA", "ARAMINA", "ARANDU", "ARAPEI", "ARARAQUARA", "ARARAS", "ARCO-IRIS", "AREALVA", "AREIAS", "AREIOPOLIS", "ARIRANHA", "ARTUR NOGUEIRA", "ARUJA", "ASPASIA", "ASSIS", "ATIBAIA", "AURIFLAMA", "AVAI", "AVANHANDAVA", "AVARE", "BADY BASSITT", "BALBINOS", "BALSAMO", "BANANAL", "BARAO DE ANTONINA", "BARBOSA", "BARIRI", "BARRA BONITA", "BARRA DO CHAPEU", "BARRA DO TURVO", "BARRETOS", "BARRINHA", "BARUERI", "BASTOS", "BATATAIS", "BAURU", "BEBEDOURO", "BENTO DE ABREU", "BERNARDINO DE CAMPOS", "BERTIOGA", "BILAC", "BIRIGUI", "BIRITIBA-MIRIM", "BOA ESPERANCA DO SUL", "BOCAINA", "BOFETE", "BOITUVA", "BOM JESUS DOS PERDOES", "BOM SUCESSO DE ITARARE", "BORACEIA", "BORBOREMA", "BOREBI", "BOTUCATU", "BRAGANCA PAULISTA", "BRAUNA", "BREJO ALEGRE", "BRODOWSKI", "BROTAS", "BURI", "BURITAMA", "BURITIZAL", "CABRALIA PAULISTA", "CABREUVA", "CACAPAVA", "CACHOEIRA PAULISTA", "CACONDE", "CAFELANDIA", "CAIABU", "CAIEIRAS", "CAIUA", "CAJAMAR", "CAJATI", "CAJOBI", "CAJURU", "CAMPINA MONTE ALEGRE", "CAMPINAS", "CAMPO LIMPO PAULISTA", "CAMPOS DO JORDAO", "CAMPOS NOVOS PAULISTA", "CANANEIA", "CANAS", "CANDIDO MOTA", "CANDIDO RODRIGUES", "CANITAR", "CAPAO BONITO", "CAPELA DO ALTO", "CAPIVARI", "CARAGUATATUBA", "CARAPICUIBA", "CARDOSO", "CASA BRANCA", "CASSIA DOS COQUEIROS", "CASTILHO", "CATANDUVA", "CATIGUA", "CEDRAL", "CERQUEIRA CESAR", "CERQUILHO", "CESARIO LANGE", "CHARQUEADA", "CHAVANTES", "CIDADE", "CLEMENTINA", "COLINA", "COLOMBIA", "CONCHAL", "CONCHAS", "CORDEIROPOLIS", "COROADOS", "CORONEL MACEDO", "CORUMBATAI", "COSMOPOLIS", "COSMORAMA", "COTIA", "CRAVINHOS", "CRISTAIS PAULISTA", "CRUZALIA", "CRUZEIRO", "CUBATAO", "CUNHA", "DESCALVADO", "DIADEMA", "DIRCE REIS", "DIVINOLANDIA", "DOBRADA", "DOIS CORREGOS", "DOLCINOPOLIS", "DOURADO", "DRACENA", "DUARTINA", "DUMONT", "ECHAPORA", "ELDORADO", "ELIAS FAUSTO", "ELISIARIO", "EMBAUBA", "EMBU DAS ARTES", "EMBU-GUACU", "ENGENHEIRO COELHO", "ESPIRITO S.DO TURVO", "ESPIRITO STO. PINHAL", "ESTIVA GERBI", "ESTRELA D OESTE", "ESTRELA DO NORTE", "EUCLIDES DA CUNHA PTA", "FARTURA", "FERNANDO PRESTES", "FERNANDOPOLIS", "FERNAO", "FERRAZ DE VASCONCELOS", "FLOREAL", "FLORIDA PAULISTA", "FLORINIA", "FRANCA", "FRANCISCO MORATO", "FRANCO DA ROCHA", "GALIA", "GARCA", "GASTAO VIDIGAL", "GAVIAO PEIXOTO", "GENERAL SALGADO", "GETULINA", "GLICERIO", "GUAICARA", "GUAIMBE", "GUAIRA", "GUAPIACU", "GUAPIARA", "GUARA", "GUARACAI", "GUARACI", "GUARANI D OESTE", "GUARANTA", "GUARARAPES", "GUARAREMA", "GUARATINGUETA", "GUAREI", "GUARIBA", "GUARUJA", "GUARULHOS", "GUATAPARA", "GUZOLANDIA", "HERCULANDIA", "HOLAMBRA", "HORTOLANDIA", "IACANGA", "IACRI", "IARAS", "IBATE", "IBIRA", "IBIRAREMA", "IBITINGA", "IBIUNA", "ICEM", "IEPE", "IGARACU DO TIETE", "IGARAPAVA", "IGARATA", "IGUAPE", "ILHA COMPRIDA", "ILHA SOLTEIRA", "ILHABELA", "INDAIATUBA", "INDIANA", "INDIAPORA", "INUBIA PAULISTA", "IPAUSSU", "IPERO", "IPEUNA", "IPIGUA", "IPORANGA", "IPUA", "IRACEMAPOLIS", "IRAPUA", "IRAPURU", "ITABERA", "ITAI", "ITAJOBI", "ITAJU", "ITANHAEM", "ITAOCA", "ITAPECERICA DA SERRA", "ITAPETININGA", "ITAPEVA", "ITAPEVI", "ITAPIRA", "ITAPIRAPUA PAULISTA", "ITAPOLIS", "ITAPORANGA", "ITAPUI", "ITAPURA", "ITAQUAQUECETUBA", "ITARARE", "ITARIRI", "ITATIBA", "ITATINGA", "ITIRAPINA", "ITIRAPUA", "ITOBI", "ITU", "ITUPEVA", "ITUVERAVA", "JABORANDI", "JABOTICABAL", "JACAREI", "JACI", "JACUPIRANGA", "JAGUARIUNA", "JALES", "JAMBEIRO", "JANDIRA", "JARDINOPOLIS", "JARINU", "JAU", "JERIQUARA", "JOANOPOLIS", "JOAO RAMALHO", "JOSE BONIFACIO", "JULIO MESQUITA", "JUMIRIM", "JUNDIAI", "JUNQUEIROPOLIS", "JUQUIA", "JUQUITIBA", "LAGOINHA", "LARANJAL PAULISTA", "LAVINIA", "LAVRINHAS", "LEME", "LENCOIS PAULISTA", "LIMEIRA", "LINDOIA", "LINS", "LORENA", "LOURDES", "LOUVEIRA", "LUCELIA", "LUCIANOPOLIS", "LUIS ANTONIO", "LUIZIANIA", "LUPERCIO", "LUTECIA", "MACATUBA", "MACAUBAL", "MACEDONIA", "MAGDA", "MAIRINQUE", "MAIRIPORA", "MANDURI", "MARABA PAULISTA", "MARACAI", "MARAPOAMA", "MARIAPOLIS", "MARILIA", "MARINOPOLIS", "MARTINOPOLIS", "MATAO", "MAUA", "MENDONCA", "MERIDIANO", "MESOPOLIS", "MIGUELOPOLIS", "MINEIROS DO TIETE", "MIRA ESTRELA", "MIRACATU", "MIRANDOPOLIS", "MIRANTE PARANAPANEMA", "MIRASSOL", "MIRASSOLANDIA", "MOCOCA", "MOGI DAS CRUZES", "MOGI GUACU", "MOGI MIRIM", "MOMBUCA", "MONCOES", "MONGAGUA", "MONTE ALEGRE DO SUL", "MONTE ALTO", "MONTE APRAZIVEL", "MONTE AZUL PAULISTA", "MONTE CASTELO", "MONTE MOR", "MONTEIRO LOBATO", "MORRO AGUDO", "MORUNGABA", "MOTUCA", "MURUTINGA DO SUL", "NANTES", "NARANDIBA", "NATIVIDADE DA SERRA", "NAZARE PAULISTA", "NEVES PAULISTA", "NHANDEARA", "NIPOA", "NOVA ALIANCA", "NOVA CAMPINA", "NOVA CANAA PAULISTA", "NOVA CASTILHO", "NOVA EUROPA", "NOVA GRANADA", "NOVA GUATAPORANGA", "NOVA INDEPENDENCIA", "NOVA LUZITANIA", "NOVA ODESSA", "NOVAIS", "NOVO HORIZONTE", "NUPORANGA", "OCAUCU", "OLEO", "OLIMPIA", "ONDA VERDE", "ORIENTE", "ORINDIUVA", "ORLANDIA", "OSASCO", "OSCAR BRESSANE", "OSVALDO CRUZ", "OURINHOS", "OURO VERDE", "OUROESTE", "OUTRO PAIS", "PACAEMBU", "PALESTINA", "PALMARES PAULISTA", "PALMEIRA D OESTE", "PALMITAL", "PANORAMA", "PARAGUACU PAULISTA", "PARAIBUNA", "PARAISO", "PARANAPANEMA", "PARANAPUA", "PARAPUA", "PARDINHO", "PARIQUERA-ACU", "PARISI", "PATROCINIO PAULISTA", "PAULICEIA", "PAULINIA", "PAULISTANIA", "PAULO DE FARIA", "PEDERNEIRAS", "PEDRA BELA", "PEDRANOPOLIS", "PEDREGULHO", "PEDREIRA", "PEDRINHAS PAULISTA", "PEDRO DE TOLEDO", "PENAPOLIS", "PEREIRA BARRETO", "PEREIRAS", "PERUIBE", "PIACATU", "PIEDADE", "PILAR DO SUL", "PINDAMONHANGABA", "PINDORAMA", "PINHALZINHO", "PIQUEROBI", "PIQUETE", "PIRACAIA", "PIRACICABA", "PIRAJU", "PIRAJUI", "PIRANGI", "PIRAPORA BOM JESUS", "PIRAPOZINHO", "PIRASSUNUNGA", "PIRATININGA", "PITANGUEIRAS", "PLANALTO", "PLATINA", "POA", "POLONI", "POMPEIA", "PONGAI", "PONTAL", "PONTALINDA", "PONTES GESTAL", "POPULINA", "PORANGABA", "PORTO FELIZ", "PORTO FERREIRA", "POTIM", "POTIRENDABA", "PRACINHA", "PRADOPOLIS", "PRAIA GRANDE", "PRATANIA", "PRESIDENTE ALVES", "PRESIDENTE BERNARDES", "PRESIDENTE EPITACIO", "PRESIDENTE PRUDENTE", "PRESIDENTE VENCESLAU", "PROMISSAO", "QUADRA", "QUATA", "QUEIROZ", "QUELUZ", "QUINTANA", "RAFARD", "RANCHARIA", "REDENCAO DA SERRA", "REGENTE FEIJO", "REGINOPOLIS", "REGISTRO", "RESTINGA", "RIBEIRA", "RIBEIRAO BONITO", "RIBEIRAO BRANCO", "RIBEIRAO CORRENTE", "RIBEIRAO DO SUL", "RIBEIRAO GRANDE", "RIBEIRAO INDIOS", "RIBEIRAO PIRES", "RIBEIRAO PRETO", "RIFAINA", "RINCAO", "RINOPOLIS", "RIO CLARO", "RIO DAS PEDRAS", "RIO GRANDE DA SERRA", "RIOLANDIA", "RIVERSUL", "ROSANA", "ROSEIRA", "RUBIACEA", "RUBINEIA", "S.ADELIA", "S.ALBERTINA", "S.ANASTACIO", "S.ANDRE", "S.ANTONIO DA ALEGRIA", "S.ANTONIO DE ARACANGUA", "S.ANTONIO DE POSSE", "S.ANTONIO DO JARDIM", "S.ANTONIO DO PINHAL", "S.BARBARA D OESTE", "S.BENTO DO SAPUCAI", "S.BERNARDO DO CAMPO", "S.BRANCA", "S.CAETANO DO SUL", "S.CARLOS", "S.CLARA D OESTE", "S.CRUZ DA CONCEICAO", "S.CRUZ DA ESPERANCA", "S.CRUZ DAS PALMEIRAS", "S.CRUZ DO RIO PARDO", "S.ERNESTINA", "S.EXPEDITO", "S.FE DO SUL", "S.FRANCISCO", "S.GERTRUDES", "S.ISABEL", "S.JOAO DA BOA VISTA", "S.JOAO DE IRACEMA", "S.JOAO DO PAU D ALHO", "S.JOAO DUAS PONTES", "S.JOAQUIM DA BARRA", "S.JOSE DA BELA VISTA", "S.JOSE DE PIRANHAS", "S.JOSE DO BARREIRO", "S.JOSE DO RIO PARDO", "S.JOSE DO RIO PRETO", "S.JOSE DOS CAMPOS", "S.LOURENCO DA SERRA", "S.LUCIA", "S.LUIZ DO PARAITINGA", "S.MANUEL", "S.MARIA DA SERRA", "S.MATEUS", "S.MERCEDES", "S.MIGUEL ARCANJO", "S.PAULO", "S.PEDRO", "S.PEDRO DO TURVO", "S.RITA D OESTE", "S.RITA PASSA QUATRO", "S.ROQUE", "S.ROSA DE VITERBO", "S.SALETE", "S.SEBASTIAO", "S.SEBASTIAO DA GRAMA", "S.SIMAO", "S.VICENTE", "SABINO", "SAGRES", "SALES", "SALES OLIVEIRA", "SALESOPOLIS", "SALMOURAO", "SALTINHO", "SALTO", "SALTO DE PIRAPORA", "SALTO GRANDE", "SANDOVALINA", "SANTANA DA PONTE PENSA", "SANTANA DE PARNAIBA", "SANTOPOLIS DO AGUAPEI", "SANTOS", "SARAPUI", "SARUTAIA", "SEBASTIANOPOLIS DO SUL", "SERRA AZUL", "SERRA NEGRA", "SERRANA", "SERTAOZINHO", "SETE BARRAS", "SEVERINIA", "SILVEIRAS", "SOCORRO", "SOROCABA", "SUD MENNUCCI", "SUMARE", "SUZANAPOLIS", "SUZANO", "TABAPUA", "TABATINGA", "TABOAO DA SERRA", "TACIBA", "TAGUAI", "TAIACU", "TAIUVA", "TAMBAU", "TANABI", "TAPIRAI", "TAPIRATIBA", "TAQUARAL", "TAQUARITINGA", "TAQUARITUBA", "TAQUARIVAI", "TARABAI", "TARUMA", "TATUI", "TAUBATE", "TEJUPA", "TEODORO SAMPAIO", "TERRA ROXA", "TIETE", "TIMBURI", "TORRE DE PEDRA", "TORRINHA", "TRABIJU", "TREMEMBE", "TRES FRONTEIRAS", "TUIUTI", "TUPA", "TUPI PAULISTA", "TURIUBA", "TURMALINA", "UBARANA", "UBATUBA", "UBIRAJARA", "UCHOA", "UNIAO PAULISTA", "URANIA", "URU", "URUPES", "VALENTIM GENTIL", "VALINHOS", "VALPARAISO", "VARGEM", "VARGEM GRANDE DO SUL", "VARGEM GRANDE PAULISTA", "VARZEA PAULISTA", "VERA CRUZ", "VINHEDO", "VIRADOURO", "VISTA ALEGRE DO ALTO", "VITORIA BRASIL", "VOTORANTIM", "VOTUPORANGA", "ZACARIAS"]; // Substitua pelos nomes reais das cidades

// Constante para o número do mês
const MONTH = 2;

function collectGeolocData(workbook, cityName) {
    const geolocData = {};
    
    workbook.SheetNames.forEach(sheetName => {
        const worksheet = workbook.Sheets[sheetName];
        const range = XLSX.utils.decode_range(worksheet['!ref']);

        for (let rowNum = range.s.r + 1; rowNum <= range.e.r; rowNum++) { // Iniciamos do segundo row para ignorar o cabeçalho
            const cityCellAddress = { c: 3, r: rowNum }; // Coluna 4 para o nome da cidade
            const cityCellRef = XLSX.utils.encode_cell(cityCellAddress);
            const cityCellValue = worksheet[cityCellRef] ? worksheet[cityCellRef].v : null;

            const monthCellAddress = { c: 23, r: rowNum }; // Coluna 24 para o número do mês
            const monthCellRef = XLSX.utils.encode_cell(monthCellAddress);
            const monthCellValue = worksheet[monthCellRef] ? worksheet[monthCellRef].v : null;

            if (cityCellValue === cityName && monthCellValue === MONTH) {
                const naturezaCellAddress = { c: 22, r: rowNum }; // Coluna 23 para a natureza apurada
                const naturezaCellRef = XLSX.utils.encode_cell(naturezaCellAddress);
                const naturezaCellValue = worksheet[naturezaCellRef] ? worksheet[naturezaCellRef].v : null;

                const latCellAddress = { c: 14, r: rowNum }; // Coluna 15 para a latitude
                const latCellRef = XLSX.utils.encode_cell(latCellAddress);
                const latCellValue = worksheet[latCellRef] ? worksheet[latCellRef].v : null;

                const longCellAddress = { c: 15, r: rowNum }; // Coluna 16 para a longitude
                const longCellRef = XLSX.utils.encode_cell(longCellAddress);
                const longCellValue = worksheet[longCellRef] ? worksheet[longCellRef].v : null;

                if (naturezaCellValue && latCellValue && longCellValue) {
                    if (!geolocData[naturezaCellValue]) {
                        geolocData[naturezaCellValue] = [];
                    }
                    geolocData[naturezaCellValue].push([latCellValue, longCellValue]);
                }
            }
        }
    });

    return geolocData;
}

// Criar a pasta de saída, se necessário
if (!fs.existsSync(outputFolderPath)) {
    fs.mkdirSync(outputFolderPath);
}

// Caminho completo do arquivo de saída
const outputFilePath = path.join(outputFolderPath, outputFileName);

// Carregar o arquivo
const workbook = XLSX.readFile(filePath);

// Array para armazenar os dados de todas as cidades
const allCityData = [];

// Processar dados para todas as cidades
CITIES.forEach(cityName => {
    const cityData = {
        cityName: cityName,
        geolocData: collectGeolocData(workbook, cityName)
    };
    allCityData.push(cityData);
});

// Salvar os dados no arquivo de saída
allCityData.forEach(cityData => {
    const { cityName, geolocData } = cityData;
    fs.appendFileSync(outputFilePath, `${cityName}\n`);
    for (const [natureza, geolocs] of Object.entries(geolocData)) {
        fs.appendFileSync(outputFilePath, `${natureza}\n`);
        geolocs.forEach(coords => {
            fs.appendFileSync(outputFilePath, `${coords.join(' ')}\n`);
        });
        fs.appendFileSync(outputFilePath, '?\n');
    }
    fs.appendFileSync(outputFilePath, '#\n');
});

console.log(`Dados salvos em: ${outputFilePath}`);
