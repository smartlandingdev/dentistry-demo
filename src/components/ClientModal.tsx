import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import type { Client, ClientInput } from "../services/api";
import toast from "react-hot-toast";

interface ClientModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (clientData: ClientInput) => Promise<void>;
  client?: Client | null;
  mode: "create" | "edit";
}

const ClientModal: React.FC<ClientModalProps> = ({
  isOpen,
  onClose,
  onSave,
  client,
  mode,
}) => {
  const [formData, setFormData] = useState<ClientInput>({
    nomewpp: "",
    telefone: "",
    email: "",
  });

  const [errors, setErrors] = useState<Partial<Record<keyof ClientInput, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (client && mode === "edit") {
      setFormData({
        nomewpp: client.nomewpp || "",
        telefone: client.telefone || "",
        email: client.email || "",
      });
    } else {
      setFormData({
        nomewpp: "",
        telefone: "",
        email: "",
      });
    }
    setErrors({});
  }, [client, mode, isOpen]);

  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof ClientInput, string>> = {};

    if (!formData.nomewpp.trim()) {
      newErrors.nomewpp = "Nome é obrigatório";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email é obrigatório";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Email inválido";
    }

    if (!formData.telefone.trim()) {
      newErrors.telefone = "Telefone é obrigatório";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      toast.error("Por favor, preencha os campos obrigatórios");
      return;
    }

    setIsSubmitting(true);

    try {
      await onSave(formData);
      onClose();
    } catch (error) {
      console.error("Error saving client:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error for this field
    if (errors[name as keyof ClientInput]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/50"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
          >
            {/* Header */}
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between rounded-t-2xl">
              <h2 className="text-2xl font-bold text-gray-900">
                {mode === "create" ? "Novo Paciente" : "Editar Paciente"}
              </h2>
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              {/* Nome */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nome <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="nomewpp"
                  value={formData.nomewpp}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3B82F6] ${
                    errors.nomewpp ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="Nome completo do paciente"
                />
                {errors.nomewpp && (
                  <p className="text-red-500 text-sm mt-1">{errors.nomewpp}</p>
                )}
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3B82F6] ${
                    errors.email ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="email@exemplo.com"
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                )}
              </div>

              {/* Telefone */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Telefone <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  name="telefone"
                  value={formData.telefone}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3B82F6] ${
                    errors.telefone ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="(00) 00000-0000"
                />
                {errors.telefone && (
                  <p className="text-red-500 text-sm mt-1">{errors.telefone}</p>
                )}
              </div>

              {/* Footer */}
              <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                  disabled={isSubmitting}
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-6 py-2 bg-gradient-to-r from-[#1A365D] to-[#3B82F6] text-white rounded-lg hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting
                    ? "Salvando..."
                    : mode === "create"
                    ? "Criar Paciente"
                    : "Salvar Alterações"}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default ClientModal;
