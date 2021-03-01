const mongoose = require('mongoose');

//mongoose.connect('mongodb://localhost:27017/test-db')
mongoose.connect('mongodb+srv://user:1234@db.mhbax.mongodb.net/test-db?retryWrites=true&w=majority'
,{ useNewUrlParser: true, useUnifiedTopology:true})
    .then(()=> console.log('Mongo is UP'))
    .catch((err) => console.log('Mongo is down. Raison :',err));

const courseSchema = new mongoose.Schema({
    title : String,
    author : String,
    price : Number,
    tags : [String],
    date : {type : Date, default : Date.now()},
    isPublished : Boolean
});

const Course = mongoose.model('Course',courseSchema);
const course = new Course({
    title : 'NodeJs Course',
    author : 'H. Rojbani',
    price : 150,
    tags : ['node', 'ts', 'backtend'],
    isPublished : true
});

async function createCourse(course){
    const result = await course.save();
    console.log(result);
}

async function getCourses(){
    const courses = await Course.find();
    console.log('Data :' , courses);
}
// Comparaison Query Operators
// eq (equal)
// ne (not equal)
// gt ( greater than)
// gte ( greater than and equal)
// lt ( less than)
// lte ( less than and equal)
// in 
// nin
async function getCoursesWithFilter(){
    const courses = await Course.find()   //find({author : ' H. Rojbani',isPublished : true});
                                .or([{isPublished : false},{price : {$in : [100, 120, 150]}}])
                                //.limit(1)
                                .sort({title : -1})
                                //.select({title:1, price:1, _id:0})
                                .count()
    console.log('Data :' , courses);
}
getCoursesWithFilter()