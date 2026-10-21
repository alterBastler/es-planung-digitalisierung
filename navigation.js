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
