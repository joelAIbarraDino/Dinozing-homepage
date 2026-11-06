const WHATSAPP = 'https://api.whatsapp.com/send?phone=525582932905&text='
export const enlaceWhatsApp = (mensaje) => WHATSAPP + encodeURIComponent(mensaje)

export const whatsappGeneral = enlaceWhatsApp(
  'Hola Dinozign! Tengo algunas dudas sobre sus servicios de IA y automatización. Me gustaría platicar con un asesor para que me oriente. ¡Gracias!',
)

export const redes = {
  facebook: 'https://www.facebook.com/dinozignMx/',
  instagram: 'https://www.instagram.com/dinozignMx/',
  TikTok: 'https://www.tiktok.com/@dinozign',
}

export const calEnlace = 'dinozign/sesiondinozign'
export const correo = 'administracion@dinozign.com'
export const telefono = '+52 55 8293 2905'

export const navegacion = [
  { texto: 'Inicio', href: '#top' },
  { texto: 'Nosotros', href: '#about-us' },
  { texto: 'Soluciones', href: '#solutions' },
  { texto: 'Clientes', href: '#clients' },
  { texto: 'Dinoproceso', href: '#dino-process' },
  { texto: 'Casos de éxito', href: '#evidence' },
  { texto: 'Contacto', href: '#contact-us' },
  { texto: 'Agendar', href: '#agendar' },
]

export const servicios = [
  {
    titulo: 'Agentes inteligentes para WhatsApp',
    imagen: 'servicio-1',
    alt: 'Servicio de agentes de IA para WhatsApp',
    texto: 'Asistentes IA que responden, califican y venden por WhatsApp. Automatizan ventas, soporte y procesos las 24 horas. Conectados a tu CRM, sistema de pagos o base de datos.',
    puntos: ['Calificación automática de leads', 'Envío de info, validación de datos y comprobantes', 'Atención 24/7 sin depender del equipo'],
    cta: 'Solicitar Info',
    mensaje: 'Hola Dinozign! Me interesa implementar Agentes de IA en mi WhatsApp para automatizar mis ventas. ¿Me dan más info?',
  },
  {
    titulo: 'Automatización Personalizada',
    imagen: 'servicio-2',
    alt: 'Servicio de automatización con IA',
    texto: 'Flujos inteligentes que ahorran tiempo y eliminan tareas repetitivas. Conectamos WhatsApp, Google Sheets, APIs, CRMs y más. Automatización real, adaptada a tu negocio.',
    puntos: ['Flujos personalizados y escalables', 'Más de 10 automatizaciones activas en clientes', 'Alertas, integraciones y respuestas en tiempo real'],
    cta: 'Empezar mi automatización',
    mensaje: 'Hola! Vi su sección de Automatización Personalizada y quiero optimizar los procesos de mi negocio. ¿Cómo empezamos?',
  },
  {
    titulo: 'Publicidad en Meta y Google Ads',
    imagen: 'servicio-3',
    alt: 'Servicio de publicidad en Meta y Google Ads',
    texto: 'Campañas en Facebook, Instagram, Threads y Google Search/Display optimizadas con IA. Atraen leads y los conectan con agentes que responden al instante.',
    puntos: ['Más de 25 campañas activas', 'Segmentación avanzada y creativos personalizados', '+65K USD gestionados en pauta para nuestros clientes'],
    cta: 'Quiero atraer más clientes',
    mensaje: 'Hola, me interesa su estrategia de Publicidad en Meta y Google Ads para aumentar mis clientes. ¿Me ayudan?',
  },
  {
    titulo: 'Sistemas web inteligentes',
    imagen: 'servicio-4',
    alt: 'Servicio de sistemas web inteligentes a la medida',
    texto: 'Creamos plataformas hechas a la medida: academias, reservas, gestiones internas, control de pagos y más. Desarrolladas para tu modelo de negocio, sin plantillas genéricas.',
    puntos: ['Sistemas activos en México y USA', 'Automatización integrada desde el backoffice', 'Escalables, seguros y fáciles de usar'],
    cta: 'Me interesa un sistema web',
    mensaje: 'Hola! Estoy interesado en un Sistema Web Inteligente. Vi su sección y me gustaría una propuesta para mi proyecto.',
  },
  {
    titulo: 'Asesorías estratégicas personalizadas',
    imagen: 'servicio-5',
    alt: 'Servicio de asesorías estratégicas',
    texto: 'Te ayudamos a ordenar tu ecosistema digital, definir tu estrategia y tomar decisiones claras. Más de 120 emprendedores han recibido nuestra guía personalizada para vender, automatizar y escalar.',
    puntos: ['Diagnóstico personalizado de tu negocio', 'Revisión de campañas, bots, automatización o sistemas', 'Estrategia lista para ejecutar (con o sin Dinozign)'],
    cta: 'Agenda tu asesoría gratuita',
    mensaje: 'Hola Dinozign! Busco una Asesoría Estratégica Personalizada para escalar mi negocio con IA. ¿Tienen disponibilidad?',
  },
]

