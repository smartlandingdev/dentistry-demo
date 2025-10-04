import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Lock } from 'lucide-react';

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Aqui você adicionaria a lógica de autenticação
    navigate('/sistema');
  };

  return (
    <div className="min-h-screen bg-[#F2EFEA] flex items-center justify-center px-6">
      <div className="w-full max-w-md">
        {/* Logo/Título */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-[#1C1C1C] mb-3">SmileCare</h1>
          <p className="text-[#A8A29E]">Acesse sua conta</p>
        </div>

        {/* Card de Login */}
        <div className="bg-[#E8E4DF] border border-[#1C1C1C]/20 p-10">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-[#1C1C1C] mb-2">
                Email
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-[#A8A29E]" strokeWidth={1.5} />
                </div>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-[#F2EFEA] border border-[#1C1C1C]/20 text-[#1C1C1C] placeholder-[#A8A29E] focus:outline-none focus:border-[#1C1C1C] transition-colors"
                  placeholder="seu@email.com"
                />
              </div>
            </div>

            {/* Senha */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-[#1C1C1C] mb-2">
                Senha
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-[#A8A29E]" strokeWidth={1.5} />
                </div>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-[#F2EFEA] border border-[#1C1C1C]/20 text-[#1C1C1C] placeholder-[#A8A29E] focus:outline-none focus:border-[#1C1C1C] transition-colors"
                  placeholder="••••••••"
                />
              </div>
            </div>

            {/* Esqueci a senha */}
            <div className="flex justify-end">
              <a href="#" className="text-sm text-[#A8A29E] hover:text-[#1C1C1C] transition-colors">
                Esqueci minha senha
              </a>
            </div>

            {/* Botão de Login */}
            <button
              type="submit"
              className="w-full bg-[#1C1C1C] text-[#F2EFEA] py-3 font-medium hover:bg-[#A8A29E] transition-all duration-300"
            >
              Entrar
            </button>
          </form>
        </div>

        {/* Voltar */}
        <div className="mt-8 text-center">
          <button
            onClick={() => navigate('/')}
            className="text-sm text-[#A8A29E] hover:text-[#1C1C1C] transition-colors"
          >
            ← Voltar para o site
          </button>
        </div>
      </div>
    </div>
  );
}
