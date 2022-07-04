const express = require("express")
const app = express()
const multer = require("multer")
const uuid = require("uuid").v4
let fileName


const storage = multer.diskStorage({
    destination : (req,file,cb) =>{
        cb(null, 'uploads')
    },
    filename : (req,file,cb)=>{
        const {originalname} = file
        fileName = `${uuid()}-${originalname}`
        cb(null,fileName)
    }
})

const upload = multer({storage})

app.post("/upload", upload.single("file"),(req,res,next)=>{
    res.json({
        file:fileName,
        status : "Success"
    })
})

app.post("/uploadMultiple", upload.array("file"),(req,res,next)=>{
    console.log(req, "req body")
    res.json({
        status : "Success"
    })
})

const PORT = 5000
app.listen(PORT, ()=>{
    console.log(`Server started on ${PORT}`)
})