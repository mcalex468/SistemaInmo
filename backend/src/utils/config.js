import dotenv from "dotenv";
dotenv.config();

const isProd = process.env.NODE_ENV === "production";

function must(name) {
  const v = process.env[name];
  if (!v || String(v).trim() === "") {
    throw new Error(`Missing required env var: ${name}`);
  }
  return v;
}

function num(name, def) {
  const v = process.env[name];
  if (v === undefined || v === null || v === "") return def;
  const n = Number(v);
  if (!Number.isFinite(n)) throw new Error(`Env var ${name} must be a number`);
  return n;
}

// En dev permitimos fallback, en prod obligamos
function mustInProd(name, fallback = "") {
  if (isProd) return must(name);
  const v = process.env[name];
  return v && String(v).trim() !== "" ? v : fallback;
}

export const config = {
  port: num("PORT", 4000),

  // ✅ En prod obligatorio, en dev permitimos devsecret pero avisamos
  jwtSecret: mustInProd("JWT_SECRET", "devsecret"),

  airtable: {
    // ✅ En prod obligatorio (en dev si no está, fallará pronto cuando llames endpoints)
    apiKey: mustInProd("AIRTABLE_API_KEY", ""),
    baseId: mustInProd("AIRTABLE_BASE_ID", ""),
    tables: {
      clientes: mustInProd("AIRTABLE_TABLE_CLIENTES", "Clientes"),
      solicitudes: mustInProd("AIRTABLE_TABLE_SOLICITUDES", "Solicitudes"),
      citas: mustInProd("AIRTABLE_TABLE_CITAS", "Citas"),
      inmuebles: mustInProd("AIRTABLE_TABLE_INMUEBLES", "Inmuebles"),
    },
  },

  metrics: {
    minutosPorInteraccion: num("MINUTOS_POR_INTERACCION", 5),
    costeHoraHumano: num("COSTE_HORA_HUMANO", 15),
  },

  users: {
    admin: {
      email: mustInProd("ADMIN_EMAIL", "admin@demo.com"),
      password: mustInProd("ADMIN_PASSWORD", "admin123"),
      name: mustInProd("ADMIN_NAME", "Admin Demo"),
      role: "admin",
    },
    agent: {
      email: mustInProd("AGENTE_EMAIL", "agente@demo.com"),
      password: mustInProd("AGENTE_PASSWORD", "agente123"),
      name: mustInProd("AGENTE_NAME", "Agente Demo"),
      role: "agente",
    },
  },
};

// ⚠️ Avisos útiles en dev (sin romper)
if (!isProd) {
  if (config.jwtSecret === "devsecret") {
    console.warn("⚠️ JWT_SECRET no definido. Usando 'devsecret' (solo dev).");
  }
  if (!config.airtable.apiKey || !config.airtable.baseId) {
    console.warn("⚠️ Airtable API key/baseId no definidos. Endpoints Airtable fallarán hasta configurarlo.");
  }
}
