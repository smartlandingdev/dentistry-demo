import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
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
  const [upcomingAppointments, setUpcomingAppointments] = useState<
    Appointment[]
  >([]);

  // Buscar agendamentos da API
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
    },
    {
      name: t.dashboard.stats.activeClients,
      value: [
        ...new Set(appointments.map((a) => a.clientName || a.id_cliente)),
      ].length.toString(),
      change: "+5%",
      changeType: "increase",
      icon: Users,
    },
    {
      name: t.dashboard.stats.hoursScheduled,
      value: appointments.length.toString(),
      changeType: "increase",
      icon: Clock,
    },
    {
      name: t.dashboard.stats.revenue,
      value: "R$ 2.840",
      change: "+15%",
      changeType: "increase",
      icon: TrendingUp,
    },
  ];

  const handleSaveAppointment = (appointment: any) => {
    console.log("Novo agendamento:", appointment);
  };

  return (
    <div className="p-6">
      {/* Cabeçalho */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[#1C1C1C]">
          {t.dashboard.title}
        </h1>
        <p className="text-[#A8A29E] mt-2">{t.dashboard.subtitle}</p>
      </div>

      {/* Estatísticas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.name}
              className="bg-[#E8E4DF] border border-[#1C1C1C]/20 p-6"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-[#A8A29E]">
                    {stat.name}
                  </p>
                  <p className="text-3xl font-bold text-[#1C1C1C] mt-2">
                    {stat.value}
                  </p>
                </div>
                <div className="w-12 h-12 bg-[#1C1C1C] flex items-center justify-center">
                  <Icon className="w-6 h-6 text-[#F2EFEA]" strokeWidth={1.5} />
                </div>
              </div>
              <div className="mt-4 flex items-center">
                <span className="text-sm font-medium text-[#1C1C1C]">
                  {stat.change}
                </span>
                <span className="text-sm text-[#A8A29E] ml-2">
                  {t.dashboard.stats.fromLastMonth}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Próximos agendamentos */}
        <div className="bg-[#E8E4DF] border border-[#1C1C1C]/20 p-6">
          <h2 className="text-xl font-semibold text-[#1C1C1C] mb-6">
            {t.dashboard.upcomingAppointments.title}
          </h2>
          <div className="space-y-4">
            {upcomingAppointments.length > 0 ? (
              upcomingAppointments.map((appointment) => (
                <div
                  key={appointment.id_agendamento}
                  className="flex items-center justify-between p-4 bg-[#F2EFEA] border border-[#1C1C1C]/20"
                >
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-[#1C1C1C] flex items-center justify-center">
                      <CalendarIcon
                        className="w-5 h-5 text-[#F2EFEA]"
                        strokeWidth={1.5}
                      />
                    </div>
                    <div>
                      <h3 className="font-medium text-[#1C1C1C]">
                        {appointment.clientName}
                      </h3>
                      <p className="text-sm text-[#A8A29E]">
                        {appointment.service}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-[#1C1C1C]">
                      {appointment.time}
                    </p>
                    <p className="text-sm text-[#A8A29E]">{appointment.date}</p>
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 text-xs font-medium mt-1 ${
                        appointment.status === "confirmed"
                          ? "bg-[#1C1C1C] text-[#F2EFEA]"
                          : "bg-[#D6CBB8] text-[#1C1C1C]"
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
              <p className="text-[#1C1C1C]">Nenhum próximo agendamento</p>
            )}
          </div>
        </div>

        {/* Ações rápidas */}
        <div className="bg-[#E8E4DF] border border-[#1C1C1C]/20 p-6">
          <h2 className="text-xl font-semibold text-[#1C1C1C] mb-6">
            {t.dashboard.quickActions.title}
          </h2>
          <div className="space-y-4">
            <button
              onClick={openModal}
              className="w-full bg-[#1C1C1C] hover:bg-[#A8A29E] text-[#F2EFEA] p-4 font-medium transition-all duration-200"
            >
              {t.dashboard.quickActions.scheduleNew}
            </button>
            <button
              onClick={() => navigate("/sistema/calendar")}
              className="w-full bg-[#F2EFEA] hover:bg-[#D6CBB8] text-[#1C1C1C] p-4 font-medium transition-colors border border-[#1C1C1C]/20"
            >
              {t.dashboard.quickActions.viewCalendar}
            </button>
            <button
              onClick={() => navigate("/sistema/clients")}
              className="w-full bg-[#F2EFEA] hover:bg-[#D6CBB8] text-[#1C1C1C] p-4 font-medium transition-colors border border-[#1C1C1C]/20"
            >
              {t.dashboard.quickActions.manageClients}
            </button>
          </div>
        </div>
      </div>

      {/* Modal de Agendamento */}
      <AppointmentModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onSave={handleSaveAppointment}
      />
    </div>
  );
};

export default Dashboard;
