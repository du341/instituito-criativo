import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ mensagem: "Token não enviado ou mal formatado." });
  }

  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.id;
    req.perfil = decoded.perfil;
    next();
  } catch (erro) {
    return res.status(401).json({ mensagem: "Token inválido." });
  }
};

export const permitirPerfil = (...perfisPermitidos) => {
  return (req, res, next) => {
    if (!perfisPermitidos.includes(req.perfil)) {
      return res.status(403).json({ mensagem: "Acesso negado. Perfil sem permissão." });
    }
    next();
  };
};
