const delay = (time)=>
    new Promise((res) => setTimeout(res,time))

async function getData(id=1) {
    const url = `https://jsonplaceholder.typicode.com/todos/${id}`
    const response = await fetch(url)
    const json = await response.json()
    await delay(5000)
    return json.title
}


const cachedFn = (fn) =>{
    const map = new Map()
    return async function (...args) {
        const now = performance.now()
        const key = args.toString()
        if(map.has(key)){
            const response = await map.get(key)
            const later = performance.now()
            return `cache response ${response} time is ${later - now}\n`
        }
        const response = fn(...args)
        map.set(key,response)
        const later = performance.now()
        return `response ${response} time is ${later - now}\n`
    }
}

const memoiseGetData = cachedFn(getData)

memoiseGetData(1).then(console.log)
memoiseGetData(1).then(console.log)
memoiseGetData(1).then(console.log)
memoiseGetData(1).then(console.log)
memoiseGetData(1).then(console.log)