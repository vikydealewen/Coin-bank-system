import { getAtmsLocation } from '../../modules/api';
import '../../styles/components/atms.scss';
import { init } from './ymaps';

function createAtmsSection() {
  const atmsSection = document.createElement('section');
  const atmsContainer = document.createElement('div');
  const sectionTitle = document.createElement('h1');

  atmsSection.classList.add('section', 'atms');
  atmsContainer.classList.add('container', 'atms_container');
  sectionTitle.classList.add('section__title', 'atms__title');

  sectionTitle.textContent = 'Карта банкоматов';

  const wrapperBottom = createAtmsSectionBottom();

  atmsContainer.append(sectionTitle, wrapperBottom);
  atmsSection.append(atmsContainer);

  return atmsSection;
}

function createAtmsSectionBottom() {
  const wrapperBottom = document.createElement('div');
  wrapperBottom.classList.add('section__bottom', 'atms__bottom');

  const atmsMapContainer = document.createElement('div');
  atmsMapContainer.classList.add('atms__map', 'map');
  atmsMapContainer.id = 'map';
  wrapperBottom.append(atmsMapContainer);

  return wrapperBottom;
}

export async function renderAtmsPage() {
  const main = document.getElementById('main');
  main.innerHTML = '';

  const token = sessionStorage.getItem('token');

  const atmsSection = createAtmsSection();
  main.append(atmsSection);

  try {
    const atmsLocationData = await getAtmsLocation(token);
    ymaps.ready(() => init(atmsLocationData));
  } catch (error) {
    ymaps.ready(() => init([]));
  }
}
