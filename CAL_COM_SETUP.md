# 📅 Integração Cal.com + FullCalendar

Este projeto está totalmente preparado para integração com Cal.com API, permitindo sincronização bidirecional de agendamentos.

## 🎯 O que foi configurado

### ✅ Estrutura Completa

- **Tipos TypeScript** completos para Cal.com API (`src/types/index.ts`)
- **Serviço de integração** com todas as operações CRUD (`src/services/calcom.service.ts`)
- **Context Provider** para gerenciamento global de eventos (`src/contexts/AppointmentContext.tsx`)
- **Calendar Component** integrado com sincronização automática (`src/components/Calendar.tsx`)
- **Variáveis de ambiente** configuradas (`.env.example`)

### 🎨 Funcionalidades Implementadas

#### 1. Sincronização Automática
- Sincroniza automaticamente ao carregar a aplicação
- Busca eventos dos próximos 90 dias do Cal.com
- Indicador visual de status de sincronização
- Botão manual de sincronização

#### 2. Gerenciamento de Eventos
- Criação de eventos locais
- Sincronização com Cal.com
- Atualização e exclusão de eventos
- Suporte para eventos locais e remotos

#### 3. Interface Visual
- Status de sincronização com indicador colorido
- Mensagens de erro claras
- Loading states durante operações
- Responsivo para mobile e desktop

## 🚀 Como Configurar

### Passo 1: Obter API Key do Cal.com

