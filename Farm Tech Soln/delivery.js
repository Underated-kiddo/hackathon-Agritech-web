// Handles price update and form confirmation for delivery page

document.addEventListener('DOMContentLoaded', function() {
    const itemSelect = document.getElementById('item');
    const quantityInput = document.getElementById('quantity');
    const priceInput = document.getElementById('price');
    const form = document.getElementById('deliveryForm');
    const confirmation = document.getElementById('confirmation');
    const paymentModal = document.getElementById('paymentModal');
    const closeModal = document.getElementById('closeModal');
    const paymentMethod = document.getElementById('paymentMethod');
    const paymentSteps = document.getElementById('paymentSteps');

    function updatePrice() {
        const selected = itemSelect.options[itemSelect.selectedIndex];
        const pricePerUnit = Number(selected.getAttribute('data-price')) || 0;
        const quantity = Number(quantityInput.value) || 1;
        priceInput.value = pricePerUnit * quantity;
    }

    itemSelect.addEventListener('change', updatePrice);
    quantityInput.addEventListener('input', updatePrice);

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        // Hide confirmation, show payment modal
        confirmation.style.display = 'none';
        paymentModal.style.display = 'block';
        paymentMethod.value = '';
        paymentSteps.innerHTML = '';
    });

    closeModal.addEventListener('click', function() {
        paymentModal.style.display = 'none';
        confirmation.style.display = 'block';
        confirmation.textContent = 'Thank you! Your delivery request has been received.';
        form.reset();
        priceInput.value = '';
    });

    paymentMethod.addEventListener('change', function() {
        let steps = '';
        if (paymentMethod.value === 'mpesa') {
            steps = `<ol>
                <li>Go to your M-Pesa menu on your phone.</li>
                <li>Select 'Lipa na M-Pesa'.</li>
                <li>Select 'Paybill' and enter Business Number: <b>123456</b>.</li>
                <li>Enter Account Number: <b>DELIVERY</b>.</li>
                <li>Enter the total amount shown above.</li>
                <li>Enter your M-Pesa PIN and confirm.</li>
                <li>Wait for the confirmation SMS.</li>
            </ol>`;
        } else if (paymentMethod.value === 'airtel') {
            steps = `<ol>
                <li>Go to your Airtel Money menu on your phone.</li>
                <li>Select 'Make Payments'.</li>
                <li>Select 'Paybill' and enter Business Number: <b>654321</b>.</li>
                <li>Enter Reference: <b>DELIVERY</b>.</li>
                <li>Enter the total amount shown above.</li>
                <li>Enter your Airtel Money PIN and confirm.</li>
                <li>Wait for the confirmation SMS.</li>
            </ol>`;
        } else if (paymentMethod.value === 'card') {
            steps = `<ol>
                <li>Enter your bank card details in the secure payment portal.</li>
                <li>Confirm the amount and submit.</li>
                <li>Follow your bank's authentication steps if prompted.</li>
                <li>Wait for the payment confirmation message.</li>
            </ol>`;
        } else {
            steps = '';
        }
        paymentSteps.innerHTML = steps;
    });

    // Optional: close modal when clicking outside modal content
    window.onclick = function(event) {
        if (event.target === paymentModal) {
            paymentModal.style.display = 'none';
            confirmation.style.display = 'block';
            confirmation.textContent = 'Thank you! Your delivery request has been received.';
            form.reset();
            priceInput.value = '';
        }
    };
});
