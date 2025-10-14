import { useNavigate } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
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
  const [isMobile, setIsMobile] = useState(false);

  const heroRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const Container = isMobile ? 'div' : motion.div;
  const Button = isMobile ? 'button' : motion.button;

  // Componente para animações on-scroll
  const ScrollReveal = ({ children, className = "", delay = 0 }: any) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.3 });

    if (isMobile) {
      return <div ref={ref} className={className}>{children}</div>;
    }

    return (
      <motion.div
        ref={ref}
        className={className}
        initial={{ opacity: 0, y: 100, scale: 0.9, filter: "blur(20px)" }}
        animate={isInView ? {
          opacity: 1,
          y: 0,
          scale: 1,
          filter: "blur(0px)"
        } : {}}
        transition={{
          duration: 1.4,
          delay,
          ease: [0.16, 1, 0.3, 1]
        }}
      >
        {children}
      </motion.div>
    );
  };

  return (
    <div className="min-h-screen bg-white">
      {/* WhatsApp Button */}
      <a
        href="https://wa.me/5511987654321"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-4 right-4 md:bottom-8 md:right-8 z-50 bg-gradient-to-br from-[#1A365D] to-[#3B82F6] text-white p-4 md:p-5 rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 active:scale-95"
      >
        <MessageCircle className="w-5 h-5 md:w-6 md:h-6" />
      </a>

      {/* Navigation */}
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
          isScrolled ? 'bg-white/90 backdrop-blur-xl border-b border-gray-100 shadow-sm' : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-4 md:py-5 flex justify-between items-center">
          <div className="text-lg md:text-xl font-semibold bg-gradient-to-r from-[#1A365D] to-[#3B82F6] bg-clip-text text-transparent">
            SmileCare
          </div>

          <nav className="hidden md:flex items-center gap-8 lg:gap-10">
            {['Sobre', 'Serviços', 'Contato'].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="text-sm text-gray-600 hover:text-gray-900 transition-colors relative group"
              >
                {item}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-[#1A365D] to-[#3B82F6] group-hover:w-full transition-all duration-300"></span>
              </a>
            ))}
            <button
              onClick={() => navigate('/login')}
              className="px-5 md:px-6 py-2 md:py-2.5 bg-gradient-to-r from-[#1A365D] to-[#3B82F6] text-white text-sm font-medium rounded-full hover:shadow-lg transition-all duration-300 active:scale-95"
            >
              Login
            </button>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section ref={heroRef} className="relative min-h-screen flex items-center pt-20 pb-12 md:pb-0 overflow-hidden bg-gradient-to-br from-white via-gray-50/30 to-white">
        {/* Background Image - Super Transparent */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-100">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: 'url(https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=1920&q=80)',
              opacity: 0.08,
              mixBlendMode: 'multiply'
            }}
          />
        </div>

        {/* Animated Background Blobs - Lighter on mobile, animated on desktop */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <Container
            className="absolute top-1/4 right-1/4 w-[300px] md:w-[600px] h-[300px] md:h-[600px] bg-gradient-to-br from-blue-300/40 md:from-blue-300/60 to-indigo-400/30 md:to-indigo-400/50 rounded-full filter blur-3xl opacity-50"
            {...(!isMobile && {
              animate: {
                x: [0, 120, -40, 0],
                y: [0, -80, 50, 0],
                scale: [1, 1.25, 0.9, 1],
                rotate: [0, 90, 180, 360]
              },
              transition: {
                duration: 45,
                repeat: Infinity,
                ease: [0.45, 0, 0.55, 1]
              }
            })}
          />
          <Container
            className="absolute bottom-1/4 left-1/4 w-[350px] md:w-[700px] h-[350px] md:h-[700px] bg-gradient-to-tr from-indigo-300/30 md:from-indigo-300/50 to-blue-400/40 md:to-blue-400/60 rounded-full filter blur-3xl opacity-40"
            {...(!isMobile && {
              animate: {
                x: [0, -90, 60, 0],
                y: [0, 100, -50, 0],
                scale: [1, 1.3, 0.95, 1],
                rotate: [0, -120, 240, 360]
              },
              transition: {
                duration: 50,
                repeat: Infinity,
                ease: [0.45, 0, 0.55, 1]
              }
            })}
          />
          <Container
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[400px] md:w-[750px] h-[400px] md:h-[750px] bg-gradient-to-r from-blue-200/30 md:from-blue-200/40 to-indigo-200/35 md:to-indigo-200/50 rounded-full filter blur-3xl opacity-45"
            {...(!isMobile && {
              animate: {
                rotate: [0, 360],
                scale: [1, 1.15, 0.95, 1],
                opacity: [0.45, 0.6, 0.35, 0.45]
              },
              transition: {
                duration: 60,
                repeat: Infinity,
                ease: "linear"
              }
            })}
          />
        </div>

        <Container className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 w-full relative z-10">
          <div className="grid lg:grid-cols-2 gap-8 md:gap-16 lg:gap-24 items-center">
            {/* Left Content */}
            <div className="space-y-6 md:space-y-10">
              {/* Badge - Primeiro elemento */}
              <Container
                className="inline-flex items-center gap-2 px-3 md:px-4 py-1.5 md:py-2 bg-blue-50 border border-blue-100 rounded-full text-xs md:text-sm text-[#1A365D] font-medium"
                {...(!isMobile && {
                  initial: {
                    opacity: 0,
                    y: 100,
                    scale: 0.5,
                    filter: "blur(20px)",
                    rotateX: -90
                  },
                  animate: {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    filter: "blur(0px)",
                    rotateX: 0
                  },
                  transition: {
                    duration: 1.8,
                    ease: [0.16, 1, 0.3, 1],
                    delay: 0.3
                  }
                })}
                style={{ transformPerspective: 1000 }}
              >
                <Sparkles className="w-3 h-3 md:w-4 md:h-4" />
                <span>Excelência em Odontologia</span>
              </Container>

              {/* Título - Segundo elemento */}
              <div className="space-y-4 md:space-y-6">
                <Container
                  {...(!isMobile && {
                    initial: {
                      opacity: 0,
                      y: 120,
                      scale: 0.8,
                      filter: "blur(30px)",
                      rotateX: -45
                    },
                    animate: {
                      opacity: 1,
                      y: 0,
                      scale: 1,
                      filter: "blur(0px)",
                      rotateX: 0
                    },
                    transition: {
                      duration: 2,
                      delay: 0.6,
                      ease: [0.16, 1, 0.3, 1]
                    }
                  })}
                  style={{ transformPerspective: 1000 }}
                >
                  <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 tracking-tight leading-[1.1]">
                    <span>Seu</span>{' '}
                    <span>sorriso</span>{' '}
                    <span className="bg-gradient-to-r from-[#1A365D] to-[#3B82F6] bg-clip-text text-transparent">
                      perfeito
                    </span>
                    <br />
                    <span>começa</span>{' '}
                    <span>aqui</span>
                  </h1>
                </Container>

                {/* Descrição - Terceiro elemento */}
                <Container
                  className="text-base sm:text-lg md:text-xl text-gray-600 leading-relaxed max-w-lg"
                  {...(!isMobile && {
                    initial: {
                      opacity: 0,
                      y: 80,
                      filter: "blur(15px)",
                      x: -50
                    },
                    animate: {
                      opacity: 1,
                      y: 0,
                      filter: "blur(0px)",
                      x: 0
                    },
                    transition: {
                      duration: 1.6,
                      delay: 1,
                      ease: [0.16, 1, 0.3, 1]
                    }
                  })}
                >
                  <p>
                    Tecnologia de ponta e atendimento humanizado para
                    transformar o seu sorriso.
                  </p>
                </Container>
              </div>

              {/* Botões - Quarto elemento */}
              <Container
                className="flex flex-col sm:flex-row flex-wrap gap-3 md:gap-4"
                {...(!isMobile && {
                  initial: {
                    opacity: 0,
                    y: 60,
                    scale: 0.9,
                    filter: "blur(10px)"
                  },
                  animate: {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    filter: "blur(0px)"
                  },
                  transition: {
                    duration: 1.5,
                    delay: 1.3,
                    ease: [0.16, 1, 0.3, 1]
                  }
                })}
              >
                <Button
                  onClick={() => navigate('/sistema')}
                  className="px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-[#1A365D] to-[#3B82F6] text-white text-sm font-semibold rounded-xl hover:shadow-2xl transition-all duration-500 flex items-center justify-center gap-2 md:gap-3 group relative overflow-hidden"
                  {...(!isMobile && {
                    whileHover: {
                      scale: 1.08,
                      y: -6,
                      boxShadow: "0 20px 60px rgba(59, 130, 246, 0.5)",
                      rotateX: 5
                    },
                    whileTap: { scale: 0.95 },
                    transition: { type: "spring", stiffness: 300, damping: 15 }
                  })}
                  style={{ transformPerspective: 1000 }}
                >
                  <span>Agendar Consulta</span>
                  <ArrowRight className="w-4 h-4 md:w-5 md:h-5 group-hover:translate-x-2 transition-transform duration-300" />
                </Button>

                <Button
                  className="px-6 sm:px-8 py-3 sm:py-4 border-2 border-gray-200 text-gray-700 text-sm font-semibold rounded-xl hover:border-[#3B82F6] hover:text-[#3B82F6] transition-all duration-500"
                  {...(!isMobile && {
                    whileHover: {
                      scale: 1.08,
                      y: -4,
                      borderColor: "#3B82F6",
                      boxShadow: "0 10px 40px rgba(59, 130, 246, 0.3)"
                    },
                    whileTap: { scale: 0.95 },
                    transition: { type: "spring", stiffness: 300, damping: 15 }
                  })}
                >
                  Saiba Mais
                </Button>
              </Container>

              {/* Estatísticas - Quinto elemento */}
              <Container
                className="flex items-center gap-6 sm:gap-8 md:gap-12 pt-6 md:pt-8"
                {...(!isMobile && {
                  initial: {
                    opacity: 0,
                    y: 50,
                    filter: "blur(10px)",
                    scale: 0.95
                  },
                  animate: {
                    opacity: 1,
                    y: 0,
                    filter: "blur(0px)",
                    scale: 1
                  },
                  transition: {
                    duration: 1.5,
                    delay: 1.6,
                    ease: [0.16, 1, 0.3, 1]
                  }
                })}
              >
                <div>
                  <div className="text-2xl sm:text-3xl md:text-4xl font-bold bg-gradient-to-r from-[#1A365D] to-[#3B82F6] bg-clip-text text-transparent mb-1">
                    10+
                  </div>
                  <div className="text-[10px] sm:text-xs text-gray-500 uppercase tracking-wider">
                    Anos
                  </div>
                </div>

                <div className="h-10 md:h-12 w-px bg-gray-200" />

                <div>
                  <div className="text-2xl sm:text-3xl md:text-4xl font-bold bg-gradient-to-r from-[#1A365D] to-[#3B82F6] bg-clip-text text-transparent mb-1">
                    5000+
                  </div>
                  <div className="text-[10px] sm:text-xs text-gray-500 uppercase tracking-wider">
                    Pacientes
                  </div>
                </div>

                <div className="h-10 md:h-12 w-px bg-gray-200" />

                <div>
                  <div className="text-2xl sm:text-3xl md:text-4xl font-bold bg-gradient-to-r from-[#1A365D] to-[#3B82F6] bg-clip-text text-transparent mb-1">
                    98%
                  </div>
                  <div className="text-[10px] sm:text-xs text-gray-500 uppercase tracking-wider">
                    Satisfação
                  </div>
                </div>
              </Container>
            </div>

            {/* Right - 3D Spline - Hidden on mobile */}
            <Container
              className="hidden lg:block relative h-[700px]"
              {...(!isMobile && {
                initial: {
                  opacity: 0,
                  x: 200,
                  scale: 0.7,
                  rotateY: 45,
                  filter: "blur(30px)"
                },
                animate: {
                  opacity: 1,
                  x: 0,
                  scale: 1,
                  rotateY: 0,
                  filter: "blur(0px)"
                },
                transition: {
                  duration: 2.2,
                  delay: 0.5,
                  ease: [0.16, 1, 0.3, 1]
                }
              })}
              style={{ transformStyle: "preserve-3d", perspective: 2000 }}
            >
              <SplineViewer />

              {/* Floating Cards */}
              <Container
                className="absolute top-20 -left-4 bg-white/80 backdrop-blur-lg p-6 rounded-3xl shadow-2xl border border-gray-100"
                {...(!isMobile && {
                  initial: {
                    opacity: 0,
                    x: -100,
                    y: -100,
                    scale: 0.3,
                    rotateZ: -45,
                    filter: "blur(20px)"
                  },
                  animate: {
                    opacity: 1,
                    x: 0,
                    y: 0,
                    scale: 1,
                    rotateZ: 0,
                    filter: "blur(0px)"
                  },
                  transition: {
                    duration: 1.8,
                    delay: 1.5,
                    ease: [0.16, 1, 0.3, 1]
                  },
                  whileHover: {
                    scale: 1.15,
                    y: -15,
                    rotateY: 10,
                    boxShadow: "0 30px 80px rgba(59, 130, 246, 0.4)",
                    transition: { type: "spring", stiffness: 300, damping: 12 }
                  }
                })}
                style={{ transformStyle: "preserve-3d" }}
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
              </Container>

              <Container
                className="absolute bottom-32 -right-4 bg-white/80 backdrop-blur-lg p-6 rounded-3xl shadow-2xl border border-gray-100"
                {...(!isMobile && {
                  initial: {
                    opacity: 0,
                    x: 100,
                    y: 100,
                    scale: 0.3,
                    rotateZ: 45,
                    filter: "blur(20px)"
                  },
                  animate: {
                    opacity: 1,
                    x: 0,
                    y: 0,
                    scale: 1,
                    rotateZ: 0,
                    filter: "blur(0px)"
                  },
                  transition: {
                    duration: 1.8,
                    delay: 1.8,
                    ease: [0.16, 1, 0.3, 1]
                  },
                  whileHover: {
                    scale: 1.15,
                    y: -15,
                    rotateY: -10,
                    boxShadow: "0 30px 80px rgba(245, 158, 11, 0.4)",
                    transition: { type: "spring", stiffness: 300, damping: 12 }
                  }
                })}
                style={{ transformStyle: "preserve-3d" }}
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
              </Container>
            </Container>
          </div>
        </Container>

        {/* Scroll Indicator */}
        <Container
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2 hidden lg:block"
          {...(!isMobile && {
            initial: { opacity: 0, y: -50, scale: 0.5 },
            animate: {
              opacity: [0, 1, 1, 0],
              y: [0, 0, 20, 20],
              scale: [0.8, 1, 1.1, 1.1]
            },
            transition: {
              duration: 3,
              delay: 2.5,
              repeat: Infinity,
              ease: [0.45, 0, 0.55, 1]
            }
          })}
        >
          <div className="relative">
            <div className="w-7 h-12 border-2 border-gray-300 rounded-full flex justify-center shadow-lg bg-white/50 backdrop-blur-sm">
              <Container
                className="w-2 h-2 bg-gradient-to-b from-[#1A365D] to-[#3B82F6] rounded-full mt-3"
                {...(!isMobile && {
                  animate: {
                    y: [0, 15, 0],
                    scale: [1, 0.8, 1]
                  },
                  transition: {
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }
                })}
              />
            </div>
          </div>
        </Container>
      </section>

      {/* Services Section */}
      <section id="serviços" className="py-16 md:py-24 lg:py-32 bg-gradient-to-b from-white to-gray-50 relative overflow-hidden">
        {/* Gradient circles - static on mobile */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-20 right-20 w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-gradient-to-bl from-blue-200/40 md:from-blue-200/50 to-indigo-300/30 md:to-indigo-300/40 rounded-full filter blur-3xl opacity-40" />
          <div className="absolute bottom-20 left-20 w-[350px] md:w-[600px] h-[350px] md:h-[600px] bg-gradient-to-tr from-indigo-200/30 md:from-indigo-200/40 to-blue-200/40 md:to-blue-200/50 rounded-full filter blur-3xl opacity-50" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
          <ScrollReveal className="text-center max-w-3xl mx-auto mb-12 md:mb-16 lg:mb-20">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4 md:mb-6">
              Por que escolher a{' '}
              <span className="bg-gradient-to-r from-[#1A365D] to-[#3B82F6] bg-clip-text text-transparent">
                SmileCare
              </span>
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-600">
              Combinamos tecnologia avançada com atendimento humanizado
            </p>
          </ScrollReveal>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
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
              <ScrollReveal key={service.title} delay={index * 0.2}>
                <div className="group relative bg-white p-6 md:p-8 rounded-2xl md:rounded-3xl hover:shadow-2xl transition-all duration-500 border border-gray-100">
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#1A365D] to-[#3B82F6] opacity-0 group-hover:opacity-100 rounded-t-2xl md:rounded-t-3xl transition-opacity duration-500"></div>

                  <div className="w-14 h-14 md:w-16 md:h-16 bg-gradient-to-br from-[#1A365D] to-[#3B82F6] rounded-xl md:rounded-2xl flex items-center justify-center mb-4 md:mb-6 group-hover:scale-110 transition-transform duration-300">
                    <service.icon className="w-7 h-7 md:w-8 md:h-8 text-white" />
                  </div>
                  <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-2 md:mb-3">{service.title}</h3>
                  <p className="text-sm md:text-base text-gray-600 leading-relaxed">{service.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="sobre" className="py-16 md:py-24 lg:py-32 bg-gray-50 relative overflow-hidden">
        {/* Gradient circles - static */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-1/3 left-10 w-[350px] md:w-[550px] h-[350px] md:h-[550px] bg-gradient-to-br from-indigo-300/40 md:from-indigo-300/50 to-blue-300/50 md:to-blue-300/60 rounded-full filter blur-3xl opacity-50" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
          <div className="grid lg:grid-cols-2 gap-10 md:gap-16 lg:gap-20 items-center">
            <ScrollReveal className="relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-[#1A365D] to-[#3B82F6] rounded-2xl md:rounded-3xl opacity-10 blur-2xl"></div>
              <img
                src="https://images.unsplash.com/photo-1606811971618-4486d14f3f99?w=800&q=80"
                alt="Clínica SmileCare"
                className="relative w-full h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px] object-cover rounded-2xl md:rounded-3xl shadow-2xl"
              />
            </ScrollReveal>

            <ScrollReveal delay={0.3} className="space-y-6 md:space-y-8">
              <div className="space-y-4 md:space-y-6">
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
                  Transformando sorrisos há{' '}
                  <span className="bg-gradient-to-r from-[#1A365D] to-[#3B82F6] bg-clip-text text-transparent">
                    mais de 10 anos
                  </span>
                </h2>
                <p className="text-base md:text-lg text-gray-600 leading-relaxed">
                  Na SmileCare, acreditamos que um sorriso saudável é a chave para
                  a confiança e o bem-estar. Nossa equipe dedicada combina anos de
                  experiência com as mais recentes inovações em odontologia.
                </p>
              </div>

              <div className="space-y-3 md:space-y-4">
                {[
                  { title: 'Tecnologia Avançada', desc: 'Equipamentos de última geração' },
                  { title: 'Atendimento Humanizado', desc: 'Cada paciente é único para nós' },
                  { title: 'Resultados Garantidos', desc: 'Excelência comprovada' }
                ].map((item, _index) => (
                  <div
                    key={item.title}
                    className="flex items-start gap-3 md:gap-4 p-3 md:p-4 bg-white rounded-xl md:rounded-2xl border border-gray-100 hover:shadow-lg transition-all duration-300"
                  >
                    <div className="w-1.5 md:w-2 h-12 md:h-14 bg-gradient-to-b from-[#1A365D] to-[#3B82F6] rounded-full flex-shrink-0"></div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-0.5 md:mb-1 text-sm md:text-base">{item.title}</h4>
                      <p className="text-gray-600 text-xs md:text-sm">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 md:py-24 lg:py-32 bg-white relative overflow-hidden">
        {/* Gradient circles - static */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-1/4 left-1/3 w-[400px] md:w-[650px] h-[400px] md:h-[650px] bg-gradient-to-br from-blue-300/50 md:from-blue-300/60 to-indigo-300/40 md:to-indigo-300/50 rounded-full filter blur-3xl opacity-50" />
          <div className="absolute bottom-1/4 right-1/4 w-[350px] md:w-[550px] h-[350px] md:h-[550px] bg-gradient-to-tl from-indigo-300/40 md:from-indigo-300/50 to-blue-200/50 md:to-blue-200/60 rounded-full filter blur-3xl opacity-40" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
          <ScrollReveal className="text-center max-w-3xl mx-auto mb-12 md:mb-16 lg:mb-20">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4 md:mb-6">
              Nossa{' '}
              <span className="bg-gradient-to-r from-[#1A365D] to-[#3B82F6] bg-clip-text text-transparent">
                equipe
              </span>
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-600">
              Profissionais altamente qualificados e apaixonados
            </p>
          </ScrollReveal>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
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
              <ScrollReveal key={member.name} delay={index * 0.2}>
                <div className="group relative overflow-hidden rounded-2xl md:rounded-3xl cursor-pointer">
                  <div className="relative h-[350px] sm:h-[400px] md:h-[450px] overflow-hidden rounded-2xl md:rounded-3xl">
                    <img
                      src={member.img}
                      alt={member.name}
                      className="w-full h-full object-cover transition-all duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                  </div>

                  <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6 text-white">
                    <h3 className="text-xl md:text-2xl font-bold mb-1">{member.name}</h3>
                    <p className="text-blue-300 mb-0.5 md:mb-1 text-sm md:text-base">{member.role}</p>
                    <p className="text-xs md:text-sm text-gray-300">{member.cro}</p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 lg:py-32 bg-gradient-to-br from-[#1A365D] via-[#2D4A7C] to-[#3B82F6] relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/4 w-64 md:w-96 h-64 md:h-96 bg-white rounded-full mix-blend-overlay filter blur-3xl opacity-10"></div>
          <div className="absolute bottom-0 right-1/4 w-64 md:w-96 h-64 md:h-96 bg-white rounded-full mix-blend-overlay filter blur-3xl opacity-10"></div>
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-12 text-center relative z-10">
          <ScrollReveal>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 md:mb-8 leading-tight">
              Pronto para transformar
              <br className="hidden sm:block" />
              <span className="sm:inline"> </span>seu sorriso?
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-blue-100 mb-8 md:mb-12 max-w-2xl mx-auto">
              Agende sua consulta hoje e descubra como podemos ajudá-lo
            </p>

            <button
              onClick={() => navigate('/sistema')}
              className="px-8 sm:px-10 py-4 sm:py-5 bg-white text-[#1A365D] rounded-full font-bold text-base md:text-lg hover:shadow-2xl transition-all duration-300 inline-flex items-center gap-2 md:gap-3 active:scale-95"
            >
              Agendar Minha Consulta
              <ArrowRight className="w-4 h-4 md:w-5 md:h-5" />
            </button>
          </ScrollReveal>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contato" className="py-16 md:py-24 lg:py-32 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
        {/* Gradient circles - static */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-20 right-1/4 w-[400px] md:w-[600px] h-[400px] md:h-[600px] bg-gradient-to-bl from-blue-300/50 md:from-blue-300/60 to-indigo-200/40 md:to-indigo-200/50 rounded-full filter blur-3xl opacity-50" />
          <div className="absolute bottom-10 left-1/4 w-[350px] md:w-[550px] h-[350px] md:h-[550px] bg-gradient-to-tr from-indigo-300/40 md:from-indigo-300/50 to-blue-300/50 md:to-blue-300/60 rounded-full filter blur-3xl opacity-40" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
          <div className="grid lg:grid-cols-2 gap-10 md:gap-16 lg:gap-20">
            <ScrollReveal>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4 md:mb-6">
                Entre em{' '}
                <span className="bg-gradient-to-r from-[#1A365D] to-[#3B82F6] bg-clip-text text-transparent">
                  contato
                </span>
              </h2>
              <p className="text-base md:text-lg text-gray-600 mb-8 md:mb-12">
                Estamos aqui para responder todas as suas dúvidas
              </p>

              <div className="space-y-4 md:space-y-6">
                {[
                  { icon: MapPin, title: 'Localização', text: 'Av. Paulista, 1000 - São Paulo, SP' },
                  { icon: Phone, title: 'Telefone', text: '(11) 3456-7890' },
                  { icon: Mail, title: 'Email', text: 'contato@smilecare.com.br' },
                  { icon: Clock, title: 'Horário', text: 'Seg-Sex: 8h-19h | Sáb: 8h-13h' }
                ].map((contact, _index) => (
                  <div
                    key={contact.title}
                    className="flex items-start gap-3 md:gap-4 p-4 md:p-5 bg-white rounded-xl md:rounded-2xl border border-gray-100 hover:shadow-lg transition-all duration-300"
                  >
                    <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-br from-[#1A365D] to-[#3B82F6] rounded-lg md:rounded-xl flex items-center justify-center flex-shrink-0">
                      <contact.icon className="w-4 h-4 md:w-5 md:h-5 text-white" />
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900 mb-0.5 md:mb-1 text-sm md:text-base">{contact.title}</div>
                      <div className="text-gray-600 text-xs md:text-base">{contact.text}</div>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.3} className="relative h-[350px] sm:h-[400px] md:h-[500px] rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3657.1975779524226!2d-46.656874684605!3d-23.561414984684654!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94ce59c8da0aa315%3A0xd59f9431f2c9776a!2sAv.%20Paulista%2C%201000%20-%20Bela%20Vista%2C%20S%C3%A3o%20Paulo%20-%20SP!5e0!3m2!1spt-BR!2sbr!4v1234567890123!5m2!1spt-BR!2sbr"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
              ></iframe>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 mb-8 md:mb-12">
            <div className="col-span-2 md:col-span-1">
              <h3 className="text-xl md:text-2xl font-bold mb-3 md:mb-4 bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
                SmileCare
              </h3>
              <p className="text-sm md:text-base text-gray-400">
                Transformando sorrisos desde 2015
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-3 md:mb-4 text-sm md:text-base">Serviços</h4>
              <ul className="space-y-2 text-gray-400 text-xs md:text-sm">
                <li><a href="#" className="hover:text-white transition-colors">Ortodontia</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Implantes</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Clareamento</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-3 md:mb-4 text-sm md:text-base">Empresa</h4>
              <ul className="space-y-2 text-gray-400 text-xs md:text-sm">
                <li><a href="#" className="hover:text-white transition-colors">Sobre</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Equipe</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-3 md:mb-4 text-sm md:text-base">Legal</h4>
              <ul className="space-y-2 text-gray-400 text-xs md:text-sm">
                <li><a href="#" className="hover:text-white transition-colors">Privacidade</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Termos</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-6 md:pt-8 text-center text-gray-400 text-xs md:text-sm">
            <p>&copy; 2025 SmileCare. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