1. Acesse [Cal.com Settings](https://app.cal.com/settings/developer)
2. Clique em **"New API Key"**
3. Dê um nome para a chave (ex: "Dentistry Demo")
4. Copie a chave gerada (começa com `cal_live_...`)

### Passo 2: Encontrar Event Type ID

1. Acesse [Event Types](https://app.cal.com/event-types)
2. Clique no tipo de evento que deseja usar
3. Na URL, você verá o ID (ex: `/event-types/123456`)
4. Copie apenas o número (ex: `123456`)

### Passo 3: Configurar Variáveis de Ambiente

1. Copie o arquivo de exemplo:
   ```bash
   cp .env.example .env
   ```

2. Edite o arquivo `.env` e adicione suas credenciais:
   ```env
   VITE_CALCOM_API_KEY=cal_live_xxxxxxxxxxxxxxxxxxxxxxxxxx
   VITE_CALCOM_EVENT_TYPE_ID=123456
   ```

3. **Importante**: O arquivo `.env` já está no `.gitignore` e nunca será commitado

### Passo 4: Reiniciar Servidor

```bash
npm run dev
```

## 📖 Como Usar

### Modo Local (Sem Cal.com)

Se você **não configurar** as variáveis de ambiente:
- O sistema funciona normalmente com eventos locais
- Eventos de exemplo são carregados automaticamente
- Não haverá sincronização com Cal.com

### Modo Integrado (Com Cal.com)

Se você **configurar** as variáveis de ambiente:
- Sincronização automática ao iniciar
- Indicador de status visível no calendário
- Botão "Sincronizar" para atualização manual
- Eventos do Cal.com aparecem em verde

## 🔧 Estrutura do Código

### `src/services/calcom.service.ts`

Serviço principal de integração com funções:

```typescript
// Buscar todos os bookings
const bookings = await calComService.getBookings()

// Buscar um booking específico
const booking = await calComService.getBooking(123)

// Criar novo booking
const newBooking = await calComService.createBooking({
  eventTypeId: 123456,
  start: '2025-10-05T10:00:00Z',
  attendee: {
    email: 'cliente@exemplo.com',
    name: 'João Silva'
  }
})

// Atualizar booking
await calComService.updateBooking(123, {
  startTime: '2025-10-05T11:00:00Z'
})

// Cancelar booking
await calComService.cancelBooking(123, 'Reagendado')

// Sincronizar eventos
const events = await calComService.syncFromCalCom({
  fromDate: '2025-10-05',
  toDate: '2025-12-31'
})
```

### `src/contexts/AppointmentContext.tsx`

Context Provider que gerencia estado global:

```typescript
const {
  // Eventos
  events,                    // Lista de todos os eventos
  addEvent,                  // Adicionar novo evento
  updateEvent,               // Atualizar evento existente
  deleteEvent,               // Deletar evento

  // Cal.com
  isCalComEnabled,           // Se Cal.com está configurado
  syncStatus,                // Status da sincronização
  syncWithCalCom,            // Função de sincronização manual

  // Estados
  isLoading,                 // Loading state
  error,                     // Mensagens de erro
} = useAppointment()
```

### `src/components/Calendar.tsx`

Componente do calendário integrado com:
- FullCalendar configurado
- Sincronização automática
- UI de status e controles

## 🎨 Customização

### Cores por Status

Os eventos do Cal.com são coloridos automaticamente:
- 🟢 Verde: Eventos aceitos
- 🟡 Amarelo: Eventos pendentes
- 🔴 Vermelho: Eventos cancelados
- ⚫ Preto: Eventos locais

### Modificar Cores

Edite em `src/services/calcom.service.ts`:

```typescript
private getColorByStatus(status: string): string {
  switch (status) {
    case 'accepted':
      return '#10b981'; // Verde - Altere aqui
    case 'pending':
      return '#f59e0b'; // Amarelo - Altere aqui
    case 'cancelled':
      return '#ef4444'; // Vermelho - Altere aqui
    default:
      return '#1C1C1C'; // Preto - Altere aqui
  }
}
```

## 🔄 Sincronização

### Automática
- Executa ao carregar a página
- Busca eventos dos próximos 90 dias
- Atualiza a cada vez que a página recarrega

### Manual
- Clique no botão "Sincronizar" no calendário
- Útil para atualizar eventos em tempo real

### Programática

```typescript
// No seu código
import { useAppointment } from './contexts/AppointmentContext'

function MyComponent() {
  const { syncWithCalCom } = useAppointment()

  const handleSync = async () => {
    await syncWithCalCom()
    console.log('Sincronizado!')
  }

  return <button onClick={handleSync}>Sincronizar</button>
}
```

## 🔐 Webhooks (Futuro)

O serviço já está preparado para receber webhooks do Cal.com:

```typescript
// src/services/calcom.service.ts
calComService.handleWebhook(payload)
```

Para configurar webhooks:
1. Acesse [Cal.com Webhooks](https://app.cal.com/settings/developer/webhooks)
2. Crie um novo webhook
3. Configure os eventos: `booking.created`, `booking.rescheduled`, `booking.cancelled`
4. Implemente um endpoint no backend para receber os webhooks

## 📝 Tipos TypeScript

Todos os tipos estão em `src/types/index.ts`:

- `CalComConfig` - Configuração do serviço
- `CalComBooking` - Estrutura de um booking
- `CalComEventType` - Tipo de evento
- `CreateCalComBookingRequest` - Payload de criação
- `UpdateCalComBookingRequest` - Payload de atualização
- `CalComApiResponse<T>` - Resposta da API
- `SyncStatus` - Status de sincronização

## ⚡ Performance

- Sincronização eficiente com cache
- Loading states em todas operações
- Erro handling robusto
- Otimizado para mobile e desktop

## 🐛 Troubleshooting

### Erro: "Cal.com API key não configurada"
- Verifique se o arquivo `.env` existe
- Verifique se a variável `VITE_CALCOM_API_KEY` está definida
- Reinicie o servidor de desenvolvimento

### Erro: "Event Type ID não configurado"
- Verifique se `VITE_CALCOM_EVENT_TYPE_ID` está no `.env`
- Certifique-se que o ID está correto

### Sincronização não funciona
- Verifique se a API key é válida
- Verifique a conexão com internet
- Veja o console do navegador para erros detalhados

### Eventos não aparecem
- Verifique se há eventos nos próximos 90 dias no Cal.com
- Tente sincronizar manualmente
- Verifique se o status dos bookings está como "accepted"

## 🎯 Próximos Passos

Tudo está pronto! Você só precisa:

1. ✅ Configurar as variáveis de ambiente (`.env`)
2. ✅ Reiniciar o servidor
3. ✅ Usar normalmente!

O sistema funcionará automaticamente com Cal.com se configurado, ou como calendário local se não configurado.

---

**Desenvolvido com integração completa Cal.com + FullCalendar** 🚀
