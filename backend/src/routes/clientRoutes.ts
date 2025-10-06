import { Router } from 'express';
import { ClientController } from '../controllers/clientController.js';

const router = Router();
const clientController = new ClientController();

// GET /api/clients - Busca todos os clientes com agendamentos
router.get('/', (req, res) => clientController.getClients(req, res));

export default router;
