const modals = () =>{
    let btnPressed = false;

    function bindModal (triggerSelector, modalSelector, closeSelector, destroy = false) {
        const trigger = document.querySelectorAll(triggerSelector),
              popup = document.querySelector(modalSelector),
              btnClose = document.querySelector(closeSelector),
              windows = document.querySelectorAll('[data-modal]'),
              scroll = calcScroll();
    
        trigger.forEach(trigger => {
            trigger.addEventListener('click', (e) => {
                if(e.target){
                e.preventDefault();
                }

                btnPressed = true;

                if (destroy) {
                    trigger.remove();
                }

                windows.forEach(item =>{
                    item.style.display = 'none';
                    item.classList.add('animated', 'fadeIn');
                });
                openPopup();
            });
        });
    
    
        popup.addEventListener('click', (e) =>{
            if(e.target === popup){
                windows.forEach(item =>{
                    item.style.display = 'none';
                });
                closePopup();
            }
        });
    
        btnClose.addEventListener('click', (e) =>{
            e.preventDefault();
            windows.forEach(item => {
                item.style.display = 'none';
            });
            closePopup();
        });
    
        function openPopup(){
                popup.style.display = 'block';
                document.body.style.overflow = "hidden";
                document.body.style.marginRight = `${scroll}px`;
            
        }
    
        function closePopup(){
            popup.style.display = 'none';
            document.body.style.overflow ="";
            document.body.style.marginRight = `0px`;

        }

    }

    function showModalByTime(selector, time) {
        setTimeout(function() {

            let display;

            document.querySelectorAll('[data-modal]').forEach(item => {
                if(getComputedStyle(item).display !== "none"){
                    display = "block";
                }
            });

            if(!display){
                document.querySelector(selector).style.display = 'block';
                document.body.style.overflow = "hidden";
                let scroll = calcScroll();
                document.body.style.marginRight = `${scroll}px`;
            }
        }, time);
    }

    function calcScroll() {
        let div = document.createElement('div');

        div.style.width = '50px';
        div.style.height = '50px';
        div.style.overflowY = 'scroll';
        div.style.visibility = 'hidden';

        document.body.appendChild(div);
        let scrollWidth = div.offsetWidth - div.clientWidth;
        div.remove();

        return scrollWidth;
    }

    function openByScroll(selector) {
        window.addEventListener('scroll', () => {
            let scrollHeight = Math.max(document.documentElement.scrollHeight, document.body.scrollHeight);

            if (!btnPressed && (window.pageYOffset + document.documentElement.clientHeight >= scrollHeight)) {
                document.querySelector(selector).click();
            }
        });
    }

    bindModal('.button-design', '.popup-design', '.popup-design .popup-close');
    bindModal('.button-consultation', '.popup-consultation', '.popup-consultation .popup-close');
    bindModal('.fixed-gift', '.popup-gift', '.popup-gift .popup-close', true);
    showModalByTime('.popup-consultation', 60000);
    openByScroll('.fixed-gift');
};



export default modals; 