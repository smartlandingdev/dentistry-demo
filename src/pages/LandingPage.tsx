import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Calendar,
  Shield,
  Award,
  Clock,
  Phone,
  Mail,
  MapPin,
  ArrowRight,
  MessageCircle,
  Sparkles,
  Users
} from 'lucide-react';
import SplineViewer from '../components/SplineViewer';

export default function LandingPage() {
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-white">
      {/* WhatsApp Button */}
      <motion.a
        href="https://wa.me/5511987654321"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-8 right-8 z-50 bg-gradient-to-br from-[#1A365D] to-[#3B82F6] text-white p-5 rounded-full shadow-xl"
        whileHover={{ scale: 1.1, rotate: 5 }}
        whileTap={{ scale: 0.95 }}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 1 }}
      >
        <MessageCircle className="w-6 h-6" />
      </motion.a>

      {/* Navigation */}
      <motion.header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
          isScrolled ? 'bg-white/90 backdrop-blur-xl border-b border-gray-100 shadow-sm' : 'bg-transparent'
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-5 flex justify-between items-center">
          <motion.div
            className="text-xl font-semibold bg-gradient-to-r from-[#1A365D] to-[#3B82F6] bg-clip-text text-transparent"
            whileHover={{ scale: 1.05 }}
          >
            SmileCare
          </motion.div>

          <nav className="hidden md:flex items-center gap-10">
            {['Sobre', 'Serviços', 'Contato'].map((item, index) => (
              <motion.a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="text-sm text-gray-600 hover:text-gray-900 transition-colors relative group"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
              >
                {item}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-[#1A365D] to-[#3B82F6] group-hover:w-full transition-all duration-300"></span>
              </motion.a>
            ))}
            <motion.button
              onClick={() => navigate('/login')}
              className="px-6 py-2.5 bg-gradient-to-r from-[#1A365D] to-[#3B82F6] text-white text-sm font-medium rounded-full hover:shadow-lg transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              Login
            </motion.button>
          </nav>
        </div>
      </motion.header>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center pt-20 overflow-hidden bg-gradient-to-br from-white via-gray-50/30 to-white">
        {/* Animated Background Blobs */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            className="absolute top-20 left-10 w-96 h-96 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30"
            animate={{
              scale: [1, 1.2, 1],
              x: [0, 50, 0],
              y: [0, 30, 0],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <motion.div
            className="absolute bottom-20 right-10 w-96 h-96 bg-indigo-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30"
            animate={{
              scale: [1, 1.3, 1],
              x: [0, -50, 0],
              y: [0, -30, 0],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1
            }}
          />

          {/* Additional gradient circles */}
          <motion.div
            className="absolute top-1/3 right-1/4 w-64 h-64 bg-gradient-to-br from-blue-200/40 to-indigo-200/40 rounded-full filter blur-2xl"
            animate={{
              scale: [1, 1.15, 1],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.5
            }}
          />

          <motion.div
            className="absolute bottom-1/3 left-1/3 w-80 h-80 bg-gradient-to-tr from-indigo-100/30 to-blue-100/30 rounded-full filter blur-3xl"
            animate={{
              scale: [1, 1.1, 1],
              opacity: [0.2, 0.4, 0.2],
            }}
            transition={{
              duration: 7,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1.5
            }}
          />

          <motion.div
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-blue-50/20 to-indigo-50/20 rounded-full filter blur-3xl"
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: 15,
              repeat: Infinity,
              ease: "linear"
            }}
          />
        </div>

        <div className="max-w-7xl mx-auto px-6 lg:px-12 w-full relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            {/* Left Content */}
            <motion.div
              className="space-y-10"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <motion.div
                className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 border border-blue-100 rounded-full text-sm text-[#1A365D] font-medium"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <Sparkles className="w-4 h-4" />
                Excelência em Odontologia
              </motion.div>

              <div className="space-y-6">
                <motion.h1
                  className="text-6xl lg:text-7xl font-bold text-gray-900 tracking-tight leading-[1.1]"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  Seu sorriso{' '}
                  <span className="bg-gradient-to-r from-[#1A365D] to-[#3B82F6] bg-clip-text text-transparent">
                    perfeito
                  </span>
                  <br />
                  começa aqui
                </motion.h1>
                <motion.p
                  className="text-xl text-gray-600 leading-relaxed max-w-lg"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  Tecnologia de ponta e atendimento humanizado para
                  transformar o seu sorriso.
                </motion.p>
              </div>

              <motion.div
                className="flex flex-wrap gap-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
              >
                <motion.button
                  onClick={() => navigate('/sistema')}
                  className="px-8 py-4 bg-gradient-to-r from-[#1A365D] to-[#3B82F6] text-white text-sm font-semibold rounded-xl hover:shadow-xl transition-all duration-300 flex items-center gap-3 group"
                  whileHover={{ scale: 1.05, x: 5 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Agendar Consulta
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </motion.button>

                <motion.button
                  className="px-8 py-4 border-2 border-gray-200 text-gray-700 text-sm font-semibold rounded-xl hover:border-[#3B82F6] hover:text-[#3B82F6] transition-all duration-300"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Saiba Mais
                </motion.button>
              </motion.div>

              <motion.div
                className="flex items-center gap-12 pt-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7 }}
              >
                <div>
                  <div className="text-4xl font-bold bg-gradient-to-r from-[#1A365D] to-[#3B82F6] bg-clip-text text-transparent mb-1">
                    10+
                  </div>
                  <div className="text-xs text-gray-500 uppercase tracking-wider">Anos</div>
                </div>
                <div className="h-12 w-px bg-gray-200"></div>
                <div>
                  <div className="text-4xl font-bold bg-gradient-to-r from-[#1A365D] to-[#3B82F6] bg-clip-text text-transparent mb-1">
                    5000+
                  </div>
                  <div className="text-xs text-gray-500 uppercase tracking-wider">Pacientes</div>
                </div>
                <div className="h-12 w-px bg-gray-200"></div>
                <div>
                  <div className="text-4xl font-bold bg-gradient-to-r from-[#1A365D] to-[#3B82F6] bg-clip-text text-transparent mb-1">
                    98%
                  </div>
                  <div className="text-xs text-gray-500 uppercase tracking-wider">Satisfação</div>
                </div>
              </motion.div>
            </motion.div>

            {/* Right - 3D Spline */}
            <motion.div
              className="relative h-[600px] lg:h-[700px]"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.3 }}
            >
              <SplineViewer />

              {/* Floating Cards */}
              <motion.div
                className="absolute top-20 -left-4 bg-white/80 backdrop-blur-lg p-6 rounded-3xl shadow-2xl border border-gray-100"
                animate={{ y: [0, -15, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              >
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-[#1A365D] to-[#3B82F6] rounded-2xl flex items-center justify-center shadow-lg">
                    <Shield className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <div className="text-base font-bold text-gray-900">100% Seguro</div>
                    <div className="text-sm text-gray-500">Protocolos certificados</div>
                  </div>
                </div>
              </motion.div>

              <motion.div
                className="absolute bottom-32 -right-4 bg-white/80 backdrop-blur-lg p-6 rounded-3xl shadow-2xl border border-gray-100"
                animate={{ y: [0, 15, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 2 }}
              >
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-[#1A365D] to-[#3B82F6] rounded-2xl flex items-center justify-center shadow-lg">
                    <Award className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <div className="text-base font-bold text-gray-900">Premiado</div>
                    <div className="text-sm text-gray-500">Melhor clínica 2024</div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2 hidden lg:block"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <div className="w-6 h-10 border-2 border-gray-300 rounded-full flex justify-center">
            <motion.div
              className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2"
              animate={{ y: [0, 16, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
          </div>
        </motion.div>
      </section>

      {/* Services Section */}
      <section id="serviços" className="py-32 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <motion.div
            className="text-center max-w-3xl mx-auto mb-20"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-5xl font-bold text-gray-900 mb-6">
              Por que escolher a{' '}
              <span className="bg-gradient-to-r from-[#1A365D] to-[#3B82F6] bg-clip-text text-transparent">
                SmileCare
              </span>
            </h2>
            <p className="text-xl text-gray-600">
              Combinamos tecnologia avançada com atendimento humanizado
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Calendar,
                title: 'Agendamento Online',
                desc: 'Sistema disponível 24/7 para sua comodidade'
              },
              {
                icon: Shield,
                title: 'Segurança Total',
                desc: 'Protocolos certificados internacionalmente'
              },
              {
                icon: Users,
                title: 'Equipe Especializada',
                desc: 'Profissionais com certificação internacional'
              }
            ].map((service, index) => (
              <motion.div
                key={service.title}
                className="group relative bg-white p-8 rounded-3xl hover:shadow-2xl transition-all duration-500 border border-gray-100"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15 }}
                whileHover={{ y: -8 }}
              >
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#1A365D] to-[#3B82F6] opacity-0 group-hover:opacity-100 rounded-t-3xl transition-opacity duration-500"></div>

                <div className="w-16 h-16 bg-gradient-to-br from-[#1A365D] to-[#3B82F6] rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <service.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{service.title}</h3>
                <p className="text-gray-600 leading-relaxed">{service.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="sobre" className="py-32 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <motion.div
              className="relative"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="absolute -inset-4 bg-gradient-to-r from-[#1A365D] to-[#3B82F6] rounded-3xl opacity-10 blur-2xl"></div>
              <img
                src="https://images.unsplash.com/photo-1606811971618-4486d14f3f99?w=800&q=80"
                alt="Clínica SmileCare"
                className="relative w-full h-[600px] object-cover rounded-3xl shadow-2xl"
              />
            </motion.div>

            <motion.div
              className="space-y-8"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="space-y-6">
                <h2 className="text-5xl font-bold text-gray-900 leading-tight">
                  Transformando sorrisos há{' '}
                  <span className="bg-gradient-to-r from-[#1A365D] to-[#3B82F6] bg-clip-text text-transparent">
                    mais de 10 anos
                  </span>
                </h2>
                <p className="text-lg text-gray-600 leading-relaxed">
                  Na SmileCare, acreditamos que um sorriso saudável é a chave para
                  a confiança e o bem-estar. Nossa equipe dedicada combina anos de
                  experiência com as mais recentes inovações em odontologia.
                </p>
              </div>

              <div className="space-y-4">
                {[
                  { title: 'Tecnologia Avançada', desc: 'Equipamentos de última geração' },
                  { title: 'Atendimento Humanizado', desc: 'Cada paciente é único para nós' },
                  { title: 'Resultados Garantidos', desc: 'Excelência comprovada' }
                ].map((item, index) => (
                  <motion.div
                    key={item.title}
                    className="flex items-start gap-4 p-4 bg-white rounded-2xl border border-gray-100 hover:shadow-lg transition-all duration-300"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ x: 8 }}
                  >
                    <div className="w-2 h-14 bg-gradient-to-b from-[#1A365D] to-[#3B82F6] rounded-full flex-shrink-0"></div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">{item.title}</h4>
                      <p className="text-gray-600 text-sm">{item.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <motion.div
            className="text-center max-w-3xl mx-auto mb-20"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-5xl font-bold text-gray-900 mb-6">
              Nossa{' '}
              <span className="bg-gradient-to-r from-[#1A365D] to-[#3B82F6] bg-clip-text text-transparent">
                equipe
              </span>
            </h2>
            <p className="text-xl text-gray-600">
              Profissionais altamente qualificados e apaixonados
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: 'Dra. Maria Silva',
                role: 'Ortodontia',
                img: 'https://images.unsplash.com/photo-1614608682850-e0d6ed316d47?w=400&q=80',
                cro: 'CRO-SP 45678'
              },
              {
                name: 'Dr. João Santos',
                role: 'Implantodontia',
                img: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&q=80',
                cro: 'CRO-SP 32145'
              },
              {
                name: 'Dra. Ana Costa',
                role: 'Odontopediatria',
                img: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=400&q=80',
                cro: 'CRO-SP 56789'
              }
            ].map((member, index) => (
              <motion.div
                key={member.name}
                className="group relative overflow-hidden rounded-3xl cursor-pointer"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15 }}
                whileHover={{ y: -10 }}
              >
                <div className="relative h-[450px] overflow-hidden rounded-3xl">
                  <img
                    src={member.img}
                    alt={member.name}
                    className="w-full h-full object-cover transition-all duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                </div>

                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <h3 className="text-2xl font-bold mb-1">{member.name}</h3>
                  <p className="text-blue-300 mb-1">{member.role}</p>
                  <p className="text-sm text-gray-300">{member.cro}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 bg-gradient-to-br from-[#1A365D] via-[#2D4A7C] to-[#3B82F6] relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-white rounded-full mix-blend-overlay filter blur-3xl opacity-10"></div>
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-white rounded-full mix-blend-overlay filter blur-3xl opacity-10"></div>
        </div>

        <div className="max-w-4xl mx-auto px-6 lg:px-12 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-5xl md:text-6xl font-bold text-white mb-8 leading-tight">
              Pronto para transformar
              <br />
              seu sorriso?
            </h2>
            <p className="text-xl text-blue-100 mb-12 max-w-2xl mx-auto">
              Agende sua consulta hoje e descubra como podemos ajudá-lo
            </p>

            <motion.button
              onClick={() => navigate('/sistema')}
              className="px-10 py-5 bg-white text-[#1A365D] rounded-full font-bold text-lg hover:shadow-2xl transition-all duration-300 inline-flex items-center gap-3"
              whileHover={{ scale: 1.05, y: -5 }}
              whileTap={{ scale: 0.95 }}
            >
              Agendar Minha Consulta
              <ArrowRight className="w-5 h-5" />
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contato" className="py-32 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-20">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-5xl font-bold text-gray-900 mb-6">
                Entre em{' '}
                <span className="bg-gradient-to-r from-[#1A365D] to-[#3B82F6] bg-clip-text text-transparent">
                  contato
                </span>
              </h2>
              <p className="text-lg text-gray-600 mb-12">
                Estamos aqui para responder todas as suas dúvidas
              </p>

              <div className="space-y-6">
                {[
                  { icon: MapPin, title: 'Localização', text: 'Av. Paulista, 1000 - São Paulo, SP' },
                  { icon: Phone, title: 'Telefone', text: '(11) 3456-7890' },
                  { icon: Mail, title: 'Email', text: 'contato@smilecare.com.br' },
                  { icon: Clock, title: 'Horário', text: 'Seg-Sex: 8h-19h | Sáb: 8h-13h' }
                ].map((contact, index) => (
                  <motion.div
                    key={contact.title}
                    className="flex items-start gap-4 p-5 bg-white rounded-2xl border border-gray-100 hover:shadow-lg transition-all duration-300"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ x: 8 }}
                  >
                    <div className="w-12 h-12 bg-gradient-to-br from-[#1A365D] to-[#3B82F6] rounded-xl flex items-center justify-center flex-shrink-0">
                      <contact.icon className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900 mb-1">{contact.title}</div>
                      <div className="text-gray-600">{contact.text}</div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              className="relative h-[500px] rounded-3xl overflow-hidden shadow-2xl"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3657.1975779524226!2d-46.656874684605!3d-23.561414984684654!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94ce59c8da0aa315%3A0xd59f9431f2c9776a!2sAv.%20Paulista%2C%201000%20-%20Bela%20Vista%2C%20S%C3%A3o%20Paulo%20-%20SP!5e0!3m2!1spt-BR!2sbr!4v1234567890123!5m2!1spt-BR!2sbr"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
              ></iframe>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            <div>
              <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
                SmileCare
              </h3>
              <p className="text-gray-400">
                Transformando sorrisos desde 2015
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Serviços</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Ortodontia</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Implantes</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Clareamento</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Empresa</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Sobre</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Equipe</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Privacidade</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Termos</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-8 text-center text-gray-400">
            <p>&copy; 2025 SmileCare. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
