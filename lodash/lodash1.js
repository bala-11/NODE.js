var _ = require("lodash")
var a = [1,2,3,4,5,6,7,8,9,0]
var falseyArray = [null,2,3,false,"",6,7,NaN,9,undefined]
console.log("\n");
// console.log("sample number from 10 numbers:::::::::::::::");

// let b = _.sample(a)
// console.log(b)
// console.log("array without that sample number::::::::::::");
// let c = _.without(a,b)
// console.log(c)

console.log("CHUNK ARRAY:: Make the array into small pieces");
console.log(_.chunk(a,5));
console.log("\n");

console.log("COMPACT ARRAY:: remove all the falsey values");
console.log(_.compact(falseyArray));
console.log("\n");

console.log("DIFFERENCE ARRAY:: remove all duplicate values and return array of uniques values in first array");
console.log(_.difference([1,2,3],[3,4,5]));
console.log(_.pullAll([1,2,3],[3]));
console.log("\n");

console.log(_.differenceBy([{ 'x': 2 }, { 'x': 1 }], [{ 'x': 1 }], 'x'));



