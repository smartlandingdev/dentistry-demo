# ⚡ Quick Start - Frontend & Backend Separados

## 🎯 Instalação Rápida

```bash
# 1. Instalar dependências do frontend
npm install

# 2. Instalar dependências do backend
cd backend && npm install && cd ..

# 3. Configurar .env na raiz
cp .env.example .env
# Edite .env com suas credenciais Supabase

# 4. Configurar backend/.env
cp backend/.env.example backend/.env
# Edite backend/.env com suas credenciais
```

## 🚀 Executar

### Opção 1: Tudo Junto (Recomendado)
```bash
npm run dev:all
```

### Opção 2: Separado
```bash
# Terminal 1 - Backend
npm run dev:backend

# Terminal 2 - Frontend
npm run dev
```

## 🌐 URLs

- **Frontend:** http://localhost:5173
- **Backend API:** http://localhost:3001
- **Health Check:** http://localhost:3001/health

## 📋 Comandos Úteis

```bash
# Desenvolvimento
npm run dev              # Frontend apenas
npm run dev:backend      # Backend apenas
npm run dev:all          # Frontend + Backend

# Build
npm run build            # Build frontend
npm run build:backend    # Build backend

# Produção
npm run preview          # Preview frontend
npm run start:backend    # Start backend prod
```

## ✅ Verificar Se Está Funcionando

```bash
# Testar backend
curl http://localhost:3001/health

# Deve retornar:
# {"status":"OK","timestamp":"..."}

# Testar API de clientes
curl http://localhost:3001/api/clients

# Deve retornar:
# {"success":true,"data":[...]}
```

## 🔧 Troubleshooting

### Backend não inicia
```bash
# Verificar porta 3001
lsof -i :3001

# Se estiver ocupada, matar processo
kill -9 $(lsof -t -i:3001)
```

### Erro de CORS
- Verificar `FRONTEND_URL` em `backend/.env`
- Deve ser: `http://localhost:5173`

### Frontend não conecta à API
- Verificar `VITE_API_URL` em `.env`
- Deve ser: `http://localhost:3001/api`

## 📁 Estrutura Simplificada

```
dentistry-demo/
├── src/                 # Frontend React
│   ├── pages/
│   ├── components/
│   └── services/
│       └── api.ts       # Cliente HTTP ← NOVO
├── backend/             # Backend API ← NOVO
│   └── src/
│       ├── routes/      # Rotas HTTP
│       ├── controllers/ # Lógica das rotas
│       └── services/    # Acesso ao banco
├── .env                 # Config frontend
└── backend/.env         # Config backend ← NOVO
```

## 🎓 Próximos Passos

1. ✅ Abrir http://localhost:5173
2. ✅ Navegar para página "Pacientes"
3. ✅ Verificar se os dados carregam da API
4. 🎉 Sucesso!

## 📚 Documentação Completa

- `SETUP_GUIDE.md` - Guia detalhado
- `MIGRATION_SUMMARY.md` - Resumo da migração
- `backend/README.md` - Documentação do backend
