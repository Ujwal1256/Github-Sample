document.getElementById('registrationForm').addEventListener('submit', async function (e) {
  e.preventDefault();

  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value.trim();
  const messageDiv = document.getElementById('message');

  if (!name || !email || !password) {
    messageDiv.textContent = 'All fields are required.';
    messageDiv.className = 'message error';
    return;
  }

  const userData = { name, email, password };

  try {
    const response = await fetch('https://6820588072e59f922ef8614b.mockapi.io/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userData)
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Registration failed.');
    }

    messageDiv.textContent = 'Registration successful!';
    messageDiv.className = 'message success';
    document.getElementById('registrationForm').reset();
  } catch (error) {
    messageDiv.textContent = `Error: ${error.message}`;
    messageDiv.className = 'message error';
  }
 
});
