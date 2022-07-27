const refs = {
  bodyEl: document.querySelector('body'),
  toggleEl: document.querySelector('#theme-switch-toggle'),
};

const { bodyEl, toggleEl } = refs;

toggleEl.addEventListener('change', event => {
  if (bodyEl.classList.contains('dark-theme')) {
    bodyEl.classList.remove('dark-theme');
    bodyEl.classList.add('light-theme');
  } else {
    bodyEl.classList.remove('light-theme');
    bodyEl.classList.add('dark-theme');
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
