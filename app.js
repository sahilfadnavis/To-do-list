const express = require('express') ;                //require the express module just as you require other modules and puts it in a variable
const bodyParser = require('body-parser');          //require the bodyParser module and stores in a variable bodyParser
const app = express();                              // it basically calls the express function express() and puts new express application inside the app variable


app.set('view engine', 'ejs');                      //view engine allows us to render web pages using template files.these templates are filled with actual data and served  to the client .there are multiple view engines the most popular of which is embedded javascript(EJS)
app.use(bodyParser.urlencoded({ extended:true }));  
app.use(express.static('public')) ;                   // adds a middleware for serving static files to your express app.
var items=[] ;
var workItems=[] ;


app.get('/', (req, res) => {                                        

    
    var today = new Date();                                                     //calls the date funtion and stores the date object with the current date and time
    var day="" ;
    // console.log(today) ;
    // console.log(today.getDate()) ;
    // console.log(today.getDay()) ;
    // console.log(today.getFullYear()) ;
    // console.log(today.getHours()) ;
    // console.log(today.getMinutes()) ;
    // console.log(today.getSeconds()) ;
    // console.log(today.getMilliseconds()) ;

    var options ={   
        day:"numeric",
        month:"long",
        year:"numeric",    
    }

    day = today.toLocaleDateString("en-US",options);                   //tolocaletimestring() method returns a string with a language-sensitive representation of the time portion of the date // customised date format 

    res.render("list", {listTitle:day, listItems:items});               // view engine (ejs ) will look for the file called list inside a views directory // res.render sends the data to the list file
    
});

app.post('/', function(req, res){                                      
    let item = req.body.newItem;

    if(req.body.list==="work"){
        workItems.push(item);
        res.render("/work")
    }
    else{
        items.push(item);
        res.redirect("/");

    }
})

app.listen(3000,function() {
    console.log('listening on port 3000');
});

app.get('/work', (req, res) => {
    res.render('list' , {listTitle:"Work List" , listItems: workItems}); 
});

