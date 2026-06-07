# 📁 CARPETA: CSS

## Descripción
Esta carpeta contiene todos los archivos CSS (.css) de tu página web.
Los archivos CSS son responsables del **diseño visual** de la página (colores, fuentes, layouts).

## ¿Qué es CSS?
CSS significa "Cascading Style Sheets" (Hojas de Estilo en Cascada).
- Define cómo se **ve** la página
- Controla colores, tamaños, posiciones
- Hace que la página sea **responsive** (funcione en móvil)
- No crea contenido (eso lo hace HTML)

## 📂 Archivos en esta carpeta

### 1. **reset.css** 🔄
**Propósito**: Normalizar estilos entre navegadores

Cada navegador (Chrome, Firefox, Safari) aplica estilos diferentes a los elementos.
Este archivo elimina esos estilos por defecto para tener un punto de partida consistente.

**Qué hace**:
- Elimina márgenes y padding por defecto
- Normaliza tamaños de fuente
- Normaliza comportamiento de cajas
- Se carga **PRIMERO** (antes que otros CSS)

**Ejemplo del problema**:
```css
/* Sin reset.css */
<h1> se ve diferente en Chrome que en Firefox

/* Con reset.css */
<h1> se ve igual en todos los navegadores
```

---

### 2. **header.css** 🎯
**Propósito**: Estilos específicos del encabezado (header)

Contiene todos los estilos para:
- Logo
- Menú de navegación
- Botones del header (login, etc)
- Efectos hover

**Estructura de clases**:
- `.header` - Contenedor principal
- `.header-container` - Contenedor interno
- `.logo` - Logo del sitio
- `.navbar` - Barra de navegación
- `.btn-login` - Botón de login

**Ejemplo**:
```css
.header {
  background-color: #2c3e50;
  padding: 1rem 2rem;
}

.navbar a:hover {
  color: #3498db;
  border-bottom: 2px solid #3498db;
}
```

---

### 3. **styles.css** 🎨
**Propósito**: Estilos principales y componentes reutilizables

Este es el archivo CSS **más importante**. Contiene:
- Variables CSS (colores, fuentes, espaciado)
- Estilos globales
- Componentes reutilizables (botones, tarjetas)
- Utilidades

**Estructura**:
```css
/* Variables CSS */
:root {
  --color-primary: #3498db;
  --font-size-base: 1rem;
}

/* Estilos globales */
body { ... }
h1, h2, h3 { ... }

/* Componentes */
.btn { ... }
.card { ... }

/* Utilidades */
.text-center { ... }
.mt-1 { ... }
```

**Variables CSS** (el corazón de styles.css):
```css
:root {
  --color-primary: #3498db;      /* Color principal */
  --color-dark: #2c3e50;          /* Color oscuro */
  --font-size-base: 1rem;         /* Tamaño de fuente */
  --spacing-md: 1rem;             /* Espaciado */
}
```

Ahora usas estas variables en lugar de escribir valores:
```css
/* ❌ Malo: valores harcodeados */
.button {
  background-color: #3498db;
}

/* ✅ Bueno: usando variables */
.button {
  background-color: var(--color-primary);
}
```

**Ventajas de variables CSS**:
- Cambiar color global es fácil (cambiar una línea)
- Coherencia en toda la página
- Fácil crear temas (dark mode, etc)

---

### 4. **responsive.css** 📱
**Propósito**: Hacer que la página se adapte a diferentes tamaños de pantalla

Usa **media queries** para aplicar estilos diferentes según el tamaño:

**Breakpoints (puntos de quiebre)**:
- Móvil: < 768px
- Tablet: 768px - 1023px
- Desktop: >= 1024px

**Ejemplo**:
```css
/* Por defecto (móvil) */
.navbar {
  display: none; /* Menú oculto en móvil */
}

/* Tablet y más grande */
@media (min-width: 768px) {
  .navbar {
    display: flex; /* Menú visible en tablet */
  }
}
```

**Estrategia "Mobile First"**:
1. Escribir estilos para móvil primero
2. Usar `@media (min-width: ...)` para pantallas más grandes
3. Agregar estilos adicionales conforme aumenta el tamaño

**Común media queries**:
```css
/* Tablet */
@media (min-width: 768px) { ... }

/* Desktop */
@media (min-width: 1024px) { ... }

/* Desktop grande */
@media (min-width: 1440px) { ... }

/* Orientación */
@media (orientation: portrait) { ... }
@media (orientation: landscape) { ... }

/* Preferencia de usuario */
@media (prefers-color-scheme: dark) { ... }
```

## 🎯 Cómo estos archivos trabajan juntos

