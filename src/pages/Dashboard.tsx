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

const API_BASE_URL = import.meta.env.VITE_API_URL || '/api';

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
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        // Todos os agendamentos
        const resAll = await axios.get(
          `${API_BASE_URL}/appointments`
        );
        const allAppointments: Appointment[] = resAll.data.data || [];
        setAppointments(allAppointments);

        // Próximos agendamentos
        const resUpcoming = await axios.get(
          `${API_BASE_URL}/appointments/upcoming`
        );
        const upcoming: Appointment[] = (resUpcoming.data.data || []).map(
          (a: Appointment) => ({
            ...a,
            clientName: a.clientName || a.id_cliente,
            service: t.eventModal.services.consultation, // ajustar conforme seu tipo de serviço
            time: new Date(a.hora_inicio).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            }),
            date: new Date(a.hora_inicio).toLocaleDateString("pt-BR", {
              day: "2-digit",
              month: "short",
            }),
            status: a.finalizado ? "confirmed" : "pending",
          })
        );

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

  const Container = isMobile ? 'div' : motion.div;
  const Button = isMobile ? 'button' : motion.button;

  return (
    <div className="p-4 sm:p-6 bg-gradient-to-br from-gray-50 to-white min-h-screen">
      {/* Cabeçalho */}
      <Container className="mb-6 sm:mb-8" {...(!isMobile && { initial: { opacity: 0, y: -20 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.5 } })}>
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold bg-gradient-to-r from-[#1A365D] to-[#3B82F6] bg-clip-text text-transparent">
          {t.dashboard.title}
        </h1>
        <p className="text-gray-600 mt-1 sm:mt-2 text-sm sm:text-base md:text-lg">{t.dashboard.subtitle}</p>
      </Container>

      {/* Estatísticas */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6 mb-6 sm:mb-8">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Container
              key={stat.name}
              className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-6 border border-gray-100 hover:shadow-xl transition-shadow duration-300"
              {...(!isMobile && { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.5, delay: index * 0.1 }, whileHover: { y: -8 } })}
            >
              <div className="flex items-center justify-between mb-3 sm:mb-4">
                <div className={`w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br ${stat.color} rounded-xl sm:rounded-2xl flex items-center justify-center shadow-lg`}>
                  <Icon className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
                </div>
                <span className="text-xs sm:text-sm font-semibold text-green-600 bg-green-50 px-2 sm:px-3 py-1 rounded-full">
                  {stat.change}
                </span>
              </div>
              <p className="text-xs sm:text-sm font-medium text-gray-500 mb-1">{stat.name}</p>
              <p className="text-2xl sm:text-3xl font-bold text-gray-900">{stat.value}</p>
              <p className="text-xs text-gray-400 mt-1 sm:mt-2">{t.dashboard.stats.fromLastMonth}</p>
            </Container>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 md:gap-8">
        {/* Próximos agendamentos */}
        <Container className="bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-8 border border-gray-100 shadow-lg" {...(!isMobile && { initial: { opacity: 0, x: -20 }, animate: { opacity: 1, x: 0 }, transition: { duration: 0.6 } })}>
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6 flex items-center gap-2 sm:gap-3">
            <div className="w-1.5 sm:w-2 h-6 sm:h-8 bg-gradient-to-b from-[#1A365D] to-[#3B82F6] rounded-full"></div>
            {t.dashboard.upcomingAppointments.title}
          </h2>
          <div className="space-y-3 sm:space-y-4">
            {upcomingAppointments.length > 0 ? (
              upcomingAppointments.map((appointment) => (
                <div
                  key={appointment.id_agendamento}
                  className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-4 sm:p-5 bg-gradient-to-br from-gray-50 to-white rounded-xl sm:rounded-2xl border border-gray-100 hover:shadow-lg transition-shadow duration-300 gap-3 sm:gap-0"
                >
                  <div className="flex items-center space-x-3 sm:space-x-4">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-[#1A365D] to-[#3B82F6] rounded-lg sm:rounded-xl flex items-center justify-center shadow-md flex-shrink-0">
                      <CalendarIcon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 text-sm sm:text-base">{appointment.clientName}</h3>
                      <p className="text-xs sm:text-sm text-gray-500">{appointment.service}</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between sm:block sm:text-right pl-13 sm:pl-0">
                    <div>
                      <p className="text-xs sm:text-sm font-semibold text-gray-900">{appointment.time}</p>
                      <p className="text-xs sm:text-sm text-gray-500 mb-1 sm:mb-2">{appointment.date}</p>
                    </div>
                    <span
                      className={`inline-flex items-center px-2 sm:px-3 py-1 rounded-full text-xs font-semibold ${
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
                </div>
              ))
            ) : (
              <p className="text-gray-500 text-center py-6 sm:py-8 text-sm">Nenhum próximo agendamento</p>
            )}
          </div>
        </Container>

        {/* Ações rápidas */}
        <Container className="bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-8 border border-gray-100 shadow-lg" {...(!isMobile && { initial: { opacity: 0, x: 20 }, animate: { opacity: 1, x: 0 }, transition: { duration: 0.6 } })}>
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6 flex items-center gap-2 sm:gap-3">
            <div className="w-1.5 sm:w-2 h-6 sm:h-8 bg-gradient-to-b from-[#1A365D] to-[#3B82F6] rounded-full"></div>
            {t.dashboard.quickActions.title}
          </h2>
          <div className="space-y-3 sm:space-y-4">
            <Button
              onClick={openModal}
              className="w-full bg-gradient-to-r from-[#1A365D] to-[#3B82F6] hover:shadow-xl text-white p-4 sm:p-5 font-semibold rounded-xl sm:rounded-2xl transition-all duration-300 flex items-center justify-center gap-2 sm:gap-3 text-sm sm:text-base"
              {...(!isMobile && { whileHover: { scale: 1.02, y: -2 }, whileTap: { scale: 0.98 } })}
            >
              <CalendarIcon className="w-4 h-4 sm:w-5 sm:h-5" />
              {t.dashboard.quickActions.scheduleNew}
            </Button>

            <Button
              onClick={() => navigate("/sistema/calendar")}
              className="w-full bg-white hover:bg-gray-50 text-gray-700 p-4 sm:p-5 font-semibold rounded-xl sm:rounded-2xl transition-all border-2 border-gray-200 hover:border-[#3B82F6] flex items-center justify-center gap-2 sm:gap-3 text-sm sm:text-base"
              {...(!isMobile && { whileHover: { scale: 1.02 }, whileTap: { scale: 0.98 } })}
            >
              <CalendarIcon className="w-4 h-4 sm:w-5 sm:h-5" />
              {t.dashboard.quickActions.viewCalendar}
            </Button>

            <Button
              onClick={() => navigate("/sistema/clients")}
              className="w-full bg-white hover:bg-gray-50 text-gray-700 p-4 sm:p-5 font-semibold rounded-xl sm:rounded-2xl transition-all border-2 border-gray-200 hover:border-[#3B82F6] flex items-center justify-center gap-2 sm:gap-3 text-sm sm:text-base"
              {...(!isMobile && { whileHover: { scale: 1.02 }, whileTap: { scale: 0.98 } })}
            >
              <Users className="w-4 h-4 sm:w-5 sm:h-5" />
              {t.dashboard.quickActions.manageClients}
            </Button>
          </div>
        </Container>
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
