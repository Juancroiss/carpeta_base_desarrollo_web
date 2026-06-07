# 📁 CARPETA: Assets

## Descripción
Esta carpeta contiene todos los **recursos multimedia** de tu página web:
imágenes, fuentes, iconos, etc.

Es recomendable **organizar** estos archivos en subcarpetas para mantener todo limpio.

## 📂 Subcarpetas

### 1. 📸 **image/** - Imágenes
Almacena todas las imágenes del sitio:
- Fotos y fotografías
- Banners
- Fondos
- Imágenes de fondo
- Screenshots

**Formatos recomendados**:
- **JPG/JPEG**: Fotos (más comprimidas)
- **PNG**: Imágenes con transparencia
- **WebP**: Formato moderno (más ligero)
- **SVG**: Gráficos vectoriales (escalables)

**Ejemplo de uso en HTML**:
```html
<img src="../assets/image/logo.png" alt="Logo de la empresa">
<img src="../assets/image/background.jpg" alt="Fondo">
```

**Ejemplo de uso en CSS**:
```css
.hero {
  background-image: url('../assets/image/background.jpg');
  background-size: cover;
  background-position: center;
}
```

**Buenas prácticas**:
- Usa nombres descriptivos: `user-profile.png` (no `imagen1.png`)
- Optimiza tamaño: Usa herramientas como TinyPNG
- Proporciona alt text: `alt="Descripción de la imagen"`
- Usa formatos modernos: Considera WebP

---

### 2. 🔤 **fonts/** - Fuentes personalizadas
Almacena fuentes (.woff, .ttf, .otf) para usar en la página.

**¿Por qué fuentes personalizadas?**
Navegadores incluyen solo fuentes básicas (Arial, Times, etc).
Si quieres fuentes especiales, debes subirlas.

**Ejemplo de uso en CSS**:
```css
@font-face {
  font-family: 'MiFuente';
  src: url('../assets/fonts/mifuente.woff') format('woff');
}

body {
  font-family: 'MiFuente', sans-serif;
}
```

**Servicios de fuentes gratuitas**:
- Google Fonts: https://fonts.google.com/ (recomendado)
- Font Awesome: https://fontawesome.com/ (iconos)
- Dafont: https://www.dafont.com/

**Nota**: Google Fonts es más fácil que descargar archivos.

---

### 3. 🎨 **icons/** - Iconos
Almacena iconos de la página:
- Botones de redes sociales
- Iconos de navegación
- Iconos de features
- Favicons

**Formatos recomendados**:
- **SVG**: Mejor (escalable, pequeño)
- **PNG**: Buena alternativa
- Evitar JPG para iconos

**Ejemplo de uso**:
```html
<!-- Icono SVG -->
<img src="../assets/icons/facebook.svg" alt="Facebook">

<!-- Icono PNG -->
<img src="../assets/icons/menu.png" alt="Menú">

<!-- Font Awesome (más fácil) -->
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css">
<i class="fab fa-facebook"></i>
```

---

## 📊 Organización recomendada

```
assets/
├── image/
│   ├── logo.png
│   ├── hero-banner.jpg
│   ├── product-1.png
│   └── background.svg
│
├── fonts/
│   ├── font1.woff
│   ├── font2.ttf
│   └── font3.otf
│
├── icons/
│   ├── facebook.svg
│   ├── twitter.svg
│   ├── menu.svg
│   └── close.svg
│
└── videos/ (opcional)
    ├── intro.mp4
    └── tutorial.webm
```

---

## 🎯 Optimización de archivos

### Imágenes
**Problema**: Las imágenes son los archivos más grandes, ralentizan la página.

**Soluciones**:
1. **Comprimir imágenes**:
   - TinyPNG: https://tinypng.com/
   - ImageOptim: https://imageoptim.com/
   - Reduce tamaño sin perder calidad

2. **Usar formato correcto**:
   ```
   ✅ Foto → JPG (más comprimido)
   ✅ Gráfico → PNG o SVG
   ✅ Icono → SVG (ideal)
   ❌ Foto → PNG (más grande)
   ❌ Icono → JPG (sin sentido)
   ```

3. **Lazy loading** (cargar solo cuando se ve):
   ```html
   <img src="imagen.jpg" loading="lazy" alt="Descripción">
   ```

