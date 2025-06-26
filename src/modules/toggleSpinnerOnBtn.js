export function toggleSpinner(btn, isLoading, disabled, text) {
  const originalText = btn.dataset.originalText || btn.textContent;

  if (!btn.dataset.originalText) {
    btn.dataset.originalText = originalText;
  }

  if (isLoading) {
    btn.disabled = true;
    btn.classList.add('btn-loading');
    btn.innerHTML = `<span class="spinner spinner__btn"></span>${text}...`;
  } else {
    btn.disabled = disabled;
    btn.classList.remove('btn-loading');
    btn.textContent = originalText;
  }
}
