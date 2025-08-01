interface UsuarioLogin {
  userName: string;
  senha: string;
}

interface UsuarioCadastro extends UsuarioLogin {
  name: string;
  role: string;
}