export const portafolio = ['NÚCLEO COGNITIVO', 'ACTIVO DIGITAL', 'FLUJO MAESTRO', 'ECOSISTEMA TOTAL', 'CONVERSIÓN PURA']

export const capsulas = [
  { texto: 'Agentes WhatsApp', color: '#1821f5', grande: true },
  { texto: 'Google Ads', color: '#f22daa', grande: true },
  { texto: 'Sistemas web', color: '#59f22e' },
  { texto: 'Asesorías 1:1', color: '#59f22e' },
  { texto: 'Marketing IA', color: '#f22daa' },
  { texto: 'Estrategia Digital', color: '#59f22e' },
  { texto: 'Campañas Facebook', color: '#1821f5', grande: true },
  { texto: 'Landing Pages', color: '#f22daa' },
  { texto: 'Atención 24/7', color: '#1821f5', grande: true },
  { texto: 'Clientes potenciales', color: '#1821f5', grande: true },
]

// Peso de cada marca en el orden de la sección de clientes: a mayor peso, más probable que salga primero.
// `n` es el número del logo en media-src/template/brand/grandes/brand-N.png
export const marcas = [
  // Empresas globales
  ...[
    [6, 'Costco'], [8, 'Ford'], [2, 'Nokia'], [9, 'Hyundai'], [31, 'Adry Balbo x Audi'], [3, 'Cornershop by Uber'],
    [10, 'Novartis'], [13, 'Sanofi'], [4, 'Kodak'], [7, 'DuPont'], [12, 'Gilead'], [11, 'Teva'],
  ].map(([n, nombre]) => ({ n, nombre, peso: 100 })),
  // Marcas grandes o muy reconocidas
  ...[
    [16, 'St. Regis'], [17, 'Camino Real'], [1, 'Martí'], [18, 'Sport City'], [19, 'Ibero Ciudad de México'], [5, 'Senwa'],
  ].map(([n, nombre]) => ({ n, nombre, peso: 40 })),
  // Empresas medianas
  ...[
    [15, 'Soarma'], [20, 'Fondo para la Paz'], [21, 'TAO México'], [22, 'Kalpay'], [23, 'EA Divisas'], [24, 'Centralpay'], [30, 'Kuna'],
  ].map(([n, nombre]) => ({ n, nombre, peso: 12 })),
  // Negocios locales
  ...[
    [14, 'Healthy Boutique'], [25, 'Ortopedia Palmas'], [26, 'Lomas Padel'], [27, 'CGS'], [28, 'Lisbhet Castillo'], [29, 'KTA Institute'],
  ].map(([n, nombre]) => ({ n, nombre, peso: 3 })),
]

export const pasos = [
  { num: '01', titulo: ['Te', 'escuchamos'], texto: ['Todo empieza contigo:', 'entendemos tu negocio,', 'metas y contexto.'], fondo: '#1821f5', tinta: 'text-verde', insignia: 'bg-black text-white' },
  { num: '02', titulo: ['Lo diseñamos', 'contigo'], texto: ['Diseñamos lo justo:', 'automatización, campañas', 'o sistemas a tu medida.'], fondo: '#59f22e', tinta: 'text-[#0a0a0a]', insignia: 'bg-black text-white' },
  { num: '03', titulo: ['Te entregamos', 'todo'], texto: ['Lo dejamos listo para', 'que lo entiendas, uses', 'y escales sin depender.'], fondo: '#f22daa', tinta: 'text-white', insignia: 'bg-white text-black' },
  { num: '04', titulo: ['No te', 'dejamos solo'], texto: ['Te acompañamos con soporte', 'real, claro y disponible', 'cuando lo necesitas.'], fondo: '#ffffff', tinta: 'text-[#0a0a0a]', insignia: 'bg-black text-white' },
]
