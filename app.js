// Immediately apply saved theme to avoid flash
(function () {
  const saved = localStorage.getItem('theme');
  if (saved === 'light') {
    document.documentElement.classList.add('theme-light');
  }
})();

// theme toggle + persistence
const themeToggle = document.getElementById('toggle-theme');
const htmlEl = document.documentElement;
const savedTheme = localStorage.getItem('theme');

if (savedTheme === 'light') htmlEl.classList.add('theme-light');

function setTheme(mode) {
  if (mode === 'light') {
    htmlEl.classList.add('theme-light');
    localStorage.setItem('theme', 'light');
  } else {
    htmlEl.classList.remove('theme-light');
    localStorage.setItem('theme', 'dark');
  }

  if (themeToggle) {
    const isLight = htmlEl.classList.contains('theme-light');
    themeToggle.setAttribute('aria-pressed', String(isLight));
    themeToggle.innerHTML = isLight
      ? '<i class="fa-solid fa-moon"></i> Dark'
      : '<i class="fa-solid fa-sun"></i> Light';
  }
}

if (themeToggle) {
  setTheme(htmlEl.classList.contains('theme-light') ? 'light' : 'dark');

  themeToggle.addEventListener('click', () => {
    const nowLight = htmlEl.classList.contains('theme-light');
    setTheme(nowLight ? 'dark' : 'light');
  });

  themeToggle.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      themeToggle.click();
    }
  });
}

// Scroll reveal
const revealObserver = new IntersectionObserver(
  (entries, obs) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        obs.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.18 }
);

document.querySelectorAll('.reveal').forEach((el) => {
  revealObserver.observe(el);
});

// Active nav highlight
const sections = document.querySelectorAll('main section[id]');
const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      const id = entry.target.id;
      const link = document.querySelector(`.nav-link[href="#${id}"]`);

      if (entry.isIntersecting) {
        document
          .querySelectorAll('.nav-link')
          .forEach((a) => a.classList.remove('active'));

        if (link) link.classList.add('active');
      }
    });
  },
  { rootMargin: '-40% 0px -40% 0px', threshold: 0 }
);

sections.forEach((section) => {
  sectionObserver.observe(section);
});

// Focus outline handling
document.body.addEventListener('mousedown', () => {
  document.documentElement.style.setProperty('--focus-style', 'none');
});

document.body.addEventListener('keydown', () => {
  document.documentElement.style.removeProperty('--focus-style');
});

const resumeBtn = document.getElementById('resumeToggle');
const resumeMenu = document.getElementById('resumeMenu');

resumeBtn.addEventListener('click', () => {
  resumeMenu.style.display =
    resumeMenu.style.display === 'flex' ? 'none' : 'flex';
});

// click outside → close dropdown
document.addEventListener('click', (e) => {
  if (!e.target.closest('.resume-wrapper')) {
    resumeMenu.style.display = 'none';
  }
});

const skillsData = {
  mern: [
    'HTML',
    'CSS',
    'JavaScript',
    'React',
    'Node.js',
    'Express.js',
    'MongoDB',
    'REST APIs',
    'Git & GitHub',
  ],
  aiml: [
    'Python',
    'NumPy',
    'Pandas',
    'Matplotlib',
    'Scikit-learn',
    'Machine Learning',
    'Data Analysis',
    'Jupyter Notebook',
  ],
};

function showSkills(type) {
  const grid = document.getElementById('skillsGrid');
  grid.innerHTML = '';

  skillsData[type].forEach((skill) => {
    const span = document.createElement('span');
    span.className = 'skill-pill';
    span.textContent = skill;
    grid.appendChild(span);
  });

  document
    .querySelectorAll('.skill-btn')
    .forEach((btn) => btn.classList.remove('active'));
  event.target.classList.add('active');
}
