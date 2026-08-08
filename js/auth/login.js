document.addEventListener('DOMContentLoaded', () => {
    const passwordInput = document.getElementById('password');
    const togglePasswordBtn = document.getElementById('togglePassword');
    const eyeOffIcon = togglePasswordBtn?.querySelector('.eye-off');
    const eyeOnIcon = togglePasswordBtn?.querySelector('.eye-on');

    if (togglePasswordBtn && passwordInput) {
        togglePasswordBtn.addEventListener('click', () => {
            const isPassword = passwordInput.getAttribute('type') === 'password';
            passwordInput.setAttribute('type', isPassword ? 'text' : 'password');

            if (isPassword) {
                eyeOffIcon.style.display = 'none';
                eyeOnIcon.style.display = 'block';
            } else {
                eyeOffIcon.style.display = 'block';
                eyeOnIcon.style.display = 'none';
            }
        });
    }

    const loginForm = document.getElementById('loginForm');
    const emailInput = document.getElementById('email');
    const emailError = document.getElementById('emailError');
    const passwordError = document.getElementById('passwordError');

    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(String(email).toLowerCase());
    }

    function clearErrors() {
        emailInput?.classList.remove('invalid');
        passwordInput?.classList.remove('invalid');
        if (emailError) emailError.classList.remove('show');
        if (passwordError) passwordError.classList.remove('show');
    }

    emailInput?.addEventListener('input', () => {
        if (emailInput.classList.contains('invalid')) {
            if (validateEmail(emailInput.value)) {
                emailInput.classList.remove('invalid');
                emailError?.classList.remove('show');
            }
        }
    });

    passwordInput?.addEventListener('input', () => {
        if (passwordInput.classList.contains('invalid')) {
            if (passwordInput.value.length >= 6) {
                passwordInput.classList.remove('invalid');
                passwordError?.classList.remove('show');
            }
        }
    });

    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            clearErrors();

            let isValid = true;
            const emailVal = emailInput?.value.trim() || '';
            const passwordVal = passwordInput?.value || '';

            if (!validateEmail(emailVal)) {
                emailInput?.classList.add('invalid');
                emailError?.classList.add('show');
                isValid = false;
            }

            if (passwordVal.length < 6) {
                passwordInput?.classList.add('invalid');
                passwordError?.classList.add('show');
                isValid = false;
            }

            if (isValid) {
                const submitBtn = document.getElementById('submitBtn');
                if (submitBtn) {
                    submitBtn.disabled = true;
                    submitBtn.style.opacity = '0.75';
                    submitBtn.querySelector('span').textContent = 'Signing in...';
                }

                setTimeout(() => {
                    alert('Successfully logged in!');
                    window.location.href = '../../index.html';
                }, 1000);
            }
        });
    }
});
