document.addEventListener('DOMContentLoaded', function() {
    const registerForm = document.getElementById('register-form');
    
    registerForm.addEventListener('submit', function(event) {
        event.preventDefault();
        
        const email = registerForm.querySelector('[name="email"]').value;
        const password = registerForm.querySelector('[name="password"]').value;
        const last_name = registerForm.querySelector('[name= ""]')

        // Realiza las validaciones necesarias aquí, por ejemplo, verificar que el correo electrónico sea válido y la contraseña tenga ciertos requisitos.

        // Si las validaciones pasan, puedes enviar los datos al servidor para el registro.
        // Si hay errores, muestra mensajes de error en la página.

        // Ejemplo: Enviar datos al servidor utilizando Fetch API o Axios.
    });
});
