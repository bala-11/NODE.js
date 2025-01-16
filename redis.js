import Redis from 'ioredis';
const redisConnection = new Redis()

redisConnection.on('connect',()=>{
	console.log('Redis connected successfully...');
})

if(redisConnection.set("name","Balaji","EX",60)) console.log(`Redis key setted`);
else console.log("Error in keys");

// console.log(redisConnection.pttl("name"));

