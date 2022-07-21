const teamRef = document.querySelector('.footer__link');
const backdropTeamRef = document.querySelector('.backdrop-team');
const closeBtnRef = document.querySelector('.modal-team__close-btn');
const scrollGuardRef = document.querySelector('.scroll-guard');
const options = {
  rootMargin: '100px',
  threshold: 1.0,
};
const isTeamListenerActive = teamRef.dataset.event;

const observer = new IntersectionObserver(
  toggleListenerByIntersection,
  options
);

function onGoitteamClick(e) {
  e.preventDefault();

  backdropTeamRef.classList.remove('backdrop-team--is-hidden');
  document.body.classList.toggle('modal-open');

  addAllEventListeners();
}

function onEscClick(event) {
  event.preventDefault();

  if (event.code !== 'Escape') {
    return;
  }

  closingModalStaff();
}

function onBackdropClick(event) {
  if (event.target.closest('.modal-team')) {
    return;
  }

  closingModalStaff();
}

function onCloseBtnClick(event) {
  event.preventDefault();

  closingModalStaff();
}

function addAllEventListeners() {
  document.addEventListener('keydown', onEscClick);
  backdropTeamRef.addEventListener('click', onBackdropClick);
  closeBtnRef.addEventListener('click', onCloseBtnClick);
}

function closingModalStaff() {
  document.removeEventListener('keydown', onEscClick);
  backdropTeamRef.removeEventListener('click', onBackdropClick);
  closeBtnRef.removeEventListener('click', onCloseBtnClick);

  backdropTeamRef.classList.add('backdrop-team--is-hidden');
  document.body.classList.toggle('modal-open');
}

function toggleListenerByIntersection(entries) {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      teamRef.addEventListener('click', onGoitteamClick);
      teamRef.dataset.event = 'true';
    }

    if (!entry.isIntersecting) {
      teamRef.removeEventListener('click', onGoitteamClick);
      teamRef.dataset.event = 'false';
    }
  });
}

setTimeout(() => {
  observer.observe(scrollGuardRef);
}, 1000);
