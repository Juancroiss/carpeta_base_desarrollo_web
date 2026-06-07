# 📁 CARPETA: JavaScript

## Descripción
Esta carpeta contiene todos los archivos JavaScript (.js) de tu página web.
Los archivos JavaScript hacen que la página sea **interactiva** (responden a clicks, validaciones, animaciones).

## ¿Qué es JavaScript?
JavaScript es un lenguaje de programación que corre en el **navegador** (en la computadora del usuario).
- Hace la página **interactiva** (responde a eventos)
- Valida formularios **antes** de enviar
- Anima elementos
- Carga datos dinámicamente (sin recargar)
- Manipula el HTML y CSS

## 📂 Archivos en esta carpeta

### 1. **main.js** ⭐ (Lo más importante)
**Propósito**: Script PRINCIPAL con funcionalidades esenciales

Contiene:
- Selección de elementos HTML
- Event listeners principales (clicks, submit)
- Validación de formularios
- Funciones críticas para que la página funcione

**Estructura básica**:
```javascript
// 1. VARIABLES - Guardar referencias a elementos
const button = document.querySelector('.btn');

// 2. FUNCIONES - Bloques reutilizables de código
function handleClick() {
  console.log('¡Botón clickeado!');
}

// 3. EVENT LISTENERS - Escuchar eventos del usuario
button.addEventListener('click', handleClick);

// 4. INICIALIZACIÓN - Ejecutar todo al cargar la página
function init() {
  // Código de inicialización
}

document.addEventListener('DOMContentLoaded', init);
```

---

### 2. **script.js** 🎯 (Funcionalidades adicionales)
**Propósito**: Script SECUNDARIO con funcionalidades opcionales

Contiene:
- Animaciones y efectos especiales
- Validación avanzada de formularios
- Integraciones con servicios externos
- Features que NO son críticas

**Diferencia importante**:
- **main.js**: Essencial. Si falla, la página NO funciona.
- **script.js**: Opcional. Si falla, la página sigue funcionando.

**Estructura**:
```javascript
// IIFE: Función que se ejecuta inmediatamente
// Protege el scope global
(function() {
  'use strict'; // Modo estricto
  
  function animateElements() {
    // Animar elementos
  }
  
  function init() {
    animateElements();
  }
  
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
```

---

## 🔑 Conceptos principales

### 1. El DOM (Document Object Model)
Es la representación del HTML en JavaScript.

```html
<!-- HTML -->
<div class="card">
  <h1>Título</h1>
  <p>Contenido</p>
</div>
```

```javascript
// Acceder a través del DOM
const card = document.querySelector('.card');
const title = card.querySelector('h1');
const text = card.querySelector('p');

// Cambiar contenido
title.textContent = 'Nuevo título';

// Cambiar atributos
card.className = 'card active';

// Cambiar estilos
card.style.backgroundColor = 'blue';
```

### 2. Selectores (encontrar elementos)
```javascript
// Seleccionar UN elemento
const button = document.querySelector('.btn');      // Primera coincidencia
const header = document.getElementById('header');   // Por ID

// Seleccionar MÚLTIPLES elementos
const buttons = document.querySelectorAll('.btn');
buttons.forEach(btn => {
  console.log(btn);
});
```

### 3. Event Listeners (escuchar eventos)
```javascript
const button = document.querySelector('.btn');

// Evento: click
button.addEventListener('click', () => {
  console.log('¡Clickeado!');
});

// Evento: submit (en formularios)
form.addEventListener('submit', (event) => {
  event.preventDefault(); // Prevenir envío
  console.log('Formulario enviado');
});

// Evento: change (en inputs)
input.addEventListener('change', () => {
  console.log('Valor cambió:', input.value);
});

// Evento: keydown (tecla presionada)
document.addEventListener('keydown', (event) => {
  console.log('Tecla presionada:', event.key);
});
```

