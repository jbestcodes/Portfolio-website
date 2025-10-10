let currentService = '';
let currentAmount = 0;
let currentPaymentMethod = '';

function showPaymentModal(service, amount) {
    const modal = document.getElementById('paymentModal');
    const serviceElement = document.getElementById('selectedService');
    const amountElement = document.getElementById('selectedAmount');
    
    if (!modal || !serviceElement || !amountElement) {
        console.error('Modal elements not found!');
        return;
    }

    currentService = service;
    currentAmount = amount;
    
    // Update modal content
    serviceElement.textContent = service;
    amountElement.textContent = amount.toLocaleString();
    
    // Show modal
    modal.style.display = 'flex';
}

function closePaymentModal() {
    document.getElementById('paymentModal').style.display = 'none';
}

function showPaymentSection(method) {
    // Store selected method
    currentPaymentMethod = method;
    
    // Remove active class from all buttons
    document.getElementById('mpesaBtn').classList.remove('active');
    document.getElementById('cardBtn').classList.remove('active');
    
    // Add active class to selected button
    document.getElementById(`${method}Btn`).classList.add('active');
    
    // Show pay button
    document.getElementById('payButton').style.display = 'block';
}

function processPayment() {
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

    // Initialize Paystack payment
    initializePaystack(email, phone, currentAmount, currentService, currentPaymentMethod);
}

function validateEmailField(input) {
    const emailError = document.getElementById('emailError');
    const email = input.value.trim();
    
    if (!email) {
        emailError.textContent = 'Email is required';
        return false;
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        emailError.textContent = 'Please enter a valid email address';
        return false;
    }
    
    emailError.textContent = '';
    return true;
}

function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function validatePhone(phone) {
    const phoneRegex = /^(?:254|\+254|0)?([71](?:(?:0[0-8])|(?:[12][0-9])|(?:9[0-9])|(?:4[0-134])|(?:5[0-5])|(?:6[0-9])|(?:7[0-9])|(?:8[0-9]))[0-9]{6})$/;
    return phoneRegex.test(phone);
}