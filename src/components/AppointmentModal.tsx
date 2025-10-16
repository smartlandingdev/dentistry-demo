import React, { useState } from 'react';
import { X, Calendar, Clock, User, FileText, Phone, Mail } from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';
import { supabase } from '../lib/supabaseClient';

interface AppointmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (appointment: any) => void;
  selectedDate?: Date;
  selectedTime?: string;
  clientId?: number; // ID do cliente no Supabase
}

const AppointmentModal: React.FC<AppointmentModalProps> = ({
  isOpen,
  onClose,
  onSave,
  selectedDate,
  selectedTime,
  clientId
}) => {
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
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Step 1: Create booking via Cal.com API
      const calcomApiKey = import.meta.env.VITE_CALCOM_API_KEY || 'cal_live_92a5e5dc81f8eccaa3464ccd99f6c1b7';

      // Combine date and time to create ISO string for start time
      const startDateTime = new Date(`${formData.date}T${formData.time}:00`);
      const startISO = startDateTime.toISOString();

      const calcomPayload = {
        eventTypeId: 3473764,
        start: startISO,
        attendee: {
          name: formData.clientName,
          timeZone: "America/Sao_Paulo",
          email: formData.clientEmail,
          phoneNumber: formData.clientPhone,
          language: "pt-BR"
        }
      };

      const calcomResponse = await fetch('https://api.cal.com/v2/bookings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'cal-api-version': '2024-08-13',
          'Authorization': `Bearer ${calcomApiKey}`
        },
        body: JSON.stringify(calcomPayload)
      });

      if (!calcomResponse.ok) {
        const errorData = await calcomResponse.json().catch(() => ({}));
        console.error('Cal.com API Error:', errorData);
        throw new Error('Failed to schedule appointment with Cal.com');
      }

      const calcomData = await calcomResponse.json();
      console.log('Cal.com booking created:', calcomData);

      // Extract booking ID from response
      const bookingId = calcomData.data?.id || calcomData.id || '';

      // Step 2: Calculate end time (assuming 1 hour appointment)
      const endDateTime = new Date(startDateTime);
      endDateTime.setHours(endDateTime.getHours() + 1);
      const endTime = endDateTime.toTimeString().slice(0, 5); // Format: HH:MM

      // Step 3: Store booking in Supabase
      const { data: supabaseData, error: supabaseError } = await supabase
        .from('agendamentos')
        .insert({
          hora_inicio: formData.time,
          hora_fim: endTime,
          id_cliente: clientId || null,
          id_calendario: String(bookingId),
          cancelado: false
        })
        .select();

      if (supabaseError) {
        console.error('Supabase Error:', supabaseError);
        throw new Error('Failed to save booking to database');
      }

      console.log('Supabase record created:', supabaseData);

      // Success!
      toast.success('Appointment confirmed successfully!');
      onSave(formData);
      onClose();

      // Reset form
      setFormData({
        clientName: '',
        clientPhone: '',
        clientEmail: '',
        date: '',
        time: '',
        service: '',
        notes: '',
        status: 'pending'
      });

    } catch (error: any) {
      console.error('Booking error:', error);

      if (error.message.includes('Cal.com')) {
        toast.error('Failed to schedule appointment. Please try again.');
      } else if (error.message.includes('database')) {
        toast.error('Failed to save booking. Please contact support.');
      } else {
        toast.error('An unexpected error occurred. Please try again.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-[#1C1C1C]/50 backdrop-blur-sm"
        onClick={onClose}
      ></div>

      {/* Modal */}
      <div className="relative bg-[#F2EFEA] border border-[#1C1C1C]/20 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-[#E8E4DF] border-b border-[#1C1C1C]/20 p-6 flex justify-between items-center">
          <h2 className="text-2xl font-bold text-[#1C1C1C]">Novo Agendamento</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-[#D6CBB8] transition-colors"
          >
            <X className="w-5 h-5 text-[#1C1C1C]" strokeWidth={1.5} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Cliente */}
          <div>
            <h3 className="text-lg font-semibold text-[#1C1C1C] mb-4 flex items-center">
              <User className="w-5 h-5 mr-2" strokeWidth={1.5} />
              Informações do Paciente
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-[#1C1C1C] mb-2">
                  Nome Completo *
                </label>
                <input
                  type="text"
                  required
                  value={formData.clientName}
                  onChange={(e) => handleChange('clientName', e.target.value)}
                  className="w-full px-3 py-2 border border-[#1C1C1C]/20 bg-white text-[#1C1C1C] placeholder-[#A8A29E] focus:outline-none focus:border-[#1C1C1C]"
                  placeholder="Digite o nome do paciente"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-[#1C1C1C] mb-2">
                    Telefone *
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-2.5 w-4 h-4 text-[#A8A29E]" strokeWidth={1.5} />
                    <input
                      type="tel"
                      required
                      value={formData.clientPhone}
                      onChange={(e) => handleChange('clientPhone', e.target.value)}
                      className="w-full pl-10 pr-3 py-2 border border-[#1C1C1C]/20 bg-white text-[#1C1C1C] placeholder-[#A8A29E] focus:outline-none focus:border-[#1C1C1C]"
                      placeholder="(11) 98765-4321"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#1C1C1C] mb-2">
                    E-mail
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-2.5 w-4 h-4 text-[#A8A29E]" strokeWidth={1.5} />
                    <input
                      type="email"
                      value={formData.clientEmail}
                      onChange={(e) => handleChange('clientEmail', e.target.value)}
                      className="w-full pl-10 pr-3 py-2 border border-[#1C1C1C]/20 bg-white text-[#1C1C1C] placeholder-[#A8A29E] focus:outline-none focus:border-[#1C1C1C]"
                      placeholder="email@exemplo.com"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Agendamento */}
          <div>
            <h3 className="text-lg font-semibold text-[#1C1C1C] mb-4 flex items-center">
              <Calendar className="w-5 h-5 mr-2" strokeWidth={1.5} />
              Data e Horário
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-[#1C1C1C] mb-2">
                  Data *
                </label>
                <input
                  type="date"
                  required
                  value={formData.date}
                  onChange={(e) => handleChange('date', e.target.value)}
                  className="w-full px-3 py-2 border border-[#1C1C1C]/20 bg-white text-[#1C1C1C] focus:outline-none focus:border-[#1C1C1C]"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[#1C1C1C] mb-2">
                  Horário *
                </label>
                <div className="relative">
                  <Clock className="absolute left-3 top-2.5 w-4 h-4 text-[#A8A29E]" strokeWidth={1.5} />
                  <input
                    type="time"
                    required
                    value={formData.time}
                    onChange={(e) => handleChange('time', e.target.value)}
                    className="w-full pl-10 pr-3 py-2 border border-[#1C1C1C]/20 bg-white text-[#1C1C1C] focus:outline-none focus:border-[#1C1C1C]"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Serviço */}
          <div>
            <label className="block text-sm font-medium text-[#1C1C1C] mb-2">
              Tipo de Serviço *
            </label>
            <select
              required
              value={formData.service}
              onChange={(e) => handleChange('service', e.target.value)}
              className="w-full px-3 py-2 border border-[#1C1C1C]/20 bg-white text-[#1C1C1C] focus:outline-none focus:border-[#1C1C1C]"
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
            <label className="block text-sm font-medium text-[#1C1C1C] mb-2 flex items-center">
              <FileText className="w-4 h-4 mr-2" strokeWidth={1.5} />
              Observações
            </label>
            <textarea
              value={formData.notes}
              onChange={(e) => handleChange('notes', e.target.value)}
              rows={4}
              className="w-full px-3 py-2 border border-[#1C1C1C]/20 bg-white text-[#1C1C1C] placeholder-[#A8A29E] focus:outline-none focus:border-[#1C1C1C] resize-none"
              placeholder="Adicione informações relevantes sobre o agendamento..."
            />
          </div>

          {/* Botões */}
          <div className="flex gap-4 pt-4">
            <button
              type="button"
              onClick={onClose}
              disabled={isSubmitting}
              className="flex-1 px-6 py-3 border border-[#1C1C1C]/20 text-[#1C1C1C] font-medium hover:bg-[#E8E4DF] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 px-6 py-3 bg-[#1C1C1C] text-[#F2EFEA] font-medium hover:bg-[#A8A29E] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Scheduling...' : 'Agendar'}
            </button>
          </div>
        </form>
      </div>
      <Toaster position="top-right" />
    </div>
  );
};

export default AppointmentModal;
