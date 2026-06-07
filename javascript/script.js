/*
  ==================== SCRIPT.JS ====================
  
  DESCRIPCIÓN:
  Este archivo contiene funcionalidades ADICIONALES y complementarias
  del proyecto. A diferencia de main.js que tiene lo esencial,
  este archivo puede contener features específicas del proyecto.
  
  CUÁNDO USAR ESTE ARCHIVO:
  - Scripts que no son críticos para la página
  - Funcionalidades específicas de ciertas secciones
  - Animaciones y efectos especiales
  - Integraciones con terceros (Google Analytics, etc)
  
  DIFERENCIA ENTRE main.js Y script.js:
  
  main.js:
  - Lo esencial y crítico
  - Se carga PRIMERO
  - Contiene funciones globales que usa toda la página
  - Maneja eventos principales
  
  script.js:
  - Features adicionales
  - Se carga DESPUÉS de main.js
  - Complementa la funcionalidad
  - Puede no cargar sin afectar mucho la página
  
  BUENAS PRÁCTICAS:
  - Nombra funciones de manera descriptiva
  - Agrupa funcionalidades relacionadas
  - Usa comentarios para explicar lógica compleja
  - Maneja errores apropiadamente
  - Evita variables globales (usa funciones IIFE)
*/

// ========== PROTECCIÓN CONTRA CONTAMINACIÓN GLOBAL ==========
/*
  Usamos una IIFE (Immediately Invoked Function Expression)
  para evitar que nuestras variables contaminen el scope global
  
  Esto significa que las variables definidas aquí no interfieren
  con variables de otros scripts
*/

