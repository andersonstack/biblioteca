import "../interfaces/usuario.js";

export async function login(usuario: UsuarioLogin) {
  try {
    const url = "http://localhost:3000/login/";
    const response = await fetch(url!, {
      method: "POST",
      body: JSON.stringify(usuario),
    });
    console.log("login feito");
  } catch (error) {
    console.log(JSON.stringify(usuario));

    console.log("erro no login");
    return false;
  }
}
