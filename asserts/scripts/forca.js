let tentativas = 6;
let listaDinamica = [];
let palavraSecretaCategoria;
let palavraSecretaSorteada;
const palavras = [
    palavra001 = {
        nome: "VARIAVEL",
        categoria:"Var,Let e Const"
    },
    palavra002 = {
        nome: "FUNCAO",
        categoria:"é um bloco de código que pode ser chamado de outros locais do programa para realizar uma tarefa específica."
    },
    palavra003 = {
        nome: "LOOP",
        categoria:"é uma estrutura de controle que permite executar um bloco de código várias "
    },
    palavra004 = {
        nome: "STRING",
        categoria:"é um tipo de dado que representa uma sequência de caracteres."
    },
    palavra005 = {
        nome: "BOOLEANO",
        categoria:" é um tipo de dado que representa verdadeiro ou falso."
    },
    palavra006 = {
        nome: "CLASSE",
        categoria:"é um modelo para a criação de objetos, que define atributos e métodos"
    },
    palavra007 = {
        nome: "FILA",
        categoria:"é uma estrutura de dados que permite adicionar elementos ao final e remover "
    },
    palavra008 = {
        nome: "ALGORITMO",
        categoria:"é um conjunto de instruções para resolver um problema ou realizar uma tarefa específica."
    },
    palavra009 = {
        nome: "ESTRUTURA DE DADOS",
        categoria:"é uma maneira de organizar e armazenar dados em um programa, para que possam ser acessados e manipulados de forma eficiente."
    },
    palavra010 = {
        nome: "BIBLIOTECA",
        categoria:"é um conjunto de código que pode ser reutilizado em vários programas, geralmente para realizar tarefas comuns de maneira eficiente."
    },
    palavra011 = {
        nome: "JAVASCRIPT",
        categoria:"é uma linguagem de programação de script usada principalmente para criar páginas web interativas e dinâmicas."
    },
    palavra012 = {
        nome: "PHP",
        categoria:"é uma linguagem de programação usada principalmente para desenvolvimento de sites e aplicativos web no BackEnd"
    },
    palavra013 = {
        nome: "TYPESCRIPT",
        categoria:"é uma linguagem de programação que adiciona recursos de tipagem estática ao JavaScript, tornando-o mais seguro e fácil de manter."
    },
    palavra014 = {
        nome: "KOTLIN",
        categoria:"é uma linguagem de programação usada principalmente para desenvolvimento de aplicativos Android, Web e Desktop, com sintaxe simplificada e recursos modernos."
    },
    palavra015 = {
        nome: "HERANCA",
        categoria:" é um conceito de programação orientada a objetos em que uma classe pode herdar atributos e métodos de outra classe."
    },
    palavra016 = {
        nome: "SWIFT",
        categoria:"é uma linguagem de programação desenvolvida pela Apple, usada principalmente para desenvolvimento de aplicativos iOS e Mac"
    },
    palavra017 = {
        nome: "SQL",
        categoria:"é uma linguagem de consulta usada para gerenciar bancos de dados relacionais."
    },
    palavra018 = {
        nome: "HTML",
        categoria:"é uma linguagem de marcação usada para criar páginas web."
    },
    palavra019 = {
        nome: "CSS",
        categoria:"é uma linguagem de estilo usada para controlar a apresentação visual de páginas web."
    },
    palavra020 = {
        nome: "REACT",
        categoria:"é uma linguagem de programação de alto nível, fácil de aprender e com uma ampla variedade de bibliotecas disponíveis para processamento de dados e aprendizado de máquina."
    },
];

criarPalavraSecreta()
function criarPalavraSecreta(){
    const indexPalavra = parseInt(Math.random() * palavras.length)
    
    palavraSecretaSorteada = palavras[indexPalavra].nome;
    palavraSecretaCategoria = palavras[indexPalavra].categoria;
    
    // console.log(palavraSecretaSorteada);
    // console.log(palavraSecretaCategoria);
}

