const dividir = (num1, num2) => {
    return new Promise((res, rej) => {
        setTimeout(() => {
            if(parseInt(num2) === 0) rej('No se puede dividir entre 0');
            else {
                const result = num1 / num2;
                res(`El resultado es ${result}`);
            }
        }, 1500);
    });
};

module.exports = {
    dividir
};