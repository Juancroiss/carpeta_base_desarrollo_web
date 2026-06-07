/*
  ==================== MAIN.JS ====================
  
  DESCRIPCIÓN:
  Este es el archivo JavaScript PRINCIPAL del proyecto.
  Contiene las funcionalidades básicas y componentes JavaScript principales.
  
  ¿QUÉ HACE JAVASCRIPT EN UNA PÁGINA WEB?
  1. Hace la página INTERACTIVA (responder a clicks, movimientos)
  2. Valida datos de formularios antes de enviar
  3. Carga datos dinámicamente sin recargar la página
  4. Manipula el DOM (estructura HTML)
  5. Maneja eventos del usuario
  6. Anima elementos
  7. Guarda datos en el navegador (localStorage)
  
  CONCEPTOS BÁSICOS:
  - DOM: Document Object Model (representación del HTML en JavaScript)
  - Eventos: Actions del usuario (click, scroll, input, etc.)
  - Funciones: Bloques de código reutilizables
  - Variables: Lugares donde guardamos datos
  
  ESTRUCTURA DE ESTE ARCHIVO:
  1. Variables globales
  2. Seleccionar elementos del DOM
  3. Funciones principales
  4. Event listeners (escuchar eventos)
  5. Inicialización
  
  BUENAS PRÁCTICAS EN JAVASCRIPT:
  - Usa const por defecto (no let ni var)
  - Nombra variables y funciones de forma clara
  - Comenta el código complejo
  - Evita el scope global (usa funciones)
  - Usa arrow functions para callbacks
  - Maneja errores con try/catch
*/

// ========== VARIABLES GLOBALES ==========
/*
  Variables que usaremos en todo el archivo
  Se declaran al inicio para fácil referencia
*/

// Elemento del menú hamburguesa (para móvil)
const btnMenuMobile = document.querySelector('.btn-menu-mobile');

// Elemento de navegación
const navbar = document.querySelector('.navbar');

// Botón de login
const btnLogin = document.querySelector('.btn-login');

// Formulario de contacto (si existe)
const contactForm = document.getElementById('contact-form');

// ========== FUNCIONES PRINCIPALES ==========

/**
 * Inicializa la aplicación
 * Se ejecuta cuando la página carga completamente
 * 
 * @returns {void}
 */
function init() {
  console.log('🚀 Inicializando aplicación...');
  
  // Agregar event listeners
  setupEventListeners();
  
  // Cargar datos del navegador
  loadSavedData();
  
  // Ejecutar otras inicializaciones
  highlightCurrentPage();
  
  console.log('✅ Aplicación inicializada correctamente');
}

/**
 * Configura todos los event listeners
 * Escucha eventos del usuario y ejecuta funciones
 * 
 * EVENTOS COMUNES:
 * - click: usuario hace click
 * - change: usuario cambia input/select
 * - submit: usuario envía formulario
 * - scroll: usuario hace scroll
 * - resize: ventana se redimensiona
 * 
 * @returns {void}
 */
function setupEventListeners() {
  // MENÚ HAMBURGUESA (MÓVIL)
  if (btnMenuMobile) {
    btnMenuMobile.addEventListener('click', toggleMobileMenu);
  }
  
  // BOTÓN LOGIN
  if (btnLogin) {
    btnLogin.addEventListener('click', handleLogin);
  }
  
  // FORMULARIO DE CONTACTO
  if (contactForm) {
    contactForm.addEventListener('submit', handleFormSubmit);
  }
  
  // SCROLL: Ocultar header al bajar, mostrar al subir
  let lastScrollTop = 0;
  const header = document.querySelector('header');
  
  window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    if (scrollTop > 100) {
      // Bajamos la página
      header.style.top = '-80px'; // Ocultar header
    } else {
      // Subimos o estamos arriba
      header.style.top = '0'; // Mostrar header
    }
    
    lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
  });
  
  // Agregar transición suave al header
  header.style.transition = 'top 0.3s ease';
  header.style.position = 'relative';
}

/**
 * Alterna la visibilidad del menú móvil
 * Se ejecuta al click del botón hamburguesa
 * 
 * @returns {void}
 */
