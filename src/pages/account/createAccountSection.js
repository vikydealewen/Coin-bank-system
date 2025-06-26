import { createAccountSectionTop } from './createAccountSectionTop';

export function createAccountSection(data, sectionClass) {
  const accountSection = document.createElement('section');
  const container = document.createElement('div');
  const accountSectionTop = createAccountSectionTop(data, sectionClass);

  accountSection.classList.add('section', `${sectionClass}`);
  container.classList.add('container', `${sectionClass}__container`);

  container.append(accountSectionTop);
  accountSection.append(container);

  return {
    container,
    accountSection,
  };
}
