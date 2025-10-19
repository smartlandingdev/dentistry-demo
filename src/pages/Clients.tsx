import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Search,
  Plus,
  Phone,
  Mail,
  Calendar,
  Edit,
  Trash2,
  Users,
} from "lucide-react";
import { apiService } from "../services/api";
import type { Client, ClientInput } from "../services/api";
import ClientModal from "../components/ClientModal";
import toast from "react-hot-toast";

const Clients: React.FC = () => {
  const [clients, setClients] = useState<Client[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);
  const [modalMode, setModalMode] = useState<"create" | "edit">("create");

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    fetchClients();
  }, []);

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

  const handleOpenCreateModal = () => {
    setSelectedClient(null);
    setModalMode("create");
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (client: Client) => {
    setSelectedClient(client);
    setModalMode("edit");
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedClient(null);
  };

  const handleSaveClient = async (clientData: ClientInput) => {
    try {
      if (modalMode === "create") {
        const response = await apiService.createClient(clientData);
        if (response.success) {
          toast.success(response.message || "Cliente criado com sucesso!");
          await fetchClients();
        } else {
          toast.error(response.error || "Erro ao criar cliente");
          throw new Error(response.error);
        }
      } else if (selectedClient) {
        const response = await apiService.updateClient(
          selectedClient.id,
          clientData
        );
        if (response.success) {
          toast.success(response.message || "Cliente atualizado com sucesso!");
          await fetchClients();
        } else {
          toast.error(response.error || "Erro ao atualizar cliente");
          throw new Error(response.error);
        }
      }
    } catch (error) {
      console.error("Error saving client:", error);
      throw error;
    }
  };

  const handleDeleteClient = (id: number, nome: string) => {
    toast.custom(
      (t) => (
        <div
          className={`${
            t.visible ? 'animate-enter' : 'animate-leave'
          } max-w-md w-full bg-white shadow-2xl rounded-2xl pointer-events-auto flex flex-col border-2 border-red-200`}
        >
          <div className="p-6">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                  <Trash2 className="w-6 h-6 text-red-600" />
                </div>
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900 mb-1">
                  Excluir Paciente
                </h3>
                <p className="text-sm text-gray-600 mb-1">
                  Deseja realmente excluir <span className="font-semibold text-gray-900">"{nome}"</span>?
                </p>
                <p className="text-xs text-red-600">
                  Esta ação não pode ser desfeita e todos os dados serão permanentemente removidos.
                </p>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-200 px-6 py-4 flex gap-3 bg-gray-50 rounded-b-2xl">
            <button
              onClick={() => toast.dismiss(t.id)}
              className="flex-1 px-4 py-2.5 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-100 transition-colors"
            >
              Cancelar
            </button>
            <button
              onClick={async () => {
                toast.dismiss(t.id);
                const response = await apiService.deleteClient(id);
                if (response.success) {
                  toast.success(response.message || "Paciente excluído com sucesso!");
                  await fetchClients();
                } else {
                  toast.error(response.error || "Erro ao excluir paciente");
                }
              }}
              className="flex-1 px-4 py-2.5 bg-red-600 text-white font-medium rounded-lg hover:bg-red-700 transition-colors"
            >
              Excluir
            </button>
          </div>
        </div>
      ),
      {
        duration: Infinity,
        position: 'top-center',
      }
    );
  };

  const filteredClients = clients.filter((client) => {
    const term = searchTerm.toLowerCase();
    return (
      client.nomewpp?.toLowerCase().includes(term) ||
      client.telefone?.includes(term) ||
      client.email?.toLowerCase().includes(term)
    );
  });

  if (loading) {
    return (
      <div className="p-4 sm:p-6 min-h-screen bg-gradient-to-br from-gray-50 to-white flex items-center justify-center">
        <div className="text-gray-500 text-sm sm:text-base">
          Carregando pacientes...
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 sm:p-6 min-h-screen bg-gradient-to-br from-gray-50 to-white">
        <div className="bg-red-50 border border-red-200 text-red-700 p-4 sm:p-6 rounded-xl sm:rounded-2xl">
          <p className="font-semibold mb-2 text-sm sm:text-base">
            Erro ao carregar pacientes
          </p>
          <p className="text-xs sm:text-sm">{error}</p>
          <p className="text-xs sm:text-sm mt-2">
            Certifique-se de que o servidor backend está rodando em
            http://localhost:3001
          </p>
        </div>
      </div>
    );
  }

  const Container = isMobile ? "div" : motion.div;
  const Button = isMobile ? "button" : motion.button;

  return (
    <div className="p-4 sm:p-6 bg-gradient-to-br from-gray-50 to-white min-h-screen">
      {/* Cabeçalho */}
      <Container
        className="mb-6 sm:mb-8"
        {...(!isMobile && {
          initial: { opacity: 0, y: -20 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.5 },
        })}
      >
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold bg-gradient-to-r from-[#1A365D] to-[#3B82F6] bg-clip-text text-transparent">
          Pacientes
        </h1>
        <p className="text-gray-600 mt-1 sm:mt-2 text-sm sm:text-base md:text-lg">
          Gerencie os pacientes da clínica
        </p>
      </Container>

      {/* Barra de ações */}
      <Container
        className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-6 sm:mb-8"
        {...(!isMobile && {
          initial: { opacity: 0, y: 20 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.5, delay: 0.1 },
        })}
      >
        <div className="flex-1 relative">
          <Search className="absolute left-3 sm:left-4 top-3 sm:top-4 w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Buscar por nome, telefone ou e-mail..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 sm:pl-12 pr-3 sm:pr-4 py-3 sm:py-4 border border-gray-200 bg-white rounded-lg sm:rounded-xl text-sm sm:text-base text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#3B82F6] focus:border-transparent transition-all"
          />
        </div>
        <Button
          onClick={handleOpenCreateModal}
          className="bg-gradient-to-r from-[#1A365D] to-[#3B82F6] hover:shadow-xl text-white px-6 sm:px-8 py-3 sm:py-4 font-semibold rounded-lg sm:rounded-xl transition-all duration-300 flex items-center justify-center gap-2 text-sm sm:text-base"
          {...(!isMobile && {
            whileHover: { scale: 1.02, y: -2 },
            whileTap: { scale: 0.98 },
          })}
        >
          <Plus className="w-4 h-4 sm:w-5 sm:h-5" /> Novo Paciente
        </Button>
      </Container>

      {/* Lista de pacientes - Desktop Table View */}
      <div className="hidden md:block bg-white rounded-2xl sm:rounded-3xl border border-gray-100 shadow-lg overflow-hidden">
        {/* Cabeçalho da tabela */}
        <div className="grid grid-cols-12 gap-4 p-6 bg-gradient-to-r from-gray-50 to-gray-100 font-semibold text-gray-700 text-sm">
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
              className="grid grid-cols-12 gap-4 p-6 border-t border-gray-100 hover:bg-gray-50 transition-colors"
            >
              <div className="col-span-3">
                <div className="font-semibold text-gray-900">
                  {client.nomewpp}
                </div>
                <div className="text-sm text-gray-500">
                  {client.totalVisits || 0} consultas
                </div>
              </div>
              <div className="col-span-2 flex items-center gap-2 text-gray-700">
                <Phone className="w-4 h-4 text-gray-400" />
                <span className="text-sm">{client.telefone}</span>
              </div>
              <div className="col-span-2 flex items-center gap-2 text-gray-700">
                <Mail className="w-4 h-4 text-gray-400" />
                <span className="text-sm">{client.email}</span>
              </div>
              <div className="col-span-2 flex items-center gap-2 text-gray-700">
                <Calendar className="w-4 h-4 text-gray-400" />
                <span className="text-sm">{client.lastVisit || "-"}</span>
              </div>
              <div className="col-span-2 flex items-center gap-2 text-gray-700">
                {client.nextAppointment ? (
                  <span className="text-sm">{client.nextAppointment}</span>
                ) : (
                  <span className="text-sm text-gray-400">Sem agendamento</span>
                )}
              </div>
              <div className="col-span-1 flex items-center justify-center gap-2">
                <button
                  onClick={() => handleOpenEditModal(client)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  title="Editar"
                >
                  <Edit className="w-4 h-4 text-gray-600" />
                </button>
                <button
                  onClick={() => handleDeleteClient(client.id, client.nomewpp)}
                  className="p-2 hover:bg-red-50 rounded-lg transition-colors"
                  title="Excluir"
                >
                  <Trash2 className="w-4 h-4 text-red-500" />
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="p-12 text-center text-gray-500">
            Nenhum paciente encontrado
          </div>
        )}
      </div>

      {/* Lista de pacientes - Mobile Card View */}
      <div className="md:hidden space-y-3">
        {filteredClients.length > 0 ? (
          filteredClients.map((client) => (
            <div
              key={client.id}
              className="bg-white rounded-xl border border-gray-100 shadow-lg p-4"
            >
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="font-semibold text-gray-900 text-base">
                    {client.nomewpp}
                  </h3>
                  <p className="text-xs text-gray-500">
                    {client.totalVisits || 0} consultas
                  </p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleOpenEditModal(client)}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                    title="Editar"
                  >
                    <Edit className="w-4 h-4 text-gray-600" />
                  </button>
                  <button
                    onClick={() =>
                      handleDeleteClient(client.id, client.nomewpp)
                    }
                    className="p-2 hover:bg-red-50 rounded-lg transition-colors"
                    title="Excluir"
                  >
                    <Trash2 className="w-4 h-4 text-red-500" />
                  </button>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2 text-gray-700">
                  <Phone className="w-3.5 h-3.5 text-gray-400" />
                  <span className="text-sm">{client.telefone}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-700">
                  <Mail className="w-3.5 h-3.5 text-gray-400" />
                  <span className="text-sm truncate">{client.email}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-700">
                  <Calendar className="w-3.5 h-3.5 text-gray-400" />
                  <span className="text-sm">
                    Última visita: {client.lastVisit || "-"}
                  </span>
                </div>
                {client.nextAppointment && (
                  <div className="flex items-center gap-2 text-gray-700">
                    <Calendar className="w-3.5 h-3.5 text-gray-400" />
                    <span className="text-sm">
                      Próxima: {client.nextAppointment}
                    </span>
                  </div>
                )}
              </div>
            </div>
          ))
        ) : (
          <div className="p-8 text-center text-gray-500 bg-white rounded-xl border border-gray-100">
            Nenhum paciente encontrado
          </div>
        )}
      </div>

      {/* Estatísticas */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4 md:gap-6 mt-6 sm:mt-8">
        {[
          {
            label: "Total de Pacientes",
            value: clients.length,
            icon: Users,
            color: "from-blue-500 to-blue-600",
          },
          {
            label: "Com Consulta Agendada",
            value: clients.filter((c) => c.nextAppointment).length,
            icon: Calendar,
            color: "from-green-500 to-green-600",
          },
          {
            label: "Total de Consultas",
            value: clients.reduce((acc, c) => acc + (c.totalVisits ?? 0), 0),
            icon: Calendar,
            color: "from-purple-500 to-purple-600",
          },
        ].map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.label}
              className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-6 border border-gray-100 shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <div className="flex items-center justify-between mb-3 sm:mb-4">
                <div
                  className={`w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br ${stat.color} rounded-xl sm:rounded-2xl flex items-center justify-center shadow-lg`}
                >
                  <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                </div>
              </div>
              <div className="text-xs sm:text-sm font-medium text-gray-500 mb-1">
                {stat.label}
              </div>
              <div className="text-2xl sm:text-3xl font-bold text-gray-900">
                {stat.value}
              </div>
            </div>
          );
        })}
      </div>

      {/* Client Modal */}
      <ClientModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSave={handleSaveClient}
        client={selectedClient}
        mode={modalMode}
      />
    </div>
  );
};

export default Clients;
