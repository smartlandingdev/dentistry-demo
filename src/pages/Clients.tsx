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
import { apiService, type Client } from "../services/api";

const Clients: React.FC = () => {
  const [clients, setClients] = useState<Client[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchClients = async () => {
      setLoading(false);
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
    return (
      <div className="p-6 min-h-screen bg-gradient-to-br from-gray-50 to-white flex items-center justify-center">
        <div className="text-gray-500">Carregando pacientes...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 min-h-screen bg-gradient-to-br from-gray-50 to-white">
        <div className="bg-red-50 border border-red-200 text-red-700 p-6 rounded-2xl">
          <p className="font-semibold mb-2">Erro ao carregar pacientes</p>
          <p className="text-sm">{error}</p>
          <p className="text-sm mt-2">
            Certifique-se de que o servidor backend está rodando em http://localhost:3001
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 bg-gradient-to-br from-gray-50 to-white min-h-screen">
      {/* Cabeçalho */}
      <motion.div
        className="mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-4xl font-bold bg-gradient-to-r from-[#1A365D] to-[#3B82F6] bg-clip-text text-transparent">
          Pacientes
        </h1>
        <p className="text-gray-600 mt-2 text-lg">Gerencie os pacientes da clínica</p>
      </motion.div>

      {/* Barra de ações */}
      <motion.div
        className="flex flex-col md:flex-row gap-4 mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <div className="flex-1 relative">
          <Search className="absolute left-4 top-4 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Buscar por nome, telefone ou e-mail..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-4 border border-gray-200 bg-white rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#3B82F6] focus:border-transparent transition-all"
          />
        </div>
        <motion.button
          className="bg-gradient-to-r from-[#1A365D] to-[#3B82F6] hover:shadow-xl text-white px-8 py-4 font-semibold rounded-xl transition-all duration-300 flex items-center justify-center gap-2"
          whileHover={{ scale: 1.02, y: -2 }}
          whileTap={{ scale: 0.98 }}
        >
          <Plus className="w-5 h-5" /> Novo Paciente
        </motion.button>
      </motion.div>

      {/* Lista de pacientes */}
      <motion.div
        className="bg-white rounded-3xl border border-gray-100 shadow-lg overflow-hidden"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
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
          filteredClients.map((client, index) => (
            <motion.div
              key={client.id}
              className="grid grid-cols-12 gap-4 p-6 border-t border-gray-100 hover:bg-gray-50 transition-colors"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <div className="col-span-3">
                <div className="font-semibold text-gray-900">{client.name}</div>
                <div className="text-sm text-gray-500">{client.totalVisits} consultas</div>
              </div>
              <div className="col-span-2 flex items-center gap-2 text-gray-700">
                <Phone className="w-4 h-4 text-gray-400" />
                <span className="text-sm">{client.phone}</span>
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
                <motion.button
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  title="Editar"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Edit className="w-4 h-4 text-gray-600" />
                </motion.button>
                <motion.button
                  className="p-2 hover:bg-red-50 rounded-lg transition-colors"
                  title="Excluir"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Trash2 className="w-4 h-4 text-red-500" />
                </motion.button>
              </div>
            </motion.div>
          ))
        ) : (
          <div className="p-12 text-center text-gray-500">Nenhum paciente encontrado</div>
        )}
      </motion.div>

      {/* Estatísticas */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
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
            value: clients.reduce((acc, c) => acc + c.totalVisits, 0),
            icon: Calendar,
            color: "from-purple-500 to-purple-600",
          },
        ].map((stat, index) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.label}
              className="bg-white rounded-3xl p-6 border border-gray-100 shadow-lg hover:shadow-2xl transition-all duration-300"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + index * 0.1 }}
              whileHover={{ y: -4 }}
            >
              <div className="flex items-center justify-between mb-4">
                <div
                  className={`w-12 h-12 bg-gradient-to-br ${stat.color} rounded-2xl flex items-center justify-center shadow-lg`}
                >
                  <Icon className="w-6 h-6 text-white" />
                </div>
              </div>
              <div className="text-sm font-medium text-gray-500 mb-1">{stat.label}</div>
              <div className="text-3xl font-bold text-gray-900">{stat.value}</div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default Clients;
