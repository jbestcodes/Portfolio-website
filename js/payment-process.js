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