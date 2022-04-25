var buf = Buffer.from("hello world!");

console.log(buf);
console.log(buf.length);
console.log(buf.toString());

var buf = Buffer.alloc(10)
buf.fill("zhangtian");
console.log(buf);
console.log(buf.length)
console.log(buf.toString())