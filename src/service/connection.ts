import "../interfaces/usuario.js";
import { LivroCache } from "../interfaces/livros_api.js";

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
      sessionStorage.setItem("token", data.token);
      sessionStorage.setItem("name", data.name);
      sessionStorage.setItem("userName", data.userName);
      sessionStorage.setItem("role", data.role);
      getEmprestimos();
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
      const cache: LivroCache = {
        livros: livros.livros,
        timestamp: Date.now(),
      };
      sessionStorage.setItem("livros", JSON.stringify(cache));
    } else {
      sessionStorage.setItem(
        "livros",
        JSON.stringify({ livros: [], timestamp: Date.now() })
      );
    }
  } catch (error) {
    sessionStorage.setItem(
      "livros",
      JSON.stringify({ livros: [], timestamp: Date.now() })
    );
  }
}

export async function getEmprestimos() {
  try {
    const url = "http://localhost:3000/livrosEmprestimos";
    const userName = sessionStorage.getItem("userName");

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userName }),
    })

    if (response.status === 200) {
      const data = await response.json();
      sessionStorage.setItem("livrosEmprestados", JSON.stringify(data.livrosEmprestados));
    }

  } catch (error) {
    console.log("Livros não encontrados!");
  }
}
