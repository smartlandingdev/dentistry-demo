import React from 'react';
import { Calendar as CalendarIcon, Users, Clock, TrendingUp } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const Dashboard: React.FC = () => {
  const { t } = useLanguage();
  const stats = [
    {
      name: t.dashboard.stats.totalAppointments,
      value: '24',
      change: '+12%',
      changeType: 'increase',
      icon: CalendarIcon,
    },
    {
      name: t.dashboard.stats.activeClients,
      value: '18',
      change: '+5%',
      changeType: 'increase',
      icon: Users,
    },
    {
      name: t.dashboard.stats.hoursScheduled,
      value: '32',
      change: '+8%',
      changeType: 'increase',
      icon: Clock,
    },
    {
      name: t.dashboard.stats.revenue,
      value: 'R$ 2.840',
      change: '+15%',
      changeType: 'increase',
      icon: TrendingUp,
    },
  ];

  const upcomingAppointments = [
    {
      id: 1,
      client: 'João Silva',
      service: t.eventModal.services.consultation,
      time: '14:00',
      date: t.dashboard.upcomingAppointments.today,
      status: 'confirmed',
    },
    {
      id: 2,
      client: 'Maria Santos',
      service: t.eventModal.services.training,
      time: '15:30',
      date: t.dashboard.upcomingAppointments.tomorrow,
      status: 'pending',
    },
    {
      id: 3,
      client: 'Carlos Oliveira',
      service: t.eventModal.services.followUp,
      time: '10:00',
      date: '28 Dez',
      status: 'confirmed',
    },
  ];

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">{t.dashboard.title}</h1>
        <p className="text-gray-600 mt-2">{t.dashboard.subtitle}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.name} className="bg-white/80 backdrop-blur-sm rounded-xl shadow-sm border border-slate-200 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.name}</p>
                  <p className="text-3xl font-bold text-gray-900 mt-2">{stat.value}</p>
                </div>
                <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center">
                  <Icon className="w-6 h-6 text-blue-600" />
                </div>
              </div>
              <div className="mt-4 flex items-center">
                <span className="text-sm font-medium text-green-600">{stat.change}</span>
                <span className="text-sm text-gray-500 ml-2">{t.dashboard.stats.fromLastMonth}</span>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-sm border border-slate-200 p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">{t.dashboard.upcomingAppointments.title}</h2>
          <div className="space-y-4">
            {upcomingAppointments.map((appointment) => (
              <div key={appointment.id} className="flex items-center justify-between p-4 bg-slate-50/60 rounded-lg">
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                    <CalendarIcon className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">{appointment.client}</h3>
                    <p className="text-sm text-gray-600">{appointment.service}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-900">{appointment.time}</p>
                  <p className="text-sm text-gray-600">{appointment.date}</p>
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium mt-1 ${
                      appointment.status === 'confirmed'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-yellow-100 text-yellow-800'
                    }`}
                  >
                    {appointment.status === 'confirmed' ? t.dashboard.upcomingAppointments.confirmed : t.dashboard.upcomingAppointments.pending}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-sm border border-slate-200 p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">{t.dashboard.quickActions.title}</h2>
          <div className="space-y-4">
            <button className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white p-4 rounded-lg font-medium transition-all duration-200 shadow-md hover:shadow-lg">
              {t.dashboard.quickActions.scheduleNew}
            </button>
            <button className="w-full bg-slate-50/60 hover:bg-slate-100/80 text-slate-700 p-4 rounded-lg font-medium transition-colors border border-slate-200">
              {t.dashboard.quickActions.viewCalendar}
            </button>
            <button className="w-full bg-slate-50/60 hover:bg-slate-100/80 text-slate-700 p-4 rounded-lg font-medium transition-colors border border-slate-200">
              {t.dashboard.quickActions.manageClients}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;