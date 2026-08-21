/* ========= Theme toggle ========= */
const root = document.documentElement;
const themeToggle = document.getElementById('theme-toggle');
const savedTheme = localStorage.getItem('theme');
const prefersLight = window.matchMedia('(prefers-color-scheme: light)').matches;
if (savedTheme) root.setAttribute('data-theme', savedTheme);
else if (prefersLight) root.setAttribute('data-theme', 'light');

function updateThemeIcon() {
  const theme = root.getAttribute('data-theme');
  themeToggle.innerHTML = theme === 'light' ? '<i class="fa-solid fa-sun"></i>' : '<i class="fa-solid fa-moon"></i>';
}
updateThemeIcon();

themeToggle.addEventListener('click', () => {
  const next = root.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
  root.setAttribute('data-theme', next);
  localStorage.setItem('theme', next);
  updateThemeIcon();
});

/* ========= Navbar scroll state ========= */
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 10);
  document.getElementById('back-to-top').classList.toggle('visible', window.scrollY > 500);
}, { passive: true });

/* ========= Mobile menu ========= */
const hamb = document.getElementById('hamb');
const menu = document.getElementById('menu');
hamb.addEventListener('click', () => {
  const open = menu.classList.toggle('open');
  hamb.setAttribute('aria-expanded', open ? 'true' : 'false');
});
[...menu.querySelectorAll('a')].forEach(a => a.addEventListener('click', () => {
  menu.classList.remove('open');
  hamb.setAttribute('aria-expanded', 'false');
}));

/* ========= Active link on scroll ========= */
const links = [...document.querySelectorAll('.menu a')];
const navSections = links.map(a => document.querySelector(a.getAttribute('href'))).filter(Boolean);
const navObs = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      links.forEach(l => l.classList.remove('active'));
      const match = links.find(l => l.getAttribute('href') === '#' + entry.target.id);
      if (match) match.classList.add('active');
    }
  });
}, { rootMargin: '-40% 0px -55% 0px', threshold: .02 });
navSections.forEach(s => navObs.observe(s));

/* ========= Scroll reveal ========= */
const revealObs = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObs.unobserve(entry.target);
    }
  });
}, { threshold: .12 });
document.querySelectorAll('.reveal').forEach(el => revealObs.observe(el));

/* ========= Back to top ========= */
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
document.getElementById('back-to-top').addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: prefersReducedMotion ? 'auto' : 'smooth' });
});

/* ========= Footer year ========= */
document.getElementById('y').textContent = new Date().getFullYear();

