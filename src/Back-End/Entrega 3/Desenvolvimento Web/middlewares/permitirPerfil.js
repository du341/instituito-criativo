export function permitirPerfil(...perfisPermitidos) {
  return (req, res, next) => {
    if (!perfisPermitidos.includes(req.perfil)) {
      return res.status(403).json({ mensagem: "Acesso negado. Perfil sem permissão." });
    }
    next();
  };
}
