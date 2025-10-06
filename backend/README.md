# Backend API - Dentistry Demo

API backend para o sistema de gestão de clínica odontológica.

## 📁 Estrutura

```
backend/
├── src/
│   ├── config/         # Configurações (Supabase, etc)
│   ├── controllers/    # Controladores das rotas
│   ├── routes/         # Definição de rotas
│   ├── services/       # Lógica de negócio
│   ├── types/          # Tipos TypeScript
│   ├── middleware/     # Middlewares Express
│   └── server.ts       # Ponto de entrada
├── dist/               # Build compilado
├── .env                # Variáveis de ambiente
└── package.json
```

## 🚀 Como Executar

### 1. Instalar Dependências

```bash
cd backend
npm install
```

### 2. Configurar Variáveis de Ambiente

Copie o arquivo `.env.example` para `.env` e configure:

```bash
cp .env.example .env
```

Edite o `.env` com suas credenciais:

```env
SUPABASE_URL=your_supabase_url
SUPABASE_ANON_KEY=your_supabase_key
PORT=3001
NODE_ENV=development
FRONTEND_URL=http://localhost:5173
```

### 3. Executar em Desenvolvimento

```bash
npm run dev
```

O servidor estará disponível em `http://localhost:3001`

### 4. Build para Produção

```bash
npm run build
npm start
```

## 📡 Endpoints Disponíveis

### Health Check
- **GET** `/health` - Verifica status do servidor

### Clientes
- **GET** `/api/clients` - Retorna todos os clientes com seus agendamentos

#### Exemplo de Resposta:
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "name": "João Silva",
      "phone": "11999999999",
      "email": "joao@example.com",
      "lastVisit": "01/10/2025",
      "nextAppointment": "15/10/2025 14:00",
      "totalVisits": 5
    }
  ]
}
```

## 🛠️ Tecnologias

- **Node.js** - Runtime JavaScript
- **Express** - Framework web
- **TypeScript** - Tipagem estática
- **Supabase** - Banco de dados e autenticação
- **tsx** - Execução TypeScript em desenvolvimento

## 📝 Scripts

- `npm run dev` - Inicia servidor em modo desenvolvimento com watch
- `npm run build` - Compila TypeScript para JavaScript
- `npm start` - Executa versão compilada
- `npm run type-check` - Verifica tipos TypeScript

## 🔒 CORS

O servidor está configurado para aceitar requisições do frontend em `http://localhost:5173`. Para produção, atualize a variável `FRONTEND_URL` no `.env`.
