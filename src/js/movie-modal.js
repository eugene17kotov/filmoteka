const refs = {
  backdrop: document.querySelector('.backdrop'),
  closeBtn: document.querySelector('button[data-dismiss="modal"]'),
};

const { backdrop, closeBtn } = refs;

export default function addAllEventListenersModal() {
  closeBtn.addEventListener('click', onCloseBtnClick);
  window.addEventListener('keydown', onKeydownEscape);
  backdrop.addEventListener('click', onBackdropClick);
}

function onCloseBtnClick(e) {
  e.preventDefault();
  backdrop.classList.add('is-hidden');
  removeAllEventListenersModal();
}

function onKeydownEscape(e) {
  e.preventDefault();
  if (e.key === 'Escape') {
    backdrop.classList.add('is-hidden');
  }
  removeAllEventListenersModal();
}

function onBackdropClick(e) {
  if (!e.target.classList.contains('backdrop')) {
    return;
  }
  backdrop.classList.add('is-hidden');
  removeAllEventListenersModal();
}

function removeAllEventListenersModal() {
  closeBtn.removeEventListener('click', onCloseBtnClick);
  window.removeEventListener('keydown', onKeydownEscape);
  backdrop.removeEventListener('click', onBackdropClick);
}