function toggleMobileMenu() {
  console.log('📱 Toggle menú móvil');
  
  // Cambiar clase para mostrar/ocultar
  navbar.classList.toggle('active');
  
  // Cambiar icono (opcional)
  if (btnMenuMobile.textContent === '☰') {
    btnMenuMobile.textContent = '✕'; // Cruz
  } else {
    btnMenuMobile.textContent = '☰'; // Hamburguesa
  }
}

/**
 * Maneja el evento de login
 * Muestra un alert simple (en producción, redirigir a login page)
 * 
 * @returns {void}
 */
function handleLogin() {
  console.log('👤 Usuario hace click en login');
  
  // En producción, esto sería:
  // window.location.href = '/login.html';
  
  alert('Redirigiendo a la página de login...');
}

/**
 * Maneja el envío del formulario de contacto
 * Valida datos, muestra feedback, y envía datos al servidor
 * 
 * @param {Event} event - Evento del formulario
 * @returns {void}
 */
function handleFormSubmit(event) {
  // Prevenir comportamiento por defecto (recargar página)
  event.preventDefault();
  
  console.log('📨 Formulario de contacto enviado');
  
  // OBTENER DATOS DEL FORMULARIO
  const formData = new FormData(contactForm);
  const data = {
    name: formData.get('name'),
    email: formData.get('email'),
    phone: formData.get('phone'),
    subject: formData.get('subject'),
    message: formData.get('message')
  };
  
  // VALIDAR DATOS (validación básica del lado del cliente)
  if (!validateForm(data)) {
    alert('⚠️ Por favor, completa todos los campos requeridos correctamente');
    return;
  }
  
  // MOSTRAR LOADING
  const btnSubmit = contactForm.querySelector('button[type="submit"]');
  const originalText = btnSubmit.textContent;
  btnSubmit.textContent = 'Enviando...';
  btnSubmit.disabled = true;
  
  // ENVIAR AL SERVIDOR
  // En un proyecto real, aquí harías una petición fetch a tu servidor
  fetch('/api/contact', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data)
  })
    .then(response => response.json())
    .then(result => {
      // ÉXITO
      console.log('✅ Mensaje enviado correctamente:', result);
      alert('✅ ¡Mensaje enviado correctamente! Te responderemos pronto.');
      
      // Limpiar formulario
      contactForm.reset();
    })
    .catch(error => {
      // ERROR
      console.error('❌ Error al enviar:', error);
      alert('❌ Hubo un error al enviar. Intenta más tarde.');
    })
    .finally(() => {
      // RESTABLECER BOTÓN (tanto si fue éxito como error)
      btnSubmit.textContent = originalText;
      btnSubmit.disabled = false;
    });
}

/**
 * Valida que los datos del formulario sean correctos
 * 
 * VALIDACIONES:
 * - Campos requeridos no estén vacíos
 * - Email sea válido
 * 
 * @param {Object} data - Objeto con datos del formulario
 * @returns {boolean} true si es válido, false si no
 */
function validateForm(data) {
  // Validar campos requeridos
  if (!data.name || !data.email || !data.subject || !data.message) {
    console.warn('⚠️ Campos requeridos vacíos');
    return false;
  }
  
  // Validar email con regex
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(data.email)) {
    console.warn('⚠️ Email inválido:', data.email);
    return false;
  }
  
  // Validar longitud mínima del mensaje
  if (data.message.length < 10) {
    console.warn('⚠️ Mensaje muy corto');
    return false;
  }
  
  return true;
}

/**
 * Resalta la página actual en la navegación
 * Marca con clase 'active' el link de la página donde estamos
 * 
 * @returns {void}
 */
function highlightCurrentPage() {
  // Obtener URL actual
  const currentPage = window.location.pathname;
  
  // Obtener todos los links de navegación
  const navLinks = document.querySelectorAll('.navbar a');
  
  // Recorrer cada link
  navLinks.forEach(link => {
    // Si el href coincide con la página actual
    if (link.getAttribute('href') === currentPage) {
      // Agregar clase 'active'
      link.classList.add('active');
    } else {
      // Remover clase 'active'
      link.classList.remove('active');
    }
  });
}

