window.addEventListener('DOMContentLoaded', function() {

    const outputWindow = document.querySelector('.calc-body__input'),
          result = document.querySelector('.calc-body__result'),
          btns = document.querySelectorAll('.calc-body__circle'),
          btnsWrapper = document.querySelector('.calc-body__buttons');
    
    let operator = null;

    const noInputError = '<span class="calc-body__error">Ничего не введено</span>',
          simpleError = '<span class="calc-body__error">Ошибка</span>',
          tooLong = '<span class="calc-body__error">Слишком большое значение</span>';



    function clearOutput() {
        outputWindow.innerHTML = '';
    }

    function clearResult() {
        result.innerHTML = '';
    }

    function changeOperator(nextOperator) {
        if (operator == '%') {
            operator = nextOperator;
            btns.forEach(item => {
                item.classList.remove('calc-body__circle_active');
            });
            return;
        }
        if (outputWindow.innerHTML === '' && result.innerHTML === '') {
            error();
            resetActive();
            return;
        } else if (result.innerHTML === '') {
            result.innerHTML = outputWindow.innerHTML;
            operator = nextOperator;
            clearOutput();
        } else if (outputWindow.innerHTML == ''){
            operator = nextOperator;
        } else {
            execute(operator);
            operator = nextOperator;
            clearOutput();
        }
    }

    function execute(operator) {
        if (outputWindow.innerHTML === '' && result.innerHTML === '') {
            error();
            return;
        }
        switch (operator) {
            case '/':
                if (outputWindow.innerHTML === '0') {
                    result.innerHTML = simpleError;
                }
                result.innerHTML = checkCorrectResult(parseFloat((parseFloat(result.innerHTML) / parseFloat(outputWindow.innerHTML)).toFixed(8)));
                break;
            case '*':
                result.innerHTML = checkCorrectResult(parseFloat((parseFloat(result.innerHTML) * parseFloat(outputWindow.innerHTML)).toFixed(8)));
                break;
            case '+':
                result.innerHTML = checkCorrectResult(parseFloat((parseFloat(result.innerHTML) + parseFloat(outputWindow.innerHTML)).toFixed(8)));
                break;
            case '-':
                result.innerHTML = checkCorrectResult(parseFloat((parseFloat(result.innerHTML) - parseFloat(outputWindow.innerHTML)).toFixed(8)));
                break;
        }
        clearOutput();
        
    }

    function resetActive() {
        btns.forEach(item => {
            item.classList.remove('calc-body__circle_active');
        });
    }
    
    function checkCorrectResult(result) {
        if (typeof result === 'string') {
            return result;
        }
        if (isNaN(result)) {
            debugger;
            return '<span class="calc-body__error">Ошибка</span>';
        }
        return result;
    }

    function setActive(target) {
        target.parentNode.classList.add('calc-body__circle_active');
    }

    function error() {
        result.innerHTML = '<span class="calc-body__error">Ничего не введено</span>';
    }

    //  START

    clearOutput();
    clearResult();

    btnsWrapper.addEventListener('click', event => {
        const target = event.target;
        if (target.getAttribute('data-name') == 'operator' && target.id != 'c' && target.id != 'equal'){
            resetActive();
            setActive(target);
        }
        if (target && target.getAttribute('data-name') == 'value') {
            if ( target.id == '.' && outputWindow.innerHTML.indexOf('.') !== -1) {
                return;
            }
            outputWindow.innerHTML = outputWindow.innerHTML + target.id;
            return;
        } else if (target && target.getAttribute('data-name') == 'operator') {
            switch (target.id) {
                case 'c':
                    btns.forEach(item => {
                        item.classList.remove('calc-body__circle_active');
                    });
                    operator = null;
                    clearOutput();
                    clearResult();
                    break;
                case '%':
                    if (result.innerHTML === noInputError || result.innerHTML === simpleError || result.innerHTML === tooLong) {
                        error();
                    } else if (result.innerHTML === '' && outputWindow.innerHTML === '') {
                        error();
                    } else if (result.innerHTML === '') {
                        result.innerHTML = checkCorrectResult(parseFloat((outputWindow.innerHTML / 100).toFixed(8)));
                        operator = '%';
                        clearOutput();
                    } else if (result.innerHTML) {
                        debugger;
                        result.innerHTML = checkCorrectResult(parseFloat((result.innerHTML / 100).toFixed(8)));
                        operator = '%';
                        clearOutput();
                    }
                    break;
                case '/':
                    changeOperator('/');
                    break;
                case 'x':
                    changeOperator('*');
                    break;
                case '+':
                    changeOperator('+');
                    break;
                case '-':
                    changeOperator('-');
                    break;
                case 'equal':
                    if (outputWindow.innerHTML === '' || result.innerHTML === '') {
                        error();
                        return;
                    }
                    execute(operator);
                    break;
            }
        }
    });
});