```
1. reset.css        (Se carga PRIMERO)
   └─ Elimina estilos por defecto del navegador
   
2. header.css       (Se carga SEGUNDO)
   └─ Estilos específicos del header
   
3. styles.css       (Se carga TERCERO)
   └─ Estilos principales y componentes
   
4. responsive.css   (Se carga ÚLTIMO)
   └─ Adaptaciones para diferentes pantallas
```

**La cascada**: Si dos archivos definen `.button`, gana el que se carga **último**.

## 📐 Unidades CSS comunes

| Unidad | Significado | Ejemplo |
|--------|-------------|---------|
| `px` | Píxeles (absoluto) | `width: 100px` |
| `rem` | Relativo a fuente base | `font-size: 1rem` (16px) |
| `em` | Relativo al padre | `padding: 1em` |
| `%` | Porcentaje | `width: 50%` |
| `vh` | Altura de viewport | `height: 100vh` (pantalla completa) |
| `vw` | Ancho de viewport | `width: 100vw` |

**Recomendación**: Usa `rem` para la mayoría de casos (es escalable).

## 🏗️ Layouts en CSS

### 1. Flexbox (para diseños simples)
```css
.container {
  display: flex;
  justify-content: space-between;  /* Distribuir horizontalmente */
  align-items: center;             /* Alinear verticalmente */
  gap: 1rem;                       /* Espacio entre elementos */
}
```

### 2. CSS Grid (para diseños complejos)
```css
.container {
  display: grid;
  grid-template-columns: 1fr 1fr;  /* 2 columnas iguales */
  gap: 2rem;                       /* Espacio entre elementos */
}
```

## 🎨 Selectores CSS

```css
/* Elemento */
p { ... }

/* Clase */
.button { ... }

/* ID */
#header { ... }

/* Atributo */
input[type="email"] { ... }

/* Pseudo-clase */
a:hover { ... }
button:active { ... }

/* Pseudo-elemento */
p::first-line { ... }
```

## ✅ Buenas prácticas CSS

1. **Usa clases, no IDs**: Más flexible y reutilizable
   ```css
   ✅ .btn { ... }
   ❌ #myButton { ... }
   ```

2. **Nombra clases con BEM**: Claro y consistente
   ```css
   .card { ... }           /* Componente */
   .card__title { ... }    /* Elemento dentro */
   .card--active { ... }   /* Variante */
   ```

3. **Evita !important**: Es un "olor a código"
   ```css
   ❌ color: red !important;
   ✅ color: red;
   ```

4. **Agrupa selectores relacionados**:
   ```css
   /* ✅ Bueno */
   h1, h2, h3 {
     font-weight: bold;
   }
   
   /* ❌ Malo */
   h1 { font-weight: bold; }
   h2 { font-weight: bold; }
   h3 { font-weight: bold; }
   ```

5. **Usa variables para valores repetidos**:
   ```css
   :root {
     --primary-color: #3498db;
   }
   
   .btn { background-color: var(--primary-color); }
   .header { color: var(--primary-color); }
   ```

## 🐛 Debugging CSS

1. **Abre DevTools**: F12
2. **Click en "Inspect"** (ícono de flecha)
3. **Click en el elemento** que quieres inspeccionar
4. **Mira qué CSS se aplica** en el panel derecho
5. **Prueba cambios** directamente en DevTools
6. **Copia los cambios** a tus archivos CSS

## ⚠️ Errores comunes

1. **Ruta incorrecta a archivo CSS**:
   ```html
   <!-- ❌ No funciona -->
   <link rel="stylesheet" href="styles.css">
   
   <!-- ✅ Correcto -->
   <link rel="stylesheet" href="../css/styles.css">
   ```

2. **Especificidad conflictiva**:
   ```css
   /* .button es más específico que .btn */
   .btn { color: blue; }
   .button { color: red; } /* Esta gana */
   ```

3. **Box-sizing olvidado**:
   ```css
   /* ❌ padding se suma al width */
   .box { width: 100px; padding: 10px; }
   
   /* ✅ padding incluido en width */
   .box { 
     width: 100px; 
     padding: 10px;
     box-sizing: border-box;
   }
   ```

## 📚 Próximos pasos

1. **Experimenta con variables CSS**: Cambia valores en :root
2. **Prueba media queries**: Abre DevTools y cambia tamaño de pantalla
3. **Aprende Flexbox y Grid**: Son fundamentales para layouts
4. **Crea más componentes**: Botones, tarjetas, formas
5. **Personaliza colores**: Crea tu propia paleta

## 📖 Recursos para aprender

- MDN CSS: https://developer.mozilla.org/es/docs/Web/CSS
- CSS Tricks: https://css-tricks.com/
- Flexbox Guide: https://css-tricks.com/snippets/css/a-guide-to-flexbox/
- Grid Guide: https://css-tricks.com/snippets/css/complete-guide-grid/

---

**Consejo**: Los comentarios en cada archivo CSS explican en detalle qué hace cada sección. ¡Léelos! 👀
