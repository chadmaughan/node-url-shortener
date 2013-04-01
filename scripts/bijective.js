var ALPHABET = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789".split('');
var base = ALPHABET.length;
 
exports.encode = function encode(i) {
    if(i == 0) {
        return ALPHABET[0];
    }
    else {
        var s = '';
        while (i > 0) {
            s += ALPHABET[i % base];
            i = parseInt(i / base, 10);
        }
        return s.split("").reverse().join("");
    }
}
 
exports.decode = function decode(s) {
    var c = 0;
    var a = s.split('');
    for(var i = 0; i < a.length; i++) {
        var d = a[i];
        c = c * base + ALPHABET.indexOf(d);
    }
    return c;
}

//    for(var i = 0; i < 100000; i++) {
//        var e = encode(i);
//        console.log('encode(' + i + '): ' + e);
//
//        var d = decode(e);
//        console.log('decode(' + e + '): ' + d);
//
//        if(d != i) {
//          console.log("error");
//          break
//        }
//    }
//
//    var d = decode("chad");
//    console.log(d);
//
//    var e = encode(503567);
//    console.log(e);
