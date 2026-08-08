document.addEventListener('DOMContentLoaded', () => {
    function setupPasswordToggle(inputId, toggleBtnId) {
        const input = document.getElementById(inputId);
        const toggleBtn = document.getElementById(toggleBtnId);
        if (!input || !toggleBtn) return;

        const eyeOffIcon = toggleBtn.querySelector('.eye-off');
        const eyeOnIcon = toggleBtn.querySelector('.eye-on');

        toggleBtn.addEventListener('click', () => {
            const isPassword = input.getAttribute('type') === 'password';
            input.setAttribute('type', isPassword ? 'text' : 'password');

            if (isPassword) {
                eyeOffIcon.style.display = 'none';
                eyeOnIcon.style.display = 'block';
            } else {
                eyeOffIcon.style.display = 'block';
                eyeOnIcon.style.display = 'none';
            }
        });
    }

    setupPasswordToggle('password', 'togglePassword');
    setupPasswordToggle('confirmPassword', 'toggleConfirmPassword');

    const signupForm = document.getElementById('signupForm');
    const nameInput = document.getElementById('fullName');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const confirmPasswordInput = document.getElementById('confirmPassword');
    const termsCheck = document.getElementById('termsCheck');

    const nameError = document.getElementById('nameError');
    const emailError = document.getElementById('emailError');
    const passwordError = document.getElementById('passwordError');
    const confirmPasswordError = document.getElementById('confirmPasswordError');
    const termsError = document.getElementById('termsError');

    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(String(email).toLowerCase());
    }

    function clearErrors() {
        [nameInput, emailInput, passwordInput, confirmPasswordInput].forEach(input => {
            input?.classList.remove('invalid');
        });
        [nameError, emailError, passwordError, confirmPasswordError, termsError].forEach(err => {
            err?.classList.remove('show');
        });
    }

    nameInput?.addEventListener('input', () => {
        if (nameInput.value.trim().length > 0) {
            nameInput.classList.remove('invalid');
            nameError?.classList.remove('show');
        }
    });

    emailInput?.addEventListener('input', () => {
        if (validateEmail(emailInput.value)) {
            emailInput.classList.remove('invalid');
            emailError?.classList.remove('show');
        }
    });

    passwordInput?.addEventListener('input', () => {
        if (passwordInput.value.length >= 6) {
            passwordInput.classList.remove('invalid');
            passwordError?.classList.remove('show');
        }
    });

    confirmPasswordInput?.addEventListener('input', () => {
        if (confirmPasswordInput.value === passwordInput.value && confirmPasswordInput.value.length >= 6) {
            confirmPasswordInput.classList.remove('invalid');
            confirmPasswordError?.classList.remove('show');
        }
    });

    termsCheck?.addEventListener('change', () => {
        if (termsCheck.checked) {
            termsError?.classList.remove('show');
        }
    });

    if (signupForm) {
        signupForm.addEventListener('submit', (e) => {
            e.preventDefault();
            clearErrors();

            let isValid = true;

            if (!nameInput?.value.trim()) {
                nameInput?.classList.add('invalid');
                nameError?.classList.add('show');
                isValid = false;
            }

            if (!validateEmail(emailInput?.value.trim() || '')) {
                emailInput?.classList.add('invalid');
                emailError?.classList.add('show');
                isValid = false;
            }

            if (!passwordInput || passwordInput.value.length < 6) {
                passwordInput?.classList.add('invalid');
                passwordError?.classList.add('show');
                isValid = false;
            }

            if (!confirmPasswordInput || confirmPasswordInput.value !== passwordInput?.value) {
                confirmPasswordInput?.classList.add('invalid');
                confirmPasswordError?.classList.add('show');
                isValid = false;
            }

            if (!termsCheck?.checked) {
                termsError?.classList.add('show');
                isValid = false;
            }

            if (isValid) {
                const submitBtn = document.getElementById('submitBtn');
                if (submitBtn) {
                    submitBtn.disabled = true;
                    submitBtn.style.opacity = '0.75';
                    submitBtn.querySelector('span').textContent = 'Creating Account...';
                }

                setTimeout(() => {
                    alert('Account successfully created! Welcome to Shopy.');
                    window.location.href = 'login.html';
                }, 1000);
            }
        });
    }
});