/* ========= Projects data (edit this array to add/update projects) ========= */
const projects = [
  {
    title: "House Price Prediction System",
    categories: ["ml", "backend"],
    tech: ["Python", "Flask", "Scikit-learn", "Machine Learning", "MySQL"],
    summary: "A machine learning based web application that predicts house prices based on input features.",
    problem: "Estimating a fair house price from raw property features is hard to do manually and consistently.",
    solution: "A regression model trained on housing data, served through a Flask backend with a simple input form and prediction output.",
    features: ["Data preprocessing", "Machine learning model", "Flask backend", "User input form", "Prediction output", "Model serialization"],
    github: "https://github.com/Ak-Ashu/HousePricePrediction",
    demo: "https://www.linkedin.com/posts/ashish-kumar-27016030a_1-predict-accurate-house-prices-build-a-activity-7346393945611923458-tj0n"
  },
  {
    title: "AI Movie Recommendation System",
    categories: ["ml", "backend"],
    tech: ["Python", "Flask", "Pandas", "Machine Learning", "TMDB API"],
    summary: "An AI-powered movie recommendation application that recommends movies based on similarity between movies.",
    problem: "Finding similar movies to one you like requires manually comparing genres, cast, and plot.",
    solution: "A content-based recommendation engine that calculates similarity scores across a movie dataset and serves results through Flask.",
    features: ["Recommendation engine", "Similarity calculation", "Movie dataset processing", "API integration", "Flask backend", "User-friendly interface"],
    github: "https://github.com/Ak-Ashu/movie-recommender-systerm",
    demo: "https://www.linkedin.com/posts/ashish-kumar-27016030a_python-flask-webdevelopment-activity-7457285317910253568--xB7"
  },
  {
    title: "Employee Salary Prediction System",
    categories: ["ml"],
    tech: ["Python", "Pandas", "Scikit-learn", "Streamlit", "Machine Learning"],
    summary: "A machine learning system that predicts employee salaries using multiple algorithms.",
    problem: "Salary bands are often inconsistent across roles, experience, and departments without a data-driven baseline.",
    solution: "Multiple ML models were compared on cleaned salary data, with the best-performing approach wired into an interactive Streamlit app.",
    features: ["Data preprocessing", "Model comparison", "Regression/classification workflow", "Model evaluation", "Interactive Streamlit interface"],
    github: "https://github.com/Ak-Ashu/Employee-Salary-Prediction",
    demo: null
  },
  {
    title: "Personal Portfolio Website",
    categories: ["frontend"],
    tech: ["HTML", "CSS", "JavaScript"],
    summary: "Responsive personal portfolio website showcasing technical skills, projects and professional profile.",
    problem: "Needed a single, fast-loading place to showcase skills and projects to recruiters.",
    solution: "A responsive static site built with vanilla HTML, CSS and JavaScript — no build tooling required.",
    features: ["Responsive layout", "Project showcase", "Skills section", "Contact form"],
    github: "https://github.com/Ak-Ashu/Ashish_Portfolio",
    demo: "https://ashish-portfolio-kohl.vercel.app/"
  },
  {
    title: "Hospital Management System",
    categories: ["backend"],
    tech: [
      "Python",
      "MySQL",
      "SQL",
      "mysql-connector-python",
      "Relational Database"
    ],
    summary: "A comprehensive MySQL-based Hospital Management System designed to manage hospital operations including patients, doctors, departments, appointments, admissions, treatments, medicines, prescriptions, billing, payments, rooms, and laboratory tests.",
    problem: "Managing hospital operations across patients, doctors, appointments, admissions, treatments, billing, medicines, and laboratory records requires a structured and reliable relational database system.",
    solution: "Designed a relational database in MySQL with interconnected tables, primary keys, foreign keys, and SQL queries to manage hospital operations and generate meaningful analytical insights. Python was used for database connectivity and interaction with the MySQL system.",
    features: [
      "Patient management",
      "Doctor and department management",
      "Appointment scheduling",
      "Room and admission management",
      "Nurse management",
      "Treatment management",
      "Medicine and prescription management",
      "Billing and payment management",
      "Laboratory test and result management",
      "Relational database design",
      "Foreign-key relationships",
      "SQL-based data analysis",
      "Python-MySQL connectivity"
    ],
    database: [
      "Departments",
      "Patients",
      "Doctors",
      "Appointments",
      "Rooms",
      "Admissions",
      "Nurses",
      "Treatments",
      "Medicines",
      "Prescriptions",
      "Billing",
      "Payments",
      "Lab_Tests",
      "Test_Results"
    ],
    github: "https://github.com/Ak-Ashu/Hospital_Management_System",
    demo: null
  }
  // {
  //   title: "YOLO Bag Counter",
  //   categories: ["cv"],
  //   tech: ["Python", "YOLO", "Ultralytics", "OpenCV"],
  //   summary: "Computer vision project using object detection and tracking to identify and count bags from video input.",
  //   problem: "Manually counting bags moving through a video feed is slow and error-prone.",
  //   solution: "A YOLO-based detector identifies and tracks bags frame-by-frame using OpenCV for video processing.",
  //   features: ["Object detection", "Object tracking", "Video frame processing", "Count aggregation"],
  //   github: null,
  //   demo: null
  // },
  // {
  //   title: "Loan Prediction Django Application",
  //   categories: ["ml", "backend"],
  //   tech: ["Python", "Django", "Machine Learning", "Scikit-learn"],
  //   summary: "Machine learning powered web application for loan prediction using a Django backend.",
  //   problem: "Assessing loan eligibility manually is time-consuming and subjective.",
  //   solution: "A trained classification model predicts loan approval likelihood, served through a Django web application.",
  //   features: ["Data preprocessing", "Classification model", "Django backend", "Prediction interface"],
  //   github: null,
  //   demo: null
  // },
  // {
  //   title: "Job Portal",
  //   categories: ["frontend"],
  //   tech: ["HTML", "CSS", "JavaScript", "Tailwind CSS"],
  //   summary: "A responsive job portal interface designed to connect job seekers with opportunities.",
  //   problem: "Job seekers need a clean, browsable interface to explore listed opportunities.",
  //   solution: "A responsive front-end interface built with Tailwind CSS covering listing, browsing and interaction patterns.",
  //   features: ["Responsive layout", "Job listing UI", "Search/filter interface"],
  //   github: null,
  //   demo: null
  // }
];

const catLabels = { ml: "Machine Learning", backend: "Backend", cv: "Computer Vision", frontend: "Frontend" };

