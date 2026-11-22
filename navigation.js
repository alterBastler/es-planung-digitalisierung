// Add the shared entry point without duplicating it on updated pages.
for (const navigation of document.querySelectorAll('#site-navigation, .footer-links')) {
  if (!navigation.querySelector('a[href="trainings.html"]')) {
    const link = document.createElement('a');
    link.href = 'trainings.html';
    link.textContent = 'Lerntrainer';
    navigation.appendChild(link);
  }
  const centralURL = 'https://zentrale.es-planung-digitalisierung.de:8443/hardware/';
  if (!navigation.querySelector(`a[href="${centralURL}"]`)) {
    const link = document.createElement('a');
    link.href = centralURL;
    link.textContent = 'HVDM';
    link.title = 'Geschützte HVDM-Zentrale';
    navigation.appendChild(link);
  }
}
if (location.pathname.endsWith('/trainings.html')) {
  document.querySelector('#site-navigation a[href="trainings.html"]')?.setAttribute('aria-current', 'page');
}

const menuButton = document.querySelector('.menu-toggle');
const siteNavigation = document.querySelector('#site-navigation');

if (menuButton && siteNavigation) {
  const closeMenu = () => {
    menuButton.setAttribute('aria-expanded', 'false');
    siteNavigation.classList.remove('is-open');
  };
  menuButton.addEventListener('click', () => {
    const expanded = menuButton.getAttribute('aria-expanded') === 'true';
    menuButton.setAttribute('aria-expanded', String(!expanded));
    siteNavigation.classList.toggle('is-open', !expanded);
  });
  siteNavigation.addEventListener('click', event => {
    if (event.target.closest('a')) closeMenu();
  });
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && menuButton.getAttribute('aria-expanded') === 'true') {
      closeMenu();
      menuButton.focus();
    }
  });
}
