const modals = () =>{
    function bindModal (triggerSelector, modalSelector, closeSelector, closeClickOverflay = true) {
        const trigger = document.querySelectorAll(triggerSelector),
              popup = document.querySelector(modalSelector),
              btnClose = document.querySelector(closeSelector),
              windows = document.querySelectorAll('[data-modal]');
    
        trigger.forEach(trigger => {
            trigger.addEventListener('click', (e) => {
                if(e.target){
                e.preventDefault();
                }
                windows.forEach(item =>{
                    item.style.display = 'none';
                });
                openPopup();
            });
        });
    
    
        popup.addEventListener('click', (e) =>{
            if(e.target === popup && closeClickOverflay){
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
            
        }
    
        function closePopup(){
            popup.style.display = 'none';
            document.body.style.overflow ="";
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
            }
        }, time);
    }

    bindModal('.button-design', '.popup-design', '.popup-design .popup-close');
    bindModal('.button-consultation', '.popup-consultation', '.popup-consultation .popup-close');
    showModalByTime('.popup-consultation', 60000);
};



export default modals; 