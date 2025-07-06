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
      return 200;
    }
    return 401;
  } catch (error) {
    return 501;
  }
}

export async function singup(usuario: UsuarioCadastro): Promise<boolean> {
  try {
    const url = "http://localhost:3000/usuario/";
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(usuario),
    });
    if (response.status == 201) {
      return true;
    } else if (response.status == 401) {
      return false;
    }
    return false;
  } catch (error) {
    return false;
  }
}
