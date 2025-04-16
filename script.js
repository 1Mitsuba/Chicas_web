// Variables para el inicio de sesión
const USERNAME = "chiques";
const PASSWORD = "16/04/2025";

// Elementos del DOM
const loginContainer = document.getElementById('login-container');
const mainContent = document.getElementById('main-content');
const usernameInput = document.getElementById('username');
const passwordInput = document.getElementById('password');
const loginBtn = document.getElementById('login-btn');
const errorMessage = document.getElementById('error-message');
const logoutBtn = document.getElementById('logout-btn');
const navLinks = document.querySelectorAll('nav a');
const sections = document.querySelectorAll('main section');

// Función para validar el inicio de sesión
loginBtn.addEventListener('click', () => {
    const username = usernameInput.value.trim();
    const password = passwordInput.value.trim();
    
    if (username === USERNAME && password === PASSWORD) {
        // Login exitoso
        errorMessage.textContent = "";
        loginContainer.style.display = 'none';
        mainContent.style.display = 'block';
        
        // Almacenar en sessionStorage que el usuario está autenticado
        sessionStorage.setItem('authenticated', 'true');
    } else {
        // Login fallido
        errorMessage.textContent = "Usuario o contraseña incorrectos";
        passwordInput.value = "";
        usernameInput.focus();
    }
});

// Función para cerrar sesión
logoutBtn.addEventListener('click', () => {
    mainContent.style.display = 'none';
    loginContainer.style.display = 'flex';
    usernameInput.value = "";
    passwordInput.value = "";
    sessionStorage.removeItem('authenticated');
});

// Comprobar si el usuario ya está autenticado (para evitar logout al refrescar)
window.addEventListener('load', () => {
    if (sessionStorage.getItem('authenticated') === 'true') {
        loginContainer.style.display = 'none';
        mainContent.style.display = 'block';
    }
});

// Navegación entre secciones
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href').substring(1);
        
        // Remover clase activa de todos los links y secciones
        navLinks.forEach(item => item.classList.remove('active'));
        sections.forEach(section => section.classList.remove('section-active'));
        
        // Agregar clase activa al link y sección seleccionados
        link.classList.add('active');
        document.getElementById(targetId).classList.add('section-active');
    });
});

// Mostrar sección activa al cargar la página
window.addEventListener('DOMContentLoaded', () => {
    // Asegurarse de que el primer enlace y sección estén activos por defecto
    navLinks[0].classList.add('active');
    sections[0].classList.add('section-active');
});

// Función para manejar la publicación de nuevos mensajes
const publishBtn = document.querySelector('.new-message button');
const messageTextarea = document.querySelector('.new-message textarea');
const messagesContainer = document.querySelector('.messages-container');

publishBtn.addEventListener('click', () => {
    const messageText = messageTextarea.value.trim();
    
    if (messageText !== '') {
        // Crear nuevo elemento de mensaje
        const newMessage = document.createElement('div');
        newMessage.className = 'message';
        
        const messageContent = document.createElement('p');
        messageContent.className = 'message-text';
        messageContent.textContent = `"${messageText}"`;
        
        const authorText = document.createElement('p');
        authorText.className = 'author';
        authorText.textContent = '- Tú';
        
        newMessage.appendChild(messageContent);
        newMessage.appendChild(authorText);
        
        // Agregar el mensaje al inicio del contenedor
        messagesContainer.insertBefore(newMessage, messagesContainer.firstChild);
        
        // Limpiar el textarea
        messageTextarea.value = '';
    }
});