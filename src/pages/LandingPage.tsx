import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import backgroundImg from '../assets/background.jpg';
import clinicaImg from '../assets/clinica.jpg';
import neodentLogo from '../assets/neodente.png';
import straumannLogo from '../assets/strauman.png';
import odontoLogo from '../assets/odonto.png';
import envistaLogo from '../assets/envista.png';
import dabiLogo from '../assets/dabi.png';
import heraeusLogo from '../assets/heraeus.png';

export default function LandingPage() {
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-[#F2EFEA] font-sans">
      {/* Header */}
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-[#F2EFEA]/95 backdrop-blur-sm shadow-md' : 'bg-transparent'
      }`}>
        <div className="max-w-7xl mx-auto px-6 py-5 flex justify-between items-center">
          <h1 className="text-2xl font-semibold text-[#1C1C1C]">SmileCare</h1>
          <button
            onClick={() => navigate('/sistema')}
            className="text-sm text-[#1C1C1C] hover:text-[#A8A29E] transition-colors px-4 py-2"
          >
            Login
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden" style={{ height: '110vh' }}>
        {/* Background Image with Gradient Mask */}
        <div className="absolute inset-0">
          <img
            src={backgroundImg}
            alt="Consultório odontológico moderno"
            className="w-full h-full object-cover"
            style={{
              maskImage: 'linear-gradient(135deg, transparent 0%, transparent 50%, rgba(0,0,0,0.1) 55%, rgba(0,0,0,0.3) 65%, rgba(0,0,0,0.5) 75%, rgba(0,0,0,0.8) 85%, black 95%)',
              WebkitMaskImage: 'linear-gradient(135deg, transparent 0%, transparent 50%, rgba(0,0,0,0.1) 55%, rgba(0,0,0,0.3) 65%, rgba(0,0,0,0.5) 75%, rgba(0,0,0,0.8) 85%, black 95%)',
              objectPosition: 'left center',
            }}
          />
          {/* Gradient overlay at top */}
          <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-[#F2EFEA] to-transparent"></div>
          {/* Gradient overlay at bottom */}
          <div className="absolute inset-x-0 bottom-0 h-96 bg-gradient-to-t from-[#F2EFEA] to-transparent"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 h-full flex flex-col">
          <div className="flex-1 flex items-center px-6">
            <div className="max-w-7xl mx-auto w-full">
              <div className="max-w-2xl space-y-8">
                <div className="space-y-4">
                  <h2 className="text-5xl md:text-6xl font-bold text-[#1C1C1C] leading-tight">
                    O cuidado que você merece
                  </h2>
                  <p className="text-xl text-[#A8A29E] leading-relaxed">
                    Tecnologia e conforto para o seu sorriso perfeito
                  </p>
                </div>
                <button
                  onClick={() => navigate('/sistema')}
                  className="bg-[#1C1C1C] text-[#F2EFEA] px-12 py-5 text-lg font-medium rounded-lg hover:bg-[#A8A29E] transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                >
                  Agendar um horário
                </button>
              </div>
            </div>
          </div>

          {/* Faixa de Marcas */}
          <div className="relative py-8 border-y border-[#1C1C1C]/20">
            <div className="flex items-center justify-center gap-12 px-6">
              <img src={neodentLogo} alt="Neodent" className="h-8 object-contain grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all" />
              <img src={straumannLogo} alt="Straumann Group" className="h-8 object-contain grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all" />
              <img src={odontoLogo} alt="OdontoCompany" className="h-8 object-contain grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all" />
              <img src={envistaLogo} alt="Envista" className="h-8 object-contain grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all" />
              <img src={dabiLogo} alt="Dabi Atlante" className="h-8 object-contain grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all" />
              <img src={heraeusLogo} alt="Heraeus Kulzer" className="h-8 object-contain grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all" />
            </div>
          </div>
        </div>
      </section>

      {/* Sobre a Clínica */}
      <section className="relative py-20 bg-[#F2EFEA]">
        <div className="grid md:grid-cols-2">
          <div className="relative">
            <img
              src={clinicaImg}
              alt="Espaço da clínica"
              className="w-full h-full min-h-[500px] object-cover"
              style={{
                maskImage: 'linear-gradient(135deg, black 0%, rgba(0,0,0,0.9) 30%, rgba(0,0,0,0.6) 50%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0.1) 85%, transparent 100%)',
                WebkitMaskImage: 'linear-gradient(135deg, black 0%, rgba(0,0,0,0.9) 30%, rgba(0,0,0,0.6) 50%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0.1) 85%, transparent 100%)',
              }}
            />
          </div>
          <div className="flex items-center px-6 md:px-12">
            <div className="space-y-6">
              <h3 className="text-4xl font-bold text-[#1C1C1C]">
                Sobre a SmileCare
              </h3>
              <p className="text-lg text-[#A8A29E] leading-relaxed">
                Há mais de 10 anos cuidando de sorrisos com carinho e profissionalismo.
                Nossa missão é proporcionar experiências odontológicas que vão além do tratamento,
                criando relações de confiança e bem-estar com cada paciente.
              </p>
              <ul className="space-y-3">
                <li className="flex items-start gap-3 text-[#1C1C1C]">
                  <span className="text-[#A8A29E] mt-1">•</span>
                  <span>Atendimento personalizado</span>
                </li>
                <li className="flex items-start gap-3 text-[#1C1C1C]">
                  <span className="text-[#A8A29E] mt-1">•</span>
                  <span>Equipamentos modernos</span>
                </li>
                <li className="flex items-start gap-3 text-[#1C1C1C]">
                  <span className="text-[#A8A29E] mt-1">•</span>
                  <span>Profissionais especializados</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Diferenciais */}
      <section className="py-20 px-6 bg-[#E8E4DF]">
        <div className="max-w-6xl mx-auto">
          <h3 className="text-4xl font-bold text-[#1C1C1C] text-center mb-16">
            Por que escolher a SmileCare?
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center space-y-4">
              <div className="text-4xl">📅</div>
              <h4 className="text-xl font-semibold text-[#1C1C1C]">Agendamento 100% online</h4>
              <p className="text-[#A8A29E]">Marque sua consulta de forma rápida e prática</p>
            </div>
            <div className="text-center space-y-4">
              <div className="text-4xl">🦷</div>
              <h4 className="text-xl font-semibold text-[#1C1C1C]">Tecnologia de ponta</h4>
              <p className="text-[#A8A29E]">Equipamentos modernos em estética dental</p>
            </div>
            <div className="text-center space-y-4">
              <div className="text-4xl">💬</div>
              <h4 className="text-xl font-semibold text-[#1C1C1C]">Atendimento humanizado</h4>
              <p className="text-[#A8A29E]">Cuidado personalizado e acolhedor</p>
            </div>
            <div className="text-center space-y-4">
              <div className="text-4xl">💡</div>
              <h4 className="text-xl font-semibold text-[#1C1C1C]">Ambiente moderno</h4>
              <p className="text-[#A8A29E]">Espaço confortável e acolhedor</p>
            </div>
          </div>
        </div>
      </section>

      {/* Como Funciona */}
      <section className="py-20 px-6 bg-[#F2EFEA]">
        <div className="max-w-5xl mx-auto">
          <h3 className="text-4xl font-bold text-[#1C1C1C] text-center mb-16">
            Como funciona
          </h3>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-[#D6CBB8] rounded-full flex items-center justify-center mx-auto text-2xl font-bold text-[#1C1C1C]">
                1
              </div>
              <h4 className="text-xl font-semibold text-[#1C1C1C]">Escolha o horário ideal</h4>
              <p className="text-[#A8A29E]">Agende online no melhor momento para você</p>
            </div>
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-[#D6CBB8] rounded-full flex items-center justify-center mx-auto text-2xl font-bold text-[#1C1C1C]">
                2
              </div>
              <h4 className="text-xl font-semibold text-[#1C1C1C]">Faça sua avaliação inicial</h4>
              <p className="text-[#A8A29E]">Conheça nossa equipe e receba um diagnóstico completo</p>
            </div>
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-[#D6CBB8] rounded-full flex items-center justify-center mx-auto text-2xl font-bold text-[#1C1C1C]">
                3
              </div>
              <h4 className="text-xl font-semibold text-[#1C1C1C]">Volte a sorrir com confiança</h4>
              <p className="text-[#A8A29E]">Receba o tratamento ideal para seu sorriso</p>
            </div>
          </div>
        </div>
      </section>

      {/* Equipe */}
      <section className="py-20 px-6 bg-[#E8E4DF]">
        <div className="max-w-6xl mx-auto">
          <h3 className="text-4xl font-bold text-[#1C1C1C] text-center mb-4">
            Nossa equipe
          </h3>
          <p className="text-center text-[#A8A29E] mb-16 max-w-2xl mx-auto">
            Profissionais experientes e dedicados ao seu bem-estar
          </p>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-[#F2EFEA] rounded-2xl overflow-hidden shadow-lg">
              <img
                src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&q=80"
                alt="Dra. Maria Silva"
                className="w-full h-64 object-cover"
              />
              <div className="p-6 text-center">
                <h4 className="text-xl font-semibold text-[#1C1C1C]">Dra. Maria Silva</h4>
                <p className="text-[#A8A29E] mt-2">Especialista em Ortodontia</p>
              </div>
            </div>
            <div className="bg-[#F2EFEA] rounded-2xl overflow-hidden shadow-lg">
              <img
                src="https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&q=80"
                alt="Dr. João Santos"
                className="w-full h-64 object-cover"
              />
              <div className="p-6 text-center">
                <h4 className="text-xl font-semibold text-[#1C1C1C]">Dr. João Santos</h4>
                <p className="text-[#A8A29E] mt-2">Implantodontista</p>
              </div>
            </div>
            <div className="bg-[#F2EFEA] rounded-2xl overflow-hidden shadow-lg">
              <img
                src="https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=400&q=80"
                alt="Dra. Ana Costa"
                className="w-full h-64 object-cover"
              />
              <div className="p-6 text-center">
                <h4 className="text-xl font-semibold text-[#1C1C1C]">Dra. Ana Costa</h4>
                <p className="text-[#A8A29E] mt-2">Odontopediatria</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Depoimentos */}
      <section className="py-20 px-6 bg-[#F2EFEA]">
        <div className="max-w-5xl mx-auto">
          <h3 className="text-4xl font-bold text-[#1C1C1C] text-center mb-16">
            O que nossos pacientes dizem
          </h3>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <div className="text-4xl text-[#D6CBB8] mb-4">"</div>
              <p className="text-[#A8A29E] mb-6">
                Atendimento excepcional! A equipe é super atenciosa e o resultado ficou perfeito.
              </p>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-[#D6CBB8] rounded-full"></div>
                <div>
                  <p className="font-semibold text-[#1C1C1C]">Carlos Mendes</p>
                  <p className="text-sm text-[#A8A29E]">Paciente desde 2022</p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <div className="text-4xl text-[#D6CBB8] mb-4">"</div>
              <p className="text-[#A8A29E] mb-6">
                Ambiente acolhedor e profissionais extremamente qualificados. Recomendo!
              </p>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-[#D6CBB8] rounded-full"></div>
                <div>
                  <p className="font-semibold text-[#1C1C1C]">Julia Oliveira</p>
                  <p className="text-sm text-[#A8A29E]">Paciente desde 2021</p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <div className="text-4xl text-[#D6CBB8] mb-4">"</div>
              <p className="text-[#A8A29E] mb-6">
                Transformaram meu sorriso! Sempre cuidadosos e atenciosos em cada detalhe.
              </p>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-[#D6CBB8] rounded-full"></div>
                <div>
                  <p className="font-semibold text-[#1C1C1C]">Roberto Lima</p>
                  <p className="text-sm text-[#A8A29E]">Paciente desde 2020</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Localização e Contato */}
      <section className="py-20 px-6 bg-[#E8E4DF]">
        <div className="max-w-6xl mx-auto">
          <h3 className="text-4xl font-bold text-[#1C1C1C] text-center mb-16">
            Venha nos visitar
          </h3>
          <div className="grid md:grid-cols-2 gap-12">
            <div className="space-y-6">
              <div>
                <h4 className="text-xl font-semibold text-[#1C1C1C] mb-3">📍 Endereço</h4>
                <p className="text-[#A8A29E]">Av. Paulista, 1000 - Bela Vista<br />São Paulo - SP, 01310-100</p>
              </div>
              <div>
                <h4 className="text-xl font-semibold text-[#1C1C1C] mb-3">📞 Contato</h4>
                <p className="text-[#A8A29E]">
                  Tel: (11) 3456-7890<br />
                  WhatsApp: (11) 98765-4321<br />
                  Email: contato@smilecare.com.br
                </p>
              </div>
              <div>
                <h4 className="text-xl font-semibold text-[#1C1C1C] mb-3">🕐 Horário de funcionamento</h4>
                <p className="text-[#A8A29E]">
                  Segunda a Sexta: 8h às 19h<br />
                  Sábado: 8h às 13h
                </p>
              </div>
              <button
                onClick={() => navigate('/sistema')}
                className="bg-[#1C1C1C] text-[#F2EFEA] px-10 py-4 text-lg font-medium rounded-lg hover:bg-[#A8A29E] transition-all duration-300 shadow-lg"
              >
                Agendar agora
              </button>
            </div>
            <div className="rounded-2xl overflow-hidden shadow-xl h-[400px] bg-[#D6CBB8]">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3657.1975779524226!2d-46.656874684605!3d-23.561414984684654!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94ce59c8da0aa315%3A0xd59f9431f2c9776a!2sAv.%20Paulista%2C%201000%20-%20Bela%20Vista%2C%20S%C3%A3o%20Paulo%20-%20SP!5e0!3m2!1spt-BR!2sbr!4v1234567890123!5m2!1spt-BR!2sbr"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 bg-[#1C1C1C]">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div>
              <h4 className="text-xl font-semibold text-[#F2EFEA] mb-4">SmileCare</h4>
              <p className="text-[#A8A29E]">Cuidando do seu sorriso com excelência e dedicação.</p>
            </div>
            <div>
              <h4 className="text-lg font-semibold text-[#F2EFEA] mb-4">Links rápidos</h4>
              <ul className="space-y-2 text-[#A8A29E]">
                <li><a href="#" className="hover:text-[#F2EFEA] transition-colors">Política de privacidade</a></li>
                <li><a href="#" className="hover:text-[#F2EFEA] transition-colors">Termos de uso</a></li>
                <li><a href="#" className="hover:text-[#F2EFEA] transition-colors">Contato</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold text-[#F2EFEA] mb-4">Redes sociais</h4>
              <div className="flex gap-4 text-[#A8A29E]">
                <a href="#" className="hover:text-[#F2EFEA] transition-colors">Instagram</a>
                <a href="#" className="hover:text-[#F2EFEA] transition-colors">Facebook</a>
              </div>
            </div>
          </div>
          <div className="border-t border-[#A8A29E]/30 pt-8 text-center">
            <p className="text-sm text-[#A8A29E]">
              © 2025 SmileCare. Todos os direitos reservados.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
