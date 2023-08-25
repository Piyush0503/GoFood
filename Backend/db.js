const mongoose = require('mongoose');
const mongoURI = 'mongodb://gofood:mern123@ac-fmnbq22-shard-00-00.vpumcgf.mongodb.net:27017,ac-fmnbq22-shard-00-01.vpumcgf.mongodb.net:27017,ac-fmnbq22-shard-00-02.vpumcgf.mongodb.net:27017/gofoodmern?ssl=true&replicaSet=atlas-cyc75u-shard-0&authSource=admin&retryWrites=true&w=majority';
mongoose.set('strictQuery', false);

const mongoDB =async() => {
    await mongoose.connect(mongoURI,{ useNewUrlParser: true} , async(err,result)=>{
        if(err) console.log("..",err)
        else{
            console.log("connected");
            const fetched_data = await mongoose.connection.db.collection("food_items");
            fetched_data.find({}).toArray( async function(err,data){
            
                const foodCategory = await mongoose.connection.db.collection("foodCategory");
                foodCategory.find({}).toArray(function(err,catData){
                    if(err) console.log(err);
                    else{
                        global.food_items = data;
                        global.foodCategory = catData;
                    }
                })

            //  if(err) console.log(err);
            // else{
            //     global.food_items = data;
            // }
       })   
        }
       
    });
}

// const mongoDB = mongoose.connect(mongoURI,{
//     useNewUrlParser:true, useUnifiedTopology:true
// },).then(()=> console.log('connected'))
// .catch((err)=> {console.log(err);});
// const fetched_data = mongoose.connection.db.collection("food_items");
// fetched_data.find().function(err,data) 
//     if(err) console.log(err)
//     else console.log(data)


    
    // mongoDB.food_items.find().forEach( function(myDoc) {
    //     console.log(myDoc); } );




    // let db_connect = mongoDB.getDb();
  
    // db_connect
    //   .collection("food_items")
    //   .find({})
    //   .toArray()
    //   .then((data) => {
    //     console.log(data);
    //     response.json(data);
    //   });


// const mongoDB = async () => {
//     try {
//         mongoose.set('strictQuery', false)
//         mongoose.connect('mongodb+srv://gofood:mern123@cluster0.vpumcgf.mongodb.net/gofoodmern?retryWrites=true&w=majority') 
//         console.log('Mongo connected')
//     } catch(error) {
//         console.log(error)
//         process.exit()
//         const fetched_data = await mongoose.connection.db.collection("food_items");
//         fetched_data.find({}).toArray(function(err,data){
//             if(err) console.log(err);
//             else console.log(data);
//         })
//     }
// }

module.exports = mongoDB;