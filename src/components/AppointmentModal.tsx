import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Calendar,
  Clock,
  User,
  FileText,
  Phone,
  Mail,
  Sparkles,
  ChevronDown,
} from "lucide-react";
import toast from "react-hot-toast";
import { supabase } from "../lib/supabaseClient";
import { apiService, type Client } from "../services/api";

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
  selectedTime,
}) => {
  const [isMobile, setIsMobile] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [clients, setClients] = useState<Client[]>([]);
  const [loadingClients, setLoadingClients] = useState(true);
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);
  const [clientSearchTerm, setClientSearchTerm] = useState("");
  const [showClientDropdown, setShowClientDropdown] = useState(false);
  const [formData, setFormData] = useState({
    clientId: 0,
    clientName: "",
    clientPhone: "",
    clientEmail: "",
    date: selectedDate ? selectedDate.toISOString().split("T")[0] : "",
    time: selectedTime || "",
    service: "",
    notes: "",
    status: "pending",
  });

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    const fetchClients = async () => {
      if (!isOpen) return;

      setLoadingClients(true);
      const response = await apiService.getClients();

      if (response.success && response.data) {
        setClients(response.data);
        console.log("📋 Loaded clients:", response.data.length);
      } else {
        console.error("❌ Failed to load clients:", response.error);
        toast.error("Failed to load client list");
      }

      setLoadingClients(false);
    };

    fetchClients();
  }, [isOpen]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest(".client-search-container")) {
        setShowClientDropdown(false);
      }
    };

    if (showClientDropdown) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showClientDropdown]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate client selection
    if (!selectedClient || !formData.clientId) {
      toast.error("Por favor, selecione um paciente da lista");
      return;
    }

    setIsSubmitting(true);

    try {
      // Get Cal.com API key from environment
      const calApiKey = import.meta.env.VITE_CALCOM_API_KEY;

      if (!calApiKey) {
        throw new Error("Cal.com API key not configured");
      }

      // Combine date and time to create ISO start time
      const startDateTime = new Date(`${formData.date}T${formData.time}`);
      const startISO = startDateTime.toISOString();

      // Calculate end time (assuming 1 hour duration)
      const endDateTime = new Date(startDateTime.getTime() + 60 * 60 * 1000);

      // Prepare Cal.com API payload
      const calcomPayload = {
        eventTypeId: 3473764,
        start: startISO,
        attendee: {
          name: formData.clientName,
          timeZone: "America/Sao_Paulo",
          email: formData.clientEmail || undefined,
          phoneNumber: formData.clientPhone,
          language: "pt-BR",
        },
      };

      console.log("📤 Sending booking request to Cal.com:", calcomPayload);

      // Make request to Cal.com API
      const calcomResponse = await fetch("https://api.cal.com/v2/bookings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "cal-api-version": "2024-08-13",
          Authorization: `Bearer ${calApiKey}`,
        },
        body: JSON.stringify(calcomPayload),
      });

      if (!calcomResponse.ok) {
        const errorData = await calcomResponse.json().catch(() => ({}));
        console.error("❌ Cal.com API Error:", errorData);
        throw new Error(
          `Cal.com API failed: ${calcomResponse.status} ${calcomResponse.statusText}`
        );
      }

      const calcomData = await calcomResponse.json();
      console.log("✅ Cal.com booking successful:", calcomData);

      // Extract booking ID from Cal.com response
      const bookingId = calcomData.data?.id || calcomData.id || "unknown";

      // Prepare Supabase payload with full timestamps
      const supabasePayload = {
        hora_inicio: startISO,
        hora_fim: endDateTime.toISOString(),
        id_cliente: formData.clientId,
        id_calendario: String(bookingId),
        cancelado: false,
      };

      console.log("📤 Inserting booking into Supabase:", supabasePayload);

      // Insert into Supabase
      const { data: supabaseData, error: supabaseError } = await supabase
        .from("agendamentos")
        .insert([supabasePayload])
        .select();

      if (supabaseError) {
        console.error("❌ Supabase Error:", supabaseError);
        throw new Error(`Supabase insertion failed: ${supabaseError.message}`);
      }

      console.log("✅ Supabase insertion successful:", supabaseData);

      // Show success message
      toast.success("Appointment confirmed successfully!");

      // Call parent onSave callback
      onSave(formData);

      // Close modal after brief delay
      setTimeout(() => {
        onClose();
      }, 500);
    } catch (error) {
      console.error("❌ Error creating appointment:", error);

      if (error instanceof Error) {
        if (error.message.includes("Cal.com")) {
          toast.error(
            "Failed to schedule appointment with Cal.com. Please try again."
          );
        } else if (error.message.includes("Supabase")) {
          toast.error(
            "Booking created but failed to save locally. Please contact support."
          );
        } else {
          toast.error(
            error.message || "Failed to create appointment. Please try again."
          );
        }
      } else {
        toast.error("An unexpected error occurred. Please try again.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleClientSelect = (client: Client, e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    setSelectedClient(client);
    setClientSearchTerm(client.nomewpp);
    setFormData((prev) => ({
      ...prev,
      clientId: client.id,
      clientName: client.nomewpp,
      clientPhone: client.telefone,
      clientEmail: client.email,
    }));
    setShowClientDropdown(false);
    console.log("✅ Selected client:", client);
  };

  const handleClientSearchChange = (value: string) => {
    setClientSearchTerm(value);
    setShowClientDropdown(true);

    // Clear selection if search term doesn't match selected client
    if (selectedClient && value !== selectedClient.nomewpp) {
      setSelectedClient(null);
      setFormData((prev) => ({
        ...prev,
        clientId: 0,
        clientName: "",
        clientPhone: "",
        clientEmail: "",
      }));
    }
  };

  const filteredClients = clients.filter((client) => {
    const term = clientSearchTerm.toLowerCase();
    return (
      (client.nomewpp && client.nomewpp.toLowerCase().includes(term)) ||
      (client.telefone && client.telefone.includes(term)) ||
      (client.email && client.email.toLowerCase().includes(term))
    );
  });

  const Container = isMobile ? "div" : motion.div;
  const Button = isMobile ? "button" : motion.button;

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
            className="relative bg-white rounded-2xl sm:rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] border border-gray-100 flex flex-col overflow-visible"
            {...(!isMobile && {
              initial: { opacity: 0, scale: 0.9, y: 20 },
              animate: { opacity: 1, scale: 1, y: 0 },
              exit: { opacity: 0, scale: 0.9, y: 20 },
              transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] },
            })}
          >
            {/* Header */}
            <div className="sticky top-0 bg-gradient-to-r from-[#1A365D] to-[#3B82F6] p-5 sm:p-6 flex justify-between items-center rounded-t-2xl sm:rounded-t-3xl z-10">
              <div className="flex items-center gap-2 sm:gap-3">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-white/20 backdrop-blur-lg rounded-xl sm:rounded-2xl flex items-center justify-center">
                  <Sparkles
                    className="w-5 h-5 sm:w-6 sm:h-6 text-white"
                    strokeWidth={1.5}
                  />
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-white">
                  Novo Agendamento
                </h2>
              </div>
              <Button
                onClick={onClose}
                className="p-2 sm:p-2.5 hover:bg-white/20 rounded-lg sm:rounded-xl transition-colors"
                {...(!isMobile && {
                  whileHover: { scale: 1.1, rotate: 90 },
                  whileTap: { scale: 0.9 },
                })}
              >
                <X
                  className="w-5 h-5 sm:w-6 sm:h-6 text-white"
                  strokeWidth={1.5}
                />
              </Button>
            </div>

            {/* Form */}
            <form
              onSubmit={handleSubmit}
              className="p-5 sm:p-6 md:p-8 space-y-6 sm:space-y-8 overflow-y-auto"
            >
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
                  {/* Client Search/Select Dropdown */}
                  <div className="relative client-search-container">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Paciente *
                    </label>
                    <div className="relative">
                      <User
                        className="absolute left-4 top-3.5 w-4 h-4 text-gray-400"
                        strokeWidth={1.5}
                      />
                      <input
                        type="text"
                        required
                        value={clientSearchTerm}
                        onChange={(e) =>
                          handleClientSearchChange(e.target.value)
                        }
                        onFocus={() => setShowClientDropdown(true)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            e.preventDefault();
                          }
                        }}
                        placeholder={
                          loadingClients
                            ? "Carregando pacientes..."
                            : "Buscar ou selecionar paciente"
                        }
                        disabled={loadingClients}
                        className="w-full pl-11 pr-10 py-3 border border-gray-200 bg-gray-50 text-gray-900 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#3B82F6] focus:border-transparent transition-all text-sm sm:text-base disabled:opacity-50"
                      />
                      <ChevronDown
                        className="absolute right-4 top-3.5 w-4 h-4 text-gray-400"
                        strokeWidth={1.5}
                      />
                    </div>

                    {/* Dropdown List */}
                    {showClientDropdown &&
                      !loadingClients &&
                      filteredClients.length > 0 && (
                        <div className="w-full mt-2 bg-white border border-gray-200 rounded-xl shadow-2xl max-h-60 overflow-y-auto">
                          {filteredClients.map((client) => (
                            <button
                              key={client.id}
                              type="button"
                              onMouseDown={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                handleClientSelect(client, e);
                              }}
                              className="w-full px-4 py-3 text-left hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-b-0"
                            >
                              <div className="font-semibold text-gray-900 text-sm">
                                {client.nomewpp}
                              </div>
                              <div className="text-xs text-gray-500 mt-1">
                                {client.telefone} • {client.email}
                              </div>
                            </button>
                          ))}
                        </div>
                      )}

                    {/* No results message */}
                    {showClientDropdown &&
                      !loadingClients &&
                      clientSearchTerm &&
                      filteredClients.length === 0 && (
                        <div className="w-full mt-2 bg-white border border-gray-200 rounded-xl shadow-2xl p-4 text-center text-gray-500 text-sm">
                          Nenhum paciente encontrado
                        </div>
                      )}

                    {/* Selected client indicator */}
                    {selectedClient && (
                      <div className="mt-2 p-3 bg-green-50 border border-green-200 rounded-lg">
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                          <span className="text-sm font-medium text-green-800">
                            Paciente selecionado: {selectedClient.nomewpp}
                          </span>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Phone and Email - Auto-filled from selected client */}
                  {selectedClient && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Telefone
                        </label>
                        <div className="relative">
                          <Phone
                            className="absolute left-4 top-3.5 w-4 h-4 text-gray-400"
                            strokeWidth={1.5}
                          />
                          <input
                            type="tel"
                            value={formData.clientPhone}
                            readOnly
                            className="w-full pl-11 pr-4 py-3 border border-gray-200 bg-gray-100 text-gray-700 rounded-xl text-sm sm:text-base cursor-not-allowed"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          E-mail
                        </label>
                        <div className="relative">
                          <Mail
                            className="absolute left-4 top-3.5 w-4 h-4 text-gray-400"
                            strokeWidth={1.5}
                          />
                          <input
                            type="email"
                            value={formData.clientEmail}
                            readOnly
                            className="w-full pl-11 pr-4 py-3 border border-gray-200 bg-gray-100 text-gray-700 rounded-xl text-sm sm:text-base cursor-not-allowed"
                          />
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Agendamento */}
              <div className="space-y-4 sm:space-y-5">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center shadow-lg">
                    <Calendar
                      className="w-5 h-5 text-white"
                      strokeWidth={1.5}
                    />
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
                      onChange={(e) => handleChange("date", e.target.value)}
                      className="w-full px-4 py-3 border border-gray-200 bg-gray-50 text-gray-900 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#3B82F6] focus:border-transparent transition-all text-sm sm:text-base"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Horário *
                    </label>
                    <div className="relative">
                      <Clock
                        className="absolute left-4 top-3.5 w-4 h-4 text-gray-400"
                        strokeWidth={1.5}
                      />
                      <input
                        type="time"
                        required
                        value={formData.time}
                        onChange={(e) => handleChange("time", e.target.value)}
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
                  onChange={(e) => handleChange("service", e.target.value)}
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
                  onChange={(e) => handleChange("notes", e.target.value)}
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
                    whileTap: { scale: 0.98 },
                  })}
                >
                  Cancelar
                </Button>
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 px-6 py-3 sm:py-4 bg-gradient-to-r from-[#1A365D] to-[#3B82F6] text-white font-semibold rounded-xl hover:shadow-2xl transition-all duration-300 text-sm sm:text-base disabled:opacity-50 disabled:cursor-not-allowed"
                  {...(!isMobile && {
                    whileHover: isSubmitting ? {} : { scale: 1.02, y: -2 },
                    whileTap: isSubmitting ? {} : { scale: 0.98 },
                  })}
                >
                  {isSubmitting ? "Scheduling..." : "Confirmar Agendamento"}
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
