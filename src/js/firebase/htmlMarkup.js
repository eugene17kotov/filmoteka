export const logregMarkup = `<div id="login-status">
        <button id="tosignin"  type="button">signin</button>
        <span> or </span>
        <button id="tosignup"  type="button">signup</button>
      </div>`;

export const loggedMarkup = `<div id="login-status">
        <span id="logged-user"></span>
        <button id="logout"  type="button">logout</button>
      </div>`;

export const loginMarkup = `<div id="user-login">
        <button id="close-backdrop"  type="button">cancel</button>
        <br /><br />
        <p class="title">to log in enter your email and password</p>
        <form id="login-form">
          <label for="email">enter valid email: </label>
          <input type="email" name="email" required/>
          <br />
          <label for="email">enter password (min 6 symbols): </label>
          <input type="password" name="password" minlength="6" required/>
          <br /><br />
          <button type="submit" id="fire" value="log" >go!</button>
          <p id="login-error"></p>
        </form>
      </div>`;

export const registerMarkup = `<div id="user-register">
        <button id="close-backdrop" type="button" >cancel</button>
        <br /><br />
        <p class="title">to log in enter your email and password</p>
        <form id="signup-form">
          <label for="email">enter valid email: </label>
          <input type="email" name="email" required />
          <br />
          <label for="email">enter password (min 6 symbols): </label>
          <input type="password" name="password" minlength="6" required/>
          <br /><br />
          <button type="submit" id="fire" value="reg">go!</button>
          <p id="login-error"></p>
        </form>
      </div>`;

// import svgClose from '../../images/symbol-defs.svg';
