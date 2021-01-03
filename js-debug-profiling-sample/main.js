
let memory = [];

function newArray(size) {
    let array = [];
    for (let i = 0; i < size; i++) {
        array.push('-');
    }
    return array;
}

function compute(max) {
    let primes = [];
    let allNumbers = newArray(max);
    allNumbers[0] = 'no';
    allNumbers[1] = 'no';
    for (let i = 2; i < max; i++) {
        if (allNumbers[i] == 'no') {
            continue;
        }
        allNumbers[i] = 'yes';
        primes.push(i);
        for (let ii = 2*i; ii < max; ii += i) {
            allNumbers[ii] = 'no';
        }
    }
    return primes;
}

function consume(max, count) {
    if (count < max) {
        memory.push(new Float64Array(max));
        setTimeout(() => {
            consume(max, count + 1);
            compute(10*max);
        }, 0);
    }
}

consume(50000, 0);
