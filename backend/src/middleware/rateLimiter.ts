import rateLimit from "express-rate-limit";

export const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 daqiqa
  max: 5, // faqat 5 marta urinish
  message: { error: "Juda ko'p urinish qildingiz. 15 daqiqadan keyin qayta urinib ko'ring." },
  standardHeaders: true,
  legacyHeaders: false,
});

export const generalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
});