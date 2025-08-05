import { Livro } from "../interfaces/livros_api.js";


export function buscarLivro(shadowRoot: ShadowRoot, seletorContainer: string, titulo: string) {
  const container = shadowRoot.querySelector(seletorContainer);
  if (!container) {
    console.warn(`Container "${seletorContainer}" não encontrado no shadowRoot.`);
    return;
  }

  container.innerHTML = ""; // limpa livros anteriores

  const cacheRaw = sessionStorage.getItem("livros");
  if (!cacheRaw) {
    console.warn("Nenhum dado de livros no sessionStorage.");
    return;
  }

  try {
    const { livros }: { livros: Livro[] } = JSON.parse(cacheRaw);
    const termo = titulo.trim().toLowerCase();

    const filtrados = termo
    ? livros.filter((livro) =>livro.titulo.toLowerCase().includes(titulo.toLowerCase()))
    : livros;

    if (filtrados.length === 0) {
      container.innerHTML = `<p style="grid-column: 1 / -1;">📚 Nenhum livro encontrado com "${titulo}".</p>`;
      return;
    }

    filtrados.forEach((livro) => {
      const elemento = document.createElement("livro-estante") as any;
      elemento.data = livro;
      container.appendChild(elemento);
    });
  } catch (e) {
    console.error("Erro ao processar o cache de livros:", e);
  }
}
