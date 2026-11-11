// =========================================
// BELEZAS DO BRASIL
// Desenvolvido por Ezequiel Pedrassolli
// =========================================


// =========================================
// GALERIA LIGHTBOX
// =========================================

const imagens = document.querySelectorAll(".lightbox");
const janela = document.getElementById("janelaImagem");
const imagemGrande = document.getElementById("imagemGrande");

const fechar = document.querySelector(".fechar");
const anterior = document.getElementById("anterior");
const proxima = document.getElementById("proxima");

let indiceAtual = 0;


// Abrir imagem

function abrirImagem(indice){

    indiceAtual = indice;

    imagemGrande.src = imagens[indice].href;

    janela.style.display = "flex";

}


// Clique nas miniaturas

imagens.forEach((imagem, indice)=>{

    imagem.addEventListener("click",(e)=>{

        e.preventDefault();

        abrirImagem(indice);

    });

});


// Próxima imagem

proxima.addEventListener("click",()=>{

    indiceAtual++;

    if(indiceAtual >= imagens.length){

        indiceAtual = 0;

    }

    abrirImagem(indiceAtual);

});


// Imagem anterior

anterior.addEventListener("click",()=>{

    indiceAtual--;

    if(indiceAtual < 0){

        indiceAtual = imagens.length - 1;

    }

    abrirImagem(indiceAtual);

});


// Fechar no X

fechar.addEventListener("click",()=>{

    janela.style.display = "none";

});


// Fechar clicando fora

janela.addEventListener("click",(e)=>{

    if(e.target === janela){

        janela.style.display = "none";

    }

});


// Teclado

document.addEventListener("keydown",(e)=>{

    if(janela.style.display === "flex"){

        switch(e.key){

            case "ArrowRight":

                proxima.click();

            break;

            case "ArrowLeft":

                anterior.click();

            break;

            case "Escape":

                janela.style.display = "none";

            break;

        }

    }

});



// =========================================
// BOTÃO VOLTAR AO TOPO
// =========================================

const botaoTopo = document.getElementById("topo");


window.addEventListener("scroll",()=>{

    if(window.scrollY > 300){

        botaoTopo.style.display = "block";

    }else{

        botaoTopo.style.display = "none";

    }

});


botaoTopo.addEventListener("click",()=>{

    window.scrollTo({

        top:0,

        behavior:"smooth"

    });

});




// =========================================
// FORMULÁRIO DE COMENTÁRIOS
// =========================================

function enviarComentario(){

    let nome =
    document.getElementById("nome").value.trim();

    let comentario =
    document.getElementById("comentario").value.trim();

    let mensagem =
    document.getElementById("mensagem");


    if(nome==="" || comentario===""){

        mensagem.style.color="red";

        mensagem.innerHTML="⚠ Preencha todos os campos.";

        return;

    }


    mensagem.style.color="green";

    mensagem.innerHTML=

    "✅ Obrigado pelo comentário, <strong>"+nome+"</strong>!";


    document.getElementById("nome").value="";

    document.getElementById("comentario").value="";

}



// =========================================
// ANIMAÇÃO DOS CARDS
// =========================================

const cards = document.querySelectorAll(".card");


const aparecer = new IntersectionObserver((entries)=>{

    entries.forEach((entry)=>{

        if(entry.isIntersecting){

            entry.target.classList.add("mostrar");

        }

    });

});


cards.forEach((card)=>{

    aparecer.observe(card);

});



// =========================================
// MENSAGEM DE BOAS-VINDAS
// =========================================

window.addEventListener("load",()=>{

    console.log("Portal Belezas do Brasil carregado com sucesso!");

});