/**
 * Carga datos guardados en localStorage
 * Recupera información que el usuario guardó anteriormente
 * 
 * localStorage es útil para:
 * - Preferencias del usuario (tema oscuro, idioma)
 * - Datos de borradores (formularios sin enviar)
 * - Información de sesión
 * 
 * @returns {void}
 */
function loadSavedData() {
  // Ejemplo: recuperar nombre del usuario guardado
  const savedName = localStorage.getItem('userName');
  
  if (savedName) {
    console.log('📦 Datos guardados recuperados:', savedName);
    
    // Usar los datos guardados
    // Por ejemplo, llenar un input
    const nameInput = document.getElementById('name');
    if (nameInput) {
      nameInput.value = savedName;
    }
  }
}

/**
 * Guarda datos en localStorage
 * Persiste información en el navegador
 * 
 * @param {string} key - Clave de almacenamiento
 * @param {*} value - Valor a guardar
 * @returns {void}
 */
function saveData(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
    console.log(`💾 Dato guardado: ${key}`);
  } catch (error) {
    console.error('❌ Error al guardar en localStorage:', error);
  }
}

/**
 * Recupera datos de localStorage
 * 
 * @param {string} key - Clave de almacenamiento
 * @returns {*} Valor guardado o null si no existe
 */
function getData(key) {
  try {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.error('❌ Error al recuperar de localStorage:', error);
    return null;
  }
}

// ========== INICIALIZACIÓN ==========
/*
  Ejecutar la función init cuando la página carga completamente
  
  Evento 'DOMContentLoaded': Se ejecuta cuando el HTML está completamente cargado
  Alternativa 'load': Se ejecuta cuando TODO está cargado (incluyendo imágenes)
*/

if (document.readyState === 'loading') {
  // Si el DOM aún se está cargando
  document.addEventListener('DOMContentLoaded', init);
} else {
  // Si el DOM ya está cargado
  init();
}

// ========== EJEMPLO DE FUNCIONES ÚTILES ==========

/**
 * Anima un elemento hacia arriba suavemente
 * Útil para efectos visuales
 * 
 * @param {HTMLElement} element - Elemento a animar
 * @returns {void}
 */
function slideInUp(element) {
  element.style.opacity = '0';
  element.style.transform = 'translateY(30px)';
  
  // Reflow para forzar animación
  void element.offsetWidth;
  
  element.style.transition = 'all 0.5s ease';
  element.style.opacity = '1';
  element.style.transform = 'translateY(0)';
}

/**
 * Agrega clase CSS dinámicamente
 * Útil para cambios de comportamiento
 * 
 * @param {HTMLElement} element - Elemento
 * @param {string} className - Nombre de clase
 * @returns {void}
 */
function addClass(element, className) {
  element.classList.add(className);
}

/**
 * Remueve clase CSS
 * 
 * @param {HTMLElement} element - Elemento
 * @param {string} className - Nombre de clase
 * @returns {void}
 */
function removeClass(element, className) {
  element.classList.remove(className);
}

/*
  PRÓXIMOS PASOS PARA UN JUNIOR:
  
  1. EXPERIMENTA:
     - Abre la página en el navegador
     - Abre DevTools (F12) → Console
     - Prueba escribir: console.log('hola')
     - Intenta hacer click en botones y ve los mensajes
  
  2. APRENDE SOBRE EVENTOS:
     - click, change, submit, scroll, resize
     - Prueba agregar nuevos event listeners
     - Experimenta con diferentes eventos
  
  3. MANIPULA EL DOM:
     - document.querySelector() para seleccionar elementos
     - element.addEventListener() para escuchar eventos
     - element.textContent para cambiar texto
     - element.classList para cambiar clases CSS
  
  4. DEBUGGING:
     - Usa console.log() para ver valores
     - Usa console.error() para ver errores
     - Usa DevTools Debugger para hacer breakpoints
     - Lee los mensajes de error (¡te dicen qué está mal!)
  
  5. MEJORA GRADUAL:
     - No intentes hacer todo a la vez
     - Agrega una función a la vez
     - Prueba cada función inmediatamente
     - Pide ayuda si algo no funciona
*/
