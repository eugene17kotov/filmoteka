(() => {
  const refs = {
    openMenuBtn: document.querySelector(".header-mob-menu-open-btn"),
    closeMenuBtn: document.querySelector(".header-mob-menu-close-btn"),
    menu: document.querySelector(".header-mob-menu"),
    fbsMenuDesk: document.querySelector(".firebase-auth-header-desk"),
    fbsMenuMob: document.querySelector(".firebase-auth-header-mob"),
  };

  refs.openMenuBtn.addEventListener("click", toggleMenu);
  refs.closeMenuBtn.addEventListener("click", toggleMenu);

  function toggleMenu() {
    document.body.classList.toggle('header-menu-open');
    refs.menu.classList.toggle("visually-hidden");
  }

  window.addEventListener(`resize`, resizeMenu, false);
  let menuNumber = 1;
  let containerDesk = ``;
   let containerMob = ``;
  function resizeMenu() {
    const resizeSize = document.documentElement.clientWidth;
    console.log('resizeMenu', typeof (resizeSize), resizeSize);
    
    
    if (resizeSize > 767) {
      console.log(">767", menuNumber)
      if (menuNumber !== 1) {
        menuNumber = 1;
      // <div id="auth-header" class="header__nav-list fbs--desk"></div>
        containerDesk = `<div id="auth-header" class="header__nav-list fbs--desk"></div>`;
        containerMob = ``;
        fbsMenuDesk.innerHTML = `<div id="auth-header" class="header__nav-list fbs--desk"></div>`
        fbsMenuMob.innerHTML = ``;
        console.log("containerDesk", containerDesk);
        console.log("containerNob", containerMob);
      } 
      // return

    } else {
      console.log("<=767", menuNumber)
      if (menuNumber !== 2) {
        menuNumber = 2;
      // <div id="auth-header" class="mob-menu-list fbs--mob"></div>

        containerDesk = ``;
        containerMob = `<div id="auth-header" class="mob-menu-list fbs--mob"></div>`;
        fbsMenuDesk.innerHTML = containerDesk;
        fbsMenuMob.innerHTML = containerMob;
        console.log("containerDesk", containerDesk);
         console.log("containerNob", containerMob);

       }

    }
    
  }
  
})();
