(() => {
  const body = document.body;
  const menu = document.querySelector('.menu');
  const links = document.querySelector('.links');
  const theme = document.querySelector('.theme');
  const up = document.querySelector('.up');
  const form = document.querySelector('#contact-form');
  const status = document.querySelector('#status');

  const savedTheme = localStorage.getItem('portfolio-theme');
  if (savedTheme === 'light') body.classList.add('light');
  const syncTheme = () => {
    const light = body.classList.contains('light');
    theme.textContent = light ? '☾' : '☼';
    theme.setAttribute('aria-label', light ? 'Activer le thème sombre' : 'Activer le thème clair');
  };
  syncTheme();

  theme.addEventListener('click', () => {
    body.classList.toggle('light');
    localStorage.setItem('portfolio-theme', body.classList.contains('light') ? 'light' : 'dark');
    syncTheme();
  });

  menu.addEventListener('click', () => {
    const open = links.classList.toggle('open');
    menu.setAttribute('aria-expanded', String(open));
    menu.setAttribute('aria-label', open ? 'Fermer le menu' : 'Ouvrir le menu');
  });
  links.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
    links.classList.remove('open');
    menu.setAttribute('aria-expanded', 'false');
  }));

  const observer = new IntersectionObserver(entries => entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('show');
      observer.unobserve(entry.target);
    }
  }), { threshold: 0.12 });
  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

  window.addEventListener('scroll', () => up.classList.toggle('visible', window.scrollY > 600), { passive: true });
  document.querySelector('#year').textContent = new Date().getFullYear();

  form.addEventListener('submit', event => {
    event.preventDefault();
    const data = new FormData(form);
    const subject = encodeURIComponent('Contact depuis le portfolio — ' + data.get('name'));
    const message = encodeURIComponent('Bonjour Justin,\n\n' + data.get('message') + '\n\nEnvoyé par : ' + data.get('name') + '\nEmail : ' + data.get('email'));
    status.textContent = 'Ouverture de votre application email…';
    window.location.href = 'mailto:justinosngalamulume107@gmail.com?subject=' + subject + '&body=' + message;
  });
})();
