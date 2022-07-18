export default function createQueue() {
  const refsModal = {
    queueBtn: document.querySelector('.to-queue'),
    gallery: document.querySelector('.library-gallery'),
    bg: document.querySelector('backdrop'),
    backdrop: document.querySelector('.backdrop'),
  };

  const { queueBtn, gallery, bg, backdrop } = refsModal;
  const id = backdrop.id;

  queueBtn.addEventListener('click', onBtnQueueClick);

  function inLocalStorage(id) {
    if (!localStorage.getItem('queue').contains(id)) {
      return false;
    }
    return true;
  }

  function onBtnQueueClick() {
    if (!inLocalStorage(id)) {
      refs.queueBtn.textContent = 'Remove to queue';
      localStorage.setItem('queue', id);
    } else {
      refs.queueBtn.textContent = 'Add to queue';
      localStorage.removeItem('queue', id);
    }
  }
}
