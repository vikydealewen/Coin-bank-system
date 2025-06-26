import Choices from 'choices.js';
import 'choices.js/public/assets/styles/choices.css';
import '../styles/components/selectCommon.scss';

export const createCustomSelect = (
  selectDefault,
  placeholder,
  mainClass,
  modifier = '',
) => {
  const modifierClass = modifier ? `${mainClass}__${modifier}` : '';

  const selectCustom = new Choices(selectDefault, {
    searchEnabled: false,
    itemSelectText: '',
    placeholder: true,
    placeholderValue: placeholder,
    classNames: {
      containerOuter: ['choices', `${mainClass}`, modifierClass].filter(
        Boolean,
      ),
      containerInner: ['choices__inner', `${mainClass}__inner`],
      input: ['choices__input', `${mainClass}__input`],
      inputCloned: ['choices__input--cloned', `${mainClass}__input--cloned`],
      list: ['choices__list', `${mainClass}__list`],
      listItems: ['choices__list--multiple', `${mainClass}__list--multiple`],
      listSingle: ['choices__list--single', `${mainClass}__list--single`],
      listDropdown: ['choices__list--dropdown', `${mainClass}__list--dropdown`],
      item: ['choices__item', `${mainClass}__item`],
      itemSelectable: [
        'choices__item--selectable',
        `${mainClass}__item--selectable`,
      ],
      itemDisabled: ['choices__item--disabled', `${mainClass}__item--disabled`],
      itemChoice: ['choices__item--choice', `${mainClass}__item--choice`],
      placeholder: ['choices__placeholder', `${mainClass}__placeholder`],
      group: ['choices__group', `${mainClass}__group`],
      groupHeading: ['choices__group', `${mainClass}__heading`],
      button: ['choices__button', `${mainClass}__button`],
      activeState: 'is-active',
      focusState: 'is-focused',
      openState: 'is-open',
      disabledState: 'is-disabled',
      highlightedState: 'is-highlighted',
      selectedState: 'is-selected',
      flippedState: 'is-flipped',
      loadingState: 'is-loading',
      noResults: 'has-no-results',
      noChoices: 'has-no-choices',
    },
  });

  return selectCustom;
};
