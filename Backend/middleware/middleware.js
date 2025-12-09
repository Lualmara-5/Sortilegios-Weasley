import jwt from "jsonwebtoken";

export const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1]; // Bearer <token>

  if (!token) return res.status(401).json({ error: "Token requerido" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "mi_clave_secreta");
    req.user = decoded; // info del usuario
    next();
  } catch (error) {
    return res.status(401).json({ error: "Token inválido" });
  }
};
