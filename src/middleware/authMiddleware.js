const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    const authHeader = req.headers.authorization;
    const idUsuarioHeader = req.headers['x-user-id'] || req.headers['id-usuario'];

    if (!authHeader) {
        return res.status(401).json({ erro: "Token não fornecido" });
    }

    if (!idUsuarioHeader) {
        return res.status(401).json({ erro: "ID do usuario nao fornecido" });
    }

    const token = authHeader.split(' ')[1]; // Formato: "Bearer TOKEN"

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        if (!decoded.id_usuario) {
            return res.status(401).json({ erro: "Token sem identificacao de usuario" });
        }

        if (String(decoded.id_usuario) !== String(idUsuarioHeader)) {
            return res.status(403).json({ erro: "ID do usuario nao corresponde ao token" });
        }

        req.usuarioId = decoded.id_usuario;
        next();
    } catch (error) {
        return res.status(401).json({ erro: "Token inválido" });
    }
};
