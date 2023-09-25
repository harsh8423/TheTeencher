const mongoose= require('mongoose')
const QuestionBank = require('../models/questionBankSchema')
const {practiceQuestion} = require('./questionBankSeed')

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

const seedDB= async() =>{
    // await Campground.deleteMany({});
    for(let i=0;i<25;i++){
        const practQ= new QuestionBank({
            question:`${practiceQuestion[i].question}`,
            options:[`${practiceQuestion[i].options[0]}`,`${practiceQuestion[i].options[1]}`,`${practiceQuestion[i].options[2]}`,`${practiceQuestion[i].options[3]}`],
            correctOption:`${practiceQuestion[i].correctOption}`,
            explanation:`${practiceQuestion[i].explanation}`,
            questionNumber:i
        })
        await practQ.save()
    }
}
seedDB().then(() =>{
    // Campground.find()
    mongoose.connection.close()
})



// studentRegistration.create({
//     name: 'John Doe',
//     mobile: 9876543210,
//     schoolStandard: '10th',
//     email: 'johndoe@example.com',
//     city: 'New York',
//     state: 'New York'
// }
// )



