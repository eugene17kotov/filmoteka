(() => {
  const refs = {
    openMenuBtn: document.querySelector(".header-mob-menu-open-btn"),
    closeMenuBtn: document.querySelector(".header-mob-menu-close-btn"),
    menu: document.querySelector(".header-mob-menu"),
  };

  refs.openMenuBtn.addEventListener("click", toggleMenu);
  refs.closeMenuBtn.addEventListener("click", toggleMenu);

  function toggleMenu() {
    document.body.classList.toggle('header-menu-open');
    refs.menu.classList.toggle("visually-hidden");
  }

  
})();
