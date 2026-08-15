const menuBtn = document.querySelector('.menu-btn');
const navLinks = document.querySelector('.nav-links');

menuBtn?.addEventListener('click', () => {
  const open = navLinks.style.display === 'flex';
  navLinks.style.display = open ? 'none' : 'flex';
  if (!open) {
    navLinks.style.position = 'absolute';
    navLinks.style.top = '76px';
    navLinks.style.left = '0';
    navLinks.style.right = '0';
    navLinks.style.padding = '20px 5%';
    navLinks.style.background = '#0b1220';
    navLinks.style.flexDirection = 'column';
    navLinks.style.alignItems = 'flex-start';
    navLinks.style.borderBottom = '1px solid #e6e3dc';
  }
});

document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => {
    if (window.innerWidth <= 800) navLinks.style.display = 'none';
  });
});


// Subtle pointer-driven 3D depth effect for the analytics visual.
const orbitCard = document.getElementById('data-orbit-card');
if (orbitCard && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  orbitCard.addEventListener('mousemove', (event) => {
    const rect = orbitCard.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;
    orbitCard.style.transform =
      `rotateY(${x * 5}deg) rotateX(${y * -5}deg) translateZ(0)`;
    const scene = orbitCard.querySelector('.orbit-scene');
    if (scene) scene.style.transform =
      `rotateY(${x * 10}deg) rotateX(${y * -8}deg)`;
  });

  orbitCard.addEventListener('mouseleave', () => {
    orbitCard.style.transform = '';
    const scene = orbitCard.querySelector('.orbit-scene');
    if (scene) scene.style.transform = '';
  });
}


// Click a project to highlight it and open a focused project summary.
const projectModal = document.getElementById('projectModal');
const projectModalClose = document.getElementById('projectModalClose');
const projectModalTitle = document.getElementById('projectModalTitle');
const projectModalText = document.getElementById('projectModalText');
const projectModalResult = document.getElementById('projectModalResult');
const projectModalLink = document.getElementById('projectModalLink');

document.querySelectorAll('.project[data-project-title]').forEach((project) => {
  project.addEventListener('click', (event) => {
    // Let the GitHub link work normally when it is clicked directly.
    if (event.target.closest('a')) return;

    document.querySelectorAll('.project.project-selected').forEach((p) => {
      p.classList.remove('project-selected');
    });

    project.classList.add('project-selected');

    projectModalTitle.textContent = project.dataset.projectTitle || '';
    projectModalText.textContent = project.dataset.projectText || '';
    projectModalResult.textContent = project.dataset.projectResult || '';
    const repoLink = project.dataset.projectLink || '';
    projectModalLink.href = repoLink || '#';
    projectModalLink.style.display = repoLink ? 'inline-flex' : 'none';

    projectModal.classList.add('open');
    document.body.style.overflow = 'hidden';
  });
});

function closeProjectModal() {
  projectModal?.classList.remove('open');
  document.body.style.overflow = '';
}

projectModalClose?.addEventListener('click', closeProjectModal);

projectModal?.addEventListener('click', (event) => {
  if (event.target === projectModal) closeProjectModal();
});

document.getElementById('projectModalBack')?.addEventListener('click', closeProjectModal);

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') closeProjectModal();
});
