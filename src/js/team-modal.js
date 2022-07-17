const teamRef = document.querySelector('.footer__link');
const backdropTeamRef = document.querySelector('.backdrop-team');
const closeBtnRef = document.querySelector('.modal-team__close-btn');

teamRef.addEventListener('click', onGoitteamClick);

function onGoitteamClick(e) {
  e.preventDefault();

  backdropTeamRef.classList.remove('backdrop-team--is-hidden');
  document.body.classList.toggle('modal-open');

  document.addEventListener('keydown', onEscClick);
  backdropTeamRef.addEventListener('click', onBackdropClick);
  closeBtnRef.addEventListener('click', onCloseBtnClick);
}

function onEscClick(event) {
  event.preventDefault();

  if (event.code !== 'Escape') {
    return;
  }

  backdropTeamRef.classList.add('backdrop-team--is-hidden');
  document.body.classList.toggle('modal-open');

  removeAllEventListenersTeamModal();
}

function onBackdropClick(event) {
  if (event.target.closest('.modal-team')) {
    return;
  }

  backdropTeamRef.classList.add('backdrop-team--is-hidden');
  document.body.classList.toggle('modal-open');

  removeAllEventListenersTeamModal();
}

function onCloseBtnClick(event) {
  event.preventDefault();

  backdropTeamRef.classList.add('backdrop-team--is-hidden');
  document.body.classList.toggle('modal-open');

  removeAllEventListenersTeamModal();
}

function removeAllEventListenersTeamModal() {
  document.removeEventListener('keydown', onEscClick);
  backdropTeamRef.removeEventListener('click', onBackdropClick);
  closeBtnRef.removeEventListener('click', onCloseBtnClick);
}
