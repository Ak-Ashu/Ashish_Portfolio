// Mobile menu toggle
const hamb = document.getElementById('hamb');
const menu = document.getElementById('menu');
hamb.addEventListener('click', () => menu.classList.toggle('open'));
// Close menu on nav click (mobile)
[...menu.querySelectorAll('a')].forEach(a => a.addEventListener('click', () => menu.classList.remove('open')));

// Active link on scroll
const links = [...document.querySelectorAll('.menu a')];
const sections = links.map(a => document.querySelector(a.getAttribute('href')));
const obs = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      links.forEach(l => l.classList.remove('active'));
      const id = '#' + entry.target.id;
      const current = links.find(l => l.getAttribute('href') === id);
      if (current) current.classList.add('active');
    }
  })
}, { rootMargin: '-40% 0px -55% 0px', threshold: .02 });
sections.forEach(s => s && obs.observe(s));

// Animate skill bars when in view
const bars = document.querySelectorAll('.bar > span');
const barObs = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      const span = e.target; const p = span.dataset.progress || 0;
      span.style.transition = 'width 1.1s cubic-bezier(.2,.8,.2,1)';
      requestAnimationFrame(() => span.style.width = p + '%');
      barObs.unobserve(span);
    }
  })
}, { threshold: .4 });
bars.forEach(b => barObs.observe(b));

// Footer year
document.getElementById('y').textContent = new Date().getFullYear();

// Contact form UX 
const form = document.getElementById('contactForm');
const msg = document.getElementById('formMsg');
form.addEventListener('submit', async (ev) => {
  ev.preventDefault();
  msg.textContent = 'Sending…';
  try {
    const data = new FormData(form);
    const res = await fetch(form.action, { method: 'POST', body: data, headers: { 'Accept': 'application/json' } });
    if (res.ok) { msg.textContent = 'Thanks! I will get back to you soon.'; form.reset(); }
    else { msg.textContent = 'There was a problem. You can email me directly.' }
  } catch (err) { msg.textContent = 'Network error. Please try again later.' }
});

const roles = [
  "Python Developer",
  "AI/ML Enthusiast",
  "Web Developer (Flask, HTML, CSS, JS)"
];

let index = 0;
const roleText = document.getElementById("role-text");

function changeRole() {
  roleText.textContent = roles[index];
  index = (index + 1) % roles.length;
}

// First load
changeRole();
setInterval(changeRole, 3000);

// Get elements
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightbox-img");
const close = document.getElementsByClassName("close")[0];

// Open lightbox when clicking on images
document.querySelectorAll(".zoom-img").forEach(img => {
  img.addEventListener("click", () => {
    lightbox.style.display = "block";
    lightboxImg.src = img.src;
  });
});

// Close lightbox
close.onclick = function () {
  lightbox.style.display = "none";
};
window.onclick = function (event) {
  if (event.target == lightbox) {
    lightbox.style.display = "none";
  }
};


//Gallery 
function openGallery(id) {
  const modal = document.getElementById(id);
  modal.classList.add("active");
  document.body.style.overflow = "hidden";

  modal.addEventListener("click", function (e) {
    if (e.target === modal) {
      closeGallery(id);
    }
  });
}

function closeGallery(id) {
  const modal = document.getElementById(id);
  modal.classList.remove("active");
  document.body.style.overflow = "auto";
}


//Chatbot
const chatToggle = document.getElementById('chat-toggle');
const chatbot = document.getElementById('chatbot-container');
const messages = document.getElementById('chatbot-messages');
const input = document.getElementById('chatbot-input');

let chatHistory = JSON.parse(localStorage.getItem('chatHistory')) || [];

chatToggle.addEventListener('click', () => {
  chatbot.style.display = chatbot.style.display === 'flex' ? 'none' : 'flex';
});

function renderChat() {
  messages.innerHTML = "";
  chatHistory.forEach(msg => {
    const div = document.createElement('div');
    div.textContent = (msg.sender === 'bot' ? "🤖 " : "🧑 ") + msg.text;
    div.style.margin = "5px 0";
    if (msg.sender === 'user') div.style.textAlign = "right";
    messages.appendChild(div);
  });
  messages.scrollTop = messages.scrollHeight;
}

function addMessage(sender, text) {
  chatHistory.push({ sender, text });
  localStorage.setItem('chatHistory', JSON.stringify(chatHistory));
  renderChat();
}

input.addEventListener('keypress', e => {
  if (e.key === 'Enter' && input.value.trim() !== "") {
    const question = input.value.trim().toLowerCase();
    addMessage('user', input.value);
    input.value = "";

    let answer = "";
    if (question.includes("who are you"))
      answer = "I’m Ashish’s personal AI assistant 🤖. Nice to meet you!";
    else if (question.includes("ashish") || question.includes("your creator"))
      answer = "Ashish Kumar is a Python Developer and AI/ML enthusiast who loves building intelligent and scalable solutions!";
    else if (question.includes("skills"))
      answer = "Ashish is skilled in Python, Flask, Django, JavaScript, and Machine Learning 💻.";
    else if (question.includes("projects"))
      answer = "He has built projects like House Price Prediction, Loan Prediction, Quiz Game, and more!";
    else if (question.includes("contact"))
      answer = "You can reach Ashish via the Contact section below 📩.";
    else
      answer = "Hmm... I’m still learning 😅. Try asking about Ashish, skills, or projects!";

    addMessage('bot', answer);
  }
});

// Load previous chat when page opens
renderChat();
