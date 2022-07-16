const refs = {
  backdrop: document.querySelector('.backdrop'),
  closeBtn: document.querySelector('button[data-dismiss="modal"]'),
};

const { backdrop, closeBtn } = refs;

closeBtn.addEventListener('click', onCloseBtnClick);
window.addEventListener('keydown', onKeydownEscape);
backdrop.addEventListener('click', onBackdropClick);

function onCloseBtnClick(e) {
  e.preventDefault();
  backdrop.classList.add('is-hidden');
  removeAllEventListeners();
}

function onKeydownEscape(e) {
  e.preventDefault();
  if (e.key === 'Escape') {
    backdrop.classList.add('is-hidden');
  }
  removeAllEventListeners();
}

function onBackdropClick(e) {
  if (!e.target.classList.contains('backdrop')) {
    return;
  }
  backdrop.classList.add('is-hidden');
  removeAllEventListeners();
}

function removeAllEventListeners() {
  closeBtn.removeEventListener('click', onCloseBtnClick);
  window.removeEventListener('keydown', onKeydownEscape);
  backdrop.removeEventListener('click', onBackdropClick);
}
