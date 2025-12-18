export function transformFirebaseError(code) {
  const errors = {
    INVALID_LOGIN_CREDENTIALS: 'Credenciais inválidas',
    INVALID_EMAIL: 'Email inválido',
    EMAIL_NOT_FOUND: 'Email não encontrado',
    INVALID_PASSWORD: 'Senha incorreta.',
    USER_DISABLED: 'Usuário desativado',
    TOO_MANY_ATTEMPTS_TRY_LATER: 'Muitas tentativas. Tente mais tarde.',
    EMAIL_EXISTS: 'Este email já está em uso.',
  };

  return errors[code];
}
