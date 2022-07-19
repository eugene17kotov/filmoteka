const refs = {
  queueBtn: document.querySelector('.button-to-queue'),
  gallery: document.querySelector('.library-gallery'),
};

const { queueBtn, gallery } = refs;

// queueBtn.addEventListener('click', onBtnQueueClick);

function inLocalStorage(id) {
  if (!localStorage.getItem('queue').contains(id)) {
    return false;
  }
  return true;
}

function onBtnQueueClick() {
  const id = document.querySelector('backdrop').id;
  if (!inLocalStorage(id)) {
    queueBtn.textContent = 'Remove to queue';
    localStorage.setItem('queue', id);
  } else {
    queueBtn.textContent = 'Add to queue';
    localStorage.removeItem('queue', id);
  }
}
