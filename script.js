const disp = document.querySelector('.display');
const nums = document.querySelectorAll('.num');
const sign = document.querySelector('.sign');
const clear = document.querySelector('.clear');
const del = document.querySelector('.del');
const eval = document.querySelector('.eval');
const operators = document.querySelectorAll('.opr');
let operator = num1 = num2 = res = null;
let hold = false;

// Math funcs
// creatin seperate funcs jus because they asked or else i cld've done it in a single operate func
const add = (n1, n2) => n1 + n2;
const sub = (n1, n2) => n1 - n2;
const mul = (n1, n2) => n1 * n2;
const div = (n1, n2) => n1 / n2;
const perc = (n1, n2) => n1 * n2 / 100;
const round = n => Math.round(n*10000)/10000; //Round to 4 decimal places
function operate(n1, n2, operator) {
    n1=round(Number(n1));
    n2=round(Number(n2));
    switch (operator) {
        case '+':
            res = add(n1, n2); break;
        case '-':
            res = sub(n1, n2); break;
        case '*':
            res = mul(n1, n2); break;
        case '/':
            res = div(n1, n2); break;
        case '%':
            res = perc(n1, n2); break;
    }
    res = round(res);
    num1 = res;
    operator = num2 = null;
    return res;
}

// doesn't work for some reason, will fix overflow later
disp.addEventListener('change',()=>{
    txt = disp.innerText;
    if(txt.length > 4) 
        disp.innerText = round(txt);
})

clear.addEventListener('click', () => { 
    operator = num1 = num2 = res = null;
    hold = false;
    disp.innerText = 0; 
});
del.addEventListener('click', () => {
    txt = disp.innerText;
    if (txt.length == 1)
        disp.innerText = 0;

    else
        disp.innerText = txt.slice(0, -1)
});

sign.addEventListener('click', () => {
    num = disp.innerText;
    if (num == 0) return;
    if (num < 0)
        disp.innerText = Math.abs(num);
    else
        disp.innerText = '-' + num;
})

nums.forEach(btn => {
    btn.addEventListener('click', () => {
        let num = btn.innerText;
        if(hold){
            disp.innerText = num;
            hold = false;
            return;
        }
        // here 'x' is the current display
        x = disp.innerText;
        if (num == '.') {
            if (!x.includes('.'))
                disp.innerText += '.';
            return;
        }
        if (x == '0')
            disp.innerText = num;
        else if (num != '.')
            disp.innerText += num;

    })
})

operators.forEach(opr => {
    opr.addEventListener('click', () => {
        hold = true;
        if(operator!=null){
            num2 = disp.innerText;
            disp.innerText = operate(num1,num2,operator);
            operator = opr.innerText;
            return;
        }
        operator = opr.innerText;
        num1 = disp.innerText;
        if (res != null){
            disp.innerText = operate(res,num1,operator);
        }
    })
})

eval.addEventListener('click',()=>{
    hold = true;
    if(operator!=null){
        num2 = disp.innerText;
        disp.innerText = operate(num1,num2,operator);
        return;
    }
})