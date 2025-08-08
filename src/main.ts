import { getLivros } from "./service/connection.js";

async function init() {
  await getLivros(); // Aguarda os livros serem carregados na sessionStorage

  // Só depois de ter os dados, carrega os componentes
  await import("./components/nav.js");
  await import("./components/estante_component.js");
  await import("./components/carrousel.js");
  welcomeDiv!.style.display = "none";
}

const welcomeDiv = document.getElementById("welcome-div");
welcomeDiv!.innerHTML = "<p>Carregando... </p>";

if (!sessionStorage.getItem("livros")) init();
else {
  import("./components/nav.js");
  import("./components/estante_component.js");
  import("./components/carrousel.js");
  welcomeDiv!.style.display = "none";
}
