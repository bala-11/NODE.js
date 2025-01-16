const server =  require("express")
const app = server()
const PORT = 3000

function middleware(req,res,next){
    console.log("From middleware")
    req.user = JSON.stringify({name : "Balaji",age:"18"})
    next()
}

app.get("/user", middleware, (req,res)=>{
    return res.status(200).send(req.user)
})

app.listen(PORT,()=>{
    console.log("App listen in port" + PORT)
})
