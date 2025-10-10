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

function initializePaystack(email, phone, amount, service) {
    const handler = PaystackPop.setup({
        key: PAYSTACK_PUBLIC_KEY,
        email: email,
        amount: amount * 100,
        currency: 'KES',
        ref: 'JA_' + Math.floor(Math.random() * 1000000000 + 1),
        metadata: {
            service_name: service,
            phone_number: phone
        },
        callback: function(response) {
            // Store payment details
            PaymentStore.save(response.reference, {
                status: 'success',
                email,
                phone,
                amount,
                service
            });

            // Show success message
            showPaymentStatus('success', response.reference);

            // Send confirmation email using EmailJS or similar service
            sendPaymentConfirmation(email, service, amount, response.reference);

            // Redirect to thank you page
            setTimeout(() => {
                window.location.href = `thankyou.html?ref=${response.reference}`;
            }, 3000);
        },
        onClose: function() {
            if (!handler.isSuccessful) {
                showPaymentStatus('failed');
            }
        }
    });
    handler.openIframe();
}

// Email confirmation using EmailJS (you'll need to sign up at emailjs.com)
function sendPaymentConfirmation(email, service, amount, reference) {
    emailjs.send("YOUR_SERVICE_ID", "YOUR_TEMPLATE_ID", {
        to_email: email,
        service_name: service,
        amount: amount,
        reference: reference
    });
}

function showPaymentStatus(status, reference = '') {
    const modal = document.getElementById('statusModal') || createStatusModal();
    const message = status === 'success' 
        ? `Payment Successful!<br>Reference: ${reference}`
        : 'Payment Failed. Please try again.';
    const icon = status === 'success' ? '✅' : '❌';
    
    modal.innerHTML = `
        <div class="status-content ${status}">
            <div class="status-icon">${icon}</div>
            <h3>${status === 'success' ? 'Success!' : 'Failed!'}</h3>
            <p>${message}</p>
        </div>
    `;
    modal.style.display = 'flex';
}

function createStatusModal() {
    const modal = document.createElement('div');
    modal.id = 'statusModal';
    modal.className = 'payment-modal';
    document.body.appendChild(modal);
    return modal;
}