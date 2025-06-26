export function createEmptyMessage(text) {
  const message = document.createElement('div');
  const messageText = document.createElement('p');

  message.classList.add('empty-message');
  messageText.classList.add('empty-message__text');

  messageText.textContent = text;

  message.append(messageText);
  return message;
}

export function showErrorMessage(container, message, errorId, className) {
  const existingError = container.querySelector(`#${errorId}`);
  if (existingError) {
    existingError.remove();
  }

  const errorMsg = document.createElement('p');
  errorMsg.id = errorId;
  errorMsg.textContent = message;
  errorMsg.classList.add(className);
  container.append(errorMsg);
}

export function clearErrorMessage(container, errorId) {
  const existingError = container.querySelector(`#${errorId}`);
  if (existingError) {
    existingError.remove();
  }
}
