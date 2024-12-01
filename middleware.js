const server =  require("express")
const app = server()
const PORT = 3000

function middleware(req,res,next){
    console.log("From middleware")
    req.user = JSON.stringify({name : "Balaji",age:"18"})
    next()
}

function parseData(req,res,next){
    console.log("Parse Data")
    res.header = JSON.parse(req.user)
    next()
}

app.get("/user", middleware,parseData, (req,res)=>{
    return res.status(200).send("Hi welcome")
})

app.listen(PORT,()=>{
    console.log("App listen in port" + PORT)
})
