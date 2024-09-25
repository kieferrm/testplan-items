
function wait(duration) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
           resolve(); 
        }, duration);
    });
}

async function fact(i) {
    await wait(100);
    return i <= 1 ? 1 : i * await fact(i-1);
}


Promise.all([fact(10), fact(15)]).then(result => {
    result.forEach(r => console.log(r));
})