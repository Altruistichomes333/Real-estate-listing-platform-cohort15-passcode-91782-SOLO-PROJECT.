

document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the form from submitting normally

    // Get the username and password from the form
    var username = document.getElementById('username').value;
    var password = document.getElementById('password').value;

    // Perform the authentication logic (replace with your own implementation)
    if (username === 'admin' && password === 'password') {
        // Authentication successful, redirect to the dashboard
        window.location.href = 'dashboard.html';
    } else {
        alert('Invalid username or password');
    }
});


  // Check if the user is authenticated before displaying the dashboard
  if (!isUserAuthenticated()) {
    // Redirect the user to the login page
    window.location.href = 'form.html';
  }
 else {
      // Display the dashboard content
  window.location.href
}


function isUserAuthenticated() {
    //  Direct the user to sign up page
    //(e.g., check for valid session token or cookie)
    return true; // Replace with your actual authentication check
}




