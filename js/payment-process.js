let currentService = '';
let currentAmount = 0;

function showPaymentModal(service, amount) {
    const modal = document.getElementById('paymentModal');
    if (!modal) {
        console.error('Payment modal not found!');
        return;
    }
    currentService = service;
    currentAmount = amount;
    modal.style.display = 'flex';
}

function closePaymentModal() {
    document.getElementById('paymentModal').style.display = 'none';
}

function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function validatePhone(phone) {
    const phoneRegex = /^(?:254|\+254|0)?([71](?:(?:0[0-8])|(?:[12][0-9])|(?:9[0-9])|(?:4[0-134])|(?:5[0-5])|(?:6[0-9])|(?:7[0-9])|(?:8[0-9]))[0-9]{6})$/;
    return phoneRegex.test(phone);
}

function processPayment(method) {
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;

    if (!validateEmail(email)) {
        alert('Please enter a valid email address');
        return;
    }

    if (!validatePhone(phone)) {
        alert('Please enter a valid phone number (e.g., 254712345678)');
        return;
    }

    initializePaystack(email, phone, currentAmount, currentService);
}