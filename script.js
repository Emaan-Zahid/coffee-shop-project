const products = [
    { id: 1, name: "Signature Espresso", category: "Hot Coffee", price: 3.50, img: "https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?w=500" },
    { id: 2, name: "Vanilla Bean Latte", category: "Hot Coffee", price: 5.25, img: "https://images.unsplash.com/photo-1570968915860-54d5c301fa9f?w=500" },
    { id: 3, name: "Caramel Macchiato", category: "Hot Coffee", price: 5.50, img: "https://images.unsplash.com/photo-1485808191679-5f86510681a2?w=500" },
    { id: 4, name: "Hazelnut Cold Brew", category: "Cold Brew", price: 6.00, img: "https://images.unsplash.com/photo-1517701604599-bb29b565090c?w=500" },
    { id: 5, name: "Nitro Silk Brew", category: "Cold Brew", price: 6.50, img: "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=500" },
    { id: 6, name: "Mocha Frappe", category: "Cold Brew", price: 5.75, img: "https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=500" },
    { id: 7, name: "Ethiopian Light Roast", category: "Coffee Beans", price: 18.00, img: "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=500" },
    { id: 8, name: "Dark Sumatra Beans", category: "Coffee Beans", price: 21.00, img: "https://images.unsplash.com/photo-1580915411954-282cb1b0d780?w=500" },
    { id: 9, name: "Arabica Gold Blend", category: "Coffee Beans", price: 19.50, img: "https://images.unsplash.com/photo-1611854779393-1b2da9d400fe?w=500" },
    { id: 10, name: "Italian Cappuccino", category: "Hot Coffee", price: 4.80, img: "https://images.unsplash.com/photo-1534778101976-62847782c213?w=500" }
];

let cart = [];

function renderProducts(items) {
    const grid = document.getElementById('productGrid');
    grid.innerHTML = items.map(p => `
        <div class="product-card">
            <div class="img-container"><img src="${p.img}" alt="${p.name}"></div>
            <div class="card-info">
                <h3>${p.name}</h3>
                <span class="price">$${p.price.toFixed(2)}</span>
                <button class="add-btn" onclick="addToCart(${p.id})">Add to Cart</button>
            </div>
        </div>
    `).join('');
}

function filterItems(category, el) {
    document.querySelectorAll('.filter-list li').forEach(li => li.classList.remove('active'));
    el.classList.add('active');
    category === 'all' ? renderProducts(products) : renderProducts(products.filter(p => p.category === category));
}

function addToCart(id) {
    const product = products.find(p => p.id === id);
    const existing = cart.find(item => item.id === id);
    if (existing) { existing.quantity += 1; } 
    else { cart.push({ ...product, quantity: 1 }); }
    updateCartUI();
    showToast();
}

function changeQuantity(index, delta) {
    cart[index].quantity += delta;
    if (cart[index].quantity <= 0) { cart.splice(index, 1); }
    updateCartUI();
}

function updateCartUI() {
    document.getElementById('cart-count').innerText = cart.reduce((s, i) => s + i.quantity, 0);
    const body = document.getElementById('cartItems');
    let total = 0;
    
    body.innerHTML = cart.map((item, idx) => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;
        return `
            <div class="cart-item" style="display:flex; justify-content:space-between; margin-bottom:20px; align-items:center;">
                <div style="flex:1">
                    <strong style="font-size:0.9rem">${item.name}</strong><br>
                    <span style="color:var(--primary); font-size:0.8rem">$${item.price.toFixed(2)}</span>
                </div>
                <div style="display:flex; align-items:center; gap:10px; margin:0 15px;">
                    <button onclick="changeQuantity(${idx}, -1)" style="width:24px; border:1px solid #ddd; border-radius:50%; background:none; cursor:pointer;">-</button>
                    <span style="font-weight:bold">${item.quantity}</span>
                    <button onclick="changeQuantity(${idx}, 1)" style="width:24px; border:1px solid #ddd; border-radius:50%; background:none; cursor:pointer;">+</button>
                </div>
                <div style="text-align:right">
                    <i class="fas fa-trash" style="color:#ff7675; cursor:pointer; font-size:0.8rem" onclick="removeFromCart(${idx})"></i><br>
                    <span style="font-weight:bold; font-size:0.9rem">$${itemTotal.toFixed(2)}</span>
                </div>
            </div>
        `;
    }).join('');
    document.getElementById('totalPrice').innerText = `$${total.toFixed(2)}`;
}

function removeFromCart(idx) { cart.splice(idx, 1); updateCartUI(); }

function toggleCart() { document.getElementById('cartSidebar').classList.toggle('active'); }

function showToast() {
    const t = document.getElementById('toast');
    t.classList.add('show');
    setTimeout(() => t.classList.remove('show'), 2000);
}

document.getElementById('searchInput').addEventListener('input', (e) => {
    const q = e.target.value.toLowerCase();
    renderProducts(products.filter(p => p.name.toLowerCase().includes(q)));
});

function placeOrder() {
    if (cart.length === 0) return alert("Cart is empty!");
    alert("Thank you, Emaan! Your Aura Coffee order is confirmed.");
    cart = []; updateCartUI(); toggleCart();
}

renderProducts(products);