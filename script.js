/* ==========================================================================
   BELEZAS DO BRASIL - VITÓRIA/ES
   Arquivo: js/script.js
   ========================================================================== */

document.addEventListener("DOMContentLoaded", () => {
    // Inicialização das funções
    initLightbox();
    initBotaoTopo();
    initRolagemSuave();
});

/* ==========================================================================
   1. SISTEMA DE LIGHTBOX (GALERIA DE IMAGENS)
   ========================================================================== */
function initLightbox() {
    const modal = document.getElementById("janelaImagem");
    const imgGrande = document.getElementById("imagemGrande");
    const btnFechar = document.querySelector(".fechar");
    const btnAnterior = document.getElementById("anterior");
    const btnProxima = document.getElementById("proxima");
    
    // Seleciona todos os links da galeria que possuem a classe lightbox
    const linksLightbox = Array.from(document.querySelectorAll("a.lightbox"));
    let indiceAtual = 0;

    if (!modal || !imgGrande || linksLightbox.length === 0) return;

    // Função para abrir o modal com a imagem do índice especificado
    function abrirLightbox(index) {
        indiceAtual = index;
        const urlImagem = linksLightbox[indiceAtual].getAttribute("href");
        const altTexto = linksLightbox[indiceAtual].querySelector("img")?.getAttribute("alt") || "Imagem ampliada";

        imgGrande.src = urlImagem;
        imgGrande.alt = altTexto;
        modal.style.display = "flex";
        document.body.style.overflow = "hidden"; // Desabilita rolagem da página
    }

    // Função para fechar o modal
    function fecharLightbox() {
        modal.style.display = "none";
        imgGrande.src = "";
        document.body.style.overflow = "auto"; // Reabilita rolagem da página
    }

    // Navegação para a imagem anterior
    function imagemAnterior() {
        indiceAtual = (indiceAtual - 1 + linksLightbox.length) % linksLightbox.length;
        abrirLightbox(indiceAtual);
    }

    // Navegação para a próxima imagem
    function proximaImagem() {
        indiceAtual = (indiceAtual + 1) % linksLightbox.length;
        abrirLightbox(indiceAtual);
    }

    // Adiciona evento de clique a todos os links da galeria
    linksLightbox.forEach((link, index) => {
        link.addEventListener("click", (e) => {
            e.preventDefault();
            abrirLightbox(index);
        });
    });

    // Eventos de clique nos controles
    if (btnFechar) btnFechar.addEventListener("click", fecharLightbox);
    if (btnAnterior) btnAnterior.addEventListener("click", imagemAnterior);
    if (btnProxima) btnProxima.addEventListener("click", proximaImagem);

    // Fechar ao clicar fora da imagem (no fundo escuro)
    modal.addEventListener("click", (e) => {
        if (e.target === modal) fecharLightbox();
    });

    // Atalhos do teclado (Esc, Setas Direita e Esquerda)
    document.addEventListener("keydown", (e) => {
        if (modal.style.display === "flex") {
            if (e.key === "Escape") fecharLightbox();
            if (e.key === "ArrowLeft") imagemAnterior();
            if (e.key === "ArrowRight") proximaImagem();
        }
    });
}

/* ==========================================================================
   2. FORMULÁRIO DE COMENTÁRIOS
   ========================================================================== */
function enviarComentario() {
    const campoNome = document.getElementById("nome");
    const campoComentario = document.getElementById("comentario");
    const elementoMensagem = document.getElementById("mensagem");

    if (!campoNome || !campoComentario || !elementoMensagem) return;

    const nome = campoNome.value.trim();
    const comentario = campoComentario.value.trim();

    // Validação dos campos
    if (nome === "" || comentario === "") {
        elementoMensagem.textContent = "⚠️ Por favor, preencha todos os campos antes de enviar.";
        elementoMensagem.style.color = "#d9534f"; // Vermelho
        return;
    }

    // Simulação de envio bem-sucedido
    elementoMensagem.textContent = `✅ Obrigado, ${nome}! Seu comentário foi enviado com sucesso.`;
    elementoMensagem.style.color = "#28a745"; // Verde

    // Limpa os campos do formulário
    campoNome.value = "";
    campoComentario.value = "";

    // Remove a mensagem de sucesso após 5 segundos
    setTimeout(() => {
        elementoMensagem.textContent = "";
    }, 5000);
}

/* ==========================================================================
   3. BOTÃO VOLTAR AO TOPO
   ========================================================================== */
function initBotaoTopo() {
    const btnTopo = document.getElementById("btnTopo");

    if (!btnTopo) return;

    // Exibe ou oculta o botão dependendo da posição de rolagem
    window.addEventListener("scroll", () => {
        if (window.scrollY > 300) {
            btnTopo.style.display = "block";
            btnTopo.style.opacity = "1";
        } else {
            btnTopo.style.opacity = "0";
            setTimeout(() => {
                if (window.scrollY <= 300) btnTopo.style.display = "none";
            }, 300);
        }
    });

    // Rola a página suavemente até o topo ao clicar
    btnTopo.addEventListener("click", () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });
}

/* ==========================================================================
   4. ROLAGEM SUAVE PARA ANCORAGENS INTERNAS
   ========================================================================== */
function initRolagemSuave() {
    const linksAncoras = document.querySelectorAll('a[href^="#"]:not(.lightbox)');

    linksAncoras.forEach(link => {
        link.addEventListener("click", function (e) {
            const href = this.getAttribute("href");

            if (href === "#") return;

            const elementoAlvo = document.querySelector(href);
            if (elementoAlvo) {
                e.preventDefault();
                elementoAlvo.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });
            }
        });
    });
}