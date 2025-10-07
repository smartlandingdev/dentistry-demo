import React, { useEffect, useState } from "react";
import {
  Search,
  Plus,
  Phone,
  Mail,
  Calendar,
  Edit,
  Trash2,
} from "lucide-react";
import { apiService, type Client } from "../services/api";

const Clients: React.FC = () => {
  const [clients, setClients] = useState<Client[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchClients = async () => {
      setLoading(true);
      setError(null);

      const response = await apiService.getClients();

      if (response.success && response.data) {
        setClients(response.data);
      } else {
        setError(response.error || "Erro ao buscar clientes");
        console.error("Erro ao buscar clientes:", response.error);
      }

      setLoading(false);
    };

    fetchClients();
  }, []);

  const filteredClients = clients.filter((client) => {
    const term = searchTerm.toLowerCase();
    return (
      client.name?.toLowerCase().includes(term) ||
      client.phone?.includes(term) ||
      client.email?.toLowerCase().includes(term)
    );
  });

  if (loading) {
    return <div className="p-6 text-[#A8A29E]">Carregando pacientes...</div>;
  }

  if (error) {
    return (
      <div className="p-6">
        <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded">
          <p className="font-medium">Erro ao carregar pacientes</p>
          <p className="text-sm mt-1">{error}</p>
          <p className="text-sm mt-2">
            Certifique-se de que o servidor backend está rodando em
            http://localhost:3001
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      {/* Cabeçalho */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[#1C1C1C]">Pacientes</h1>
        <p className="text-[#A8A29E] mt-2">Gerencie os pacientes da clínica</p>
      </div>

      {/* Barra de ações */}
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-3 w-5 h-5 text-[#A8A29E]" />
          <input
            type="text"
            placeholder="Buscar por nome, telefone ou e-mail..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-[#1C1C1C]/20 bg-[#E8E4DF] text-[#1C1C1C] placeholder-[#A8A29E] focus:outline-none focus:border-[#1C1C1C]"
          />
        </div>
        <button className="bg-[#1C1C1C] hover:bg-[#A8A29E] text-[#F2EFEA] px-6 py-3 font-medium transition-colors flex items-center justify-center gap-2">
          <Plus className="w-5 h-5" /> Novo Paciente
        </button>
      </div>

      {/* Lista de pacientes */}
      <div className="bg-[#E8E4DF] border border-[#1C1C1C]/20">
        {/* Cabeçalho da tabela */}
        <div className="grid grid-cols-12 gap-4 p-4 border-b border-[#1C1C1C]/20 bg-[#D6CBB8] font-semibold text-[#1C1C1C]">
          <div className="col-span-3">Nome</div>
          <div className="col-span-2">Telefone</div>
          <div className="col-span-2">E-mail</div>
          <div className="col-span-2">Última Visita</div>
          <div className="col-span-2">Próxima Consulta</div>
          <div className="col-span-1 text-center">Ações</div>
        </div>

        {/* Linhas */}
        {filteredClients.length > 0 ? (
          filteredClients.map((client) => (
            <div
              key={client.id}
              className="grid grid-cols-12 gap-4 p-4 border-b border-[#1C1C1C]/20 hover:bg-[#F2EFEA] transition-colors"
            >
              <div className="col-span-3">
                <div className="font-medium text-[#1C1C1C]">{client.name}</div>
                <div className="text-sm text-[#A8A29E]">
                  {client.totalVisits} consultas
                </div>
              </div>
              <div className="col-span-2 flex items-center gap-2 text-[#1C1C1C]">
                <Phone className="w-4 h-4 text-[#A8A29E]" />
                <span className="text-sm">{client.phone}</span>
              </div>
              <div className="col-span-2 flex items-center gap-2 text-[#1C1C1C]">
                <Mail className="w-4 h-4 text-[#A8A29E]" />
                <span className="text-sm">{client.email}</span>
              </div>
              <div className="col-span-2 flex items-center gap-2 text-[#1C1C1C]">
                <Calendar className="w-4 h-4 text-[#A8A29E]" />
                <span className="text-sm">{client.lastVisit || "-"}</span>
              </div>
              <div className="col-span-2 flex items-center gap-2 text-[#1C1C1C]">
                {client.nextAppointment ? (
                  <span className="sm">{client.nextAppointment}</span>
                ) : (
                  <span className="text-[#A8A29E]">Sem agendamento</span>
                )}
              </div>
              <div className="col-span-1 flex items-center justify-center gap-2">
                <button className="p-1.5 hover:bg-[#D6CBB8]" title="Editar">
                  <Edit className="w-4 h-4 text-[#1C1C1C]" />
                </button>
                <button className="p-1.5 hover:bg-[#D6CBB8]" title="Excluir">
                  <Trash2 className="w-4 h-4 text-[#1C1C1C]" />
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="p-8 text-center text-[#A8A29E]">
            Nenhum paciente encontrado
          </div>
        )}
      </div>

      {/* Estatísticas */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
        <div className="bg-[#E8E4DF] border border-[#1C1C1C]/20 p-6">
          <div className="text-sm font-medium text-[#A8A29E] mb-2">
            Total de Pacientes
          </div>
          <div className="text-3xl font-bold text-[#1C1C1C]">
            {clients.length}
          </div>
        </div>
        <div className="bg-[#E8E4DF] border border-[#1C1C1C]/20 p-6">
          <div className="text-sm font-medium text-[#A8A29E] mb-2">
            Com Consulta Agendada
          </div>
          <div className="text-3xl font-bold text-[#1C1C1C]">
            {clients.filter((c) => c.nextAppointment).length}
          </div>
        </div>
        <div className="bg-[#E8E4DF] border border-[#1C1C1C]/20 p-6">
          <div className="text-sm font-medium text-[#A8A29E] mb-2">
            Total de Consultas
          </div>
          <div className="text-3xl font-bold text-[#1C1C1C]">
            {clients.reduce((acc, c) => acc + c.totalVisits, 0)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Clients;
