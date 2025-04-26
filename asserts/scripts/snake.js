var pontos = 0
 function AtualizarPontos(){
    
    var boxPontos = document.getElementById("pontos-box")
    
    
   
    boxPontos.innerHTML = `Pontuação: ${pontos}`;
    
   }

   AtualizarPontos()
window.onload = function startGame(){
    
    var stage = document.getElementById('stage'); 
    var context = stage.getContext("2d");
    document.addEventListener("keydown", keyPush);
    setInterval(game, 80);

    const velocidade = 1;

    var velocidadeX = velocidadeY = 0;
    var pontoX =10;
    var pontoY = 10;
    var tamanhoDaPeca = 30;
    var quantidadeDePeca = 20;
    var macaX=macaY=15;

    var rastroCobra = [];
    caudaCobra = 5;
    
    
    function game(){
      
       
        pontoX += velocidadeX;
        pontoY += velocidadeY;
        if (pontoX <0) {
            pontoX = quantidadeDePeca-1;
        }
        if (pontoX > quantidadeDePeca-1) {
            pontoX = 0;
        }
        if (pontoY < 0) {
            pontoY = quantidadeDePeca-1;
        }
        if (pontoY > quantidadeDePeca-1) {
            pontoY = 0;
        }

        context.fillStyle = "black";
        context.fillRect(0,0, stage.width, stage.height);

        var image = document.querySelector("img");
        context.drawImage(image,macaX*tamanhoDaPeca, macaY*tamanhoDaPeca, tamanhoDaPeca,tamanhoDaPeca);
       // context.fillRect(macaX*tamanhoDaPeca, macaY*tamanhoDaPeca, tamanhoDaPeca,tamanhoDaPeca);

        context.fillStyle = "green";
        for (var i = 0; i < rastroCobra.length; i++) {
            context.fillRect(rastroCobra[i].x*tamanhoDaPeca, rastroCobra[i].y*tamanhoDaPeca, tamanhoDaPeca-1,tamanhoDaPeca-1);
            if (rastroCobra[i].x == pontoX && rastroCobra[i].y == pontoY)
            {//Game over
                velocidadeX = velocidadeY=0;
                caudaCobra =5;
                pontos=0
                AtualizarPontos()
            }
        }
       // Função para exibir o card de instruções
document.getElementById("comandos-btn").onclick = function() {
    document.getElementById("comandos-card").style.display = "block";  // Mostra o card
};

// Função para fechar o card de instruções
document.getElementById("fechar-card").onclick = function() {
    document.getElementById("comandos-card").style.display = "none";  // Esconde o card
};

// O restante do código continua igual...

        
        const perguntas = [
            {
              pergunta: "O Python é uma linguagem de programação de alto nível - Verdadeiro ou Falso?",
              resposta: "v"
            },
            {
              pergunta: "O Java é uma linguagem interpretada - Verdadeiro ou Falso?",
              resposta: "f"
            },
            {
              pergunta: "O PHP é uma linguagem de programação orientada a objetos - Verdadeiro ou Falso?",
              resposta: "v"
            },
            {
                pergunta: "A linguagem de programação C é uma linguagem de baixo nível - Verdadeiro ou Falso?",
                resposta: "v"
            },
            {
                pergunta: "A linguagem de programação Ruby foi criada por Yukihiro Matsumoto - Verdadeiro ou Falso?",
                resposta: "v"
            },
            {
                pergunta: "O HTML é uma linguagem de programação - Verdadeiro ou Falso?",
                resposta: "f"
            },
            {
                pergunta: "O MySQL é um sistema de gerenciamento de bancos de dados relacionais - Verdadeiro ou Falso?",
                resposta: "v"  
            },
          ];
          
          let cobraTamanho = 1;
          
          
          function mostrarPergunta() {
            // Escolhe uma pergunta aleatória
            const indicePergunta = Math.floor(Math.random() * perguntas.length);
            const pergunta = perguntas[indicePergunta].pergunta;
            const respostaCorreta = perguntas[indicePergunta].resposta;
            
            // Pede a resposta ao usuário
            const resposta = prompt(pergunta);
            
            // Verifica se a resposta está correta
            if (resposta === respostaCorreta) {
              // Aumenta o tamanho da cobra
              caudaCobra++;
              pontos++;
              AtualizarPontos()
              
              
              macaX = Math.floor(Math.random()*quantidadeDePeca);
              macaY = Math.floor(Math.random()*quantidadeDePeca);
            } else {
                 pontoX =8;
                 pontoY = 10;
              // Encerra o jogo
              alert("Resposta incorreta!\nFim de jogo.")
              
              velocidadeX = velocidadeY=0;
              caudaCobra = 5;
              pontos=0
              AtualizarPontos()

             
              
             
            }
          }
          
          // Chamada da função quando a cobra come a maçã
          function cobraComeuMaca() {
            mostrarPergunta();
            // Continua o jogo normalmente
            // ...
          }
        
        
        
        
        
        rastroCobra.push({x:pontoX,y:pontoY })
        
        while (rastroCobra.length > caudaCobra) {
            rastroCobra.shift();
        }
                
        
        
        
        //aumentando tamanho da cobra
                if (macaX==pontoX && macaY==pontoY){
                    cobraComeuMaca() }
                    // Array de perguntas e respostas

            
            
            
            
                   
           
                      

}

    function keyPush(event){

        switch (event.keyCode) {
            case 65: // ESQUERDA
                velocidadeX = -velocidade;
                velocidadeY = 0;
                break;
            case 87: // CIMA
                velocidadeX = 0;
                velocidadeY = -velocidade;
                break;
            case 68: // DIREITA
                velocidadeX = velocidade;
                velocidadeY = 0;
                break;
            case 83: // BAIXO
                velocidadeX = 0;
                velocidadeY = velocidade;
                break;          
            default:
                
                break;
        }


    }

}