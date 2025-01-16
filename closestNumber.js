import Redis from 'ioredis';
const rc  = new Redis({
    host : process.env.redis_host,
    port : process.env.redis_port
})

const numbers = [12345674, 12345675, 12345679, 12345673];
const target = 3456;


function findClosest(numbers, target) {
    return numbers.reduce((closest, current) => {
        return Math.abs(current - target) < Math.abs(closest - target) ? current : closest;
    });
}
const closestNumber = findClosest(numbers, target);
const saveNumber = await rc.set("closestNumber",closestNumber,"EX",30)

if(saveNumber) console.log(`The closest number to ${target} is ${closestNumber}`);
else console.log("Number not saved in REDIS");

const getNumber = await rc.get("closestNumber");
console.log(`Number saved in redis within EXP time : ${getNumber}`);





