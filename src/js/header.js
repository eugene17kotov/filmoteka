(() => {
  const refs = {
    openMenuBtn: document.querySelector('.header-mob-menu-open-btn'),
    closeMenuBtn: document.querySelector('.header-mob-menu-close-btn'),
    menu: document.querySelector('.header-mob-menu'),
  };

  refs.openMenuBtn.addEventListener('click', toggleMenu);
  refs.closeMenuBtn.addEventListener('click', toggleMenu);

  function toggleMenu() {
    document.body.classList.toggle('header-menu-open');
    refs.menu.classList.toggle('visually-hidden');
    // console.log(document.getElementsByTagName('body')[0].classList[0]);
    if (
      document.getElementsByTagName('body')[0].classList[0] !==
        'header-menu-open' &&
      window.innerWidth < 767
    ) {
      console.log('hide');
      document.getElementById('auth-header').classList.add('dispnone');
      document.getElementById('auth-header').style.display = 'none';
    } else {
      console.log('show');
      document.getElementById('auth-header').classList.remove('dispnone');
      document.getElementById('auth-header').style.display = 'block';
    }
    // document.;
  }
})();
