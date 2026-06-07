# 📁 CARPETA: HTML

## Descripción
Esta carpeta contiene todos los archivos HTML (.html) de tu página web.
Los archivos HTML son la **estructura** de la página (el esqueleto).

## ¿Qué es HTML?
HTML significa "HyperText Markup Language" (Lenguaje de Marcado de Hipertexto).
- Define la **estructura** de la página
- Usa etiquetas como `<h1>`, `<p>`, `<button>`, etc.
- No crea diseño visual (eso lo hace CSS)
- No hace la página interactiva (eso lo hace JavaScript)

## 📂 Contenido de esta carpeta

### Archivos principales:
- **Index.html**: Página principal. Es la primera página que se carga.

### Subcarpeta `partials/`:
Los "partials" son fragmentos HTML que se reutilizan en múltiples páginas.

- **header.html**: Encabezado con navegación y logo
- **footer.html**: Pie de página con links, contacto, copyright
- **about.html**: Sección "Acerca de nosotros"
- **contact.html**: Formulario de contacto

## ¿Por qué usar partials?

❌ **Sin partials** (Malo):
```
- home.html (contiene header, footer)
- about.html (contiene header, footer)
- contact.html (contiene header, footer)
```
Si cambias el header, debes editar 3 archivos. ¡Mucho trabajo!

✅ **Con partials** (Bueno):
```
- header.html (reutilizable)
- footer.html (reutilizable)
- home.html (incluye header y footer)
- about.html (incluye header y footer)
- contact.html (incluye header y footer)
```
Si cambias el header, solo editas 1 archivo. ¡Mucho más fácil!

## 📖 Estructura básica de un HTML

```html
<!DOCTYPE html>
<html lang="es">
  <head>
    <!-- Información sobre la página (invisible para el usuario) -->
    <meta charset="UTF-8">
    <title>Título de la página</title>
    <link rel="stylesheet" href="styles.css">
  </head>
  <body>
    <!-- Contenido visible para el usuario -->
    <header>Encabezado</header>
    <main>Contenido principal</main>
    <footer>Pie de página</footer>
    
    <script src="script.js"></script>
  </body>
</html>
```

## 🎯 Elementos HTML comunes

| Elemento | Propósito | Ejemplo |
|----------|-----------|---------|
| `<h1>` a `<h6>` | Encabezados | `<h1>Título Principal</h1>` |
| `<p>` | Párrafo | `<p>Texto normal</p>` |
| `<a>` | Link | `<a href="about.html">Acerca de</a>` |
| `<button>` | Botón | `<button>Click me</button>` |
| `<input>` | Input | `<input type="email">` |
| `<textarea>` | Área de texto | `<textarea>Mensaje</textarea>` |
| `<div>` | Contenedor | `<div class="card">Tarjeta</div>` |
| `<section>` | Sección | `<section>Contenido</section>` |
| `<header>` | Encabezado | `<header>Nav y logo</header>` |
| `<footer>` | Pie de página | `<footer>Copyright</footer>` |

## ✅ Buenas prácticas

1. **Indentación**: Indenta el código para legibilidad
   ```html
   <div>
     <p>Texto indentado</p>
   </div>
   ```

2. **Semántica**: Usa etiquetas apropiadas
   ```html
   ✅ <button>Enviar</button>
   ❌ <div onclick="send()">Enviar</div>
   ```

3. **Atributos útiles**:
   - `id="unique-id"`: Identificador único (para JavaScript)
   - `class="nombre-clase"`: Clase para estilos CSS
   - `data-custom="value"`: Datos personalizados
   - `aria-label="texto"`: Accesibilidad

4. **Comentarios**: Documenta secciones complejas
   ```html
   <!-- SECCIÓN: Formulario de login -->
   <form id="login-form">
     <!-- Campo de email -->
     <input type="email">
   </form>
   ```

## 🚀 Cómo empezar a desarrollar

1. **Abre Index.html** en tu editor
2. **Agrega contenido**: Copia el estructura de los partials
3. **Vincula CSS**: Asegúrate de que `<link rel="stylesheet">` apunta correctamente
4. **Vincula JavaScript**: Asegúrate de que `<script>` está antes de `</body>`
5. **Prueba en navegador**: Abre el archivo HTML en Chrome/Firefox
6. **Revisa DevTools**: F12 → Elements para ver la estructura

## 📝 Checklist para crear una página nueva

- [ ] DOCTYPE correcto (`<!DOCTYPE html>`)
- [ ] Idioma especificado (`<html lang="es">`)
- [ ] UTF-8 charset (`<meta charset="UTF-8">`)
- [ ] Viewport meta (`<meta name="viewport" content="width=device-width">`)
- [ ] CSS importado correctamente
- [ ] JavaScript importado al final del body
- [ ] Títulos descriptivos (no "Página 1")
- [ ] Links navegables (header, footer)
- [ ] Estructura lógica con sections/articles
- [ ] Nombres de clase descriptivos
- [ ] Comentarios en secciones complejas

## 🔗 Relación con otros archivos

```
HTML (estructura)
  ↓
CSS (diseño visual)
  ↓
JavaScript (interactividad)
```

- **CSS**: Los estilos que ves vienen de `/css/` (colors, fonts, layouts)
- **JavaScript**: La interactividad viene de `/javascript/` (clicks, validaciones)
- **Assets**: Las imágenes vienen de `/assets/` (logos, fotos)

## ⚠️ Errores comunes

1. **Rutas incorrectas**: `href="about"` debería ser `href="about.html"`
2. **Olvidar cerrar etiquetas**: `<p>Texto<p>` debería ser `<p>Texto</p>`
3. **Especios en atributos**: `class = "nombre"` debería ser `class="nombre"`
4. **Mezclar HTML con CSS**: Los estilos NO van en HTML
5. **Olvidar DOCTYPE**: Siempre comienza con `<!DOCTYPE html>`

## 📚 Recursos para aprender más

- MDN Web Docs: https://developer.mozilla.org/es/docs/Web/HTML
- W3Schools HTML: https://www.w3schools.com/html/
- Validador HTML: https://validator.w3.org/

---

**¿Confundido?** Lee los comentarios en los archivos .html. Cada sección está explicada paso a paso. 👨‍💻
