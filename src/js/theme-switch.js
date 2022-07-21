const refs = {
  bodyEl: document.querySelector('body'),
  toggleEl: document.querySelector('#theme-switch-toggle'),
  footerDarktheme: document.querySelector('footer'),
  movieBackdrop: document.querySelector('.modal'),
  modalTeam: document.querySelector('.modal-team'),
  sun: document.querySelector('.sun'),
  moon: document.querySelector('.moon'),
};

const {
  bodyEl,
  toggleEl,
  footerDarktheme,
  movieBackdrop,
  modalTeam,
  sun,
  moon,
} = refs;

toggleEl.addEventListener('change', event => {
  if (bodyEl.classList.contains('dark-theme')) {
    bodyEl.classList.remove('dark-theme');
    bodyEl.classList.add('light-theme');
    footerDarktheme.classList.remove('dark-theme');
    modalTeam.classList.remove('dark-theme');
    movieBackdrop && movieBackdrop.classList.remove('dark-theme');
  } else {
    bodyEl.classList.remove('light-theme');
    bodyEl.classList.add('dark-theme');
    footerDarktheme.classList.add('dark-theme');
    modalTeam.classList.add('dark-theme');
    movieBackdrop && movieBackdrop.classList.add('dark-theme');
  }
});

const Theme = {
  LIGHT: 'light-theme',
  DARK: 'dark-theme',
};

const savedTheme = localStorage.getItem('theme');

toggleEl.addEventListener('change', event => {
  localStorage.setItem('theme', bodyEl.classList);
});

updataTheme();
checkboxChecked();
updataThemeFooter();
updataThemeMovieBackdrop();
updataThemeModalTeam();

function updataTheme() {
  if (savedTheme) {
    bodyEl.classList = savedTheme;
  }
}

function checkboxChecked() {
  if (savedTheme === 'dark-theme') {
    toggleEl.setAttribute('checked', true);
  }
}

function updataThemeFooter() {
  if (savedTheme === 'dark-theme') {
    footerDarktheme.classList.add('dark-theme');
  }
}

function updataThemeMovieBackdrop() {
  if (savedTheme === 'dark-theme') {
    movieBackdrop && movieBackdrop.classList.add('dark-theme');
  }
}

function updataThemeModalTeam() {
  if (savedTheme === 'dark-theme') {
    modalTeam.classList.add('dark-theme');
  }
}