montarPalavra()
function montarPalavra(){
    const categoria = document.getElementById("categoria");
    categoria.innerHTML= palavraSecretaCategoria;

    const palavraTela = document.getElementById("palavra-secreta");
    palavraTela.innerHTML = "";

    //console.log(palavraSecretaSorteada)
    
    for(i = 0; i < palavraSecretaSorteada.length; i++){  
        if(listaDinamica[i] == undefined){
            if (palavraSecretaSorteada[i] == " ") {
                listaDinamica[i] = " ";
                palavraTela.innerHTML = palavraTela.innerHTML + "<div class='letrasEspaco'>" + listaDinamica[i] + "</div>"
            }
            else{
                listaDinamica[i] = "&nbsp;"
                palavraTela.innerHTML = palavraTela.innerHTML + "<div class='letras'>" + listaDinamica[i] + "</div>"
            }     
        }
        else{
            if (palavraSecretaSorteada[i] == " ") {
                listaDinamica[i] = " ";
                palavraTela.innerHTML = palavraTela.innerHTML + "<div class='letrasEspaco'>" + listaDinamica[i] + "</div>"
            }
            else{
                palavraTela.innerHTML = palavraTela.innerHTML + "<div class='letras'>" + listaDinamica[i] + "</div>"
            }    
        }
    }
}
function verificaLetraEscolhida(letra){
    document.getElementById("tecla-" + letra).disabled = true
    if(tentativas > 0)
    {
        mudarStyleLetra("tecla-" + letra, false);
        comparalistas(letra);
        montarPalavra();

    }
}

function mudarStyleLetra(tecla, condicao){
    if(condicao == false)
    {
        document.getElementById(tecla).style.background = "#cd1b2e";
        document.getElementById(tecla).style.color = "#ffffff";
    }
    else{
        document.getElementById(tecla).style.background = "#008000";
        document.getElementById(tecla).style.color = "#ffffff";
    }
}

function comparalistas(letra){
    const pos = palavraSecretaSorteada.indexOf(letra)
    if(pos < 0){
        tentativas-- 
        carregaImagemForca();
        if(tentativas==0)
        {
            abreModal("ÉGUAS!!", "Éra uma vez parceiro(a)... <br> A palavra era:  " + palavraSecretaSorteada+".");
        }
    }
    else{
        mudarStyleLetra("tecla-" + letra, true);
        for(i = 0; i < palavraSecretaSorteada.length; i++)
        {
            if(palavraSecretaSorteada[i] == letra){
                listaDinamica[i] = letra;
            }
        }
    }

    let vitoria = true;
    for(i = 0; i < palavraSecretaSorteada.length; i++) {
        if(palavraSecretaSorteada[i] != listaDinamica[i]){
            vitoria = false;
        }
    }
    if(vitoria == true)
    {
        abreModal("PARÁBENS MEU CHEGADO(A) !!!", "Você é o bichão mesmo. 👏👏👏");
        tentativas = 0;
    }
    
}

function carregaImagemForca(){
    switch(tentativas){
        case 5:
            document.getElementById("imagem").style.background = "url('./img/forca01.png')";
            break;
        case 4:
            document.getElementById("imagem").style.background = "url('./img/forca02.png')";
            break;
        case 3:
            document.getElementById("imagem").style.background = "url('./img/forca03.png')";
            break;
        case 2:
            document.getElementById("imagem").style.background = "url('./img/forca04.png')";
            break;
        case 1:
            document.getElementById("imagem").style.background = "url('./img/forca05.png')";
            break;
        case 0:
            document.getElementById("imagem").style.background = "url('./img/forca06.png')";
            break;
        default: 
        document.getElementById("imagem").style.background = "url('./img/forca.png')";
            break;
    }
}

function abreModal(título,mensagem) {
    let modalTítulo = document.getElementById("exampleModalCenterTitle");
    modalTítulo.innerText= título;

    let modalBody = document.getElementById("modalBody");
    modalBody.innerHTML= mensagem;

    $("#myModal").modal({
        show: true,
    })
}


let btnReiniciar = document.querySelector("#btnReiniciar")
btnReiniciar.addEventListener("click", function(){
    location.reload();
});
let fechar = document.querySelector("#refresh")
fechar.addEventListener("click", function(){
    location.reload();})