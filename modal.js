
// payment modal start here
const payNowButton = document.getElementById('pay-now');
const paymentModal = document.getElementById('payment-modal');
const closeButton = document.getElementsByClassName('close')[0];

function buyItem(item, price) {
  paymentModal.style.display = 'block';


payNowButton.addEventListener('click', function() {
    const cardNumber = document.getElementById('card').value;
    const expiryDate = document.getElementById('expiry').value;
    const cvv = document.getElementById('cvv').value;

    if (cardNumber && expiryDate && cvv) {
      alert(`Thank you for purchasing  ${item} for    ₦ ${price}. Your payment was successful!`);
      paymentModal.style.display = 'none';
    } else {
      alert('Please fill out all payment details.');
    }
  });
}

closeButton.onclick = function() {
  paymentModal.style.display = 'none';
}
