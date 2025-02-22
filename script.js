// สลับระหว่างฟอร์ม Login และ Register
function switchForm(formType) {
    const loginForm = document.getElementById('loginFormContainer');
    const registerForm = document.getElementById('registerFormContainer');
    
    if (formType === 'register') {
        loginForm.style.display = 'none';
        registerForm.style.display = 'block';
    } else {
        loginForm.style.display = 'block';
        registerForm.style.display = 'none';
    }
}

// จัดการการล็อกอิน
function handleLogin(event) {
    event.preventDefault();
    const username = document.getElementById('loginUsername').value;
    const password = document.getElementById('loginPassword').value;
    const rememberMe = document.getElementById('rememberMe').checked;
    const error = document.getElementById('loginError');

    // ดึงข้อมูลผู้ใช้ที่สมัครไว้จาก localStorage
    const users = JSON.parse(localStorage.getItem('yashixUsers') || '[]');
    const user = users.find(u => u.username === username && u.password === password);

    if (user) {
        alert('เข้าสู่ระบบสำเร็จ!');
        // บันทึกสถานะล็อกอิน
        localStorage.setItem('isLoggedIn', 'true');
        // บันทึกข้อมูลถ้าเลือก "จำฉัน"
        if (rememberMe) {
            localStorage.setItem('savedUsername', username);
            localStorage.setItem('savedPassword', password);
        }
        // เปลี่ยนไปหน้า Home
        window.location.href = 'home.html';
    } else {
        error.textContent = 'ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง';
        error.style.display = 'block';
    }
}

// จัดการการสมัครสมาชิก
function handleRegister(event) {
    event.preventDefault();
    const username = document.getElementById('registerUsername').value;
    const password = document.getElementById('registerPassword').value;
    const confirmPassword = document.getElementById('registerConfirmPassword').value;
    const error = document.getElementById('registerError');

    // ตรวจสอบว่าชื่อผู้ใช้ซ้ำหรือไม่
    const users = JSON.parse(localStorage.getItem('yashixUsers') || '[]');
    if (users.some(u => u.username === username)) {
        error.textContent = 'ชื่อผู้ใช้นี้มีอยู่แล้ว กรุณาใช้ชื่ออื่น';
        error.style.display = 'block';
        return;
    }

    if (password !== confirmPassword) {
        error.textContent = 'รหัสผ่านไม่ตรงกัน';
        error.style.display = 'block';
        return;
    }

    if (username && password) {
        // บันทึกข้อมูลผู้ใช้ใหม่ใน localStorage
        users.push({ username, password });
        localStorage.setItem('yashixUsers', JSON.stringify(users));
        alert('สมัครสมาชิกสำเร็จ! กรุณาเข้าสู่ระบบ');
        switchForm('login');
        error.style.display = 'none';
    } else {
        error.textContent = 'กรุณากรอกข้อมูลให้ครบถ้วน';
        error.style.display = 'block';
    }
}

// สร้างพarticle
function createParticles(count) {
    const particlesContainer = document.querySelector('.background-particles');
    for (let i = 0; i < count; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + 'vw';
        particle.style.top = Math.random() * 100 + 'vh';
        particle.style.animationDelay = Math.random() * 5 + 's';
        particlesContainer.appendChild(particle);
    }
}

// เรียกใช้เมื่อหน้าโหลด
window.onload = function() {
    createParticles(50); // สร้าง 50 พarticle
    // อัตโนมัติกรอกข้อมูลถ้ามีการ "จำฉัน"
    const savedUsername = localStorage.getItem('savedUsername');
    const savedPassword = localStorage.getItem('savedPassword');
    if (savedUsername && savedPassword) {
        document.getElementById('loginUsername').value = savedUsername;
        document.getElementById('loginPassword').value = savedPassword;
        document.getElementById('rememberMe').checked = true;
    }
};