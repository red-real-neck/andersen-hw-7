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

    // function checkAndSetFontSize(result) {
    //     if (typeof result === 'string') {
    //         return result;
    //     }
    //     let resultStr =  String(result);
    //     if (resultStr.length < 7) {
    //         return parseFloat(resultStr);
    //     }

    //         if (resultStr.length>7 && resultStr.length<10) {
    //             console.log(1);
    //             return (`<span style="font-size: 53px;">${parseFloat(resultStr)}</span>`);
    //         } else if (resultStr.length>10 && resultStr.length<14) {
    //             console.log(2);
    //             return (`<span style="font-size: 40px;">${parseFloat(resultStr)}</span>`);
    //         } else if (resultStr.length>14 && resultStr.length<20) {
    //             console.log(3);
    //             return (`<span style="font-size: 30px;">${parseFloat(resultStr)}</span>`);
    //         } else if (resultStr.length>20 && resultStr.length<30) {
    //             console.log(4);
    //             return (`<span style="font-size: 20px;">${parseFloat(resultStr)}</span>`);
    //         } else {
    //             debugger;
    //             console.log(5);
    //             return ('<span class="calc-body__error">Слишком большое значение</span>');
    //         }   
    //     }

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