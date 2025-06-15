import './components/text_button.js';
import './components/input_button.js';
import './components/input.js';
import './components/button.js';
import './components/nav.js';
import './components/card.js';

import './interfaces/card_interface.js'

const livros: CardInterface[] = [
    {
        titulo: "Querido John",
        ano: "2010",
        escritor: "Nicholas Sparks",
        descricao: "O soldado John Tyree conhece a universitária idealista Savannah Curtis e uma forte ligação nasce entre eles. Durante sete anos de um tumultuado romance, o casal se encontra apenas esporadicamente e mantém contato por meio de cartas de amor. No entanto, a correspondência entre o casal desencadeia consequências imprevisíveis.",
        imagem: "./src/images/banners/querido-john.jpg"
    },
    {
        titulo: "O Mundo Superior",
        ano: "2023",
        escritor: "Femi Fadugba",
        descricao: "O Mundo Superior é o primeiro livro de uma duologia afrofuturista que acompanha dois jovens, separados por uma geração, que vão desafiar o tempo em uma história eletrizante de ação e ficção científica. Os direitos da adaptação já foram vendidos para a NETFLIX, com produção e atuação de Daniel Kaluuya (Corra!, Não! Não olhe!).",
        imagem: "./src/images/banners/o-mundo-superior.jpg"
    },
    {
        titulo: "Além da Fumaça",
        ano: "2023",
        escritor: "Edvaldo Silva",
        descricao: "Na Berlim Ocidental, em 1987, o taxista Bruno Fischer é designado a conduzir a misteriosa passageira Ingrid Bergunson, uma brasileira tão bela quanto enigmática, do aeroporto atéuma igreja situada no lado dominado pelos soviéticos. Contrabandista de itens do espólio nazista, Ingrid retorna ao Brasil para negociar a venda do quadro recém-adquirido, mas desaparece sem deixar vestígios. Amanda, sua filha, decide então refazer os últimos passos da mãe na tentativa de encontrá-la, o que a coloca diretamente no encalço do taxista. Enquanto Bruno e Amanda procuram por rastros de Ingrid, envolvendo-se em uma trama internacional cada vez mais obscura, perigosas organizações secretas iniciam uma perseguição implacável pelo quadro roubado. Num ritmo eletrizante, Além da fumaça traz à tona os sofrimentos remanescentes da Segunda Guerra em uma sociedade prestes a derrubar o último muro que dividia o mundo.",
        imagem: "./src/images/banners/alem_da_fumaca.jpg"
    }
]

const container = document.getElementById("livros")!;
for (const livro of livros){
    const card = document.createElement("my-card");
    card.setAttribute("titulo", livro.titulo);
    card.setAttribute("ano", livro.ano);
    card.setAttribute("escritor", livro.escritor);
    card.setAttribute("descricao", livro.descricao);
    card.setAttribute("imagem", livro.imagem);
    container.appendChild(card);
}