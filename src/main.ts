import "./components/text_button.js";
import "./components/input_button.js";
import "./components/input.js";
import "./components/button.js";
import "./components/nav.js";
import "./components/card.js";
import "./interfaces/card_interface.js";
import "./interfaces/usuario.js";
import "./scripts/carrousel.js";
import "./scripts/categorias.js";
import "./components/livro_colecao.js";
import { renderLivros } from "./utils/estante.js";

(() => renderLivros())();