### 4. Funciones (bloques reutilizables)
```javascript
// Función simple
function saludar(nombre) {
  return `Hola, ${nombre}`;
}

// Función flecha (moderna)
const saludar = (nombre) => `Hola, ${nombre}`;

// Función con operaciones
function validarEmail(email) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

// Función asincrónica (para peticiones HTTP)
async function obtenerDatos() {
  const response = await fetch('/api/datos');
  const data = await response.json();
  return data;
}
```

### 5. localStorage (guardar datos)
```javascript
// Guardar datos
localStorage.setItem('usuario', 'Juan');
localStorage.setItem('config', JSON.stringify({ tema: 'oscuro' }));

// Recuperar datos
const usuario = localStorage.getItem('usuario');
const config = JSON.parse(localStorage.getItem('config'));

// Eliminar datos
localStorage.removeItem('usuario');

// Limpiar todo
localStorage.clear();
```

---

## 📊 Flujo de ejecución

```
1. HTML se carga (DOMContentLoaded)
   ↓
2. Seleccionar elementos del DOM
   ↓
3. Agregar event listeners
   ↓
4. Usuario interactúa (click, escribe, etc)
   ↓
5. Evento se dispara
   ↓
6. Función se ejecuta
   ↓
7. DOM se actualiza
   ↓
8. Usuario ve cambios
```

**Ejemplo visual**:
```
HTML: <button class="btn">Click me</button>

JavaScript:
  ↓ Seleccionar
  const btn = document.querySelector('.btn');
  ↓ Escuchar
  btn.addEventListener('click', () => { ... });
  ↓ Usuario hace click
  ✓ Función se ejecuta
  ↓ DOM se actualiza
  Página cambia
```

---

## 🎯 Casos de uso comunes

### 1. Validar formulario
```javascript
const form = document.getElementById('contact-form');

form.addEventListener('submit', (e) => {
  e.preventDefault();
  
  const email = document.getElementById('email').value;
  
  // Validar
  if (!email.includes('@')) {
    alert('❌ Email inválido');
    return;
  }
  
  // Enviar
  form.submit();
});
```

### 2. Mostrar/ocultar elemento
```javascript
const button = document.querySelector('.toggle-btn');
const content = document.querySelector('.content');

button.addEventListener('click', () => {
  // Toggle: mostrar si está oculto, ocultar si está visible
  content.style.display = content.style.display === 'none' ? 'block' : 'none';
  
  // O usando clases:
  content.classList.toggle('hidden');
});
```

### 3. Contar clics
```javascript
let contador = 0;
const button = document.querySelector('.btn');
const display = document.querySelector('.contador');

button.addEventListener('click', () => {
  contador++;
  display.textContent = contador;
});
```

### 4. Cambiar tema (dark/light)
```javascript
const themeButton = document.querySelector('.theme-toggle');
const htmlElement = document.documentElement;

themeButton.addEventListener('click', () => {
  if (htmlElement.getAttribute('data-theme') === 'dark') {
    htmlElement.setAttribute('data-theme', 'light');
    localStorage.setItem('theme', 'light');
  } else {
    htmlElement.setAttribute('data-theme', 'dark');
    localStorage.setItem('theme', 'dark');
  }
});

// Cargar tema guardado
const savedTheme = localStorage.getItem('theme') || 'light';
htmlElement.setAttribute('data-theme', savedTheme);
```

---

## ⚠️ Errores comunes

1. **Elemento no encontrado**:
   ```javascript
   // ❌ Si .btn no existe, esto causa error
   document.querySelector('.btn').addEventListener('click', ...);
   
   // ✅ Verificar antes
   const btn = document.querySelector('.btn');
   if (btn) {
     btn.addEventListener('click', ...);
   }
   ```

2. **Olvidar event.preventDefault()**:
   ```javascript
   // ❌ Formulario se envía y página recarga
   form.addEventListener('submit', (e) => {
     validarFormulario();
   });
   
   // ✅ Prevenir envío
   form.addEventListener('submit', (e) => {
     e.preventDefault();
     validarFormulario();
   });
   ```

3. **Scope global contaminado**:
   ```javascript
   // ❌ Malo: polluciona el scope global
   const myVar = 'algo';
   function myFunc() { ... }
   
   // ✅ Bueno: usar IIFE
   (function() {
     const myVar = 'algo';
     function myFunc() { ... }
   })();
   ```

