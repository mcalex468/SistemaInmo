import dotenv from 'dotenv';

dotenv.config();

export const config = {
  port: process.env.PORT || 4000,
  jwtSecret: process.env.JWT_SECRET || 'devsecret',
  airtable: {
    apiKey: process.env.AIRTABLE_API_KEY || '',
    baseId: process.env.AIRTABLE_BASE_ID || '',
    tables: {
      clientes: process.env.AIRTABLE_TABLE_CLIENTES || 'Clientes',
      solicitudes: process.env.AIRTABLE_TABLE_SOLICITUDES || 'Solicitudes',
      citas: process.env.AIRTABLE_TABLE_CITAS || 'Citas',
      inmuebles: process.env.AIRTABLE_TABLE_INMUEBLES || 'Inmuebles'
    }
  },
  metrics: {
    minutosPorInteraccion: Number(process.env.MINUTOS_POR_INTERACCION || 5),
    costeHoraHumano: Number(process.env.COSTE_HORA_HUMANO || 15)
  },
  users: {
    admin: {
      email: process.env.ADMIN_EMAIL || 'admin@demo.com',
      password: process.env.ADMIN_PASSWORD || 'admin123',
      name: process.env.ADMIN_NAME || 'Admin Demo',
      role: 'admin'
    },
    agent: {
      email: process.env.AGENTE_EMAIL || 'agente@demo.com',
      password: process.env.AGENTE_PASSWORD || 'agente123',
      name: process.env.AGENTE_NAME || 'Agente Demo',
      role: 'agente'
    }
  }
};
