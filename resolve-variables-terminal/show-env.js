process.argv.forEach(function (val, index, array) {
    console.log(index + ': ' + val);
});
setTimeout(function () { }, 3000);