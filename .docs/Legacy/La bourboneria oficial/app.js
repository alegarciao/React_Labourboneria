const PRODUCTS = [
  {
    id: "cafe-bourbon",
    name: "Café Bourbon",
    category: "cafes",
    price: 25,
    image: "https://i.pinimg.com/1200x/9b/84/6c/9b846c46e96e976c8eb54a189d2d0f07.jpg",
    description: "Café intenso y aromático de la casa. Tueste medio-oscuro con notas a chocolate amargo y nuez tostada."
  },
  {
    id: "flat-white",
    name: "Flat White Herencia",
    category: "cafes",
    price: 32,
    image: "https://i.pinimg.com/1200x/0c/c8/bf/0cc8bfcc3cba9967863f5fd0c6b5e7c3.jpg",
    description: "Doble shot de espresso ristretto con leche micro-espumada, textura sedosa y perfil dulce natural."
  },
  {
    id: "latte-clasico",
    name: "Latte Macchiato Clásico",
    category: "cafes",
    price: 30,
    image: "https://i.pinimg.com/1200x/c3/41/c9/c341c9711576ff79b316de129baea4f1.jpg",
    description: "Leche texturizada manchada con un shot de espresso denso. Servido en vaso alto tradicional."
  },
  {
    id: "espresso-doble",
    name: "Espresso Doble",
    category: "cafes",
    price: 20,
    image: "https://i.pinimg.com/736x/3d/91/44/3d9144899cf7e460429b78279e87a1e6.jpg",
    description: "La esencia pura de nuestro grano insignia. Extracción concentrada de 60ml con crema espesa y persistente."
  },
  {
    id: "capuccino-canela",
    name: "Capuccino con Canela",
    category: "cafes",
    price: 29,
    image: "https://i.pinimg.com/1200x/07/de/63/07de6361d2d564b37e2654d621b95a87.jpg",
    description: "Espresso de la casa con leche cremosa, espuma suave y un toque aromático de canela molida."
  },
  {
    id: "americano-herencia",
    name: "Americano Herencia",
    category: "cafes",
    price: 22,
    image: "https://i.pinimg.com/1200x/77/d6/a0/77d6a05c1628ddfcbaa9bf8f619d48f4.jpg",
    description: "Café largo, limpio y equilibrado. Ideal para apreciar las notas tostadas del grano bourbon."
  },
  {
    id: "mocha-artesanal",
    name: "Mocha Artesanal",
    category: "cafes",
    price: 34,
    image: "https://i.pinimg.com/736x/b7/38/53/b7385352694908aa56d7a4405404eb89.jpg",
    description: "Espresso, cacao oscuro y leche vaporizada. Dulzor moderado con final profundo y aterciopelado."
  },
  {
    id: "croissant-mantequilla",
    name: "Croissant de Mantequilla",
    category: "desayunos",
    price: 18,
    image: "https://i.pinimg.com/736x/30/98/b3/3098b37993867ed5b37bd686d463ca4b.jpg",
    description: "Clásico francés elaborado con mantequilla normanda. Capas finas, crujiente por fuera y alveolado por dentro."
  },
  {
    id: "tostada-aguacate",
    name: "Tostada de Aguacate",
    category: "desayunos",
    price: 45,
    image: "https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=520&q=80",
    description: "Pan de masa madre tostado, aguacate triturado con lima, aceite de oliva virgen extra y microbrotes."
  },
  {
    id: "huevos-benedictinos",
    name: "Huevos Benedictinos",
    category: "desayunos",
    price: 52,
    image: "https://images.unsplash.com/photo-1608039829572-78524f79c4c7?auto=format&fit=crop&w=520&q=80",
    description: "Pan artesanal, huevo pochado, salsa holandesa ligera y hojas frescas de temporada."
  },
  {
    id: "granola-casa",
    name: "Granola de la Casa",
    category: "desayunos",
    price: 36,
    image: "https://i.pinimg.com/736x/48/6b/08/486b085b0c752e670a0adc4c789be22c.jpg",
    description: "Yogur natural, granola tostada, miel suave y frutas frescas cortadas al momento."
  },
  {
    id: "focaccia-romero",
    name: "Focaccia de Romero y Oliva",
    category: "desayunos",
    price: 33,
    image: "https://i.pinimg.com/736x/e6/9e/8e/e69e8e3bf1e6eb8cce4e4177685372ac.jpg",
    description: "Focaccia tibia con aceite de oliva, romero fresco y sal en escamas."
  },
  {
    id: "limonada-romero",
    name: "Limonada de Romero",
    category: "bebidas",
    price: 24,
    image: "https://i.pinimg.com/736x/c6/01/46/c60146ff08d36f24b8d0098b94595b4f.jpg",
    description: "Limonada natural con romero fresco, servida fría y ligeramente gasificada."
  },
  {
    id: "te-earl-grey",
    name: "Té Earl Grey Artesanal",
    category: "bebidas",
    price: 21,
    image: "https://i.pinimg.com/736x/7a/bf/d4/7abfd4895f201031deecd74a692ef87d.jpg",
    description: "Infusión negra con bergamota, servida en tetera pequeña con piel cítrica."
  },
  {
    id: "chocolate-caliente",
    name: "Chocolate Caliente Noir",
    category: "bebidas",
    price: 30,
    image: "https://i.pinimg.com/736x/c7/72/de/c772de7cd52a80fa5233ded75ac96603.jpg",
    description: "Chocolate espeso con cacao oscuro, leche cremosa y una pizca de sal tostada."
  },
  {
    id: "cold-brew-tonic",
    name: "Cold Brew Tonic",
    category: "bebidas",
    price: 35,
    image: "https://i.pinimg.com/736x/9b/8c/3d/9b8c3d2ce089496e7fa967e41b018fbf.jpg",
    description: "Café frío de extracción lenta con tónica seca, hielo y piel de naranja."
  },
  {
    id: "matcha-avena",
    name: "Matcha con Avena",
    category: "bebidas",
    price: 38,
    image: "https://i.pinimg.com/1200x/45/9a/fb/459afbc3f9000c8001ab06e67549b924.jpg",
    description: "Matcha ceremonial batido con bebida de avena, textura sedosa y dulzor natural."
  },
  {
    id: "tarta-limon",
    name: "Tarta Rústica de Limón",
    category: "postres",
    price: 28,
    image: "https://i.pinimg.com/736x/81/93/f5/8193f5d3c4f4f51532174daafede2a5e.jpg",
    description: "Base quebrada, crema de limón brillante y merengue tostado al momento."
  },
  {
    id: "cheesecake-frutos",
    name: "Cheesecake de Frutos Rojos",
    category: "postres",
    price: 32,
    image: "https://images.unsplash.com/photo-1533134242443-d4fd215305ad?auto=format&fit=crop&w=520&q=80",
    description: "Crema suave de queso, base crocante y compota artesanal de frutos rojos."
  },
  {
    id: "brownie-noir",
    name: "Brownie Café Noir",
    category: "postres",
    price: 26,
    image: "https://i.pinimg.com/1200x/7f/c0/4b/7fc04b517ce97181788dd219e75730fd.jpg",
    description: "Brownie húmedo de cacao intenso con nueces tostadas y toque de espresso."
  },
  {
    id: "tiramisu-bourbon",
    name: "Tiramisú Bourboneria",
    category: "postres",
    price: 34,
    image: "https://i.pinimg.com/1200x/16/c9/54/16c954600b530065db522cd5d0ed1c36.jpg",
    description: "Bizcochos al café, crema mascarpone y cacao espolvoreado en capas delicadas."
  },
  {
    id: "galleta-avena",
    name: "Galleta de Avena y Miel",
    category: "postres",
    price: 16,
    image: "https://i.pinimg.com/1200x/74/85/cb/7485cbaaac45914a8b779956709e22dc.jpg",
    description: "Galleta grande de avena, miel y semillas. Crujiente por fuera y tierna por dentro."
  },
  {
    id: "caja-trufas",
    name: "Caja Degustación de Trufas",
    category: "especialidades",
    price: 96,
    image: "https://i.pinimg.com/736x/d8/95/89/d8958989a5c3df5c56d9ca2a92271262.jpg",
    description: "Selección de trufas artesanales con cacao, café, almendra y licor suave."
  },
  {
    id: "brunch-bourboneria",
    name: "Brunch Bourboneria",
    category: "especialidades",
    price: 118,
    image: "https://i.pinimg.com/736x/3b/f6/09/3bf60944da443ae48d6a81029a36a487.jpg",
    description: "Café a elección, tostada de temporada, bollería pequeña y jugo natural."
  },
  {
    id: "tabla-panaderia",
    name: "Tabla de Panadería",
    category: "especialidades",
    price: 88,
    image: "https://i.pinimg.com/736x/54/e7/08/54e708f4a31006079e46c02095e1ff23.jpg",
    description: "Selección de panes, croissants mini, mermelada casera y mantequilla batida."
  },
  {
    id: "cata-cafe",
    name: "Cata de Café de Origen",
    category: "especialidades",
    price: 75,
    image: "https://i.pinimg.com/736x/34/05/47/34054783775a68415ef9bb8ced20990f.jpg",
    description: "Tres métodos de extracción con guía sensorial y notas de degustación."
  },
  {
    id: "pack-regalo",
    name: "Pack tablita La Bourbonería",
    category: "especialidades",
    price: 145,
    image: "https://i.pinimg.com/736x/80/60/f0/8060f01c9418a13f4334c8407f2f3633.jpg",
    description: "Bolsa de café, trufas artesanales y tarjeta personalizada en empaque vintage."
  }
];

