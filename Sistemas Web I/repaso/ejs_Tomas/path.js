const path = require("path");
console.log(path.sep);
let p = "src/pkg/test.js";
console.log(path.basename(p)) // => "test.js"
console.log(path.extname(p)) // => ".js"
console.log(path.dirname(p)) // => "src/pkg"
console.log(path.basename(path.dirname(p))) // => "pkg"
console.log(path.dirname(path.dirname(p))) // => "src"
console.log(path.normalize("a/b/c/../d/")) // => "a/b/d/"
console.log(path.normalize("a/./b")) // => "a/b"
console.log(path.normalize("//a//b//")) // => "/a/b/"
console.log(path.join("src", "pkg", "t.js")) // => "src/pkg/t.js"
console.log(path.resolve()) // => process.cwd()
console.log(path.resolve("t.js")) // => path.join(process.cwd(), "t.js")
console.log(path.resolve("/tmp", "t.js")) // => "/tmp/t.js"
console.log(path.resolve("/a", "/b", "t.js")) // => "/b/t.js"