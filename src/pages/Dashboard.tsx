import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Calendar as CalendarIcon,
  Users,
  Clock,
  TrendingUp,
} from "lucide-react";
import axios from "axios";
import { useLanguage } from "../contexts/LanguageContext";
import { useAppointment } from "../contexts/AppointmentContext";
import AppointmentModal from "../components/AppointmentModal";

interface Appointment {
  id_agendamento: string;
  id_cliente: string;
  clientName?: string;
  hora_inicio: string;
  hora_fim: string;
  finalizado: boolean;
  service?: string;
  time?: string;
  date?: string;
  status?: "confirmed" | "pending";
}

const Dashboard: React.FC = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const { isModalOpen, openModal, closeModal } = useAppointment();

  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [upcomingAppointments, setUpcomingAppointments] = useState<Appointment[]>([]);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const resAll = await axios.get("http://localhost:3001/api/appointments");
        const allAppointments: Appointment[] = resAll.data.data || [];
        setAppointments(allAppointments);

        const resUpcoming = await axios.get("http://localhost:3001/api/appointments/upcoming");
        const upcoming: Appointment[] = (resUpcoming.data.data || []).map((a: Appointment) => ({
          ...a,
          clientName: a.clientName || a.id_cliente,
          service: t.eventModal.services.consultation,
          time: new Date(a.hora_inicio).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
          date: new Date(a.hora_inicio).toLocaleDateString("pt-BR", {
            day: "2-digit",
            month: "short",
          }),
          status: a.finalizado ? "confirmed" : "pending",
        }));

        setUpcomingAppointments(upcoming.slice(0, 3));
      } catch (error) {
        console.error("Erro ao buscar agendamentos:", error);
      }
    };

    fetchAppointments();
    const interval = setInterval(fetchAppointments, 60000);
    return () => clearInterval(interval);
  }, [t.eventModal.services.consultation]);

  const stats = [
    {
      name: t.dashboard.stats.totalAppointments,
      value: appointments.length.toString(),
      change: "+12%",
      changeType: "increase",
      icon: CalendarIcon,
      color: "from-blue-500 to-blue-600",
    },
    {
      name: t.dashboard.stats.activeClients,
      value: [...new Set(appointments.map((a) => a.clientName || a.id_cliente))].length.toString(),
      change: "+5%",
      changeType: "increase",
      icon: Users,
      color: "from-purple-500 to-purple-600",
    },
    {
      name: t.dashboard.stats.hoursScheduled,
      value: appointments.length.toString(),
      change: "+8%",
      changeType: "increase",
      icon: Clock,
      color: "from-green-500 to-green-600",
    },
    {
      name: t.dashboard.stats.revenue,
      value: "R$ 2.840",
      change: "+15%",
      changeType: "increase",
      icon: TrendingUp,
      color: "from-orange-500 to-orange-600",
    },
  ];

  const handleSaveAppointment = (appointment: any) => {
    console.log("Novo agendamento:", appointment);
  };

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
          {t.dashboard.title}
        </h1>
        <p className="text-gray-600 mt-2 text-lg">{t.dashboard.subtitle}</p>
      </motion.div>

      {/* Estatísticas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.name}
              className="bg-white rounded-3xl p-6 border border-gray-100 hover:shadow-2xl transition-all duration-300 hover-lift"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -8 }}
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`w-14 h-14 bg-gradient-to-br ${stat.color} rounded-2xl flex items-center justify-center shadow-lg`}>
                  <Icon className="w-7 h-7 text-white" />
                </div>
                <span className="text-sm font-semibold text-green-600 bg-green-50 px-3 py-1 rounded-full">
                  {stat.change}
                </span>
              </div>
              <p className="text-sm font-medium text-gray-500 mb-1">{stat.name}</p>
              <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
              <p className="text-xs text-gray-400 mt-2">{t.dashboard.stats.fromLastMonth}</p>
            </motion.div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Próximos agendamentos */}
        <motion.div
          className="bg-white rounded-3xl p-8 border border-gray-100 shadow-lg"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
            <div className="w-2 h-8 bg-gradient-to-b from-[#1A365D] to-[#3B82F6] rounded-full"></div>
            {t.dashboard.upcomingAppointments.title}
          </h2>
          <div className="space-y-4">
            {upcomingAppointments.length > 0 ? (
              upcomingAppointments.map((appointment, index) => (
                <motion.div
                  key={appointment.id_agendamento}
                  className="flex items-center justify-between p-5 bg-gradient-to-br from-gray-50 to-white rounded-2xl border border-gray-100 hover:shadow-lg transition-all duration-300"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ x: 4 }}
                >
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-[#1A365D] to-[#3B82F6] rounded-xl flex items-center justify-center shadow-md">
                      <CalendarIcon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">{appointment.clientName}</h3>
                      <p className="text-sm text-gray-500">{appointment.service}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-semibold text-gray-900">{appointment.time}</p>
                    <p className="text-sm text-gray-500 mb-2">{appointment.date}</p>
                    <span
                      className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${
                        appointment.status === "confirmed"
                          ? "bg-gradient-to-r from-green-500 to-green-600 text-white"
                          : "bg-gradient-to-r from-yellow-400 to-yellow-500 text-white"
                      }`}
                    >
                      {appointment.status === "confirmed"
                        ? t.dashboard.upcomingAppointments.confirmed
                        : t.dashboard.upcomingAppointments.pending}
                    </span>
                  </div>
                </motion.div>
              ))
            ) : (
              <p className="text-gray-500 text-center py-8">Nenhum próximo agendamento</p>
            )}
          </div>
        </motion.div>

        {/* Ações rápidas */}
        <motion.div
          className="bg-white rounded-3xl p-8 border border-gray-100 shadow-lg"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
            <div className="w-2 h-8 bg-gradient-to-b from-[#1A365D] to-[#3B82F6] rounded-full"></div>
            {t.dashboard.quickActions.title}
          </h2>
          <div className="space-y-4">
            <motion.button
              onClick={openModal}
              className="w-full bg-gradient-to-r from-[#1A365D] to-[#3B82F6] hover:shadow-xl text-white p-5 font-semibold rounded-2xl transition-all duration-300 flex items-center justify-center gap-3"
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              <CalendarIcon className="w-5 h-5" />
              {t.dashboard.quickActions.scheduleNew}
            </motion.button>

            <motion.button
              onClick={() => navigate("/sistema/calendar")}
              className="w-full bg-white hover:bg-gray-50 text-gray-700 p-5 font-semibold rounded-2xl transition-all border-2 border-gray-200 hover:border-[#3B82F6] flex items-center justify-center gap-3"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <CalendarIcon className="w-5 h-5" />
              {t.dashboard.quickActions.viewCalendar}
            </motion.button>

            <motion.button
              onClick={() => navigate("/sistema/clients")}
              className="w-full bg-white hover:bg-gray-50 text-gray-700 p-5 font-semibold rounded-2xl transition-all border-2 border-gray-200 hover:border-[#3B82F6] flex items-center justify-center gap-3"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Users className="w-5 h-5" />
              {t.dashboard.quickActions.manageClients}
            </motion.button>
          </div>
        </motion.div>
      </div>

      <AppointmentModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onSave={handleSaveAppointment}
      />
    </div>
  );
};

export default Dashboard;
