import "../interfaces/usuario.js";

export async function login(usuario: UsuarioLogin) {
  try {
    const url = "http://localhost:3000/login/";
    const response = await fetch(url!, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(usuario),
    });
    console.log("login feito");
  } catch (error) {
    console.log(JSON.stringify(usuario));

    console.log("erro no login");
    return false;
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
