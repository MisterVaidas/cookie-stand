document.getElementById('order-form').addEventListener('submit', function(event) {
    event.preventDefault();  

    const formData = {
        fname: document.getElementById('fname').value,
        lname: document.getElementById('lname').value,
        address: document.getElementById('address').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
        product: document.getElementById('product').value,
        quantity: document.getElementById('quantity').value,
        cardname: document.getElementById('cardname').value,
        cardnumber: document.getElementById('cardnumber').value,
        expiry: document.getElementById('expiry').value,
        cvv: document.getElementById('cvv').value,
        special: document.getElementById('special').value
    };

    // Save the form data in localStorage
    localStorage.setItem('formData', JSON.stringify(formData));

    // Redirect to the order-processing page
    window.location.href = "order-processing.html";
});
