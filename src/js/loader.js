export const loader = document.querySelector('.backdrop-loader');

export function startLoader() {
  loader.classList.remove('backdrop-loader--is-hidden');
}

export function stopLoader() {
  loader.classList.add('backdrop-loader--is-hidden');
}
