const teamRef = document.querySelector('.footer__link');
const backdropTeamRef = document.querySelector('.backdrop-team');

teamRef.addEventListener('click', onGoitteamClick);

function onGoitteamClick(e) {
  e.preventDefault();

  backdropTeamRef.classList.remove('backdrop-team--is-hidden');
  document.addEventListener('keydown', onEscClick);
  backdropTeamRef.addEventListener('click', onBackdropClick);
}

function onEscClick(event) {
  event.preventDefault();

  if (event.code === 'Escape') {
    backdropTeamRef.classList.add('backdrop-team--is-hidden');
    document.removeEventListener('keydown', onEscClick);
  }
}

function onBackdropClick(event) {
  if (!event.target.closest('.modal-team')) {
    backdropTeamRef.classList.add('backdrop-team--is-hidden');
    backdropTeamRef.removeEventListener('click', onBackdropClick);
  }
}
