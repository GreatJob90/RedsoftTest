import $ from 'jquery';

window.addEventListener('DOMContentLoaded', () => {

    let inputEmail = document.getElementById('email'),
        sendBtn = document.getElementById('send-btn'),
        modalWindow = document.getElementById('modal-window');

    sendBtn.onclick = () => {
        checkForm();
    };

    document.forms[0].onkeydown = function (event) {
        let e = event || window.event;
        if (e.keyCode == 13) {
            e.preventDefault();
            checkForm();
        }
    };

    inputEmail.onblur = () => {
        clearStyle(inputEmail, "Ваш E-mail");
    };

    function checkForm() {
        let emailValue = inputEmail.value;
            
        if (emailValue.length == 0) {
            inputAlert(inputEmail, "*Введите e-mail");
            return false;

        } else {
            clearStyle(inputEmail);
        }

        let at = emailValue.indexOf("@"),
            dot = emailValue.indexOf(".");

        if (at < 1 || dot < 1) {
            inputEmail.value = '';
            inputAlert(inputEmail, "*Введите корректный e-mail");
            return false;

        } else {
            sendForm();

            let elements = [ inputEmail ],
                placeholders = [ 'Ваш E-mail' ];

           for (let i = 0; i < elements.length; i++) {
               elements[i].value = '';
               clearStyle(elements[i], placeholders[i]);
           }

            modalWindow.className = 'modal-window fade';
            setTimeout(function () {
                modalWindow.className = 'modal-window';
            }, 2500);
        }
    }

    function inputAlert(elem, placeholder) {
        elem.placeholder = placeholder;
        elem.style.border = '2px solid #ff0202';
        elem.style.padding = '0 20px 0 20px';
        elem.style.borderRadius = '30px';
    }

    function clearStyle(elem, placeholder) {
        elem.placeholder = placeholder;
        elem.style.borderRadius = '0';
        elem.style.border = '1px solid #60759d';
        elem.style.borderRadius = '30px'
    }

    function sendForm() {

        let email = $('input[name = email]').val();

        let data = {
            'user_email': email,
            };

        $.post('sendmail.php', data,
            function (answer) {
                console.log(answer.text);
            }, 'json');
    }
});