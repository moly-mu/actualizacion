document.getElementById('loginForm').addEventListener('submit', async function (e) {
  e.preventDefault();

  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;

  const response = await fetch('/api/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password }),
  });

  const data = await response.json();

  if (response.ok) {
    window.location.href = '/admin.html';
  } else if (data.redirect) {
    window.location.href = data.redirect;
  } else {
    alert(data.error || 'Credenciales incorrectas');
  }
});