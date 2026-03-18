let cart = [];
const sidePanel = document.getElementById('sideCart');
const cartCount = document.getElementById('cartCount');
const cartList = document.getElementById('cartList');
const totalDisplay = document.getElementById('totalDisplay');

// Utility Functions
function openCart() { sidePanel.classList.add('active'); }
function closeCart() { sidePanel.classList.remove('active'); }

// Add to Cart Logic
document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', () => {
        const card = button.closest('.product-card');
        const name = card.querySelector('h3').innerText;
        const price = parseInt(card.querySelector('.price').dataset.value);

        cart.push({ name, price });
        updateCart();
        openCart();
    });
});

function updateCart() {
    cartCount.innerText = cart.length;
    
    if (cart.length === 0) {
        cartList.innerHTML = '<p class="empty-msg">Your basket is currently empty.</p>';
    } else {
        cartList.innerHTML = cart.map((item, index) => `
            <div style="display:flex; justify-content:space-between; margin-bottom:10px; font-size:14px;">
                <span>${item.name}</span>
                <span>$${item.price}</span>
            </div>
        `).join('');
    }

    const total = cart.reduce((sum, item) => sum + item.price, 0);
    totalDisplay.innerText = `$${total.toLocaleString()}.00`;
}

// Checkout Logic
function goToPayment() {
    if (cart.length === 0) return alert("Select items first!");
    document.getElementById('paymentModal').style.display = 'flex';
}

document.getElementById('payForm').addEventListener('submit', (e) => {
    e.preventDefault();
    alert("Order Confirmed! Thank you.");
    cart = [];
    updateCart();
    document.getElementById('paymentModal').style.display = 'none';
    closeCart();
});