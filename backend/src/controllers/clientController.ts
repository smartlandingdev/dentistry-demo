import { Request, Response } from 'express';
import { ClientService } from '../services/clientService.js';

const clientService = new ClientService();

export class ClientController {
  async getClients(_req: Request, res: Response): Promise<void> {
    try {
      const clients = await clientService.getClientsWithAppointments();
      res.json({
        success: true,
        data: clients,
      });
    } catch (error) {
      console.error('Erro ao buscar clientes:', error);
      res.status(500).json({
        success: false,
        message: 'Erro ao buscar clientes',
        error: error instanceof Error ? error.message : 'Erro desconhecido',
      });
    }
  }
}
