document.addEventListener('DOMContentLoaded', () => {
  // --- 1. ESTADO DEL CARRITO ---
  let carrito = [];
  let total = 0;

  // Elementos del DOM
  const carritoContenedor = document.getElementById('carritoContenedor');
  const totalPagar = document.getElementById('totalPagar');
  const cartCount = document.getElementById('cartCount');
  const btnVaciar = document.getElementById('btnVaciarCarrito');
  
  // --- 2. FUNCIONALIDADES DE INTERFAZ ---
  
  // Menú Responsive (classList.toggle)
  const menuToggle = document.getElementById('menuToggle');
  const navMenu = document.getElementById('navMenu');

  menuToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
  });

  // Modo Claro / Oscuro (classList.toggle)
  const themeToggle = document.getElementById('themeToggle');

  themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    themeToggle.textContent = document.body.classList.contains('dark-mode') 
      ? '☀️ Modo Claro' 
      : '🌙 Modo Oscuro';
  });

  // --- 3. MÓDULO DE CARRITO DE COMPRAS ---

  // Capturar clics en botones mediante atributos data-*
  const botonesAgregar = document.querySelectorAll('.btn-add-cart');

  botonesAgregar.forEach(boton => {
    boton.addEventListener('click', (e) => {
      const id = e.target.getAttribute('data-id');
      const nombre = e.target.getAttribute('data-nombre');
      const precio = parseFloat(e.target.getAttribute('data-precio'));

      agregarProducto(id, nombre, precio);
    });
  });

  function agregarProducto(id, nombre, precio) {
    const producto = { id, nombre, precio };
    carrito.push(producto);
    renderizarCarrito();
  }

  // Renderizado dinámico creando nodos en el DOM
  function renderizarCarrito() {
    carritoContenedor.innerHTML = '';
    total = 0;

    if (carrito.length === 0) {
      carritoContenedor.innerHTML = '<p class="carrito-vacio-msg">El carrito está vacío.</p>';
      totalPagar.textContent = '0.00';
      cartCount.textContent = '0';
      return;
    }

    carrito.forEach((item, index) => {
      total += item.precio;

      // Crear nodo elemento del carrito
      const itemNode = document.createElement('div');
      itemNode.classList.add('carrito-item');

      itemNode.innerHTML = `
        <div>
          <strong>${item.nombre}</strong> - $${item.precio.toFixed(2)}
        </div>
      `;

      // Crear botón "Eliminar" dinámicamente
      const btnEliminar = document.createElement('button');
      btnEliminar.classList.add('btn-eliminar');
      btnEliminar.textContent = 'Eliminar';
      
      btnEliminar.addEventListener('click', () => {
        eliminarProducto(index);
      });

      itemNode.appendChild(btnEliminar);
      carritoContenedor.appendChild(itemNode);
    });

    // Actualización de totales
    totalPagar.textContent = total.toFixed(2);
    cartCount.textContent = carrito.length;
  }

  function eliminarProducto(index) {
    carrito.splice(index, 1);
    renderizarCarrito();
  }

  // Botón "Vaciar Carrito"
  btnVaciar.addEventListener('click', () => {
    carrito = [];
    renderizarCarrito();
  });
});
