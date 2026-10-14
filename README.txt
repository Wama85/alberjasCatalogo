ALBERJASCLICK — CATÁLOGO WEB

CONTENIDO
- index.html: estructura de la página.
- styles.css: diseño adaptable a celulares, tabletas y computadoras.
- app.js: búsqueda, filtros y enlaces de WhatsApp.
- productos.json: catálogo editable de productos.

CÓMO PROBARLA
1. Descomprime la carpeta.
2. Para que el catálogo lea productos.json correctamente, abre la carpeta en Visual Studio Code e inicia un servidor local (por ejemplo, la extensión Live Server).
3. Abre index.html con Live Server.
   Nota: algunos navegadores bloquean fetch() de archivos JSON si abres index.html directamente como file://.

WHATSAPP
El número configurado es 59172265286 (Bolivia: código de país 591 + número 72265286).
Cada producto genera un mensaje con el nombre del producto y solicita precio y disponibilidad.
No se muestran precios en el catálogo.

CÓMO AGREGAR O EDITAR PRODUCTOS
Abre productos.json y agrega un objeto con esta estructura:
{
  "id": "identificador-unico",
  "nombre": "Nombre del producto",
  "categoria": "Categoría visible",
  "descripcion": "Descripción breve",
  "etiqueta": "ETIQUETA",
  "icono": "🟢",
  "color": "#edf5df",
  "filtros": ["cocina"]
}
Los filtros disponibles son: envasados, cocina y snacks.
Mantén una coma entre objetos, excepto después del último.
Si el producto “para licuado” tiene una presentación o uso específico, ajusta su descripción para que sea precisa.

PUBLICAR EN INTERNET
Puedes subir los archivos a un servicio de alojamiento estático, por ejemplo GitHub Pages, Netlify o Cloudflare Pages. Sube los cuatro archivos principales a la misma carpeta y conserva sus nombres.