const STORAGE_CART = "bourboneria_cart";
const STORAGE_ORDER = "bourboneria_last_order";
const STORAGE_ORDERS = "bourboneria_orders";
const STORAGE_PROFILE = "bourboneria_profile";

const STORAGE_VERSION = "bourboneria_version";
const CURRENT_VERSION = "4";

function initializeStorage() {
  const savedVersion = localStorage.getItem(STORAGE_VERSION);

  if (savedVersion !== CURRENT_VERSION) {
    localStorage.removeItem(STORAGE_ORDERS);
    localStorage.removeItem(STORAGE_ORDER);
    localStorage.removeItem(STORAGE_CART);

    localStorage.setItem(STORAGE_VERSION, CURRENT_VERSION);
  }
}

const DEFAULT_PROFILE = {
  name: "",
  email: "",
  phone: "",
  address: ""
};

const OLD_DEFAULT_PROFILE = {
  name: "María González",
  email: "maria.artesana@email.com",
  phone: "+34 600 123 456"
};

function money(value) {
  return `Bs. ${Number(value).toFixed(2)}`;
}

function escapeHtml(value = "") {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function getCustomizationFields(product = {}) {
  if (["latte-clasico", "flat-white", "capuccino-canela", "mocha-artesanal", "chocolate-caliente", "matcha-avena"].includes(product.id)) {
    return ["milk", "sugar", "allergy"];
  }

  if (["cafe-bourbon", "espresso-doble", "americano-herencia", "limonada-romero", "te-earl-grey", "cold-brew-tonic"].includes(product.id)) {
    return ["sugar", "allergy"];
  }

  if (["desayunos", "postres"].includes(product.category)) {
    return ["allergy"];
  }

  if (product.id === "brunch-bourboneria") {
    return ["sugar", "allergy"];
  }

  return [];
}

function itemNotes(item = {}, product = findProduct(item.id)) {
  const fields = getCustomizationFields(product);
  const notes = [];
  const milk = fields.includes("milk") ? item.milk || "" : "";
  const sugar = fields.includes("sugar") ? item.sugar || "" : "";
  const allergy = fields.includes("allergy") ? item.allergy || item.note || "" : "";

  if (milk) notes.push(`Leche: ${milk}`);
  if (sugar) notes.push(`Azúcar: ${sugar}`);
  if (allergy) notes.push(`Alergias: ${allergy}`);

  return notes.join(" · ");
}

function normalizeItemOptions(item = {}) {
  const product = findProduct(item.id);
  const fields = getCustomizationFields(product);

  return {
    id: item.id,
    qty: item.qty,
    milk: fields.includes("milk") ? item.milk || "" : "",
    sugar: fields.includes("sugar") ? item.sugar || "" : "",
    allergy: fields.includes("allergy") ? item.allergy || item.note || "" : ""
  };
}

function renderItemOptions(item, product) {
  const fields = getCustomizationFields(product);
  if (!fields.length) return "";

  return `
    <div class="item-options ${fields.length === 1 ? "single-option" : ""}">
      ${fields.includes("milk") ? `
        <label>
          Tipo de leche
          <select class="js-preference" data-id="${item.id}" data-field="milk">
            <option value="" ${!item.milk ? "selected" : ""}>Sin cambio</option>
            <option value="Entera" ${item.milk === "Entera" ? "selected" : ""}>Entera</option>
            <option value="Deslactosada" ${item.milk === "Deslactosada" ? "selected" : ""}>Deslactosada</option>
            <option value="Avena" ${item.milk === "Avena" ? "selected" : ""}>Avena</option>
            <option value="Almendra" ${item.milk === "Almendra" ? "selected" : ""}>Almendra</option>
          </select>
        </label>
      ` : ""}
      ${fields.includes("sugar") ? `
        <label>
          Nivel de azúcar
          <select class="js-preference" data-id="${item.id}" data-field="sugar">
            <option value="" ${!item.sugar ? "selected" : ""}>Sin cambio</option>
            <option value="Sin azúcar" ${item.sugar === "Sin azúcar" ? "selected" : ""}>Sin azúcar</option>
            <option value="Bajo" ${item.sugar === "Bajo" ? "selected" : ""}>Bajo</option>
            <option value="Normal" ${item.sugar === "Normal" ? "selected" : ""}>Normal</option>
            <option value="Extra dulce" ${item.sugar === "Extra dulce" ? "selected" : ""}>Extra dulce</option>
          </select>
        </label>
      ` : ""}
      ${fields.includes("allergy") ? `
        <label class="allergy-field">
          Alergias o cuidados
          <textarea class="js-preference" data-id="${item.id}" data-field="allergy" rows="2" placeholder="Ej: sin nueces, intolerancia a lactosa...">${escapeHtml(item.allergy || item.note || "")}</textarea>
        </label>
      ` : ""}
    </div>
  `;
}

function getCart() {
  return JSON.parse(localStorage.getItem(STORAGE_CART) || "[]");
}

function getOrders() {
  return JSON.parse(localStorage.getItem(STORAGE_ORDERS) || "[]");
}

function getProfile() {
  const saved = localStorage.getItem(STORAGE_PROFILE);
  if (!saved) return DEFAULT_PROFILE;
  const profile = JSON.parse(saved);
  const isOldDefault = profile.name === OLD_DEFAULT_PROFILE.name
    && profile.email === OLD_DEFAULT_PROFILE.email
    && profile.phone === OLD_DEFAULT_PROFILE.phone;
  return isOldDefault ? DEFAULT_PROFILE : { ...DEFAULT_PROFILE, ...profile };
}

function saveCart(cart) {
  localStorage.setItem(STORAGE_CART, JSON.stringify(cart));
  renderCart();
}

function clearCart() {
  localStorage.removeItem(STORAGE_CART);
  renderCart();
  showToast("Carrito limpiado");
}

function findProduct(id) {
  return PRODUCTS.find((product) => product.id === id);
}

function addToCart(id, qty = 1) {
  const product = findProduct(id);
  if (!product) return;
  const cart = getCart();
  const existing = cart.find((item) => item.id === id);
  if (existing) {
    existing.qty += qty;
  } else {
    cart.push({ id, qty, milk: "", sugar: "", allergy: "" });
  }
  saveCart(cart);
  showToast(`${product.name} añadido al carrito`);
}

function changeQty(id, delta) {
  const cart = getCart()
    .map((item) => item.id === id ? { ...item, qty: item.qty + delta } : item)
    .filter((item) => item.qty > 0);
  saveCart(cart);
}

function updateCartPreference(id, field, value) {
  const cart = getCart().map((item) => {
    return item.id === id ? { ...item, [field]: value } : item;
  });
  localStorage.setItem(STORAGE_CART, JSON.stringify(cart));
}

function cartTotals(cart) {
  const subtotal = cart.reduce((sum, item) => {
    const product = findProduct(item.id);
    return sum + (product ? product.price * item.qty : 0);
  }, 0);
  const service = subtotal > 0 ? 5 : 0;
  return { subtotal, service, total: subtotal + service };
}

function renderCart() {
  const cart = getCart();
  const count = cart.reduce((sum, item) => sum + item.qty, 0);
  $(".cart-count").text(count);

  if ($("[data-cart-section]").length) {
    renderCartSection(cart);
  }
}

function renderCartSection(cart) {
  const totals = cartTotals(cart);
  const rows = cart.map((item) => {
    const product = findProduct(item.id);
    if (!product) return "";
    return `
      <div class="cart-receipt-row">
        <img src="${product.image}" alt="${product.name}">
        <div>
          <strong>${product.name}</strong>
          <small>${money(product.price)} c/u</small>
          <div class="qty">
            <button class="js-qty" data-id="${item.id}" data-delta="-1" type="button">−</button>
            <span>${item.qty}</span>
            <button class="js-qty" data-id="${item.id}" data-delta="1" type="button">+</button>
          </div>
          ${renderItemOptions(item, product)}
        </div>
        <strong>${money(product.price * item.qty)}</strong>
      </div>
    `;
  }).join("");

  $("[data-cart-section]").html(cart.length ? `
    ${rows}
    <div class="receipt-totals">
      <div class="receipt-total"><span>Subtotal</span><strong>${money(totals.subtotal)}</strong></div>
      <div class="receipt-total"><span>Servicio</span><strong>${money(totals.service)}</strong></div>
      <div class="receipt-total final"><span>Total</span><strong>${money(totals.total)}</strong></div>
    </div>
    <div class="cart-page-actions">
      <button class="btn primary js-checkout" type="button">Confirmar Pedido</button>
      <button class="btn outline danger js-clear-cart" type="button">Limpiar Carrito</button>
      <a class="btn outline" href="menu.html">Volver al Menú</a>
    </div>
  ` : `
    <div class="empty-cart">
      <h3>Tu carrito está vacío</h3>
      <p>Agrega cafés, desayunos o postres desde el menú para preparar tu pedido.</p>
      <a class="btn primary" href="menu.html">Ir al Menú</a>
    </div>
  `);
}

function renderFooter() {
  $(".site-footer").html(`
    <div class="footer-grid new-footer-grid">
      <section>
        <h3>Contacto</h3>
        <p><i class="fa-solid fa-envelope"></i> hola@labourboneria.com</p>
        <p><i class="fa-solid fa-phone"></i> 74756239</p>
      </section>
      <section>
        <h3>Ubicación</h3>
        <p>Calle Salamanca</p>
        <p>Centro de Cochabamba</p>
        <div class="footer-icons"><i class="fa-solid fa-earth-americas"></i><i class="fa-solid fa-location-dot"></i></div>
      </section>
      <section>
        <h3>Síguenos</h3>
        <div class="footer-icons"><i class="fa-brands fa-facebook"></i><i class="fa-brands fa-instagram"></i><i class="fa-brands fa-tiktok"></i></div>
        <p class="since">Desde 2017</p>
      </section>
    </div>
    <p class="copyright">© 2026 Ale Garcia Tendencias web</p>
  `);
}

function renderMenu(filter = "cafes") {
  const menuItems = PRODUCTS.filter((product) => product.category === filter);

  const template = (product) => `
    <article class="menu-item" data-category="${product.category}">
      <img src="${product.image}" alt="${product.name}">
      <div>
        <div class="product-title"><h3>${product.name}</h3><span class="menu-price">${money(product.price)}</span></div>
        <p>${product.description}</p>
        <button class="btn primary js-add" data-id="${product.id}" type="button">+ Agregar</button>
      </div>
    </article>
  `;

  $("[data-menu-list]").html(menuItems.map(template).join(""));
  $(".menu-section:first .section-line h2").text(sectionTitle(filter));
  $("[data-menu-announcement]").text(`Mostrando ${menuItems.length} productos en ${sectionTitle(filter)}.`);
}

function activateMenuTab(tab) {
  const selectedTab = $(tab);
  const filter = selectedTab.data("filter");

  $(".tab")
    .removeClass("active")
    .attr("aria-selected", "false")
    .attr("tabindex", "-1");

  selectedTab
    .addClass("active")
    .attr("aria-selected", "true")
    .attr("tabindex", "0")
    .focus();

  $("#menu-panel").attr("aria-labelledby", selectedTab.attr("id"));
  renderMenu(filter);
}

function moveMenuTab(currentTab, direction) {
  const tabs = $(".tab").toArray();
  const currentIndex = tabs.indexOf(currentTab);
  const nextIndex = (currentIndex + direction + tabs.length) % tabs.length;
  activateMenuTab(tabs[nextIndex]);
}

function sectionTitle(filter) {
  return {
    cafes: "Cafés de Especialidad",
    bebidas: "Bebidas Artesanales",
    desayunos: "Desayunos & Horneados",
    postres: "Postres de Autor",
    especialidades: "Especialidades de la Casa"
  }[filter] || "Nuestro Menú";
}

function checkout() {
  const cart = getCart();
  if (!cart.length) return;
  const totals = cartTotals(cart);
  const profile = getProfile();
  const order = {
    number: `#${String(Date.now()).slice(-5)}`,
    status: "pendiente",
    customer: {
      name: profile.name || "Cliente sin nombre",
      email: profile.email || "Sin correo",
      phone: profile.phone || "Sin teléfono",
      address: profile.address || "Sin dirección"
    },
    items: cart.map(normalizeItemOptions),
    totals,
    createdAt: new Date().toISOString()
  };
  const orders = [order, ...getOrders()].slice(0, 12);
  localStorage.setItem(STORAGE_ORDER, JSON.stringify(order));
  localStorage.setItem(STORAGE_ORDERS, JSON.stringify(orders));
  localStorage.removeItem(STORAGE_CART);
  // Redirigir al panel de control para que el administrador vea el nuevo pedido
  window.location.href = "admin.html";
}

function renderOrder() {
  const saved = JSON.parse(localStorage.getItem(STORAGE_ORDER) || "null");
  const order = saved || {
    number: "#00000",
    items: [],
    totals: { subtotal: 0, service: 0, total: 0 }
  };
  const totals = order.totals || cartTotals(order.items);

  $("[data-order-number]").text(order.number);
  $("[data-order-detail]").html(order.items.map((item) => {
    const product = findProduct(item.id);
    if (!product) return "";
    return `
      <div class="receipt-row">
        <strong>${item.qty}x ${product.name}${itemNotes(item) ? `<small>${escapeHtml(itemNotes(item))}</small>` : ""}</strong>
        <span>${money(product.price * item.qty)}</span>
      </div>
    `;
  }).join("") || `<p>No hay un pedido confirmado todavía.</p>`);

  $("[data-order-totals]").html(`
    <div class="receipt-total"><span>Subtotal</span><strong>${money(totals.subtotal)}</strong></div>
    <div class="receipt-total"><span>Servicio</span><strong>${money(totals.service)}</strong></div>
    <div class="receipt-total final"><span>Total</span><strong>${money(totals.total)}</strong></div>
  `);
}

function reorder() {
  saveCart([
    { id: "croissant-mantequilla", qty: 2 },
    { id: "flat-white", qty: 1 },
    { id: "tarta-limon", qty: 1 }
  ]);
  showToast("Pedido habitual cargado al carrito");
  window.setTimeout(() => {
    window.location.href = "carrito.html";
  }, 650);
}

function renderProfile() {
  const profile = getProfile();
  $("[data-account-title]").text(profile.name ? `El Rincón de ${profile.name.split(" ")[0]}` : "Mi Cuenta");
  $("[data-profile-form] [name='name']").val(profile.name);
  $("[data-profile-form] [name='email']").val(profile.email);
  $("[data-profile-form] [name='phone']").val(profile.phone);
  $("[data-profile-form] [name='address']").val(profile.address);
  $("[data-saved-address]").text(profile.address || "Sin dirección");
}

function saveProfile() {
  const profile = {
    name: $("[data-profile-form] [name='name']").val().trim(),
    email: $("[data-profile-form] [name='email']").val().trim(),
    phone: $("[data-profile-form] [name='phone']").val().trim(),
    address: $("[data-profile-form] [name='address']").val().trim()
  };
  localStorage.setItem(STORAGE_PROFILE, JSON.stringify(profile));
  renderProfile();
  renderAccountOrders();
  renderLoyalty();
  showToast("Datos personales actualizados");
}

function renderAccountOrders() {
  const profile = getProfile();

  if (!hasProfileDetails(profile)) {
    renderEmptyAccountOrders();
    return;
  }

  const matchingOrders = getOrders()
    .filter((order) => orderMatchesProfile(order, profile));
  const orders = [...matchingOrders, ...buildPersonalHistory(profile)].slice(0, 4);

  if (!orders.length) {
    renderEmptyAccountOrders();
    return;
  }

  $("[data-account-orders]").html(
    orders.map((order, index) => {

      const date = new Date(order.createdAt).toLocaleDateString("es-BO", {
        day: "2-digit",
        month: "long",
        year: "numeric"
      });

      const lines = order.items.map((item) => {
        const product = findProduct(item.id);

        return product
          ? `<li>${item.qty}x ${product.name}${itemNotes(item) ? ` <small>${escapeHtml(itemNotes(item))}</small>` : ""}</li>`
          : "";
      }).join("");

      let statusText = "Pendiente";
      let statusClass = "red";

      if (order.status === "preparacion") {
        statusText = "En preparación";
        statusClass = "green";
      }

      if (order.status === "listo") {
        statusText = "Listo para recoger";
        statusClass = "tan";
      }

      if (order.status === "entregado") {
        statusText = "Entregado";
        statusClass = "green";
      }

      return `
        <article class="history-card ${index === 0 ? "active" : ""}">
          <div>
            <p>Pedido N° ${order.number.replace("#", "")}</p>

            <strong>${date}</strong>

            <p>
              ${escapeHtml(order.customer?.name || profile.name || "Cliente sin nombre")}
            </p>

            <ul>
              ${lines}
            </ul>
          </div>

          <div>
            <span class="tag ${statusClass}">
              ${statusText}
            </span>

            <p>Total del Pedido</p>

            <strong>
              ${money(order.totals.total)}
            </strong>

            <button class="btn primary js-reorder-order" data-order="${order.number}" type="button">Pedir Nuevamente</button>
          </div>
        </article>
      `;

    }).join("")
  );
}

function buildPersonalHistory(profile) {
  const seedText = `${profile.name}|${profile.email}|${profile.phone}|${profile.address}`;
  if (!hasProfileDetails(profile)) return [];

  let seed = Array.from(seedText).reduce((sum, char) => sum + char.charCodeAt(0), 0);
  const next = () => {
    seed = (seed * 9301 + 49297) % 233280;
    return seed / 233280;
  };

  const notes = ["", "Sin azúcar", "Leche deslactosada", "Sin nueces", "Poca espuma", "Extra caliente"];
  const count = 2 + Math.floor(next() * 2);

  return Array.from({ length: count }, (_, index) => {
    const items = Array.from({ length: 2 + Math.floor(next() * 2) }, () => {
      const product = PRODUCTS[Math.floor(next() * PRODUCTS.length)];
      return {
        id: product.id,
        qty: 1 + Math.floor(next() * 3),
        note: notes[Math.floor(next() * notes.length)]
      };
    });
    const totals = cartTotals(items);
    const date = new Date();
    date.setDate(date.getDate() - (8 + index * 14 + Math.floor(next() * 9)));

    return {
      number: `#H${String(seed + index).slice(-4)}`,
      status: "entregado",
      customer: {
        name: profile.name || "Cliente sin nombre",
        email: profile.email || "Sin correo",
        phone: profile.phone || "Sin teléfono",
        address: profile.address || "Sin dirección"
      },
      items,
      totals,
      createdAt: date.toISOString(),
      sample: true
    };
  });
}

function hasProfileDetails(profile) {
  return Boolean(`${profile.name}${profile.email}${profile.phone}${profile.address}`.trim());
}

function orderMatchesProfile(order, profile) {
  const customer = order.customer || {};
  return [
    customer.name === profile.name,
    customer.email === profile.email,
    customer.phone === profile.phone,
    customer.address === profile.address
  ]
    .some(Boolean);
}

function renderLoyalty() {
  if (!$("[data-loyalty-points]").length) return;

  const profile = getProfile();
  const realOrders = hasProfileDetails(profile)
    ? getOrders().filter((order) => orderMatchesProfile(order, profile))
    : [];
  const points = realOrders.reduce((sum, order) => {
    return sum + Math.floor(Number(order.totals?.total || 0));
  }, 0);
  const welcomeBonus = hasProfileDetails(profile) ? 50 : 0;
  const totalPoints = points + welcomeBonus;

  $("[data-loyalty-points]").text(`${totalPoints} pts`);
  $("[data-loyalty-message]").text(
    hasProfileDetails(profile)
      ? "Ganas 1 punto por cada Bs. 1 confirmado. Ya tienes bono de bienvenida."
      : "Guarda tus datos para empezar a acumular puntos."
  );
}

function findOrderForRepeat(number) {
  const profile = getProfile();
  return [...getOrders(), ...buildPersonalHistory(profile)].find((order) => order.number === number);
}

function repeatOrder(number) {
  const order = findOrderForRepeat(number);
  if (!order) return;

  saveCart(order.items.map((item) => ({
    id: item.id,
    qty: item.qty,
    milk: item.milk || "",
    sugar: item.sugar || "",
    allergy: item.allergy || item.note || ""
  })));
  showToast("Pedido cargado al carrito");
  window.setTimeout(() => {
    window.location.href = "carrito.html";
  }, 650);
}

function renderEmptyAccountOrders() {
  $("[data-account-orders]").html(`
    <article class="history-card active">
      <div>
        <p>Sin pedidos todavía</p>

        <strong>
          Aún no has realizado ningún pedido
        </strong>

        <ul>
          <li>
            Cuando confirmes un pedido desde el carrito,
            aparecerá aquí automáticamente.
          </li>
        </ul>
      </div>

      <div>
        <span class="tag tan">
          Vacío
        </span>

        <p>Total del Pedido</p>

        <strong>
          Bs. 0.00
        </strong>

        <a class="btn primary" href="menu.html">
          Ir al Menú
        </a>
      </div>
    </article>
  `);
}



function renderCurrentDate() {
  const date = new Date().toLocaleDateString("es-BO", {
    day: "2-digit",
    month: "short",
    year: "numeric"
  });
  $("[data-current-date]").text(date);
}

function renderAdminDashboard() {
  const orders = getOrders();

  const today = new Date().toDateString();

  const countStatus = (status) => {
    return orders.filter((order) => order.status === status).length;
  };

  // Calcula todas las ventas realizadas durante el día
  const sales = orders
    .filter((order) => {
      return new Date(order.createdAt).toDateString() === today;
    })
    .reduce((sum, order) => {
      return sum + Number(order.totals?.total || 0);
    }, 0);

  // Actualizar números del panel
  $("[data-admin-pending]").text(countStatus("pendiente"));
  $("[data-admin-preparing]").text(countStatus("preparacion"));
  $("[data-admin-ready]").text(countStatus("listo"));
  $("[data-admin-sales]").text(money(sales));

  // Mostrar pedidos
  if (!orders.length) {
    $("[data-admin-orders]").html(`
      <article class="admin-order empty-admin">
        <h3>No hay pedidos todavía</h3>
        <p>
          Cuando un cliente confirme un pedido desde el menú,
          aparecerá aquí automáticamente.
        </p>
        <div>
          <a class="btn primary" href="menu.html">Crear Pedido</a>
        </div>
      </article>
    `);

    return;
  }

  $("[data-admin-orders]").html(
    orders.slice(0, 10).map((order) => {

      const lines = order.items.map((item) => {
        const product = findProduct(item.id);

        return product
          ? `<p>${item.qty}x ${product.name}${itemNotes(item) ? `<small>${escapeHtml(itemNotes(item))}</small>` : ""}</p>`
          : "";
      }).join("");

      return `
        <article class="admin-order">

          <span class="tag ${adminTagClass(order.status)}">
            ${adminStatusLabel(order.status)}
          </span>

          <strong>${money(order.totals.total)}</strong>

          <h3>Orden ${order.number}</h3>

          <p>${escapeHtml(order.customer?.name || "Cliente sin nombre")}</p>

          <small>
            ${escapeHtml(order.customer?.email || "Sin correo")}
            ·
            ${escapeHtml(order.customer?.phone || "Sin teléfono")}
            ·
            ${escapeHtml(order.customer?.address || "Sin dirección")}
          </small>

          <hr>

          ${lines}

          <div>
            ${adminAction(order)}
          </div>

        </article>
      `;

    }).join("")
  );
}

function adminTagClass(status) {
  return { pendiente: "red", preparacion: "green", listo: "tan", entregado: "tan" }[status] || "tan";
}

function adminStatusLabel(status) {
  return {
    pendiente: "Pendiente",
    preparacion: "En Preparación",
    listo: "Listo Para Recoger",
    entregado: "Entregado"
  }[status] || "Pendiente";
}

function adminAction(order) {
  if (order.status === "pendiente") {
    return `<button class="btn primary js-next-status" data-order="${order.number}" type="button">Preparar</button>`;
  }
  if (order.status === "preparacion") {
    return `<button class="btn primary js-next-status" data-order="${order.number}" type="button">Marcar Listo</button>`;
  }
  if (order.status === "listo") {
    return `<button class="btn outline js-next-status" data-order="${order.number}" type="button">Marcar Entregado</button>`;
  }
  return `<button class="btn outline" type="button" disabled>Entregado</button>`;
}

function advanceOrderStatus(number) {
  const flow = { pendiente: "preparacion", preparacion: "listo", listo: "entregado" };
  const orders = getOrders().map((order) => {
    if (order.number !== number) return order;
    return { ...order, status: flow[order.status] || order.status };
  });
  localStorage.setItem(STORAGE_ORDERS, JSON.stringify(orders));
  renderAdminDashboard();
  showToast("Estado de orden actualizado");
}

function showToast(message) {
  const toast = $(".toast");
  toast.text(message).addClass("show");
  window.clearTimeout(showToast.timer);
  showToast.timer = window.setTimeout(() => toast.removeClass("show"), 2400);
}

$(function () {
  initializeStorage();
  renderFooter();
  renderCart();

  if ($("body").data("page") === "menu") {
    renderMenu("cafes");
  }

  if ($("body").data("page") === "pedido") {
    renderOrder();
    renderCart();
  }

  if ($("body").data("page") === "carrito") {
    renderCart();
  }

  if ($("body").data("page") === "cuenta") {
    renderProfile();
    renderAccountOrders();
    renderLoyalty();
  }

  if ($("body").data("page") === "admin") {
    renderCurrentDate();
    renderAdminDashboard();
  }

  $(document).on("click", ".js-add", function () {
    addToCart($(this).data("id"));
  });

  $(document).on("click", ".js-qty", function () {
    changeQty($(this).data("id"), Number($(this).data("delta")));
  });

  $(document).on("input change", ".js-preference", function () {
    updateCartPreference($(this).data("id"), $(this).data("field"), $(this).val());
  });

  $(document).on("click", ".js-checkout", checkout);

  $(document).on("click", ".js-clear-cart", clearCart);

  $(document).on("click", ".tab", function () {
    activateMenuTab(this);
  });

  $(document).on("keydown", ".tab", function (event) {
    if (event.key === "ArrowRight" || event.key === "ArrowDown") {
      event.preventDefault();
      moveMenuTab(this, 1);
    }

    if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
      event.preventDefault();
      moveMenuTab(this, -1);
    }

    if (event.key === "Home") {
      event.preventDefault();
      activateMenuTab($(".tab").first()[0]);
    }

    if (event.key === "End") {
      event.preventDefault();
      activateMenuTab($(".tab").last()[0]);
    }
  });

  $(document).on("click", ".js-reorder", reorder);

  $(document).on("click", ".js-reorder-order", function () {
    repeatOrder($(this).data("order"));
  });

  $(document).on("submit", "[data-profile-form]", function (event) {
    event.preventDefault();
    saveProfile();
  });

  $(document).on("click", ".js-clear-profile", function () {
    localStorage.setItem(STORAGE_PROFILE, JSON.stringify({ name: "", email: "", phone: "", address: "" }));
    renderProfile();
    renderAccountOrders();
    renderLoyalty();
    showToast("Datos personales limpiados");
  });

  $(document).on("click", ".js-next-status", function () {
    advanceOrderStatus($(this).data("order"));
  });
});
