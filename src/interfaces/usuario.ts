interface UsuarioLogin {
  userName: String;
  senha: String;
}

interface UsuarioCadastro extends UsuarioLogin {
  name: String;
}