(function() {
  'use strict'; // Modo estricto: detecta errores comunes
  
  // ========== VARIABLES LOCALES ==========
  /*
    Estas variables solo existen dentro de esta función
    No interfieren con otros scripts
  */
  
  const DEBUG = true; // Cambiar a false en producción
  
  // ========== LOGGER PERSONALIZADO ==========
  /*
    Función auxiliar para logging consistente
    Útil para debugging
  */
  
  function log(message, type = 'info') {
    if (!DEBUG) return; // No loguear en producción
    
    const timestamp = new Date().toLocaleTimeString();
    const prefix = `[${timestamp}] [${type.toUpperCase()}]`;
    
    switch (type) {
      case 'info':
        console.log(`%c${prefix} ${message}`, 'color: #3498db');
        break;
      case 'success':
        console.log(`%c${prefix} ${message}`, 'color: #27ae60');
        break;
      case 'warning':
        console.warn(`%c${prefix} ${message}`, 'color: #f39c12');
        break;
      case 'error':
        console.error(`%c${prefix} ${message}`, 'color: #e74c3c');
        break;
    }
  }
  
  // ========== EFECTOS Y ANIMACIONES ==========
  
  /**
   * Anima elementos cuando entran en vista (Intersection Observer)
   * Los elementos aparecen con animación cuando el usuario hace scroll
   */
  function setupScrollAnimations() {
    log('Configurando animaciones de scroll...');
    
    // Opciones del Observer
    const options = {
      threshold: 0.2, // 20% del elemento visible
      rootMargin: '0px 0px -100px 0px' // Margen para disparar
    };
    
    // Crear observador
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // Elemento entra en vista
          entry.target.classList.add('animate-in');
          log(`Elemento animado: ${entry.target.className}`);
        }
      });
    }, options);
    
    // Observar todos los elementos con clase 'animate-on-scroll'
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    animatedElements.forEach(element => {
      observer.observe(element);
    });
  }
  
  /**
   * Efecto smooth scroll para anclas internas
   * Cuando clickeas en #about, la página hace scroll suave hacia esa sección
   */
  function setupSmoothScroll() {
    log('Configurando smooth scroll...');
    
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        
        // Ignorar si href es solo '#'
        if (href === '#') return;
        
        const target = document.querySelector(href);
        
        if (target) {
          e.preventDefault();
          
          // Scroll suave hacia el elemento
          target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
          
          log(`Scrolleando hacia: ${href}`);
        }
      });
    });
  }
  
  /**
   * Efecto parallax: Elementos se mueven a diferente velocidad durante scroll
   * Crea profundidad visual
   */
  function setupParallax() {
    log('Configurando efecto parallax...');
    
    const parallaxElements = document.querySelectorAll('[data-parallax]');
    
    if (parallaxElements.length === 0) return;
    
    window.addEventListener('scroll', () => {
      const scrollY = window.scrollY;
      
      parallaxElements.forEach(element => {
        const speed = element.getAttribute('data-parallax') || 0.5;
        element.style.transform = `translateY(${scrollY * speed}px)`;
      });
    });
  }
  
  // ========== VALIDACIÓN DE FORMULARIOS AVANZADA ==========
  
  /**
   * Valida campos de formulario en tiempo real
   * Muestra errores mientras el usuario escribe
   */
  function setupRealtimeValidation() {
    log('Configurando validación en tiempo real...');
    
    const inputs = document.querySelectorAll('input[data-validate], textarea[data-validate]');
    
    inputs.forEach(input => {
      // Validar mientras el usuario escribe
      input.addEventListener('blur', () => {
        const validationType = input.getAttribute('data-validate');
        const isValid = validateInput(input, validationType);
        
        if (!isValid) {
          input.classList.add('error');
          showInputError(input, validationType);
        } else {
          input.classList.remove('error');
          hideInputError(input);
        }
      });
    });
  }
  
  /**
   * Valida un input según su tipo
   * 
   * @param {HTMLElement} input - Input a validar
   * @param {string} type - Tipo de validación (email, phone, etc)
   * @returns {boolean} true si es válido
   */
  function validateInput(input, type) {
    const value = input.value.trim();
    
    switch (type) {
      case 'email':
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
      case 'phone':
        return /^[\d\s\-\+\(\)]{10,}$/.test(value);
      case 'required':
        return value.length > 0;
      case 'minlength':
        const minLength = input.getAttribute('data-minlength') || 5;
        return value.length >= minLength;
      default:
        return true;
    }
  }
  
  /**
   * Muestra un mensaje de error bajo el input
   */
  function showInputError(input, type) {
    // Remover error anterior si existe
    hideInputError(input);
    
    const errorMessage = getErrorMessage(type);
    const errorElement = document.createElement('small');
    errorElement.className = 'error-message';
    errorElement.textContent = errorMessage;
    
    input.parentElement.appendChild(errorElement);
  }
  
  /**
   * Oculta el mensaje de error
   */
  function hideInputError(input) {
    const errorElement = input.parentElement.querySelector('.error-message');
    if (errorElement) {
      errorElement.remove();
    }
  }
  
  /**
   * Retorna el mensaje de error apropiado
   */
  function getErrorMessage(type) {
    const messages = {
      email: '📧 Por favor ingresa un email válido',
      phone: '📱 Por favor ingresa un teléfono válido',
      required: '⚠️ Este campo es requerido',
      minlength: '⚠️ El texto es muy corto'
    };
    
    return messages[type] || 'Campo inválido';
  }
  
  // ========== CONTADOR O ESTADÍSTICAS ==========
  
  /**
   * Anima contadores numéricos
   * Útil para mostrar estadísticas (clientes, proyectos, etc)
   * 
   * Uso HTML:
   * <span class="counter" data-target="1000">0</span>
   */
  function animateCounters() {
    log('Animando contadores...');
    
    const counters = document.querySelectorAll('.counter');
    const speed = 200; // Velocidad de animación
    
    counters.forEach(counter => {
      const target = parseInt(counter.getAttribute('data-target'));
      const increment = target / speed;
      
      let current = 0;
      
      const updateCounter = setInterval(() => {
        current += increment;
        
        if (current >= target) {
          counter.textContent = target;
          clearInterval(updateCounter);
        } else {
          counter.textContent = Math.ceil(current);
        }
      }, 50);
    });
  }
  
  // ========== UTILITIES (FUNCIONES ÚTILES) ==========
  
  /**
   * Copia texto al portapapeles
   * Útil para botones "copiar"
   */
  function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
      log('Texto copiado al portapapeles', 'success');
    }).catch(() => {
      log('Error al copiar al portapapeles', 'error');
    });
  }
  
  /**
   * Espera un tiempo (en milisegundos)
   * Útil con async/await
   */
  function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
  
  /**
   * Throttle: Limita cuántas veces se ejecuta una función
   * Útil para eventos de scroll/resize que se disparan mucho
   */
  function throttle(func, limit) {
    let inThrottle;
    return function(...args) {
      if (!inThrottle) {
        func.apply(this, args);
        inThrottle = true;
        setTimeout(() => inThrottle = false, limit);
      }
    };
  }
  
  /**
   * Debounce: Espera a que dejes de hacer algo antes de ejecutar
   * Útil para búsqueda mientras escribes
   */
  function debounce(func, delay) {
    let timeoutId;
    return function(...args) {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => func.apply(this, args), delay);
    };
  }
  
  // ========== INICIALIZACIÓN ==========
  
  /**
   * Función principal que inicializa todas las funcionalidades
   */
  function init() {
    log('script.js inicializándose...', 'info');
    
    // Ejecutar todas las funciones
    setupScrollAnimations();
    setupSmoothScroll();
    setupParallax();
    setupRealtimeValidation();
    animateCounters();
    
    log('script.js inicializado correctamente', 'success');
  }
  
  // Ejecutar cuando el DOM está listo
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
  
  // Exportar funciones públicas (si otros scripts las necesitan)
  window.scriptUtils = {
    copyToClipboard,
    delay,
    throttle,
    debounce,
    log
  };
  
})(); // Cierre de IIFE

/*
  NOTAS IMPORTANTES:
  
  1. IIFE (Immediately Invoked Function Expression):
     - (function() { ... })() es una función que se ejecuta inmediatamente
     - Evita contaminar el scope global
     - Todas las variables aquí son locales
  
  2. 'use strict':
     - Modo estricto de JavaScript
     - Detecta errores comunes
     - Mejora la seguridad
  
  3. INTERSECTION OBSERVER:
     - Detecta cuando elementos entran en vista
     - Ideal para animaciones de scroll
     - Mucho más eficiente que listening al scroll event
  
  4. DEBUGGING:
     - Usa la función log() en lugar de console.log()
     - Cambiar DEBUG = false en producción
     - Todos los logs se mostrarán con el timestamp
  
  5. PRÓXIMAS MEJORAS:
     - Agregar más validaciones personalizadas
     - Implementar sistema de notificaciones
     - Agregar más efectos visuales
     - Integrar con APIs externas
*/
