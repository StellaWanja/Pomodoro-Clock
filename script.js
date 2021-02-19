const openModalBtns = document.querySelectorAll('[data-modal-target]');
const closeModalBtns = document.querySelectorAll('[data-close-button]');
const overlay = document.getElementById('overlay');

openModalBtns.forEach(button => {
    button.addEventListener('click', () => {
        //dataset - access all data attributes
        const modal = document.querySelector(button.dataset.modalTarget);
        openModal(modal);
    })
});

// click anywhere else to close modal
overlay.addEventListener('click', () => {
    const modals = document.querySelectorAll('.settings-modal.active');
    modals.forEach(modal => {
        closeModal(modal);
    });
});

closeModalBtns.forEach(button => {
    button.addEventListener('click', () => {
        //dataset - access all data attributes
        const modal = button.closest('.settings-modal');
        closeModal(modal);
    })
});

function openModal (modal) {
    if(modal == null) return;
    modal.classList.add('active');
    overlay.classList.add('overlay-active');
}

function closeModal (modal) {
    if(modal == null) return;
    modal.classList.remove('active');
    overlay.classList.remove('overlay-active');
}