4. **Responsive images**:
   ```html
   <!-- Mostrar diferente tamaño según dispositivo -->
   <img srcset="
     imagen-pequeña.jpg 320w,
     imagen-mediana.jpg 768w,
     imagen-grande.jpg 1200w"
     src="imagen-grande.jpg"
     alt="Descripción">
   ```

### Fuentes
**Problema**: Las fuentes tipográficas pueden ser muy pesadas.

**Soluciones**:
1. **Usar Google Fonts** (más rápido):
   ```html
   <link href="https://fonts.googleapis.com/css2?family=Roboto&display=swap" rel="stylesheet">
   ```

2. **Cargar solo variantes necesarias**:
   ```html
   <!-- Solo regular y bold, no todas las variantes -->
   <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap" rel="stylesheet">
   ```

3. **Web font display swap**:
   ```css
   @font-face {
     font-family: 'MiFuente';
     src: url('mifuente.woff') format('woff');
     font-display: swap; /* Mostrar fuente del sistema hasta cargar */
   }
   ```

---

## 🔍 Debugging de assets

**Problema**: Imagen no aparece.

**Pasos para solucionar**:
1. Revisa la ruta: ¿Es relativa correcta?
   ```html
   <!-- Desde html/Index.html -->
   ✅ <img src="../assets/image/logo.png">
   ❌ <img src="assets/image/logo.png"> <!-- Falta ../ -->
   ```

2. Abre DevTools (F12) → Networks → vuelve a cargar
   - Si hay error rojo, la ruta está mal
   - Haz click en el recurso para ver detalles

3. Verifica el nombre del archivo:
   - Windows NO es case-sensitive (logo.png = Logo.png)
   - Servidores web SÍ lo son (cuidado en producción)

---

## 💡 Casos de uso

### Logo en header
```html
<header>
  <img src="../assets/image/logo.png" alt="Logo de la empresa">
</header>
```

### Fondo de página
```css
body {
  background-image: url('../assets/image/background.jpg');
  background-size: cover;
  background-attachment: fixed; /* Parallax */
}
```

### Icono en botón
```html
<button>
  <img src="../assets/icons/arrow.svg" alt="Flecha">
  Descargar
</button>
```

### Galería de imágenes
```html
<div class="gallery">
  <img src="../assets/image/photo1.jpg" alt="Foto 1">
  <img src="../assets/image/photo2.jpg" alt="Foto 2">
  <img src="../assets/image/photo3.jpg" alt="Foto 3">
</div>
```

---

## ⚠️ Errores comunes

1. **Rutas incorrectas**:
   ```html
   ❌ <img src="image/logo.png">      <!-- Desde html/ -->
   ✅ <img src="../assets/image/logo.png">
   ```

2. **Olvidar alt text**:
   ```html
   ❌ <img src="logo.png">
   ✅ <img src="logo.png" alt="Logo de la empresa">
   ```

3. **Archivos muy pesados**:
   ```
   ❌ Foto: 5 MB (demasiado grande)
   ✅ Foto optimizada: 200 KB
   ```

4. **Formato incorrecto**:
   ```
   ❌ JPG para icono (ineficiente)
   ✅ SVG para icono (perfecto)
   ```

---

## 🚀 Herramientas útiles

| Herramienta | Propósito | URL |
|-------------|-----------|-----|
| TinyPNG | Comprimir imágenes | https://tinypng.com |
| Squoosh | Optimizar imágenes | https://squoosh.app |
| Google Fonts | Fuentes gratuitas | https://fonts.google.com |
| Font Awesome | Iconos | https://fontawesome.com |
| Can I Use | Compatibilidad | https://caniuse.com |

---

## 📚 Próximos pasos

1. **Organiza tus archivos**: Crea subcarpetas limpias
2. **Optimiza imágenes**: Usa TinyPNG antes de subirlas
3. **Usa Google Fonts**: Es más fácil que descargar fuentes
4. **Aprovecha SVG**: Para iconos y gráficos
5. **Prueba lazy loading**: Para mejorar rendimiento

---

**Consejo**: Mantén los archivos de assets organizados y optimizados. Una página rápida es mejor que una lenta. ⚡
