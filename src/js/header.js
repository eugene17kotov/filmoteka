(() => {
  const refs = {
    openMenuBtn: document.querySelector(".header-mob-menu-open-btn"),
    closeMenuBtn: document.querySelector(".header-mob-menu-close-btn"),
    menu: document.querySelector(".header-mob-menu"),
    fbsMenuDesk: document.querySelector(".fbs--desk"),
    fbsMenuMob: document.querySelector(".fbs--mob"),
  };

  refs.openMenuBtn.addEventListener("click", toggleMenu);
  refs.closeMenuBtn.addEventListener("click", toggleMenu);

  function toggleMenu() {
    document.body.classList.toggle('header-menu-open');
    refs.menu.classList.toggle("visually-hidden");
  }

  window.addEventListener(`resize`, resizeMenu, false);

  function resizeMenu() {
    const resizeSize = document.documentElement.clientWidth;
    console.log('resizeMenu', typeof (resizeSize), resizeSize);
    console.log('fbsMenuDesk.id', fbsMenuDesk.id);
    console.log('fbsMenuMob.id', fbsMenuMob.id);
    if (resizeSize > 767) {
      fbsMenuDesk.id === "auth-header";
      fbsMenuMob.id === "auth-header-2";
    } else {
      fbsMenuDesk.id === "auth-header-2";
      fbsMenuMob.id === "auth-header";

    }
    
  }
  
})();
