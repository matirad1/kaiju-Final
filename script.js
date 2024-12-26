
// Función para obtener el carrito desde LocalStorage
function obtenerCarrito() {
  const carrito = localStorage.getItem('carrito');
  return carrito ? JSON.parse(carrito) : [];
}

// Función para guardar el carrito en LocalStorage
function guardarCarrito(carrito) {
  localStorage.setItem('carrito', JSON.stringify(carrito));
}

// Función para mostrar los productos en el carrito
function mostrarCarrito() {
  const carrito = obtenerCarrito();
  const carritoContenedor = document.getElementById('carrito-contenedor');
  carritoContenedor.innerHTML = ''; // Limpiar contenido anterior

  if (!carrito || carrito.length === 0) {
      carritoContenedor.innerHTML = '<p>El carrito está vacío.</p>';
      return;
  }

  carrito.forEach((producto, index) => {
      // Validar que el producto sea válido
      if (!producto || !producto.nombre) {
          console.warn(`Producto inválido en el carrito:`, producto);
          return;
      }

      const card = document.createElement('div');
      card.classList.add('card');
      card.innerHTML = `
          <span>${producto.nombre}</span>
          <button onclick="eliminarProductoDelCarrito(${index})">Eliminar</button>
      `;
      carritoContenedor.appendChild(card);
  });
}



// Función para agregar un producto al carrito
function agregarAlCarrito(producto) {
  if (!producto || !producto.nombre) {
      console.error("El producto no tiene la propiedad 'nombre'.", producto);
      return;
  }

  const carrito = obtenerCarrito();
  carrito.push(producto);
  guardarCarrito(carrito);
  mostrarCarrito();
  console.log("Producto añadido:", producto);
}
// Función para eliminar un producto del carrito
function eliminarProductoDelCarrito(index) {
  const carrito = obtenerCarrito();
  carrito.splice(index, 1); // Elimina el producto en la posición indicada
  guardarCarrito(carrito); // Guarda los cambios en LocalStorage
  mostrarCarrito(); // Actualiza la visualización
}

// Inicializar el carrito al cargar la página
document.addEventListener('DOMContentLoaded', mostrarCarrito);
function crearListadoProductos() {
  const productos = [
      { nombre: 'Kafka Hibino (Kaiju No.8)' },
      { nombre: 'Kaiju No. 9' },
      { nombre: 'Teddiursa' },
  ];

  const contenedor = document.querySelector('.productos-grid');
  productos.forEach((producto) => {
      const card = document.createElement('div');
      card.classList.add('card');
      card.innerHTML = `
          <h3>${producto.nombre}</h3>
          <button onclick="agregarAlCarrito({ nombre: '${producto.nombre}' })">Añadir al carrito</button>
      `;
      contenedor.appendChild(card);
  });
}
crearListadoProductos();
