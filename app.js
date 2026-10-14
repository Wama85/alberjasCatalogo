const WHATSAPP_NUMBER = "59172265286";
const productGrid = document.getElementById("productGrid");
const searchInput = document.getElementById("searchInput");
const filterTabs = document.getElementById("filterTabs");
let products = [];
let activeFilter = "todos";

async function loadProducts() {
  try {
    const response = await fetch("productos.json");
    if (!response.ok) throw new Error("No se pudo cargar el catálogo.");
    products = await response.json();
    renderProducts();
  } catch (error) {
    productGrid.innerHTML = '<div class="empty-state">No se pudo cargar el catálogo. Comprueba que el archivo productos.json esté en la misma carpeta y abre la web desde un servidor local.</div>';
    console.error(error);
  }
}

function makeWhatsAppLink(product) {
  const message = `Hola alberjasClick, quisiera consultar el precio y la disponibilidad de este producto: ${product.nombre}. ¿Me pueden dar más información?`;
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

function renderProducts() {
  const term = searchInput.value.trim().toLocaleLowerCase("es");
  const filtered = products.filter(product => {
    const matchesFilter = activeFilter === "todos" || product.filtros.includes(activeFilter);
    const searchable = `${product.nombre} ${product.descripcion} ${product.categoria}`.toLocaleLowerCase("es");
    return matchesFilter && searchable.includes(term);
  });

  if (!filtered.length) {
    productGrid.innerHTML = '<div class="empty-state">No encontramos productos con esa búsqueda. Prueba con otra palabra o selecciona otra categoría.</div>';
    return;
  }

  productGrid.innerHTML = filtered.map(product => `
    <article class="product-card">
      <div class="product-art" style="--art-bg:${escapeHtml(product.color)}">
        <span class="product-badge">${escapeHtml(product.etiqueta)}</span>
        <span class="art-emoji" role="img" aria-label="${escapeHtml(product.nombre)}">${escapeHtml(product.icono)}</span>
      </div>
      <div class="product-content">
        <span class="product-category">${escapeHtml(product.categoria)}</span>
        <h3>${escapeHtml(product.nombre)}</h3>
        <p>${escapeHtml(product.descripcion)}</p>
        <div class="product-meta">
          <span class="meta-label">Precio por consulta</span>
          <a class="product-whatsapp" href="${makeWhatsAppLink(product)}" target="_blank" rel="noopener noreferrer" aria-label="Consultar ${escapeHtml(product.nombre)} por WhatsApp"><span>◉</span> Consultar por WhatsApp</a>
        </div>
      </div>
    </article>`).join("");
}

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, char => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;"
  })[char]);
}

searchInput.addEventListener("input", renderProducts);
filterTabs.addEventListener("click", event => {
  const button = event.target.closest("[data-filter]");
  if (!button) return;
  activeFilter = button.dataset.filter;
  filterTabs.querySelectorAll(".filter-tab").forEach(tab => {
    tab.classList.toggle("active", tab === button);
  });
  renderProducts();
});

const menuToggle = document.getElementById("menuToggle");
const navLinks = document.querySelector(".nav-links");
menuToggle.addEventListener("click", () => {
  const isOpen = navLinks.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.setAttribute("aria-label", isOpen ? "Cerrar menú" : "Abrir menú");
  menuToggle.textContent = isOpen ? "×" : "☰";
});
navLinks.querySelectorAll("a").forEach(link => link.addEventListener("click", () => {
  navLinks.classList.remove("open");
  menuToggle.setAttribute("aria-expanded", "false");
  menuToggle.textContent = "☰";
}));
document.getElementById("year").textContent = new Date().getFullYear();

loadProducts();