const grid = document.getElementById('projectsGrid');
const searchInput = document.getElementById('projectSearch');
const chips = document.querySelectorAll('.chip-btn');
let activeFilter = 'all';

function linkButtons(p) {
  const gh = p.github
    ? `<a href="${p.github}" target="_blank" rel="noopener" class="btn outline sm"><i class="fa-brands fa-github"></i> GitHub</a>`
    : `<span class="link-pending"><i class="fa-brands fa-github"></i> Link coming soon</span>`;
  const demo = p.demo
    ? `<a href="${p.demo}" target="_blank" rel="noopener" class="btn primary sm"><i class="fa-solid fa-eye"></i> Live Demo</a>`
    : `<span class="link-pending"><i class="fa-solid fa-eye"></i> Demo coming soon</span>`;
  return gh + demo;
}

function renderProjects() {
  const query = searchInput.value.trim().toLowerCase();
  const filtered = projects.filter(p => {
    const matchesFilter = activeFilter === 'all' || p.categories.includes(activeFilter);
    const matchesSearch = !query || p.title.toLowerCase().includes(query) ||
      p.tech.some(t => t.toLowerCase().includes(query));
    return matchesFilter && matchesSearch;
  });

  grid.innerHTML = filtered.length ? filtered.map((p, i) => `
    <div class="project-card">
      <span class="p-cat">${p.categories.map(c => catLabels[c]).join(' · ')}</span>
      <h3>${p.title}</h3>
      <p>${p.summary}</p>
      <div class="tech-badges">${p.tech.map(t => `<span>${t}</span>`).join('')}</div>
      <div class="card-actions">
        <button class="btn outline sm" data-detail="${projects.indexOf(p)}">View Details</button>
        ${linkButtons(p)}
      </div>
    </div>
  `).join('') : `<p class="muted">No projects match that search or filter.</p>`;

  grid.querySelectorAll('[data-detail]').forEach(btn => {
    btn.addEventListener('click', () => openModal(projects[btn.dataset.detail]));
  });
}

chips.forEach(btn => {
  btn.addEventListener('click', () => {
    chips.forEach(c => c.classList.remove('active'));
    btn.classList.add('active');
    activeFilter = btn.dataset.filter;
    renderProjects();
  });
});
searchInput.addEventListener('input', renderProjects);
renderProjects();

/* ========= Project detail modal ========= */
const modal = document.getElementById('projectModal');
const modalBody = document.getElementById('modalBody');
const modalClose = document.getElementById('modalClose');

function openModal(p) {
  modalBody.innerHTML = `
    <span class="p-cat">${p.categories.map(c => catLabels[c]).join(' · ')}</span>
    <h3>${p.title}</h3>
    <div class="tech-badges" style="margin:10px 0 16px">${p.tech.map(t => `<span>${t}</span>`).join('')}</div>
    <h4>Problem</h4><p>${p.problem}</p>
    <h4>Solution</h4><p>${p.solution}</p>
    <h4>Key Features</h4><ul>${p.features.map(f => `<li>${f}</li>`).join('')}</ul>
    <div class="btns" style="margin-top:20px">${linkButtons(p)}</div>
  `;
  modal.classList.add('open');
  document.body.style.overflow = 'hidden';
  modalClose.focus();
}
function closeModal() {
  modal.classList.remove('open');
  document.body.style.overflow = 'auto';
}
modalClose.addEventListener('click', closeModal);
modal.addEventListener('click', e => { if (e.target === modal) closeModal(); });
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });

/* ========= Contact form (mailto fallback) ========= */
const form = document.getElementById('contactForm');
const status = document.getElementById('formStatus');
const sendBtn = document.getElementById('sendBtn');

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const name = form.name.value.trim();
  const email = form.email.value.trim();
  const subject = form.subject.value.trim() || `Portfolio contact from ${name}`;
  const message = form.message.value.trim();

  if (!name || !email || !message) {
    status.textContent = 'Please fill in your name, email, and message.';
    return;
  }

  sendBtn.disabled = true;
  status.textContent = 'Opening your email client…';

  const body = encodeURIComponent(`${message}\n\n— ${name} (${email})`);
  const mailto = `mailto:ashishak6969@gmail.com?subject=${encodeURIComponent(subject)}&body=${body}`;
  window.location.href = mailto;

  setTimeout(() => {
    status.textContent = 'If your email client didn\u2019t open, email ashishak6969@gmail .com directly.';
    sendBtn.disabled = false;
  }, 1200);
});