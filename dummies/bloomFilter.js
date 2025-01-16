const {BloomFilter} =  require("bloom-filters")

let filter = new BloomFilter(10,2)

filter.add("Balaji")
filter.add("logesh")

console.log(filter.has("balaji"))
console.log(filter.has("paul"))