export function updateActiveNavLink(currentRoute) {
  const allNavLinks = document.querySelectorAll('.nav__link');
  allNavLinks.forEach((link) => {
    link.classList.remove('nav__link--active');
  });

  const activeLink = document.querySelector(`[data-route="${currentRoute}"]`);
  if (activeLink) {
    activeLink.classList.add('nav__link--active');
  }
}
