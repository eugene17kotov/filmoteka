export const logregMarkup = `<div id="login-status" class="header__nav-item">
        <button id="tosignin"  type="button" class="header__nav-btn">sign in</button>
        <span class="fbs-header-span">  </span>
        <button id="tosignup"  type="button" class="header__nav-btn">sign up</button>
      </div>`;

export const loggedMarkup = `<div id="login-status" class="header__nav-item">
        <span id="logged-user"></span>
        <button id="log out"  type="button" class="header__nav-btn">logout</button>
      </div>`;

export const loginMarkup = `<div id="user-login" class="backdrop fbs-backdrop">
        <div class="fbs-modal">
<button id="close-backdrop"  type="button" class="fbs-mob-menu-close-btn"><svg
            class="menu-btn__icon"
            width="40"
            height="40"
            aria-label="Выключение мобильного меню"
          >
            <use
              class="menu-btn__icon--close"
              href="../../images/symbol-defs.svg#icon-close"
            ></use>
          </svg></button>

            <p class="fbs-modal-title">To log in enter your email and password</p>
        
        <form id="login-form">
          <label for="email" class="fbs-modal-label">enter valid email: </label>
          <span class="fbs-modal-label__field">
            <input type="email" name="email" required 
              placeholder="mail@mail.mail"
              class="fbs-modal-label__block fbs-modal-label__block--input"/>
              <svg class="fbs-modal-icon" width="18" height="18">
                <use href="./images/symbol-defs.svg#email-black-18dp"></use>
              </svg>
          </span>
          <label for="password" class="fbs-modal-label">enter password (min 6 symbols): </label>
          <span class="fbs-modal-label__field">
            <input type="password" name="password" minlength="6" required 
              placeholder="(A-Z, a-z, 0-9, !@_-)"
              class="fbs-modal-label__block fbs-modal-label__block--input"/>
              <svg class="fbs-modal-icon" width="18" height="18">
                <use href="./images/symbol-defs.svg#person-black-18dp"></use>
              </svg>
          </span>
          <button type="submit" id="fire" value="log" class="btn fbs-modal-btn--submit">go!</button>
          <p id="login-error"></p>
        </form>
        </div>
      </div>`;

export const registerMarkup = `<div id="user-register" class="backdrop fbs-backdrop">
          <div class="fbs-modal">
<button id="close-backdrop" type="button" class="fbs-mob-menu-close-btn"><svg
            class="menu-btn__icon"
            width="40"
            height="40"
            aria-label="Выключение мобильного меню"
          >
            <use
              class="menu-btn__icon--close"
              href="/src/images/symbol-defs#icon-film.svg"
            ></use>
          </svg></button>

        <p class="fbs-modal-title">WRITE your email and password</p>
        
        <form id="signup-form">
          <label for="email" class="fbs-modal-label">enter valid email: </label>
          <span class="fbs-modal-label__field">
            <input type="email" name="email" required 
              placeholder="mail@mail.mail"
              class="fbs-modal-label__block fbs-modal-label__block--input"/>
              <svg class="fbs-modal-icon" width="18" height="18">
                <use href="./images/symbol-defs.svg#email-black-18dp"></use>
              </svg>
          </span>
          <label for="password" class="fbs-modal-label">enter password (min 6 symbols): </label>
          <span class="fbs-modal-label__field">
            <input type="password" name="password" minlength="6" required 
              placeholder="(A-Z, a-z, 0-9, !@_-)"
              class="fbs-modal-label__block fbs-modal-label__block--input"/>
              <svg class="fbs-modal-icon" width="18" height="18">
                <use href="./images/symbol-defs.svg#person-black-18dp"></use>
              </svg>
          </span>
          <button type="submit" id="fire" value="reg" class="btn fbs-modal-btn--submit">go!</button>
          <p id="login-error"></p>
        </form>
        </div>
      </div>`;
