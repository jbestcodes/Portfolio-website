const PAYSTACK_PUBLIC_KEY = 'pk_live_28ab9023046a8f1d6ca6b12270677865404fa053'

const PaymentStore = {
    save(reference, details) {
        const payments = JSON.parse(localStorage.getItem('payments') || '{}');
        payments[reference] = {
            ...details,
            timestamp: new Date().toISOString()
        };
        localStorage.setItem('payments', JSON.stringify(payments));
    },
    
    get(reference) {
        const payments = JSON.parse(localStorage.getItem('payments') || '{}');
        return payments[reference];
    }
};

let currentService = '';
let currentAmount = 0;

// Show payment details form
function initializeDirectPayment(service, amount) {
    currentService = service;
    currentAmount = amount; // This will be 0 now
    showPaymentDetailsForm();
}

function showPaymentDetailsForm() {
    // Create modal if it doesn't exist
    let modal = document.getElementById('paymentDetailsModal');
    if (!modal) {
        modal = createPaymentDetailsModal();
    }
    
    // Update only service name (remove amount display)
    document.getElementById('serviceNameDisplay').textContent = currentService;
    
    // Show modal
    modal.style.display = 'flex';
}

function createPaymentDetailsModal() {
    const modal = document.createElement('div');
    modal.id = 'paymentDetailsModal';
    modal.className = 'payment-details-modal';
    modal.innerHTML = `
        <div class="payment-details-content">
            <div class="modal-header">
                <h3><i class="fas fa-credit-card"></i> Complete Your Booking</h3>
                <button onclick="closePaymentDetailsModal()" class="close-btn">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            
            <div class="service-summary">
                <div class="summary-item">
                    <span class="label">Service:</span>
                    <span class="value" id="serviceNameDisplay"></span>
                </div>
            </div>

            <form id="paymentDetailsForm" onsubmit="return false;">
                <div class="form-row">
                    <div class="form-group">
                        <label for="paymentAmount">
                            <i class="fas fa-dollar-sign"></i> Amount (KES)
                        </label>
                        <input type="number" id="paymentAmount" placeholder="Enter amount to pay" min="10" step="1" required>
                        <span class="field-hint">Minimum amount is KES 10</span>
                    </div>
                </div>

                <div class="form-row">
                    <div class="form-group">
                        <label for="customerEmail">
                            <i class="fas fa-envelope"></i> Email Address
                        </label>
                        <input type="email" id="customerEmail" placeholder="your@email.com" required>
                        <span class="field-hint">We'll send your receipt here</span>
                    </div>
                </div>

                <div class="form-row">
                    <div class="form-group">
                        <label for="customerPhone">
                            <i class="fas fa-phone"></i> Phone Number
                        </label>
                        <input type="tel" id="customerPhone" placeholder="254712345678" required>
                        <span class="field-hint">For payment notifications</span>
                    </div>
                </div>

                <button type="button" onclick="proceedToPayment()" class="proceed-btn">
                    <i class="fas fa-lock"></i> Proceed to Secure Payment
                </button>
            </form>
        </div>
    `;
    
    document.body.appendChild(modal);
    return modal;
}

function closePaymentDetailsModal() {
    document.getElementById('paymentDetailsModal').style.display = 'none';
}

function proceedToPayment() {
    const amount = document.getElementById('paymentAmount').value;
    const email = document.getElementById('customerEmail').value;
    const phone = document.getElementById('customerPhone').value;

    // Validate amount
    if (!amount || amount < 10) {
        showFieldError('paymentAmount', 'Please enter an amount of at least KES 10');
        return;
    }

    if (!validateEmail(email)) {
        showFieldError('customerEmail', 'Please enter a valid email address');
        return;
    }

    if (!validatePhone(phone)) {
        showFieldError('customerPhone', 'Please enter a valid phone number (e.g., 254712345678)');
        return;
    }

    // Update current amount with user input
    currentAmount = parseFloat(amount);

    // Close the details modal
    closePaymentDetailsModal();

    // Initialize Paystack payment with user-defined amount
    const handler = PaystackPop.setup({
        key: PAYSTACK_PUBLIC_KEY,
        email: email,
        amount: currentAmount * 100, // Convert to kobo
        currency: 'KES',
        ref: 'JA_' + Math.floor(Math.random() * 1000000000 + 1),
        metadata: {
            service_name: currentService,
            phone_number: phone,
            custom_amount: currentAmount
        },
        callback: function(response) {
            PaymentStore.save(response.reference, {
                status: 'success',
                email,
                phone,
                amount: currentAmount,
                service: currentService
            });

            showSuccessMessage(response.reference);
        },
        onClose: function() {
            if (!handler.isSuccessful) {
                showPaymentCancelledMessage();
            }
        }
    });
    
    handler.openIframe();
}

function showFieldError(fieldId, message) {
    const field = document.getElementById(fieldId);
    field.style.borderColor = '#e74c3c';
    
    // Remove existing error
    const existingError = field.parentNode.querySelector('.field-error');
    if (existingError) existingError.remove();
    
    // Add new error
    const error = document.createElement('span');
    error.className = 'field-error';
    error.textContent = message;
    field.parentNode.appendChild(error);
    
    // Focus the field
    field.focus();
}

function showSuccessMessage(reference) {
    alert(`🎉 Payment Successful!\n\nReference: ${reference}\n\nThank you for your booking! We'll be in touch soon.`);
    setTimeout(() => {
        window.location.href = `thankyou.html?ref=${reference}`;
    }, 2000);
}

function showPaymentCancelledMessage() {
    const retry = confirm('Payment was cancelled. Would you like to try again?');
    if (retry) {
        showPaymentDetailsForm();
    }
}

function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function validatePhone(phone) {
    const phoneRegex = /^(?:254|\+254|0)?([71](?:(?:0[0-8])|(?:[12][0-9])|(?:9[0-9])|(?:4[0-134])|(?:5[0-5])|(?:6[0-9])|(?:7[0-9])|(?:8[0-9]))[0-9]{6})$/;
    return phoneRegex.test(phone);
}