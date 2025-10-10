const PAYSTACK_PUBLIC_KEY = 'pk_live_28ab9023046a8f1d6ca6b12270677865404fa053'

function initializePaystack(email, phone, amount, service) {
    const handler = PaystackPop.setup({
        key: PAYSTACK_PUBLIC_KEY,
        email: email,
        amount: amount * 100, // Amount in kobo
        currency: 'KES',
        channels: ['card', 'bank_transfer'],
        metadata: {
            service_name: service,
            phone_number: phone
        },
        ref: 'JA_' + Math.floor(Math.random() * 1000000000 + 1),
        callback: function(response) {
            window.location.href = `thankyou.html?reference=${response.reference}`;
        },
        onClose: function() {
            alert('Payment window closed. Try again?');
        }
    });
    handler.openIframe();
}