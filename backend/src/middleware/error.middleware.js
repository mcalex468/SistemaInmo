export const errorHandler = (err, req, res, next) => {
  const status = err.status || 500;

  // Log útil (con stack)
  console.error("❌ Error:", {
    status,
    message: err.message,
    stack: err.stack,
    path: req.path,
    method: req.method,
  });

  // Respuesta "limpia"
  const safeMessage =
    status >= 500 ? "Error del servidor" : (err.message || "Error");

  res.status(status).json({ message: safeMessage });
};
