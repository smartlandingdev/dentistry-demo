import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { User, Lock, ArrowLeft, Sparkles } from 'lucide-react';

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/sistema');
  };

  const Container = isMobile ? 'div' : motion.div;
  const Button = isMobile ? 'button' : motion.button;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50 flex items-center justify-center px-4 sm:px-6 relative overflow-hidden">
      {/* Background Blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <Container
          className="absolute top-20 left-10 w-64 sm:w-96 h-64 sm:h-96 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30"
          {...(!isMobile && { animate: { scale: [1, 1.1, 1], opacity: [0.3, 0.4, 0.3] }, transition: { duration: 8, repeat: Infinity } })}
        />
        <Container
          className="absolute bottom-20 right-10 w-64 sm:w-96 h-64 sm:h-96 bg-indigo-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30"
          {...(!isMobile && { animate: { scale: [1, 1.15, 1], opacity: [0.3, 0.45, 0.3] }, transition: { duration: 10, repeat: Infinity, delay: 1 } })}
        />
      </div>

      <div className="w-full max-w-md relative z-10">
        {/* Logo/Título */}
        <div className="text-center mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold bg-gradient-to-r from-[#1A365D] to-[#3B82F6] bg-clip-text text-transparent mb-2">
            SmileCare
          </h1>
          <div className="flex items-center justify-center gap-2 text-gray-600 text-xs sm:text-sm">
            <Sparkles className="w-3 h-3 sm:w-4 sm:h-4" />
            <p>Bem-vindo de volta</p>
          </div>
        </div>

        {/* Card de Login */}
        <div className="bg-white/80 backdrop-blur-lg rounded-xl sm:rounded-2xl shadow-2xl border border-gray-100 p-5 sm:p-8">
          <form onSubmit={handleSubmit} className="space-y-5 sm:space-y-6">
            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-xs sm:text-sm font-semibold text-gray-900 mb-2">
                Email
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="h-4 w-4 text-gray-400" />
                </div>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-3 py-2.5 sm:py-3 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#3B82F6] focus:border-transparent transition-all"
                  placeholder="seu@email.com"
                />
              </div>
            </div>

            {/* Senha */}
            <div>
              <label htmlFor="password" className="block text-xs sm:text-sm font-semibold text-gray-900 mb-2">
                Senha
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-4 w-4 text-gray-400" />
                </div>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-3 py-2.5 sm:py-3 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#3B82F6] focus:border-transparent transition-all"
                  placeholder="••••••••"
                />
              </div>
            </div>

            {/* Esqueci a senha */}
            <div className="flex justify-end">
              <a href="#" className="text-xs text-gray-600 hover:text-[#3B82F6] transition-colors font-medium">
                Esqueci minha senha
              </a>
            </div>

            {/* Botão de Login */}
            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-[#1A365D] to-[#3B82F6] text-white py-2.5 sm:py-3 font-semibold text-sm rounded-lg hover:shadow-xl transition-all duration-300"
              {...(!isMobile && { whileHover: { scale: 1.02 }, whileTap: { scale: 0.98 } })}
            >
              Entrar
            </Button>
          </form>
        </div>

        {/* Voltar */}
        <div className="mt-5 sm:mt-6 text-center">
          <button
            onClick={() => navigate('/')}
            className="inline-flex items-center gap-2 text-xs text-gray-600 hover:text-gray-900 transition-colors font-medium"
          >
            <ArrowLeft className="w-3 h-3" />
            Voltar para o site
          </button>
        </div>
      </div>
    </div>
  );
}
