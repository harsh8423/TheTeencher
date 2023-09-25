const mongoose = require("mongoose");
const { Schema } = mongoose;
mongoose.connect('mongodb+srv://harsh8423:8423047004@cluster0.1xbklyu.mongodb.net/questionBank',{
    useNewUrlParser: true, 
    useUnifiedTopology: true,
}).then(()=>{
    console.log("connection open !!")
})
.catch((err) => {
    console.log("error in catch")
    console.log(err);
})
console.log('started')