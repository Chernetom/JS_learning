function modal () {
    //modal
    const modalButton = document.querySelectorAll('[data-modal]');
    let classModal = document.querySelector('.modal');

    
    function showModalWindow () {
        classModal.style = "display: block";
                document.body.style.overflow = 'hidden';
                document.addEventListener('keydown', (e) => {
                    if(e.code === 'Escape'){
                        closeModalWindow();
                    }
                });
        clearInterval(modalTimerId);
    }
    modalButton.forEach( (item) => {
        item.addEventListener('click', showModalWindow);
    });
    
    function closeModalWindow () {
        classModal.style = 'display: none';
        document.body.style.overflow = '';
    }

    
    classModal.addEventListener('click', (e) => {
        if(e.target === classModal || e.target.getAttribute('data-close') == ''){
            closeModalWindow();
        }
    });

    const modalTimerId = setTimeout(showModalWindow, 3000);

    function showModalByScroll(){
        if(window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight){
            showModalWindow();
            window.removeEventListener('scroll', showModalByScroll);
        }
    }
    
    window.addEventListener('scroll', showModalByScroll);
}

module.exports = modal;