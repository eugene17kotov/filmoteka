const refs = {
  backdrop: document.querySelector('.backdrop'),
  closeBtn: document.querySelector('button[data-dismiss="modal"]'),
};

const { backdrop, closeBtn } = refs;

closeBtn.addEventListener('click', e => {
  e.preventDefault();
  backdrop.classList.add('visually-hidden');
});

window.addEventListener('keydown', e => {
  e.preventDefault();
  if (e.key === 'Escape') {
    backdrop.classList.add('visually-hidden');
  }
});

backdrop.addEventListener('click', e => {
  if (!e.target.classList.contains('backdrop')) {
    return;
  }
  backdrop.classList.add('visually-hidden');
});
