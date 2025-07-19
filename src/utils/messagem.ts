export function mostrarMensagem(tipo: String, message: HTMLElement) {
  const mensagens = message?.querySelectorAll(".tile-message")!;
  mensagens.forEach((msg) => msg.classList.remove("active"));

  switch (tipo) {
    case "sucessoC":
      message.innerHTML = `
      <span class="tile-message sucess active">Cadastro efetuado com sucesso!</span>
      `;
      break;
    case "sucessoL":
      message.innerHTML = `
      <span class="tile-message sucess active">Login efetuado!</span>
      `;
      break;
    case "erroC":
      message.innerHTML = `
      <span class="tile-message error active">Usuário já existente!</span>
      `;
      break;
    case "erroL":
      message.innerHTML = `
      <span class="tile-message error active">Login incorreto!</span>
      `;
    case "server":
      message.innerHTML = `
        <span class="tile-message error active">Erro no servidor!</span>
      `;
      break;
    case "vazio":
      message.innerHTML = `
        <span class="tile-message error active">Preencha todos os campos!</span>
      `;
      break;
  }
  setTimeout(() => {
    message.innerHTML = ``;
    if (tipo == "sucessoL") {
      const token = sessionStorage.getItem("token");
      if (token != null) {
        window.location.href = "index.html";
      }
    }
  }, 1500);
}
