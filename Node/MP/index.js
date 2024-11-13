const mysql = require('mysql');
const express = require('express');
const bodyparser = require('body-parser');
const fs = require('fs');
const morgan = require('morgan');
const path = require('path');
const rfs = require('rotating-file-stream');
const passwordUtil = require('./MarketPlace/classes/password');
var moment = require('moment');
var multer  =   require('multer');
var formidable = require('formidable');
var app = express();
var logDirectory = path.join(__dirname, 'log');
var WidgetDirectory = path.join(__dirname, 'Widgets');
var WidgetDirectory = path.join(__dirname, 'MarketPlace');
var WidgetDirectoryImages = path.join(__dirname, 'Widgets', 'images');
var WidgetDirectoryFiles = path.join(__dirname, 'Widgets', 'files');
// ensure log directory exists
fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory)
fs.existsSync(WidgetDirectory) || fs.mkdirSync(WidgetDirectory)
fs.existsSync(WidgetDirectoryImages) || fs.mkdirSync(WidgetDirectoryImages)
fs.existsSync(WidgetDirectoryFiles) || fs.mkdirSync(WidgetDirectoryFiles)
var wObject = { 'image':'', 'file_path': ''};
// app.use(express.static('Widgets/images/'));
// app.use(express.static('Widgets/files/'));
app.use(express.static('MP/MarketPlace/uploads/images/'));
app.use(express.static('MP/MarketPlace/uploads/files/'));
app.use(express.static('MP/MarketPlace/uploads/profiles/'));
app.use(express.static('MarketPlace/'));
let passUtil=new passwordUtil();

/* var storeImage =   multer.diskStorage({
    destination: function (req, file, callback) {
      callback(null, './Widgets/images/');
    },
    filename: function (req, file, callback) {
		var fName = Date.now()+'_'+file.originalname;
		wObject['file_path'] = fName;
		console.log('F path ',this.wObject);
      callback(null, fName);
    }
  });
  var uploadImage = multer({ storage : storeImage}).single('coverImage');
  var storeWidget =   multer.diskStorage({
    destination: function (req, file, callback) {
      callback(null, './Widgets/files/');
    },
    filename: function (req, file, callback) {
      var fName = Date.now()+'_'+file.originalname;
		wObject['image'] = fName;
		console.log('image ',this.wObject);
      callback(null, fName);
    }
  });  
  var uploadWdgetFile = multer({ storage : storeWidget}).single('widgetFile'); */
  
  var storeWidget =   multer.diskStorage({
    destination: function (req, file, callback) { console.log(file);
        var temp='';
      callback(null, (file.originalname.indexOf('.widget') > -1) ? './MarketPlace/uploads/files/' : './MarketPlace/uploads/images');
    },
    filename: function (req, file, callback) {
      var fName = Date.now()+'_'+file.originalname;
	  if (file.originalname.indexOf('.widget') > -1){
		  wObject.file_path = fName;
	  }else {
		  wObject.image = fName;
	  }
      callback(null, fName);
    }
  });  
  var upload = multer({ storage : storeWidget})

  var storeProfile =   multer.diskStorage({
    destination: function (req, file, callback) {
      callback(null, './MarketPlace/uploads/profiles');
    },
    filename: function (req, file, callback) {
      var fName = Date.now()+'_'+file.originalname;
	  wObject.image = fName;
      callback(null, fName);
    }
  });  
  var uploadProfile = multer({ storage : storeProfile})

// create a rotating write stream
var accessLogStream = rfs.createStream('access.log', {
  interval: '1d', // rotate daily
  path: logDirectory
});
// setup the logger
app.use(morgan('combined', { stream: accessLogStream }))

app.use(bodyparser.json());
app.all('/*', function(req, res, next) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.setHeader("Access-Control-Max-Age", "3600");
    res.setHeader("Access-Control-Allow-Methods","PUT, POST, GET, DELETE, PATCH, OPTIONS");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization, Content-disposition");
    res.header("access-control-expose-headers","content-disposition");
    // res.setHeader("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");
    // res.setHeader("Content-Type", "application/json;charset=utf-8");
    next();
  });

