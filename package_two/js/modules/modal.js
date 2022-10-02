function showModalWindow (modalSelector, modalTimerId) {
    let classModal = document.querySelector(modalSelector);
    classModal.style = "display: block";
            document.body.style.overflow = 'hidden';
            document.addEventListener('keydown', (e) => {
                if(e.code === 'Escape'){
                    closeModalWindow();
                }
            });
    if (modalTimerId){
    clearInterval(modalTimerId);
    }
}

function closeModalWindow (modalSelector) {
    let classModal = document.querySelector(modalSelector);
    classModal.style = 'display: none';
    document.body.style.overflow = '';
}


function modal (trigerSelector, modalSelector, modalTimerId ) {
    //modal
    const modalButton = document.querySelectorAll(trigerSelector);
    let classModal = document.querySelector(modalSelector);

    modalButton.forEach( (item) => {
        item.addEventListener('click', () => showModalWindow(modalSelector, modalTimerId));
    });
    
    classModal.addEventListener('click', (e) => {
        if(e.target === classModal || e.target.getAttribute('data-close') == ''){
            closeModalWindow(modalSelector);
        }
    });

    function showModalByScroll(){
        if(window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight){
            showModalWindow(modalSelector, modalTimerId);
            window.removeEventListener('scroll', showModalByScroll);
        }
    }
    
    window.addEventListener('scroll', showModalByScroll);
}

export default modal;
export {closeModalWindow};
export {showModalWindow};