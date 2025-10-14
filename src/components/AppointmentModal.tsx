import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Calendar, Clock, User, FileText, Phone, Mail, Sparkles } from 'lucide-react';

interface AppointmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (appointment: any) => void;
  selectedDate?: Date;
  selectedTime?: string;
}

const AppointmentModal: React.FC<AppointmentModalProps> = ({
  isOpen,
  onClose,
  onSave,
  selectedDate,
  selectedTime
}) => {
  const [isMobile, setIsMobile] = useState(false);
  const [formData, setFormData] = useState({
    clientName: '',
    clientPhone: '',
    clientEmail: '',
    date: selectedDate ? selectedDate.toISOString().split('T')[0] : '',
    time: selectedTime || '',
    service: '',
    notes: '',
    status: 'pending'
  });

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const Container = isMobile ? 'div' : motion.div;
  const Button = isMobile ? 'button' : motion.button;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4">
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="absolute inset-0 bg-gray-900/60 backdrop-blur-md"
            onClick={onClose}
          />

          {/* Modal */}
          <Container
            className="relative bg-white rounded-2xl sm:rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-gray-100"
            {...(!isMobile && {
              initial: { opacity: 0, scale: 0.9, y: 20 },
              animate: { opacity: 1, scale: 1, y: 0 },
              exit: { opacity: 0, scale: 0.9, y: 20 },
              transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] }
            })}
          >
            {/* Header */}
            <div className="sticky top-0 bg-gradient-to-r from-[#1A365D] to-[#3B82F6] p-5 sm:p-6 flex justify-between items-center rounded-t-2xl sm:rounded-t-3xl z-10">
              <div className="flex items-center gap-2 sm:gap-3">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-white/20 backdrop-blur-lg rounded-xl sm:rounded-2xl flex items-center justify-center">
                  <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 text-white" strokeWidth={1.5} />
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-white">Novo Agendamento</h2>
              </div>
              <Button
                onClick={onClose}
                className="p-2 sm:p-2.5 hover:bg-white/20 rounded-lg sm:rounded-xl transition-colors"
                {...(!isMobile && {
                  whileHover: { scale: 1.1, rotate: 90 },
                  whileTap: { scale: 0.9 }
                })}
              >
                <X className="w-5 h-5 sm:w-6 sm:h-6 text-white" strokeWidth={1.5} />
              </Button>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="p-5 sm:p-6 md:p-8 space-y-6 sm:space-y-8">
              {/* Cliente */}
              <div className="space-y-4 sm:space-y-5">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
                    <User className="w-5 h-5 text-white" strokeWidth={1.5} />
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-gray-900">
                    Informações do Paciente
                  </h3>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Nome Completo *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.clientName}
                      onChange={(e) => handleChange('clientName', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-200 bg-gray-50 text-gray-900 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#3B82F6] focus:border-transparent transition-all text-sm sm:text-base"
                      placeholder="Digite o nome do paciente"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Telefone *
                      </label>
                      <div className="relative">
                        <Phone className="absolute left-4 top-3.5 w-4 h-4 text-gray-400" strokeWidth={1.5} />
                        <input
                          type="tel"
                          required
                          value={formData.clientPhone}
                          onChange={(e) => handleChange('clientPhone', e.target.value)}
                          className="w-full pl-11 pr-4 py-3 border border-gray-200 bg-gray-50 text-gray-900 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#3B82F6] focus:border-transparent transition-all text-sm sm:text-base"
                          placeholder="(11) 98765-4321"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        E-mail
                      </label>
                      <div className="relative">
                        <Mail className="absolute left-4 top-3.5 w-4 h-4 text-gray-400" strokeWidth={1.5} />
                        <input
                          type="email"
                          value={formData.clientEmail}
                          onChange={(e) => handleChange('clientEmail', e.target.value)}
                          className="w-full pl-11 pr-4 py-3 border border-gray-200 bg-gray-50 text-gray-900 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#3B82F6] focus:border-transparent transition-all text-sm sm:text-base"
                          placeholder="email@exemplo.com"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Agendamento */}
              <div className="space-y-4 sm:space-y-5">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center shadow-lg">
                    <Calendar className="w-5 h-5 text-white" strokeWidth={1.5} />
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-gray-900">
                    Data e Horário
                  </h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Data *
                    </label>
                    <input
                      type="date"
                      required
                      value={formData.date}
                      onChange={(e) => handleChange('date', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-200 bg-gray-50 text-gray-900 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#3B82F6] focus:border-transparent transition-all text-sm sm:text-base"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Horário *
                    </label>
                    <div className="relative">
                      <Clock className="absolute left-4 top-3.5 w-4 h-4 text-gray-400" strokeWidth={1.5} />
                      <input
                        type="time"
                        required
                        value={formData.time}
                        onChange={(e) => handleChange('time', e.target.value)}
                        className="w-full pl-11 pr-4 py-3 border border-gray-200 bg-gray-50 text-gray-900 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#3B82F6] focus:border-transparent transition-all text-sm sm:text-base"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Serviço */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Tipo de Serviço *
                </label>
                <select
                  required
                  value={formData.service}
                  onChange={(e) => handleChange('service', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-200 bg-gray-50 text-gray-900 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#3B82F6] focus:border-transparent transition-all text-sm sm:text-base"
                >
                  <option value="">Selecione um serviço</option>
                  <option value="consultation">Consulta</option>
                  <option value="cleaning">Limpeza</option>
                  <option value="orthodontics">Ortodontia</option>
                  <option value="implant">Implante</option>
                  <option value="endodontics">Endodontia (Canal)</option>
                  <option value="periodontics">Periodontia</option>
                  <option value="prosthodontics">Prótese</option>
                  <option value="pediatric">Odontopediatria</option>
                  <option value="emergency">Emergência</option>
                </select>
              </div>

              {/* Observações */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                  <FileText className="w-4 h-4" strokeWidth={1.5} />
                  Observações
                </label>
                <textarea
                  value={formData.notes}
                  onChange={(e) => handleChange('notes', e.target.value)}
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-200 bg-gray-50 text-gray-900 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#3B82F6] focus:border-transparent transition-all resize-none text-sm sm:text-base"
                  placeholder="Adicione informações relevantes sobre o agendamento..."
                />
              </div>

              {/* Botões */}
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-4">
                <Button
                  type="button"
                  onClick={onClose}
                  className="flex-1 px-6 py-3 sm:py-4 border-2 border-gray-200 text-gray-700 font-semibold rounded-xl hover:bg-gray-50 hover:border-gray-300 transition-all text-sm sm:text-base"
                  {...(!isMobile && {
                    whileHover: { scale: 1.02 },
                    whileTap: { scale: 0.98 }
                  })}
                >
                  Cancelar
                </Button>
                <Button
                  type="submit"
                  className="flex-1 px-6 py-3 sm:py-4 bg-gradient-to-r from-[#1A365D] to-[#3B82F6] text-white font-semibold rounded-xl hover:shadow-2xl transition-all duration-300 text-sm sm:text-base"
                  {...(!isMobile && {
                    whileHover: { scale: 1.02, y: -2 },
                    whileTap: { scale: 0.98 }
                  })}
                >
                  Confirmar Agendamento
                </Button>
              </div>
            </form>
          </Container>
        </div>
      )}
    </AnimatePresence>
  );
};

export default AppointmentModal;