var mysqlConnection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'aiv_marketplace',
    multipleStatements: true,
	insecureAuth : true
});

var nodemailer = require('nodemailer');
const { query } = require('express');

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'activeintelligencebi@gmail.com',
    pass: 'activei995@'
  }
});

mysqlConnection.connect((err) => {
    if (!err)
        console.log('Connection Established Successfully');
    else
        console.log('Connection Failed!' + JSON.stringify(err, undefined, 2));
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}..`));

app.get('/', (req, res) => {
    res.send({message: 'success'});	
});

var cpUpload = upload.fields([{ name: 'coverImage', maxCount: 1 }, { name: 'widgetFile', maxCount: 8 }])


app.post('/uploadFile', cpUpload, (req, res) => {
	var body =  req.body;
	var mysqlTimestamp = moment(Date.now()).format('YYYY-MM-DD HH:mm:ss');
	var q = "INSERT INTO `ai_mp_components` "
	+"(`title`,`category`,`rate`,`description`,`image`,`purchase_option`,`size`,`downloaded`,`refresh`,`no_of_comments`,`download_link`,`details`,`features`,`seller_name`,`file_path`,`price`,`video_url`,`created_date`,`last_update_date`,`user_id`,`sub_category`)"
	+"VALUES ('"+body.title+"', '"+body.category+"', '"+body.rate+"', '"+body.description+"', '"+wObject.image+"', '"+body.purchase_option+"','"+body.size+"', 0,0,0,'"+body.download_link+"','"+body.details+"','"+body.features+"','"+body.seller_name+"','"+wObject.file_path+"',"+body.price+",'"+body.video_url+"','"+mysqlTimestamp+"','"+mysqlTimestamp+"','"+body.user_id+"','"+body.sub_category+"' )";	
	mysqlConnection.query(q, (err, rows, fields) => {
		if (!err){
			res.send({message: 'Component uploaded successfully',success : true});	
		} else {
			res.send({message: err, success : false });
		}
	});
    
});

app.post('/uploadFile/:id', cpUpload, (req, res) => {
    if(req.params.id){
        var id = req.params.id;
        var q = '';
        var body =  req.body;     
        var mysqlTimestamp = moment(Date.now()).format('YYYY-MM-DD HH:mm:ss');
        q = "update ai_mp_components set title='" + body.title + "', type = '" + body.type + "', rate = '" + body.rate + "',description='" + body.description + "', image ='" + (wObject.image ? wObject.image : body.image ) + "', purchase_option='" + body.purchase_option + "',size='" + body.size + "',download_link='" + body.download_link + "',details='" + body.details + "',features='" + body.features + "',seller_name='" + body.seller_name + "',file_path='" + (wObject.file_path ? wObject.file_path : body.file_path)  + "',price=" + body.price + ",video_url='" + body.video_url + "',last_update_date = '" + mysqlTimestamp + "' where id = '" + id + "'";
        mysqlConnection.query(q, (err, rows, fields) => {
            if (!err){
                res.send({message: 'success'});	
            } else {
                res.send({message: err});
            }
        });
    }    
});



app.get('/forgetpassword/:email', (req, res) => {
    mysqlConnection.query('SELECT * FROM ai_mp_users where email = ?',[req.params.email], (err, rows, fields) => {
        if (!err){
            if (rows.length > 0){
                var mailOptions = {
                    from: 'activeintelligencebi@gmail.com',
                    to: req.params.email,
                    subject: 'Change password',
                    text: 'your is password is ' + rows[0].password+''
                  };
                  
                  transporter.sendMail(mailOptions, function(error, info){
                    if (error) {
                        res.send(error);
                    } else {
                      res.send(info);
                    }
                  });
            }            
        } else
            res.send(err);
    })
});

app.post('/authenticate', (req, res) => {
    var user = req.body;
    // and password = ?, , user.password
    mysqlConnection.query('SELECT * FROM ai_mp_users where username = ?  ',[user.username], (err, rows, fields) => {
        if (!err){
            obj=rows[0];
            if(passUtil.validPassword(user.password,obj.hash_key,obj.password_hash)){
                res.send({'success' : true, 'message':"Logged in successfully.", 'data' : obj });
           }
           else{
            res.send({'success' : false, 'message':"Usernme/Password is wrong.",'data' : {}});
           }
        }
        else{
            res.send({'success' : false, 'message':"Usernme/Password is wrong.",'data' : {}});
        }
    })
});

// app.post('/authenticate', (req, res) => {
//     var user = req.body;
    
//     mysqlConnection.query('SELECT * FROM ai_mp_users where username = ? and password = ? ',[user.username, user.password], (err, rows, fields) => {
//         if (!err)
//             res.send(rows);
//         else
//             res.send(err);
//     })
// });

app.get('/getAll', (req, res)=>{
    mysqlConnection.query('SELECT * FROM ai_mp_users', (err, rows, fields) => {
        if (!err)
            res.send(rows);
        else
            res.send(err);
    })
});

function exist(table, value, callback) {
    var q = 'select * from ai_mp_users where email = ?';
    mysqlConnection.query(q,[value], (err, rows, fields) => {
        callback(err, rows, fields);
    });
}


app.post('/createUser',(req, res) => {
    var user = req.body;
    exist('ai_mp_users',  user.username, function(err, rows, fields ){
        if(!err){
            if (rows.length == 0){
                var mysqlTimestamp = moment(Date.now()).format('YYYY-MM-DD HH:mm:ss');
                passwordObj=passUtil.setPassword(user.password);
                console.log(passwordObj);
                var username = user.username, password= user.password, email= user.username,  phone_number = user.phone_number ,
                created_date = mysqlTimestamp,  first_name= user.firstName,  last_name= user.lastName,  last_updated_date = mysqlTimestamp;
                
                var q = "INSERT INTO `ai_mp_users` "
                +" (`username`, `password`, `email`, `phone_number`, `role`, `created_date`, `first_name`, `last_name`, `last_updated_date`, `password_hash`, `hash_key`) "
            +" VALUES ('"+username+"', '"+password+"', '"+email+"',  '"+phone_number+"',  'GUEST', '"+created_date+"',  '"+first_name+"',  '"+last_name+"',  '"+last_updated_date+"', '"+passwordObj.hash+"', '"+passwordObj.key+"' )"; 
                
                mysqlConnection.query(q, (err, rows, fields) => {
                    if (!err)
                        res.send({'success' : true,'message' : "User registered."});
                    else
                        res.send({'success' : false, message: err});
                })
                
            } else {
                res.send({'success' : false, 'message':"Email address already exists."});
            }
        }
        else {
            res.send({'success' : false, 'message':err});
        }
    });
});



app.post('/user', (req, res) => {
    console.log(req.body)
    var username = req.body.username.username ? req.body.username.username : req.body.username;
    mysqlConnection.query('SELECT * FROM ai_mp_users where username = ? ',[username], (err, rows, fields) => {
        if (!err)
            res.send(rows);
        else
            res.send(err);
    })
});

app.post('/user/is', (req, res) => {
    console.log(req.body.username);
    mysqlConnection.query('SELECT * FROM ai_mp_users where username = ? ',[req.body.username], (err, rows, fields) => {
        if (!err)
            res.send(rows);
        else
            res.send(err);
    })
});


app.get('/getById/:id', (req, res) => {
    mysqlConnection.query('SELECT * FROM ai_mp_users where id = ? ',[req.params.id], (err, rows, fields) => {
        if (!err)
            res.send(rows);
        else
            res.send(err);
    })
});

var profileUpload = uploadProfile.fields([{ name: 'profile_image', maxCount: 1 }])

app.post('/updateUser', profileUpload, (req, res) => {
    var body=req.body;
    var last_update_date=moment(Date.now()).format('YYYY-MM-DD HH:mm:ss');
    
    if(body.newpassword !=null || body.newpassword !=''){
        mysqlConnection.query('SELECT * FROM ai_mp_users where username = ?  ',[body.username], (err, rows, fields) => {
            if (!err){
                obj=rows[0];
                if(passUtil.validPassword(body.password,obj.hash_key,obj.password_hash)){
                    console.log("old password is correct");
                    passwordObj=passUtil.setPassword(body.newpassword);

                    var query= "update ai_mp_users set username='"+ body.username + "',password_hash = '"+ passwordObj.hash+ "',hash_key = '"+ passwordObj.key + "',email = '"+ body.email + "',phone_number ='" + body.phone_number + "',role = '"+ body.role +"',first_name ='"+body.first_name+"',last_name ='"+body.last_name+"',last_updated_date='"+last_update_date +"',company_name='"+body.company_name+"',address='"+body.address+"',city='"+body.city+"',state='"+body.state+"',country='"+body.country+"',zip_code='"+body.zip_code+"',profile_image='"+wObject.image+"' where id = '" + body.id + "'";
                    mysqlConnection.query(query,[req.params.id], (err, rows, fields) => {

                            if (!err){
                                res.send({'success' : true, 'message': "user details updated"});
                            }   
                            else{
                                console.log(err);
                                res.send({'success' : false, 'message' :"error while updating user details"});
                            }
                        })
               }
               else{
                res.send({'success' : false, 'message':"Old Password is wrong."});
               }
            }
        })
    }

    // mysqlConnection.query(query,[req.params.id], (err, rows, fields) => {

    //     if (!err){
    //         res.send(rows);
    //     }   
    //     else{
    //         res.send(err);
    //     }
    // })
});

app.put('/deleteUser/:id', (req, res) => {
    mysqlConnection.query('DELETE FROM ai_mp_users where id = ? ',[req.params.id], (err, rows, fields) => {
        if (!err)
            res.send(rows);
        else
            res.send(err);
    })
});

// get All widgets 
app.get('/widgets', (req, res) => {
    mysqlConnection.query('SELECT * FROM ai_mp_components', (err, rows, fields) => {
        if (!err)
            res.send(rows);
        else
            res.send(err);
    })
});

// get a widgets with id
app.get('/widget/:id', (req, res) => {
    mysqlConnection.query('SELECT * FROM ai_mp_components where id = ?', [req.params.id],  (err, rows, fields) => {
        if (!err)
            res.send({'success': true, 'data' :rows, 'message' : "component updated successfully." });
        else
            res.send({'success':false, 'data' :err, 'message': "comport update failed"});
    })
});

// get a widgets with user id
app.get('/widget/user/:id', (req, res) => {
    mysqlConnection.query('SELECT * FROM ai_mp_components where user_id = ?', [req.params.id],  (err, rows, fields) => {
        if (!err)
            res.send(rows);
        else
            res.send(err);
    })
});

// upload widget 
app.post('/uploadWidget', (req, res) => {
    console.log(req.body);
    var w = req.body;
    
    var sql = "INSERT INTO ai_mp_components (`title`,`type`,`rate`,`description`,`image`,`purchase_option`,`size`, "
    +" `downloaded`,`refresh`,`no_of_comments`,`download_link`,`user_id` ) "
    +" VALUES ('"+w.title+"','"+w.type+"','"+w.rate+"','"+w.description+"','"+w.image+"','"+w.purchase_option+"','"+w.size+"','"
    + w.downloaded+"','"+w.refresh+"','"+w.no_of_comments+"','"+w.download_link +"','"+w.user_id +"')" ;
    
    mysqlConnection.query(sql, (err, rows, fields) => {
        if (!err)
            res.send(rows);
        else
            res.send(err);
    });
});

app.get('/widgetDetails/:id', (req, res) => {
    mysqlConnection.query('SELECT * FROM ai_mp_components where id = ?', [req.params.id],  (err, rows, fields) => {
        if (!err)
            res.send(rows);
        else
            res.send(err);
    })
});


app.get('/update/:id', (req, res) => {
    //need change
    mysqlConnection.query('Update ai_mp_components set '+col+' = '+val+' where id = ?', [req.params.id],  (err, rows, fields) => {
        if (!err)
            res.send(rows);
        else
            res.send(err);
    })
});

app.delete('/delete/:id', (req, res) => {
    mysqlConnection.query('Delete FROM ai_mp_components where id = ?', [req.params.id],  (err, rows, fields) => {
        if (!err)
            res.send({'success' : true, data : rows, 'message':"Component deleted."});
            // res.send({success: true, data : rows });
        else
        res.send({'success' : false, data : rows, 'message':"Component delete failed."});
    })
});

app.get('/getWidgetJson/:id', (req, res) => {
    mysqlConnection.query('SELECT * FROM ai_mp_components where id = ?', [req.params.id],  (err, rows, fields) => {
        if (!err){
            var fpath = rows[0].file_path;
            if(fpath != null && fpath != undefined && fpath != ""){
                 var fileName = path.basename(fpath);
                // var files = fs.createReadStream(fpath);
                res.writeHead(200, {'Content-disposition': 'attachment; filename='+fileName+''}); //here you can add more headers
                fs.createReadStream(fpath).pipe(res);
            }            
        }
        else
            res.send(err);
    })
});

app.post('/makeComment', (req, res) => {
    var c = req.body;
    var rateCol = '';
    var q='';
    if (c.rate == 1){
        rateCol = 'one'   
    } else if (c.rate == 2) {
        rateCol = 'two'
    } else if (c.rate == 3) {
        rateCol = 'three'
    } else if (c.rate == 4) {
        rateCol = 'four'
    } else if (c.rate == 5) {
        rateCol = 'five'
    } else {
        c.rate = 0;
    }

    var mysqlTimestamp = moment(Date.now()).format('YYYY-MM-DD HH:mm:ss');
    mysqlConnection.query("INSERT INTO `ai_mp_comments` (`user_id`, `comment`, `date`, `component_id`)"+
     " VALUES ('"+c.user_id+"','"+c.comment+"','"+mysqlTimestamp+"','"+ c.component_id+"')", (err, rows, fields) => {
         if(err){
             console.log('makecomment ',err);
         } else {
             console.log('success');
         }
     })
     mysqlConnection.query("select * from ai_mp_user_rating where component_id = ? and user_id = ?", [c.component_id, c.user_id], (err, rows, fields) =>{
        var q = '';
        if(rows.length > 0 ){
            q = "Update `ai_mp_user_rating` SET `rate_count` = "+c.rate+" where component_id = "+c.component_id+" and user_id = "+ c.user_id+"";
        } else {
            q = "INSERT INTO `ai_mp_user_rating` (`component_id`, `rate_count`, `user_id`)"+
            " VALUES ("+c.component_id+", "+c.rate+","+ c.user_id+")";
        }
        mysqlConnection.query( q, (err, rows, fields) => {
         if(err){
             console.log('makecomment ',err);
         } else {
             console.log('success');
         }
     })
     })

   mysqlConnection.query('SELECT * FROM ai_mp_widget_rating where component_id = ?', [c.component_id],  (err, rows, fields) => {
        if (!err){
            if(rows.length == 0){
                q= "INSERT INTO `ai_mp_widget_rating` (`component_id`,`"+rateCol+"`)"
                +" VALUES ("+c.component_id+","+ 1 +")";                
            } else {
                q = "UPDATE ai_mp_widget_rating set  `"+rateCol+"` = '"+ (rows[0][rateCol] + 1) +"'";
            }
            mysqlConnection.query(q, (err, rows, fields) => {
                console.log('success update ai_mp_widget_rating');
            });
        }            
        else
            console.log('success update ai_mp_widget_rating');
    });

    mysqlConnection.query('SELECT avg(rate_count) as "rate" , count(user_id) FROM ai_mp_user_rating where component_id = ? group by component_id ', [c.component_id],  (err, rows, fields) => {
        if (!err){
            if(rows.length > 0){
                mysqlConnection.query('Update ai_mp_components set rate = ? where id = ?', [Math.round(rows[0].rate), c.component_id],  (err, rows, fields) => {
                    if(!err){
                        res.send({'success' : true , message: "success ai_mp_components rate"} );
                    } else {
                        res.send(err);
                    }
                })
            } else {
                 res.send(err);
                res.send({'success' : true , message: "Comment added"});
            }                 
        } else {
            res.send(err);
        }
    });


});

// Group BY c.user_id 
app.get('/comment/:wid', (req, res) => {
    var q = "Select concat(u.first_name, ' ', u.last_name) as username, c.date ,  c.comment, r.rate_count,u.profile_image  from ai_mp_comments c join ai_mp_user_rating r ON r.component_id = c.component_id and c.user_id = r.user_id join ai_mp_users u ON c.user_id = u.id where c.component_id = ? and ( c.comment != '' or c.comment != null )  Order BY  c.date ASC"
    mysqlConnection.query(q, [req.params.wid], (err, rows, fields) => {
        if (!err){                    
            res.send(rows);
        } else
            res.send(err);
    });
})

app.get('/ratingcount/:wid',(req,res) =>{
    
    q="SELECT * FROM ai_mp_component_rating where component_id = ?;"
    mysqlConnection.query(q, [req.params.wid,req.params.wid], (err, rows, fields) => {
        if (!err){                    
            console.log(rows);
            res.send(rows);

        } else
            res.send(err);
    });
})

//     var query= "update ai_mp_users set username='"+ body.username + 
// "',password = '"+ body.password + "',email = '"+ body.email + 
// "',phone_number ='" + body.phone_number + "',role = '"+ body.role 
// +"',first_name ='"+body.first_name+"',last_name ='"+body.last_name+
// "',last_updated_date='"+last_update_date +"',company_name='"+body.company_name+
// "',address='"+body.address+"',city='"+body.city+"',state='"+
// body.state+"',country='"+body.country+"',zip_code='"+body.zip_code+
// "',profile_image='"+wObject.image+"' where id = '" + body.id + "'";

app.post('/subscribe', (req, res) => {
    var body=req.body;
    console.log(body.email);
    var current_date=moment(Date.now()).format('YYYY-MM-DD HH:mm:ss');
    // var query1= "INSERT INTO `ai_mp_subscribe` ( `email_id`, `time`)"+
    // " VALUES ("+c.email_id+","+currenta_date+")";
   
    // q= "INSERT INTO `ai_mp_widget_rating` (`component_id`,`"+rateCol+"`)"
                // +" VALUES ("+c.component_id+","+ 1 +")"; 

    var query1= "INSERT INTO `ai_mp_subscription` ( `email`,`time`)"+
    " VALUES ('"+body.email+"','"+current_date+"')";
    // var selectQuery= "SELECT * FROM  `ai_mp_subscription` where email = ?";
    // + body.email;

                mysqlConnection.query(query1,(err, rows, fields) => {
                    if(!err){
                        res.send({'success' : true , message: "user subscribed"} );
                    }
                    else{
                        res.send({'success' : false , message: "user subscription failed"} );            
                    }
                })         
    
});   
    // mysqlConnection.query(selectQuery,body.email,(err, rows, fields) => {

    //     if (!err){
    //         console.log(rows[1]);
    //         if(rows ==[]){
    //             mysqlConnection.query(query1,(err, rows, fields) => {
    //                 if(!err){
    //                     res.send({'success' : true , message: "user subscribed"} );
    //                 }
    //                 else{
    //                     res.send({'success' : false , message: "user subscription failed"} );            
    //                 }
    //             })         
    //         }
    //         else{
    //             res.send({'success' : true , message: "user already subscribed"} );
    //         }
            
    //         // res.send();
    //     }   
    //     else{
    //         res.send({'success' : false , message: "user subscription failed"} );
    //     }
    // })
   
    
