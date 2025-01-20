import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.0.0/firebase-app.js';
import { getAuth, RecaptchaVerifier, signInWithPhoneNumber } from 'https://www.gstatic.com/firebasejs/9.0.0/firebase-auth.js';

async function getFirebaseConfig() {
  const response = await fetch('/api/firebase-config');
  if (!response.ok) {
    throw new Error('No se pudo obtener la configuración de Firebase');
  }
  return response.json();
}

getFirebaseConfig()
  .then((firebaseConfig) => {
    // Inicializar Firebase con la configuración obtenida
    const app = initializeApp(firebaseConfig);
    const auth = getAuth(app);

    // Funciones relacionadas con la verificación del teléfono
    function sendVerificationCode() {
      const phoneNumber = document.getElementById('phoneNumber').value;

      const recaptchaContainer = document.getElementById('verification');
      recaptchaContainer.innerHTML = '';

      window.recaptchaVerifier = new RecaptchaVerifier(
        'verification',
        { size: 'invisible', callback: () => console.log('reCAPTCHA verificado.') },
        auth
      );

      const appVerifier = window.recaptchaVerifier;

      signInWithPhoneNumber(auth, phoneNumber, appVerifier)
        .then((confirmationResult) => {
          window.confirmationResult = confirmationResult;
          alert('Código enviado');
          document.getElementById('phoneSection').style.display = 'none';
          document.getElementById('verificationSection').style.display = 'block';
        })
        .catch((error) => {
          console.error('Error al enviar el código:', error);
          alert('Error al enviar el código: ' + error.message);
        });
    }

    function verifyCode() {
      const code = document.getElementById('verificationCode').value;

      window.confirmationResult
        .confirm(code)
        .then(() => {
          alert('Verificación exitosa');
          fetch('/api/auth/reset-attempts', { method: 'POST' })
            .then((res) => res.json())
            .then((data) => {
              console.log(data.message);
              window.location.href = '/login.html';
            })
            .catch((error) => console.error('Error al resetear intentos: ', error));
        })
        .catch((error) => {
          alert('Código incorrecto');
          console.error('Error de verificación:', error);
        });
    }

    // Event listeners para los botones
    document.getElementById('sendVerificationCode').addEventListener('click', sendVerificationCode);
    document.getElementById('verifyCode').addEventListener('click', verifyCode);
  })
  .catch((error) => console.error('Error al cargar la configuración de Firebase:', error));