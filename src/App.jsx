import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowDown, Menu, X, ChevronRight } from 'lucide-react'

// SafeIcon component for Lucide icons
const SafeIcon = ({ name, size = 24, className = '', color }) => {
  const icons = {
    'arrow-down': ArrowDown,
    'menu': Menu,
    'x': X,
    'chevron-right': ChevronRight,
  }
  
  const IconComponent = icons[name] || ArrowDown
  
  return <IconComponent size={size} className={className} color={color} />
}

// Animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 60 },
  visible: { opacity: 1, y: 0 }
}

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15
    }
  }
}

const scaleIn = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1 }
}

function App() {
  const heroRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  })
  
  // Parallax scale effect for hero image
  const imageScale = useTransform(scrollYProgress, [0, 1], [1, 1.3])
  const textY = useTransform(scrollYProgress, [0, 1], [0, 100])
  const textOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])

  // Collection items data
  const collection = [
    {
      id: 'neon-01',
      name: 'NEON-01',
      subtitle: 'Светящийся контур',
      description: 'Первые очки с фотолюминесцентным каркасом. Заряжаются от солнца, светятся в темноте.',
      offset: 'mt-0',
      image: 'https://images.unsplash.com/photo-1574258495973-f010dfbb5371?w=600&q=80'
    },
    {
      id: 'liquid-silver',
      name: 'LIQUID SILVER',
      subtitle: 'Жидкий металл',
      description: 'Адаптивная форма. Термореактивный сплав меняет геометрию под температуру кожи.',
      offset: 'mt-24 md:mt-48',
      image: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=600&q=80'
    },
    {
      id: 'void-ghost',
      name: 'VOID GHOST',
      subtitle: 'Невидимость',
      description: 'Прозрачный как воздух. Карбоновая нить толщиной 0.3 мм. Безрамочная реальность.',
      offset: 'mt-12 md:mt-24',
      image: 'https://images.unsplash.com/photo-1577803645773-f96470509666?w=600&q=80'
    }
  ]

  // Philosophy text lines
  const philosophyLines = [
    'ОЧКИ — ЭТО НЕ',
    'АКСЕССУАР.',
    'ЭТО ИНТЕРФЕЙС',
    'ЧЕЛОВЕКА.'
  ]

  const scrollToCollection = () => {
    const element = document.getElementById('collection')
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <div className="bg-white text-black min-h-screen overflow-x-hidden mobile-safe-container">
      
      {/* HEADER */}
      <header className="fixed top-0 left-0 right-0 z-50 mix-blend-difference px-4 md:px-8 py-6">
        <nav className="flex justify-between items-center max-w-[1800px] mx-auto">
          <div className="text-white font-black text-xl md:text-2xl tracking-tighter">
            OPTIC FLOW
          </div>
          <button className="text-white p-2 hover:opacity-60 transition-opacity">
            <SafeIcon name="menu" size={28} />
          </button>
        </nav>
      </header>

      {/* HERO SECTION */}
      <section ref={heroRef} className="relative h-[150vh] bg-white">
        <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden">
          
          {/* Background Image with Parallax Scale */}
          <motion.div 
            className="absolute inset-0 z-0 flex items-center justify-center"
            style={{ scale: imageScale }}
          >
            <div className="relative w-full h-full max-w-[90vw] max-h-[70vh] mx-auto">
              <img 
                src="https://images.unsplash.com/photo-1574258495973-f010dfbb5371?w=1200&q=90" 
                alt="Futuristic liquid metal glasses"
                className="w-full h-full object-contain grayscale contrast-125"
              />
              {/* Gradient overlay for depth */}
              <div className="absolute inset-0 bg-gradient-to-b from-white via-transparent to-white opacity-40" />
            </div>
          </motion.div>

          {/* Hero Text */}
          <motion.div 
            className="relative z-10 text-center px-4"
            style={{ y: textY, opacity: textOpacity }}
          >
            <h1 className="text-[12vw] md:text-[10vw] font-black leading-[0.85] tracking-tighter text-black">
              ВИДЕТЬ<br />
              <span className="block ml-[-5vw]">СКВОЗЬ</span>
              <span className="block ml-[10vw]">ВРЕМЯ</span>
            </h1>
            
            <motion.button 
              onClick={scrollToCollection}
              className="mt-16 mx-auto flex flex-col items-center gap-4 group cursor-pointer"
              whileHover={{ y: 5 }}
            >
              <span className="text-sm tracking-[0.3em] uppercase font-semibold opacity-60 group-hover:opacity-100 transition-opacity">
                Исследовать
              </span>
              <SafeIcon name="arrow-down" size={24} className="animate-bounce" />
            </motion.button>
          </motion.div>

          {/* Side text */}
          <div className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-10 hidden md:block">
            <p className="text-xs tracking-[0.4em] uppercase font-semibold opacity-40 writing-mode-vertical transform -rotate-180" style={{ writingMode: 'vertical-rl' }}>
              Концептуальная оптика 3024
            </p>
          </div>
          
          <div className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-10 hidden md:block">
            <p className="text-xs tracking-[0.4em] uppercase font-semibold opacity-40" style={{ writingMode: 'vertical-rl' }}>
              Токио — Москва — Берлин
            </p>
          </div>
        </div>
      </section>

      {/* COLLECTION SECTION */}
      <section id="collection" className="py-32 md:py-48 px-4 md:px-8 bg-white">
        <div className="max-w-[1800px] mx-auto">
          
          {/* Section Header */}
          <motion.div 
            className="mb-24 md:mb-40"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInUp}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-[15vw] md:text-[12vw] font-black tracking-tighter leading-none">
              КОЛЛЕКЦИЯ
            </h2>
            <p className="text-lg md:text-2xl font-light mt-6 tracking-wide opacity-60 max-w-xl">
              Три модели. Три революции. Без компромиссов.
            </p>
          </motion.div>

          {/* Asymmetric Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
            {collection.map((item, index) => (
              <motion.article 
                key={item.id}
                className={`group ${item.offset}`}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                variants={fadeInUp}
                transition={{ duration: 0.8, delay: index * 0.2 }}
              >
                {/* Image Container */}
                <div className="relative overflow-hidden bg-neutral-100 mb-8 aspect-[3/4]">
                  <motion.img 
                    src={item.image} 
                    alt={item.name}
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.6 }}
                  />
                  {/* Index number */}
                  <div className="absolute top-4 left-4 text-6xl font-black opacity-10">
                    0{index + 1}
                  </div>
                </div>

                {/* Content */}
                <div className="space-y-4">
                  <div className="flex items-baseline gap-4">
                    <h3 className="text-3xl md:text-4xl font-black tracking-tight">
                      {item.name}
                    </h3>
                    <SafeIcon name="chevron-right" size={20} className="opacity-0 group-hover:opacity-100 transition-opacity transform group-hover:translate-x-1" />
                  </div>
                  <p className="text-sm uppercase tracking-[0.2em] font-semibold opacity-40">
                    {item.subtitle}
                  </p>
                  <p className="text-base md:text-lg font-light leading-relaxed opacity-80 max-w-sm">
                    {item.description}
                  </p>
                </div>
              </motion.article>
            ))}
          </div>

          {/* Large spacer */}
          <div className="h-32 md:h-64" />
        </div>
      </section>

      {/* PHILOSOPHY SECTION */}
      <section className="relative py-32 md:py-64 bg-black text-white overflow-hidden">
        <div className="max-w-[1800px] mx-auto px-4 md:px-8">
          
          {/* Massive Typography */}
          <div className="space-y-2 md:space-y-4">
            {philosophyLines.map((line, index) => (
              <motion.div
                key={index}
                className="overflow-hidden"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
              >
                <motion.h2 
                  className={`text-[14vw] md:text-[11vw] font-black leading-[0.9] tracking-tighter ${
                    index === 1 || index === 3 ? 'text-white' : 'text-white/90'
                  } ${index === 2 ? 'ml-[-2vw]' : ''} ${index === 3 ? 'ml-[5vw] md:ml-[10vw]' : ''}`}
                  variants={{
                    hidden: { y: '100%', opacity: 0 },
                    visible: { 
                      y: 0, 
                      opacity: 1,
                      transition: {
                        duration: 0.8,
                        ease: [0.22, 1, 0.36, 1],
                        delay: index * 0.1
                      }
                    }
                  }}
                >
                  {line}
                </motion.h2>
              </motion.div>
            ))}
          </div>

          {/* Supporting text */}
          <motion.div 
            className="mt-24 md:mt-40 max-w-2xl ml-auto"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <p className="text-lg md:text-2xl font-light leading-relaxed opacity-70">
              Мы не создаём очки. Мы проектируем новые спосбы восприятия реальности. 
              Каждая модель — это протез для расширения человеческих возможностей.
            </p>
            <div className="mt-8 h-px bg-white/20 w-full" />
            <p className="mt-8 text-sm uppercase tracking-[0.3em] opacity-40">
              Основано в 3024
            </p>
          </motion.div>
        </div>

        {/* Decorative elements */}
        <div className="absolute top-20 right-10 w-32 h-32 border border-white/10 rounded-full hidden md:block" />
        <div className="absolute bottom-40 left-10 w-64 h-64 border border-white/5 rounded-full hidden md:block" />
      </section>

      {/* SPACER SECTION - Air/Breathing */}
      <section className="h-[50vh] md:h-[80vh] bg-white flex items-center justify-center">
        <motion.div 
          className="text-center px-4"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5 }}
        >
          <p className="text-[8vw] md:text-[4vw] font-black tracking-tighter opacity-10">
            LIQUID VISION
          </p>
        </motion.div>
      </section>

      {/* FOOTER */}
      <footer className="bg-white text-black py-24 md:py-32 px-4 md:px-8 telegram-safe-bottom">
        <div className="max-w-[1800px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-32">
            
            {/* Left - Brand */}
            <div>
              <h3 className="text-[10vw] md:text-[6vw] font-black tracking-tighter leading-none mb-8">
                OPTIC<br />FLOW
              </h3>
              <p className="text-lg font-light opacity-60 max-w-md">
                Цифровая выставка концептуальной оптики. 
                Жидкий металл. Будущее уже здесь.
              </p>
            </div>

            {/* Right - Links */}
            <div className="flex flex-col md:flex-row gap-12 md:gap-24">
              <div>
                <h4 className="text-sm uppercase tracking-[0.3em] font-semibold mb-6 opacity-40">
                  Коллекция
                </h4>
                <ul className="space-y-3">
                  <li className="text-lg font-light hover:opacity-60 cursor-pointer transition-opacity">NEON-01</li>
                  <li className="text-lg font-light hover:opacity-60 cursor-pointer transition-opacity">LIQUID SILVER</li>
                  <li className="text-lg font-light hover:opacity-60 cursor-pointer transition-opacity">VOID GHOST</li>
                </ul>
              </div>
              
              <div>
                <h4 className="text-sm uppercase tracking-[0.3em] font-semibold mb-6 opacity-40">
                  Контакты
                </h4>
                <ul className="space-y-3">
                  <li className="text-lg font-light opacity-80">Токио, Сибуя</li>
                  <li className="text-lg font-light opacity-80">Москва, Арбат</li>
                  <li className="text-lg font-light opacity-80">info@opticflow.io</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="mt-24 pt-8 border-t border-black/10 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <p className="text-xs tracking-[0.2em] uppercase opacity-40">
              © 3024 OPTIC FLOW. Все права защищены.
            </p>
            <p className="text-xs tracking-[0.2em] uppercase opacity-40">
              Дизайн: Будущее
            </p>
          </div>
        </div>
      </footer>

    </div>
  )
}

export default App