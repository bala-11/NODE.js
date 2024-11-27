const delay = (time)=>
    new Promise((res) => setTimeout(res,time))

async function getData(id) {
    const url = `https://jsonplaceholder.typicode.com/todos/${id}`
    const response = await fetch(url)
    const json = await response.json()
    await delay(4000);
    return json.title
}


const cachedFn = (fn) =>{
    const map = new Map()
    return async function (...args) {
        const now = performance.now()
        console.log(now);
        const key = args.toString()
        console.log(key);
        
        if(map.has(key)){
            const response = await map.get(key)
            const later = performance.now()
            console.log("From Map");
            console.log(later);
            return `response ${response} time is ${later - now}`
        }
        const response = fn(...args)
        map.set(key,response)
        const later = performance.now()
        console.log(later)
        return `response ${response} time is ${later - now}`
    }
}

const memoiseGetData = cachedFn(getData)

memoiseGetData(1).then(console.log)
memoiseGetData(1).then(console.log)
memoiseGetData(1).then(console.log)
memoiseGetData(1).then(console.log)
memoiseGetData(1).then(console.log)