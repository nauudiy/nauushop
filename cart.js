let cart = [];

// Fungsi untuk mengambil data keranjang dari localStorage
function loadCart() {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
        cart = JSON.parse(savedCart);
    }
}

// Fungsi untuk menyimpan data keranjang ke localStorage
function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

// Pilih variasi produk
function selectVariation(variationName, imgSrc) {
    sessionStorage.setItem('selectedVariation', JSON.stringify({ name: variationName, img: imgSrc }));
}

// Tambahkan produk ke keranjang
function addToCart(productName, price) {
    const selectedVariation = JSON.parse(sessionStorage.getItem('selectedVariation'));
    const product = {
        name: productName,
        price: price,
        variation: selectedVariation.name,
        image: selectedVariation.img
    };
    cart.push(product);
    saveCart(); // Simpan ke localStorage
    alert('Produk ditambahkan ke keranjang!');
}

// Tampilkan produk di keranjang
function displayCart() {
    loadCart(); // Ambil data dari localStorage
    const cartItems = document.getElementById('cart-items');
    cartItems.innerHTML = '';
    let totalPrice = 0;

    cart.forEach((item, index) => {
        cartItems.innerHTML += `
            <div class="cart-item">
                <img src="${item.image}" alt="${item.variation}" width="50px">
                <p>${item.name} - ${item.variation} - Rp. ${item.price}</p>
                <button onclick="removeFromCart(${index})">Hapus</button>
            </div>
        `;
        totalPrice += item.price;
    });

    document.getElementById('total-price').innerText = totalPrice;
    document.getElementById('checkout-btn').href = `https://wa.me/6283821014239?text=${encodeURIComponent(getCartMessage())}`;
}

// Hapus produk dari keranjang
function removeFromCart(index) {
    cart.splice(index, 1);
    saveCart(); // Simpan perubahan ke localStorage
    displayCart();
}

// Hapus semua produk dari keranjang
function clearCart() {
    cart = [];
    saveCart(); // Simpan perubahan ke localStorage
    displayCart();
}

// Buat pesan untuk checkout di WhatsApp
function getCartMessage() {
    let message = 'Daftar belanjaan saya:\n';
    cart.forEach(item => {
        message += `${item.name} - ${item.variation} - Rp. ${item.price}\n`;
    });
    const totalPrice = cart.reduce((total, item) => total + item.price, 0);
    message += `\nTotal Harga: Rp. ${totalPrice}`;
    return message;
}

// Panggil displayCart saat halaman keranjang dibuka
window.onload = function() {
    displayCart();
};