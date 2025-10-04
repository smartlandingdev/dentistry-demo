import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Calendar, Sparkles, MessageCircle, Home, MapPin, Phone, Clock, User } from 'lucide-react';
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
      {/* WhatsApp Flutuante */}
      <a
        href="https://wa.me/5511987654321"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 bg-[#25D366] text-white p-4 rounded-full shadow-lg hover:bg-[#20BA5A] transition-all duration-300 hover:scale-110"
      >
        <MessageCircle className="w-6 h-6" fill="currentColor" strokeWidth={0} />
      </a>

      {/* Header */}
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-[#F2EFEA]/95 backdrop-blur-sm shadow-md' : 'bg-transparent'
      }`}>
        <div className="max-w-7xl mx-auto px-6 py-5 flex justify-between items-center">
          <h1 className="text-2xl font-semibold text-[#1C1C1C]">SmileCare</h1>
          <nav className="hidden md:flex items-center gap-8">
            <a href="#sobre" className="text-sm text-[#1C1C1C] hover:text-[#A8A29E] transition-colors">Sobre</a>
            <a href="#diferenciais" className="text-sm text-[#1C1C1C] hover:text-[#A8A29E] transition-colors">Diferenciais</a>
            <a href="#como-funciona" className="text-sm text-[#1C1C1C] hover:text-[#A8A29E] transition-colors">Como funciona</a>
            <a href="#equipe" className="text-sm text-[#1C1C1C] hover:text-[#A8A29E] transition-colors">Equipe</a>
            <a href="#depoimentos" className="text-sm text-[#1C1C1C] hover:text-[#A8A29E] transition-colors">Depoimentos</a>
            <a href="#contato" className="text-sm text-[#1C1C1C] hover:text-[#A8A29E] transition-colors">Contato</a>
            <button
              onClick={() => navigate('/login')}
              className="text-[#1C1C1C] hover:text-[#A8A29E] transition-colors p-2"
            >
              <User className="w-5 h-5" strokeWidth={1.5} />
            </button>
          </nav>
          <button
            onClick={() => navigate('/login')}
            className="md:hidden text-[#1C1C1C] hover:text-[#A8A29E] transition-colors p-2"
          >
            <User className="w-5 h-5" strokeWidth={1.5} />
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
      <section id="sobre" className="relative bg-[#F2EFEA]">
        <div className="grid md:grid-cols-2 min-h-[600px]">
          <div className="relative h-full">
            <img
              src={clinicaImg}
              alt="Espaço da clínica"
              className="absolute inset-0 w-full h-full object-cover"
              style={{
                maskImage: 'linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.3) 20%, rgba(0,0,0,0.7) 35%, black 50%, rgba(0,0,0,0.7) 65%, rgba(0,0,0,0.3) 80%, transparent 100%), linear-gradient(to right, black 0%, rgba(0,0,0,0.95) 25%, rgba(0,0,0,0.8) 45%, rgba(0,0,0,0.5) 65%, rgba(0,0,0,0.2) 85%, transparent 100%)',
                WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.3) 20%, rgba(0,0,0,0.7) 35%, black 50%, rgba(0,0,0,0.7) 65%, rgba(0,0,0,0.3) 80%, transparent 100%), linear-gradient(to right, black 0%, rgba(0,0,0,0.95) 25%, rgba(0,0,0,0.8) 45%, rgba(0,0,0,0.5) 65%, rgba(0,0,0,0.2) 85%, transparent 100%)',
                maskComposite: 'intersect',
                WebkitMaskComposite: 'source-in',
              }}
            />
          </div>
          <div className="flex items-center px-6 md:px-12 py-20">
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
      <section id="diferenciais" className="relative py-32 px-6 overflow-hidden min-h-[700px] flex items-center bg-[#E8E4DF]">
        {/* Degradês nas bordas */}
        <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-[#F2EFEA] to-transparent"></div>
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#F2EFEA] to-transparent"></div>

        <div className="max-w-6xl mx-auto relative z-10">
          <h3 className="text-4xl font-bold text-[#1C1C1C] text-center mb-16">
            Por que escolher a SmileCare?
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center space-y-4">
              <div className="flex justify-center">
                <Calendar className="w-12 h-12 text-[#1C1C1C]" strokeWidth={1.5} />
              </div>
              <h4 className="text-xl font-semibold text-[#1C1C1C]">Agendamento 100% online</h4>
              <p className="text-[#A8A29E]">Marque sua consulta de forma rápida e prática</p>
            </div>
            <div className="text-center space-y-4">
              <div className="flex justify-center">
                <Sparkles className="w-12 h-12 text-[#1C1C1C]" strokeWidth={1.5} />
              </div>
              <h4 className="text-xl font-semibold text-[#1C1C1C]">Tecnologia de ponta</h4>
              <p className="text-[#A8A29E]">Equipamentos modernos em estética dental</p>
            </div>
            <div className="text-center space-y-4">
              <div className="flex justify-center">
                <MessageCircle className="w-12 h-12 text-[#1C1C1C]" strokeWidth={1.5} />
              </div>
              <h4 className="text-xl font-semibold text-[#1C1C1C]">Atendimento humanizado</h4>
              <p className="text-[#A8A29E]">Cuidado personalizado e acolhedor</p>
            </div>
            <div className="text-center space-y-4">
              <div className="flex justify-center">
                <Home className="w-12 h-12 text-[#1C1C1C]" strokeWidth={1.5} />
              </div>
              <h4 className="text-xl font-semibold text-[#1C1C1C]">Ambiente moderno</h4>
              <p className="text-[#A8A29E]">Espaço confortável e acolhedor</p>
            </div>
          </div>
        </div>
      </section>

      {/* Como Funciona */}
      <section id="como-funciona" className="relative py-20 px-6 overflow-hidden min-h-[600px]">
        {/* Cor base à esquerda */}
        <div className="absolute inset-0 bg-[#F2EFEA]"></div>

        {/* Imagem à direita com degradê vertical e horizontal */}
        <div className="absolute inset-0">
          <img
            src="https://ipfinstituto.com/wp-content/uploads/2021/12/em-um-dentista-com-um-sorriso-1024x683.webp"
            alt="Sorriso"
            className="absolute right-0 w-1/2 h-full object-cover"
            style={{
              maskImage: 'linear-gradient(to right, transparent 0%, rgba(0,0,0,0.2) 50%, rgba(0,0,0,0.4) 60%, rgba(0,0,0,0.6) 70%, rgba(0,0,0,0.8) 80%, black 90%), linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.3) 15%, black 30%, black 70%, rgba(0,0,0,0.3) 85%, transparent 100%)',
              WebkitMaskImage: 'linear-gradient(to right, transparent 0%, rgba(0,0,0,0.2) 50%, rgba(0,0,0,0.4) 60%, rgba(0,0,0,0.6) 70%, rgba(0,0,0,0.8) 80%, black 90%), linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.3) 15%, black 30%, black 70%, rgba(0,0,0,0.3) 85%, transparent 100%)',
              maskComposite: 'intersect',
              WebkitMaskComposite: 'source-in',
            }}
          />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto">
          <h3 className="text-4xl font-bold text-[#1C1C1C] text-center mb-16">
            Como funciona
          </h3>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center space-y-4">
              <div className="text-5xl font-bold text-[#1C1C1C] mb-4">
                1
              </div>
              <h4 className="text-xl font-semibold text-[#1C1C1C]">Escolha o horário ideal</h4>
              <p className="text-[#A8A29E]">Agende online no melhor momento para você</p>
            </div>
            <div className="text-center space-y-4">
              <div className="text-5xl font-bold text-[#1C1C1C] mb-4">
                2
              </div>
              <h4 className="text-xl font-semibold text-[#1C1C1C]">Faça sua avaliação inicial</h4>
              <p className="text-[#A8A29E]">Conheça nossa equipe e receba um diagnóstico completo</p>
            </div>
            <div className="text-center space-y-4">
              <div className="text-5xl font-bold text-[#1C1C1C] mb-4">
                3
              </div>
              <h4 className="text-xl font-semibold text-[#1C1C1C]">Volte a sorrir com confiança</h4>
              <p className="text-[#A8A29E]">Receba o tratamento ideal para seu sorriso</p>
            </div>
          </div>
        </div>
      </section>

      {/* Equipe */}
      <section id="equipe" className="relative py-32 px-6 bg-[#E8E4DF] overflow-hidden min-h-[800px] flex items-center">
        {/* Degradês nas bordas */}
        <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-[#F2EFEA] to-transparent"></div>
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#F2EFEA] to-transparent"></div>

        <div className="max-w-7xl mx-auto relative z-10 w-full">
          <h3 className="text-4xl md:text-5xl font-bold text-[#1C1C1C] text-center mb-6">
            Nossa equipe
          </h3>
          <p className="text-center text-[#A8A29E] text-lg mb-20 max-w-2xl mx-auto">
            Profissionais experientes e dedicados ao seu bem-estar
          </p>
          <div className="grid md:grid-cols-3 gap-16">
            <div className="text-center border border-[#1C1C1C]/20 p-6">
              <div className="overflow-hidden mb-6">
                <img
                  src="https://images.unsplash.com/photo-1614608682850-e0d6ed316d47?w=600&q=80"
                  alt="Dra. Maria Silva"
                  className="w-full h-80 object-cover"
                />
              </div>
              <h4 className="text-xl font-semibold text-[#1C1C1C] mb-2">Dra. Maria Silva</h4>
              <p className="text-[#A8A29E]">Ortodontia</p>
              <p className="text-[#A8A29E] text-sm mt-1">CRO-SP 45678</p>
            </div>
            <div className="text-center border border-[#1C1C1C]/20 p-6">
              <div className="overflow-hidden mb-6">
                <img
                  src="https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=600&q=80"
                  alt="Dr. João Santos"
                  className="w-full h-80 object-cover"
                />
              </div>
              <h4 className="text-xl font-semibold text-[#1C1C1C] mb-2">Dr. João Santos</h4>
              <p className="text-[#A8A29E]">Implantodontia</p>
              <p className="text-[#A8A29E] text-sm mt-1">CRO-SP 32145</p>
            </div>
            <div className="text-center border border-[#1C1C1C]/20 p-6">
              <div className="overflow-hidden mb-6">
                <img
                  src="https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=600&q=80"
                  alt="Dra. Ana Costa"
                  className="w-full h-80 object-cover"
                />
              </div>
              <h4 className="text-xl font-semibold text-[#1C1C1C] mb-2">Dra. Ana Costa</h4>
              <p className="text-[#A8A29E]">Odontopediatria</p>
              <p className="text-[#A8A29E] text-sm mt-1">CRO-SP 56789</p>
            </div>
            <div className="text-center border border-[#1C1C1C]/20 p-6">
              <div className="overflow-hidden mb-6">
                <img
                  src="https://img.freepik.com/fotos-premium/o-doutor-moderno-consideravel-novo-em-um-vestido-medico-branco-esta-no-estudio-em-um-branco-estagiario-de-uma-universidade-medica_91014-3101.jpg"
                  alt="Dr. Carlos Mendes"
                  className="w-full h-80 object-cover"
                />
              </div>
              <h4 className="text-xl font-semibold text-[#1C1C1C] mb-2">Dr. Carlos Mendes</h4>
              <p className="text-[#A8A29E]">Periodontia</p>
              <p className="text-[#A8A29E] text-sm mt-1">CRO-SP 67890</p>
            </div>
            <div className="text-center border border-[#1C1C1C]/20 p-6">
              <div className="overflow-hidden mb-6">
                <img
                  src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=600&q=80"
                  alt="Dra. Patricia Alves"
                  className="w-full h-80 object-cover"
                />
              </div>
              <h4 className="text-xl font-semibold text-[#1C1C1C] mb-2">Dra. Patricia Alves</h4>
              <p className="text-[#A8A29E]">Endodontia</p>
              <p className="text-[#A8A29E] text-sm mt-1">CRO-SP 78901</p>
            </div>
            <div className="text-center border border-[#1C1C1C]/20 p-6">
              <div className="overflow-hidden mb-6">
                <img
                  src="https://unaids.org.br/wp-content/uploads/2024/04/Doutor-Maravilha-4.jpeg"
                  alt="Dr. Rafael Lima"
                  className="w-full h-80 object-cover"
                />
              </div>
              <h4 className="text-xl font-semibold text-[#1C1C1C] mb-2">Dr. Rafael Lima</h4>
              <p className="text-[#A8A29E]">Prótese Dentária</p>
              <p className="text-[#A8A29E] text-sm mt-1">CRO-SP 89012</p>
            </div>
          </div>
        </div>
      </section>

      {/* Depoimentos */}
      <section id="depoimentos" className="relative py-32 px-6 bg-[#F2EFEA] overflow-hidden min-h-[600px] flex items-center">
        <div className="max-w-6xl mx-auto relative z-10 w-full">
          <h3 className="text-4xl md:text-5xl font-bold text-[#1C1C1C] text-center mb-6">
            O que nossos pacientes dizem
          </h3>
          <p className="text-center text-[#A8A29E] text-lg mb-20 max-w-2xl mx-auto">
            Confira a experiência de quem já confia na SmileCare
          </p>
          <div className="grid md:grid-cols-3 gap-16">
            <div className="space-y-6 border border-[#1C1C1C]/20 p-8">
              <div className="text-6xl font-serif text-[#1C1C1C] opacity-30">"</div>
              <p className="text-[#1C1C1C] text-lg leading-relaxed italic">
                Atendimento excepcional! A equipe é super atenciosa e o resultado ficou perfeito.
              </p>
              <div className="pt-4">
                <p className="font-semibold text-[#1C1C1C] text-xl">Carlos Mendes</p>
                <p className="text-[#A8A29E]">Paciente desde 2022</p>
              </div>
            </div>
            <div className="space-y-6 border border-[#1C1C1C]/20 p-8">
              <div className="text-6xl font-serif text-[#1C1C1C] opacity-30">"</div>
              <p className="text-[#1C1C1C] text-lg leading-relaxed italic">
                Ambiente acolhedor e profissionais extremamente qualificados. Recomendo!
              </p>
              <div className="pt-4">
                <p className="font-semibold text-[#1C1C1C] text-xl">Julia Oliveira</p>
                <p className="text-[#A8A29E]">Paciente desde 2021</p>
              </div>
            </div>
            <div className="space-y-6 border border-[#1C1C1C]/20 p-8">
              <div className="text-6xl font-serif text-[#1C1C1C] opacity-30">"</div>
              <p className="text-[#1C1C1C] text-lg leading-relaxed italic">
                Transformaram meu sorriso! Sempre cuidadosos e atenciosos em cada detalhe.
              </p>
              <div className="pt-4">
                <p className="font-semibold text-[#1C1C1C] text-xl">Roberto Lima</p>
                <p className="text-[#A8A29E]">Paciente desde 2020</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Localização e Contato */}
      <section id="contato" className="relative h-screen min-h-[700px] overflow-hidden">
        {/* Mapa de fundo */}
        <div className="absolute inset-0">
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

        {/* Overlay transparente suave */}
        <div className="absolute inset-0 bg-[#F2EFEA]/80"></div>

        {/* Degradê superior */}
        <div className="absolute inset-x-0 top-0 h-64 bg-gradient-to-b from-[#F2EFEA] via-[#F2EFEA]/70 to-transparent"></div>

        {/* Conteúdo */}
        <div className="relative z-10 h-full flex items-center justify-center px-6">
          <div className="bg-[#E8E4DF] p-12 max-w-2xl border border-[#1C1C1C]/20">
              <h3 className="text-4xl font-bold text-[#1C1C1C] mb-12">
                Venha nos visitar
              </h3>
              <div className="space-y-8">
                <div>
                  <h4 className="text-xl font-semibold text-[#1C1C1C] mb-3 flex items-center gap-3">
                    <MapPin className="w-5 h-5 text-[#1C1C1C]" strokeWidth={1.5} />
                    Endereço
                  </h4>
                  <p className="text-[#A8A29E]">Av. Paulista, 1000 - Bela Vista<br />São Paulo - SP, 01310-100</p>
                </div>
                <div>
                  <h4 className="text-xl font-semibold text-[#1C1C1C] mb-3 flex items-center gap-3">
                    <Phone className="w-5 h-5 text-[#1C1C1C]" strokeWidth={1.5} />
                    Contato
                  </h4>
                  <p className="text-[#A8A29E]">
                    Tel: (11) 3456-7890<br />
                    WhatsApp: (11) 98765-4321<br />
                    Email: contato@smilecare.com.br
                  </p>
                </div>
                <div>
                  <h4 className="text-xl font-semibold text-[#1C1C1C] mb-3 flex items-center gap-3">
                    <Clock className="w-5 h-5 text-[#1C1C1C]" strokeWidth={1.5} />
                    Horário de funcionamento
                  </h4>
                  <p className="text-[#A8A29E]">
                    Segunda a Sexta: 8h às 19h<br />
                    Sábado: 8h às 13h
                  </p>
                </div>
                <button
                  onClick={() => navigate('/sistema')}
                  className="bg-[#1C1C1C] text-[#F2EFEA] px-10 py-4 text-lg font-medium rounded-lg hover:bg-[#A8A29E] transition-all duration-300 shadow-lg mt-6"
                >
                  Agendar agora
                </button>
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
