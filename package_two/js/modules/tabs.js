function tabs (tabsSelector, tabsContentSelector, tabsParentSelector, activeClass) {
    //switch tabs
    let tabs = document.querySelectorAll(tabsSelector),
        tabContent = document.querySelectorAll(tabsContentSelector),
        tabHeader = document.querySelector(tabsParentSelector);
  
    function hideTabContent(){
        tabContent.forEach( item => {
            item.style.display = 'none';
        });
        tabs.forEach( item => {
            item.classList.remove(activeClass);
        });
    }
    function showTabContent(i) {
        tabContent[i].style.display = 'block';
        tabs[i].classList.add(activeClass);
    }
    hideTabContent();
    showTabContent(0);
    tabHeader.addEventListener('click', function (e) {
        const target = e.target;
        if (target && target.classList.contains('tabheader__item')) {
            tabs.forEach((item, i) =>{
                if (target == item){
                    hideTabContent();
                    showTabContent(i);
                }
            });
        }
    });
}

export default tabs;