4. **Async/await sin try-catch**:
   ```javascript
   // ❌ Si falla, todo se rompe
   async function getData() {
     const response = await fetch('/api/datos');
     return await response.json();
   }
   
   // ✅ Manejar errores
   async function getData() {
     try {
       const response = await fetch('/api/datos');
       return await response.json();
     } catch (error) {
       console.error('Error:', error);
     }
   }
   ```

---

## 🚀 Buenas prácticas

1. **Usa const por defecto**
   ```javascript
   ✅ const nombre = 'Juan';
   ❌ var nombre = 'Juan';
   ❌ let nombre = 'Juan'; (solo si necesitas reasignar)
   ```

2. **Nombra funciones claramente**
   ```javascript
   ✅ function validarEmail(email) { ... }
   ❌ function check(x) { ... }
   ```

3. **Comenta código complejo**
   ```javascript
   // Algoritmo de búsqueda binaria
   function busquedaBinaria(arr, target) {
     // Explicar cada paso importante
   }
   ```

4. **Usa console.log para debugging**
   ```javascript
   function procesar(data) {
     console.log('Data recibida:', data);
     const resultado = data.map(x => x * 2);
     console.log('Resultado:', resultado);
     return resultado;
   }
   
   // F12 → Console → ver logs
   ```

5. **Maneja errores**
   ```javascript
   try {
     // Código que puede fallar
     JSON.parse('JSON inválido');
   } catch (error) {
     console.error('Error:', error.message);
   }
   ```

---

## 📚 Métodos útiles del DOM

```javascript
// Seleccionar
document.querySelector('.clase')           // Un elemento
document.querySelectorAll('.clase')        // Múltiples
document.getElementById('id')              // Por ID

// Modificar contenido
element.textContent = 'nuevo texto'        // Texto plano
element.innerHTML = '<span>HTML</span>'    // Con HTML

// Modificar atributos
element.setAttribute('data-id', '123')
element.getAttribute('data-id')
element.removeAttribute('data-id')

// Modificar clases
element.classList.add('activo')
element.classList.remove('activo')
element.classList.toggle('activo')
element.classList.contains('activo')

// Modificar estilos
element.style.color = 'red'
element.style.display = 'none'

// Crear elementos
const nuevo = document.createElement('div')
element.appendChild(nuevo)                 // Agregar
element.removeChild(nuevo)                 // Remover

// Navegación
element.parentElement                      // Padre
element.children                           // Hijos
element.nextElementSibling                 // Siguiente
element.previousElementSibling             // Anterior
```

---

## 🔄 Fetch (peticiones HTTP)

```javascript
// GET - Obtener datos
fetch('/api/usuarios')
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error('Error:', error));

// POST - Enviar datos
fetch('/api/usuarios', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({ nombre: 'Juan', email: 'juan@mail.com' })
})
  .then(response => response.json())
  .then(data => console.log('Éxito:', data))
  .catch(error => console.error('Error:', error));

// Con async/await (más limpio)
async function obtenerUsuarios() {
  try {
    const response = await fetch('/api/usuarios');
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error('Error:', error);
  }
}
```

---

## 📖 Próximos pasos

1. **Abre DevTools**: F12 → Console
2. **Practica con querySelector**: `document.querySelector('.btn')`
3. **Agrega event listeners**: `addEventListener('click', ...)`
4. **Manipula el DOM**: `element.textContent = '...'`
5. **Usa console.log para debugging**: Ver qué está pasando
6. **Lee los comentarios en main.js y script.js**: Están detallados

---

## 📚 Recursos para aprender

- MDN JavaScript: https://developer.mozilla.org/es/docs/Web/JavaScript
- W3Schools JS: https://www.w3schools.com/js/
- JavaScript.info: https://es.javascript.info/

---

**Consejo de oro**: El navegador es tu mejor amigo. Abre DevTools (F12) y experimenta. ¡No hay límite! 🚀
