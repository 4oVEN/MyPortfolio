document.addEventListener('DOMContentLoaded', function (){

const form = document.getElementById('form');
form.addEventListener('submit', formSend);

async function formSend(e){
    e.preventDefault();

    let error = formValidate(form);

    let formData = new FormData(form);
 
    if (error === 0){
        let response = await fetch('sendmail.php', {
            method: 'POST',
            body: formData
        });
        if (response.ok){
            let result = await response.json();
            alert(result.message);
            form.reset();
        } else {
            alert('GitHub Pages предоставляет только хостинг, никаких серверных скриптов не запустить. Свяжитесь со мной по номеру телефона +375447126305(WhatsApp, Viber, Telegram) или по email ndemidovn@gmail.com');
        }
    }else {
        // alert('Заполните обязательные поля');
    }

    function formValidate(form){
        let error = 0;
        let formReq = document.querySelectorAll('._req');

        for (let index = 0; index < formReq.length; index++){
            const input = formReq[index];
            formRemoveError(input);

            if(input.classList.contains('_email')){
                if(emailTest(input)){
                    formAddError(input);
                    error++;
                }
            }else{
                if (input.value === ''){
                    formAddError(input);
                    error++;
                }
            }
        }
        return error;
    }
   
    function formAddError(input){
        input.parentElement.classList.add('_error');
        input.classList.add('_error');
    }
    function formRemoveError(input){
        input.parentElement.classList.remove('_error');
        input.classList.remove('_error');
    }
    function emailTest(input){
        return !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(input.value);
    }
    
};



(function () {
    [...document.querySelectorAll(".control")].forEach(button => {
        button.addEventListener("click", function() {
            document.querySelector(".active-btn").classList.remove("active-btn");
            this.classList.add("active-btn");
            document.querySelector(".active").classList.remove("active");
            document.getElementById(button.dataset.id).classList.add("active");
        })
    });
    
    document.querySelector(".theme-btn").addEventListener("click", () => {
        document.body.classList.toggle("light-mode");
    })
    
})();

});