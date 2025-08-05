import { getLivros } from "./service/connection.js";

async function init() {
  await getLivros(); // Aguarda os livros serem carregados na sessionStorage

  // Só depois de ter os dados, carrega os componentes
  await import("./components/nav.js");
  await import("./components/estante_component.js");
  await import("./components/carrousel.js");
}

init();
