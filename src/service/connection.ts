import "../interfaces/usuario.js";
import { LivroCache, LivroCadastro, LivroEmprestimo, LivroDevolucao } from "../interfaces/livros_api.js";
import { authHeaders } from "../utils/auth.js";

export async function login(usuario: UsuarioLogin): Promise<200 | 401 | 501> {
  try {
    const url = "https://biblioteca-api-cxpb.onrender.com/login/";
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
    const url = "https://biblioteca-api-cxpb.onrender.com/cadastro/";
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
    const url = "https://biblioteca-api-cxpb.onrender.com/livros/";
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
    const url = "https://biblioteca-api-cxpb.onrender.com/livrosEmprestimos";
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

export async function addBook(livro: LivroCadastro, file?: File): Promise<{ status: number, livro?: string }> {
  try {
    let response: Response;

    if (file) {
      const formData = new FormData();
      formData.append("titulo", livro.titulo);
      formData.append("descricao", livro.descricao);
      formData.append("ano", livro.ano.toString());
      formData.append("imagem", file);

      response = await fetch("https://biblioteca-api-cxpb.onrender.com/cadastrarLivro/", {
        method: "POST",
        headers: authHeaders("form"),
        body: formData,
      });
    } else {
      response = await fetch("https://biblioteca-api-cxpb.onrender.com/cadastrarLivro/", {
        method: "POST",
        headers: authHeaders(),
        body: JSON.stringify(livro),
      });
    }

    const json = await response.json();

    if (json?.livro) {
      const livrosCache = JSON.parse(sessionStorage.getItem("livros") || '{"livros":[],"timestamp":0}');
      livrosCache.livros.push(json.livro);
      sessionStorage.setItem("livros", JSON.stringify(livrosCache));
    }

    return { status: response.status, livro: json?.livro };
  } catch (error) {
    return {status: 501};
  }
}

export async function fazerEmprestimo(livroEmprestimo: LivroEmprestimo): Promise<200 | 400> {
  const response = await fetch("https://biblioteca-api-cxpb.onrender.com/fazerEmprestimo/", {
    method: "POST",
    headers: authHeaders(),
    body: JSON.stringify(livroEmprestimo),
  });

  if (response.status === 200) return 200;
  return 400;
}

export async function fazerDevolucao(livroDevolucao: LivroDevolucao): Promise<200 | 400> {
  const response = await fetch("https://biblioteca-api-cxpb.onrender.com/devolucao/", {
    method: "POST",
    headers: authHeaders(),
    body: JSON.stringify(livroDevolucao),
  });

  if (response.status === 200) return 200;
  return 400;
}
