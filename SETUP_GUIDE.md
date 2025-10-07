# 🚀 Guia de Configuração - Frontend & Backend Separados

Este projeto agora possui frontend e backend separados para melhor organização e escalabilidade.

## 📁 Estrutura do Projeto

```
dentistry-demo/
├── src/                    # Frontend (React + Vite)
├── backend/                # Backend (Node.js + Express)
│   ├── src/
│   │   ├── config/        # Configuração Supabase
│   │   ├── controllers/   # Controladores
│   │   ├── routes/        # Rotas da API
│   │   ├── services/      # Lógica de negócio
│   │   └── types/         # Tipos TypeScript
│   └── package.json
├── package.json           # Frontend
└── README.md
```

## ⚙️ Configuração Inicial

### 1. Configurar Variáveis de Ambiente

#### Frontend (.env na raiz)
```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_key
VITE_API_URL=http://localhost:3001/api
```

#### Backend (backend/.env)
```env
SUPABASE_URL=your_supabase_url
SUPABASE_ANON_KEY=your_supabase_key
PORT=3001
NODE_ENV=development
FRONTEND_URL=http://localhost:5173
```

### 2. Instalar Dependências

#### Frontend
```bash
npm install
```

#### Backend
```bash
cd backend
npm install
cd ..
```

## 🏃 Como Executar

### Opção 1: Executar Tudo (Frontend + Backend)

Da raiz do projeto:

```bash
npm run dev:all
```

Isso iniciará:
- ✅ Backend em `http://localhost:3001`
- ✅ Frontend em `http://localhost:5173`

### Opção 2: Executar Separadamente

#### Terminal 1 - Backend
```bash
npm run dev:backend
# ou
cd backend && npm run dev
```

#### Terminal 2 - Frontend
```bash
npm run dev
```

## 🧪 Testando a API

### Health Check
```bash
curl http://localhost:3001/health
```

### Buscar Clientes
```bash
curl http://localhost:3001/api/clients
```

## 📦 Build para Produção

### Build do Frontend
```bash
npm run build
```

### Build do Backend
```bash
npm run build:backend
# ou
cd backend && npm run build
```

### Executar em Produção

#### Backend
```bash
cd backend
npm start
```

#### Frontend
```bash
npm run preview
```

## 🔄 Fluxo de Dados

```
┌─────────────┐      HTTP       ┌─────────────┐      SQL      ┌──────────┐
│   Frontend  │  ────────────>  │   Backend   │  ──────────>  │ Supabase │
│ (React App) │  <────────────  │   (API)     │  <──────────  │   (DB)   │
└─────────────┘   JSON Response └─────────────┘   Query Result└──────────┘
```

**Antes:** Frontend → Supabase diretamente
**Agora:** Frontend → Backend API → Supabase

## 🛠️ Arquitetura da API

### Camadas

1. **Routes** (`backend/src/routes/`)
   - Define os endpoints HTTP
   - Exemplo: `/api/clients`

2. **Controllers** (`backend/src/controllers/`)
   - Gerencia requisições e respostas
   - Validação de entrada
   - Formatação de saída

3. **Services** (`backend/src/services/`)
   - Lógica de negócio
   - Acesso ao banco de dados
   - Processamento de dados

4. **Config** (`backend/src/config/`)
   - Configurações globais
   - Cliente Supabase
   - Variáveis de ambiente

## 📝 Scripts Disponíveis

### Frontend (raiz)
- `npm run dev` - Inicia frontend em dev
- `npm run dev:backend` - Inicia backend em dev
- `npm run dev:all` - Inicia frontend + backend
- `npm run build` - Build do frontend
- `npm run build:backend` - Build do backend

### Backend (backend/)
- `npm run dev` - Desenvolvimento com hot reload
- `npm run build` - Compila TypeScript
- `npm start` - Executa versão compilada
- `npm run type-check` - Verifica tipos

## 🔒 Segurança

- ✅ CORS configurado para aceitar apenas requisições do frontend
- ✅ Variáveis sensíveis em `.env` (não commitadas)
- ✅ Validação de entrada nas rotas
- ✅ Error handling centralizado

## 🐛 Troubleshooting

### Backend não inicia
```bash
# Verifique se a porta 3001 está livre
lsof -i :3001

# Verifique as variáveis de ambiente
cat backend/.env
```

### Frontend não conecta ao backend
```bash
# Verifique se VITE_API_URL está configurado
echo $VITE_API_URL

# Deve ser: http://localhost:3001/api
```

### Erro de CORS
- Verifique se `FRONTEND_URL` no backend/.env está correto
- Deve corresponder à URL do frontend (default: http://localhost:5173)

## 📚 Próximos Passos

Para adicionar novos endpoints:

1. Criar service em `backend/src/services/`
2. Criar controller em `backend/src/controllers/`
3. Adicionar rota em `backend/src/routes/`
4. Registrar rota no `backend/src/server.ts`
5. Atualizar `src/services/api.ts` no frontend

## 💡 Benefícios da Separação

- ✅ **Escalabilidade**: Backend pode ser escalado independentemente
- ✅ **Segurança**: Credenciais Supabase ficam no servidor
- ✅ **Manutenibilidade**: Código organizado em camadas
- ✅ **Reutilização**: API pode ser usada por outros clientes (mobile, etc)
- ✅ **Cache**: Possibilidade de adicionar cache no backend
- ✅ **Rate Limiting**: Controle de taxa de requisições
- ✅ **Logging**: Logs centralizados no servidor
