const categorias = ["Romance", "Ficção Científica", "Terror", "Psicológico", "Auto Ajudo"]
const rowCategorias = document.getElementById("filtros");

categorias.forEach( categoria => {
    const btn = document.createElement("text-button");
    btn.setAttribute("class", "btn_filter");
    btn.innerHTML = categoria;
    rowCategorias?.appendChild(btn);
})