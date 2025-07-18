import "../interfaces/usuario.js";

export async function login(usuario: UsuarioLogin): Promise<200 | 401 | 501> {
  try {
    const url = "http://localhost:3000/login/";
    const response = await fetch(url!, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(usuario),
    });
    if (response.status == 200) {
      const data = await response.json();
      localStorage.setItem("token", data.token);
      return 200;
    }
    return 401;
  } catch (error) {
    return 501;
  }
}

export async function singup(
  usuario: UsuarioCadastro
): Promise<200 | 400 | 500> {
  try {
    const url = "http://localhost:3000/cadastro/";
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(usuario),
    });
    if (response.status == 201) {
      return 200;
    }
    return 400;
  } catch (error) {
    return 500;
  }
}

export async function getLivros() {
  try {
    const url = "http://localhost:3000/livros/";
    const response = await fetch(url);

    if (response.status === 200) {
      const livros = await response.json();
      localStorage.setItem("livros", JSON.stringify(livros.livros));
    } else {
      localStorage.setItem("livros", "[]");
    }
  } catch (error) {
    localStorage.setItem("livros", "[]");
  }
}
