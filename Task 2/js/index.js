const HIDE_MODAL = 'none'
const SHOW_MODAL = 'block'

function init() {

  const openModalBtn = document.getElementById('btn-modal')
  const closeBtn = document.getElementById('btn-close-modal')

  openModalBtn.addEventListener('click', toggleModal, false)
  closeBtn.addEventListener('click', toggleModal, false)
}

function toggleModal() {
  const detailsModal = document.getElementById('details-modal')
  detailsModal.style.display === 'block'
    ? detailsModal.style.display = HIDE_MODAL
    : detailsModal.style.display = SHOW_MODAL
}

window.onload = init
