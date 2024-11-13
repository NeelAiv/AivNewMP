const mysql = require('mysql2');
const express = require('express');
const bodyparser = require('body-parser');
const fs = require('fs');
const morgan = require('morgan');
const path = require('path');
const rfs = require('rotating-file-stream');
const passwordUtil = require('./services/password');
var moment = require('moment');
var multer = require('multer');
var formidable = require('formidable');
var app = express();
var logDirectory = path.join(__dirname, 'log');
var WidgetDirectory = path.join(__dirname, 'uploads');
// var WidgetDirectory = path.join(__dirname, 'MarketPlace');
var WidgetDirectoryImages = path.join(__dirname, 'uploads', 'images');
var WidgetDirectoryFiles = path.join(__dirname, 'uploads', 'files');
// ensure log directory exists
fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory)
fs.existsSync(WidgetDirectory) || fs.mkdirSync(WidgetDirectory)
fs.existsSync(WidgetDirectoryImages) || fs.mkdirSync(WidgetDirectoryImages)
fs.existsSync(WidgetDirectoryFiles) || fs.mkdirSync(WidgetDirectoryFiles)
var wObject = { 'image': '', 'file_path': '', 'images': '' };
// app.use(express.static('Widgets/images/'));
// app.use(express.static('Widgets/files/'));
app.use('/uploads', express.static('./uploads'));
app.use(express.static('MP/uploads/files/'));
app.use(express.static('MP/uploads/profiles/'));
app.use(express.static('MP/uploads/images/'));
// app.use(express.static('MarketPlace/'));
// app.use('*/AivMarketplace',express.static(path.join(__dirname, 'AivMarketplace')));
app.use(express.static(path.join(__dirname, 'marketplace')));
app.use(express.static('marketplace/'));
app.use('/logs', express.static(__dirname + '/log'))
let passUtil = new passwordUtil();
app.use(function (req, res, next) {
    //Enabling CORS
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, x-client-key, x-client-token, x-client-secret, Authorization");
    next();
});
const http = require('http');
const https = require('https');
// var options = {
//     key: fs.readFileSync('/etc/letsencrypt/live/marketplace.opnbi.com/privkey.pem'),
//     cert: fs.readFileSync('/etc/letsencrypt/live/marketplace.opnbi.com/cert.pem'),
//     ca: fs.readFileSync('/etc/letsencrypt/live/marketplace.opnbi.com/fullchain.pem')
// };
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

var storeWidget = multer.diskStorage({
    destination: function (req, file, callback) {
        console.log(file);
        var temp = '';
        console.log('WidgetDirectoryFiles --> ', WidgetDirectoryFiles);
        console.log('WidgetDirectoryImages --> ', WidgetDirectoryImages);
        callback(null, WidgetDirectoryFiles);
    },
    filename: function (req, file, callback) {
        var fName = Date.now() + '_' + file.originalname;
        if (file.originalname.indexOf('.widget') > -1 || file.originalname.indexOf('.exe')) {
            wObject.file_path = fName;
        } else {
            wObject.image = fName;
        }
        console.log('widget ----> ', wObject, fName)
        callback(null, fName);
    }
});
var upload = multer({ storage: storeWidget })

var storeProfile = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, './uploads/profiles');
    },
    filename: function (req, file, callback) {
        var fName = Date.now() + '_' + file.originalname;
        wObject.image = fName;
        callback(null, fName);
    }
});
var uploadProfile = multer({ storage: storeProfile })

// create a rotating write stream
var accessLogStream = rfs.createStream('access.log', {
    interval: '1d', // rotate daily
    path: logDirectory
});
// setup the logger
app.use(morgan('combined', { stream: accessLogStream }))

app.use(bodyparser.json());
app.all('/*', function (req, res, next) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.setHeader("Access-Control-Max-Age", "3600");
    res.setHeader("Access-Control-Allow-Methods", "PUT, POST, GET, DELETE, PATCH, OPTIONS");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization, Content-disposition");
    res.header("access-control-expose-headers", "content-disposition");
    // res.setHeader("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");
    // res.setHeader("Content-Type", "application/json;charset=utf-8");
    next();
});

var mysqlConnection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'aiv_new_mp',
    multipleStatements: true,
    insecureAuth: true
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

const port = process.env.PORT || 3001;
app.listen(port, () => console.log(`Listening on port ${port}..`));

app.get('/', (req, res) => {
    res.send({ message: 'success' });
});

var cpUpload = upload.fields([{ name: 'widgetFile', maxCount: 8 }])



app.post('/uploadFile', cpUpload, (req, res) => {
    var body = req.body;
    console.log('Widget: ', body);
    var is_public = 0;
    var mysqlTimestamp = moment(Date.now()).format('YYYY-MM-DD HH:mm:ss');

    mysqlConnection.query('SELECT * FROM ai_mp_users where id = ? ', [body.user_id], (err, data, datafields) => {
        if (!err){
            var userObj = data[0];
            if(userObj.role == 'ADMIN' || userObj.role == 'INTERNAL'){
                is_public = 1;
            }
            var q = "INSERT INTO `ai_mp_components` "
            + "(`title`,`category`,`rate`,`description`,`image`,`purchase_option`,`size`,`downloaded`,`refresh`,`no_of_comments`,`download_link`,`details`,`features`,`seller_name`,`file_path`,`price`,`video_url`,`created_date`,`last_update_date`,`user_id`,`sub_category`,`is_public`)"
            + "VALUES ('" + body.title + "', '" + body.category + "', '" + body.rate + "', '" + body.description + "', '" + wObject.images + "', '" + body.purchase_option + "','" + body.size + "', 0,0,0,'" + body.download_link + "','" + body.details + "','" + body.features + "','" + body.seller_name + "','" + wObject.file_path + "'," + body.price + ",'" + body.video_url + "','" + mysqlTimestamp + "','" + mysqlTimestamp + "','" + body.user_id + "','" + body.sub_category + "',"+ is_public +")";
        mysqlConnection.query(q, (err, result) => {
            if (!err) {
                res.send({ message: 'Component uploaded successfully', success: true, widgetId: result.insertId });
            } else {
                res.send({ message: 'Component upload failed', success: false });
            }
        });
        }
    });
   

});

app.post('/uploadFile/:id', cpUpload, (req, res) => {
    if (req.params.id) {
        var id = req.params.id;
        var q = '';
        var body = req.body;
        console.log('edited body  :', body);
        var mysqlTimestamp = moment(Date.now()).format('YYYY-MM-DD HH:mm:ss');
        q = "update ai_mp_components set title='" + body.title + "', rate = '" + body.rate + "', category = '" + body.category + "', sub_category = '" + body.sub_category + "',description='" + body.description + "', image ='" + (wObject.images ? wObject.images + body.image : body.image) + "', purchase_option='" + body.purchase_option + "',size='" + body.size + "',download_link='" + body.download_link + "',details='" + body.details + "',features='" + body.features + "',seller_name='" + body.seller_name + "',file_path='" + (wObject.file_path ? wObject.file_path : body.file_path) + "',price=" + body.price + ",video_url='" + body.video_url + "',last_update_date = '" + mysqlTimestamp + "' where id = '" + id + "'";
        console.log('update  :', q);

        mysqlConnection.query(q, (err, rows, fields) => {
            if (!err) {
                console.log('err : ', err);
                console.log('rows : ', rows);
                console.log('fields : ', fields);
                res.send({ message: 'success' });
            } else {
                res.send({ message: "Update failed" });
            }
        });
    }
});



app.get('/forgetpassword/:email', (req, res) => {
    console.log(req.params.email)
    mysqlConnection.query('SELECT * FROM ai_mp_users where email = ?', [req.params.email], (err, rows, fields) => {
        if (!err) {

            if (rows.length > 0) {
                obj = rows[0]
                if (passUtil.validPassword(obj.password, obj.hash_key, obj.password_hash)) {
                    res.send({ 'success': true, 'data': obj });
                }

                var mailOptions = {
                    from: 'activeintelligencebi@gmail.com',
                    to: req.params.email,
                    subject: 'Change password',
                    text: 'your password is ' + obj.password + ''
                };

                transporter.sendMail(mailOptions, function (error, info) {
                    if (error) {
                        res.send({ 'success': false, 'message': "Email Send failed", 'data': {} });
                        console.log(error)
                    } else {
                        res.send({ response: "Success" });
                        console.log(info)
                    }
                });
            }
            else {
                res.send({ 'success': false, 'message': "Email Not found.", 'data': {} });
            }
        } else{
        res.send({ 'success': false, 'message': "No data found!", 'data': {} });
        }
        console.log(err)
    })
});

app.post('/authenticate', (req, res) => {
    var user = req.body;
    // and password = ?, , user.password
    mysqlConnection.query('SELECT * FROM ai_mp_users where username = ?  ', [user.username], (err, rows, fields) => {
        if (!err && rows.length) {
            obj = rows[0];
            if (passUtil.validPassword(user.password, obj.hash_key, obj.password_hash)) {
                res.send({ 'success': true, 'message': "Logged in successfully.", 'data': obj });
            } else {
                res.send({ 'success': false, 'message': "Username/Password is wrong.", 'data': {} });
            }
        }
        else {
            res.send({ 'success': false, 'message': "Username/Password is wrong.", 'data': {} });
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

app.get('/getAll', (req, res) => {
    mysqlConnection.query('SELECT * FROM ai_mp_users', (err, rows, fields) => {
        if (!err)
            res.send(rows);
        else
            res.send({ 'success': false, 'message': "No Users found!", 'data': {} });
    })
});

function exist(table, value, callback) {
    var q = 'select * from ai_mp_users where email = ?';
    mysqlConnection.query(q, [value], (err, rows, fields) => {
        callback(err, rows, fields);
    });
}


app.post('/createUser', (req, res) => {
    var user = req.body;
    exist('ai_mp_users', user.username, function (err, rows, fields) {
        if (!err) {
            if (rows.length == 0) {
                var mysqlTimestamp = moment(Date.now()).format('YYYY-MM-DD HH:mm:ss');
                passwordObj = passUtil.setPassword(user.password);
                console.log(passwordObj);
                var username = user.username, email = user.username, phone_number = user.phone_number,
                    created_date = mysqlTimestamp, first_name = user.firstName, last_name = user.lastName, last_updated_date = mysqlTimestamp;

                buff = new Buffer(user.password);
                let base64dataPassword = buff.toString('base64');
                var q = "INSERT INTO `ai_mp_users` "
                    + " (`username`, `password`, `email`, `phone_number`, `role`, `created_date`, `first_name`, `last_name`, `last_updated_date`, `password_hash`, `hash_key`) "
                    + " VALUES ('" + username + "', '" + base64dataPassword + "', '" + email + "',  '" + phone_number + "',  'GUEST', '" + created_date + "',  '" + first_name + "',  '" + last_name + "',  '" + last_updated_date + "', '" + passwordObj.hash + "', '" + passwordObj.key + "' )";

                mysqlConnection.query(q, (err, rows, fields) => {
                    if (!err)
                        res.send({ 'success': true, 'message': "User registered." });
                    else
                        res.send({ 'success': false, message: "User registration failed!" });
                })

            } else {
                res.send({ 'success': false, 'message': "Email address already exists." });
            }
        }
        else {
            res.send({ 'success': false, 'message': "Something went wronf while registering user!" });
        }
    });
});



app.post('/user', (req, res) => {
    console.log(req.body)
    var username = req.body.username.username ? req.body.username.username : req.body.username;
    mysqlConnection.query('SELECT * FROM ai_mp_users where username = ? ', [username], (err, rows, fields) => {
        if (!err)
            res.send(rows);
        else
            res.send(err);
    })
});

app.post('/user/is', (req, res) => {
    console.log(req.body.username);
    mysqlConnection.query('SELECT * FROM ai_mp_users where username = ? ', [req.body.username], (err, rows, fields) => {
        if (!err)
            res.send(rows);
        else
            res.send(err);
    })
});


app.get('/getById/:id', (req, res) => {
    mysqlConnection.query('SELECT * FROM ai_mp_users where id = ? ', [req.params.id], (err, rows, fields) => {
        if (!err)
            res.send(rows);
        else
            res.send(err);
    })
});

var profileUpload = uploadProfile.fields([{ name: 'profile_image', maxCount: 1 }])

app.post('/updateUser', profileUpload, (req, res) => {
    var body = req.body;
    console.log('user data : ', body)
    var last_update_date = moment(Date.now()).format('YYYY-MM-DD HH:mm:ss');

    if (body.newpassword != null || body.newpassword != '') {
        mysqlConnection.query('SELECT * FROM ai_mp_users where username = ?  ', [body.username], (err, rows, fields) => {
            if (!err) {
                obj = rows[0];
                if (passUtil.validPassword(body.password, obj.hash_key, obj.password_hash)) {
                    console.log("old password is correct");
                    let passwordObj = {};
                    if (body.newpassword) {
                        passwordObj = passUtil.setPassword(body.newpassword);
                        const isObjNotNull = false


                    }
                    var query = "update ai_mp_users set";
                    if (body.username && body.username != 'null') {
                        isObjNotNull = true;
                        query = query.concat(' username= "' + body.username + '"');
                    }
                    if (passwordObj && passwordObj.hash && passwordObj.hash != 'null') {
                        if (isObjNotNull) {
                            query = query.concat(',');
                        }
                        isObjNotNull = true;
                        query = query.concat(' password_hash = ' + passwordObj.hash)
                    }
                    if (passwordObj && passwordObj.key && passwordObj.key != 'null') {
                        if (isObjNotNull) {
                            query = query.concat(',');
                        }
                        isObjNotNull = true;
                        query = query.concat(' hash_key =' + passwordObj.key)
                    }
                    if (body.email && body.email != 'null') {
                        if (isObjNotNull) {
                            query = query.concat(',');
                        }
                        isObjNotNull = true;
                        query = query.concat(' email = "' + body.email + '"');
                    }
                    if (body.phone_number && body.phone_number != 'null') {
                        if (isObjNotNull) {
                            query = query.concat(',');
                        }
                        isObjNotNull = true;
                        query = query.concat(' phone_number =' + body.phone_number)
                    }
                    if (body.role && body.role != 'null') {
                        if (isObjNotNull) {
                            query = query.concat(',');
                        }
                        isObjNotNull = true;
                        query = query.concat(' role ="' + body.role + '"')
                    }
                    if (body.first_name && body.first_name != 'null') {
                        if (isObjNotNull) {
                            query = query.concat(',');
                        }
                        isObjNotNull = true;
                        query = query.concat(' first_name ="' + body.first_name + '"')
                    }
                    if (body.last_name && body.last_name != 'null') {
                        if (isObjNotNull) {
                            query = query.concat(',');
                        }
                        isObjNotNull = true;
                        query = query.concat(' last_name ="' + body.last_name + '"')
                    }
                    if (last_update_date && last_update_date != 'null') {
                        if (isObjNotNull) {
                            query = query.concat(',');
                        }
                        isObjNotNull = true;
                        query = query.concat(' last_updated_date ="' + last_update_date + '"')
                    }
                    if (body.company_name && body.company_name != 'null') {
                        if (isObjNotNull) {
                            query = query.concat(',');
                        }
                        isObjNotNull = true;
                        query = query.concat(' company_name ="' + body.company_name + '"')
                    }
                    if (body.address && body.address != 'null') {
                        if (isObjNotNull) {
                            query = query.concat(',');
                        }
                        isObjNotNull = true;
                        query = query.concat(' address ="' + body.address + '"')
                    }
                    if (body.city && body.city != 'null') {
                        if (isObjNotNull) {
                            query = query.concat(',');
                        }
                        isObjNotNull = true;
                        query = query.concat(' city ="' + body.city + '"')
                    }
                    if (body.state && body.state != 'null') {
                        if (isObjNotNull) {
                            query = query.concat(',');
                        }
                        isObjNotNull = true;
                        query = query.concat(' state ="' + body.state + '"')
                    }
                    if (body.country && body.country != 'null') {
                        if (isObjNotNull) {
                            query = query.concat(',');
                        }
                        isObjNotNull = true;
                        query = query.concat(' country ="' + body.country + '"')
                    }
                    if (body.zip_code && body.zip_code != 'null') {
                        if (isObjNotNull) {
                            query = query.concat(',');
                        }
                        isObjNotNull = true;
                        query = query.concat(' zip_code ="' + body.zip_code + '"')
                    }
                    if (wObject.image && wObject.image != 'null') {
                        if (isObjNotNull) {
                            query = query.concat(',');
                        }
                        query = query.concat(' profile_image ="' + wObject.image + '"')
                    }

                    query = query.concat(' where id = ' + body.id);
                    console.log('user query : ', query);
                    mysqlConnection.query(query, [req.params.id], (err, rows, fields) => {
                        if (!err) {
                            res.send({ 'success': true, 'message': "user details updated" });
                        }
                        else {
                            console.log(err);
                            res.send({ 'success': false, 'message': "error while updating user details" });
                        }
                    })
                }
                else {
                    res.send({ 'success': false, 'message': "Old Password is wrong." });
                }
            }
            else{
                res.send({ 'success': false, 'message': "Something went wrong while update user" });
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
    mysqlConnection.query('DELETE FROM ai_mp_users where id = ? ', [req.params.id], (err, rows, fields) => {
        if (!err)
            res.send(rows);
        else
            res.send({ 'success': false, 'message': "User remove failed!" });
    })
});

// get All widgets 
app.get('/widgets', (req, res) => {
    mysqlConnection.query('SELECT * FROM ai_mp_components where is_public=1', (err, rows, fields) => {
        if (!err) {
            res.send(rows);
        } else {
            res.send({ 'success': false, 'message': "Something went wrong while get all public widgets!" });
        }
    })
});

app.get('/unapprovewidgets', (req, res) => {
    const userRole = req.body.userRole;
    
    if (userRole !== 'SUPER_ADMIN') {
        return res.status(403).send({ 'success': false, 'message': "Access denied. Only SUPER_ADMIN can view unapproved widgets." });
    }
    
    mysqlConnection.query('SELECT * FROM ai_mp_components where is_public=0', (err, rows, fields) => {
        if (!err) {
            res.send(rows);
        } else {
            res.send({ 'success': false, 'message': "Something went wrong while get unapproved widgets!" });
        }
    })
});

// get a widgets with id
app.get('/widget/:id', (req, res) => {
    wObject.images = '';
    mysqlConnection.query('SELECT * FROM ai_mp_components where id = ?', [req.params.id], (err, rows, fields) => {
        if (!err)
            res.send({ 'success': true, 'data': rows, 'message': "component updated successfully." });
        else
            res.send({ 'success': false, 'data': [], 'message': "component update failed" });
    })
});

// get a widgets with user id
app.get('/widget/user/:id', (req, res) => {
    mysqlConnection.query('SELECT * FROM ai_mp_components where user_id = ?', [req.params.id], (err, rows, fields) => {
        if (!err)
            res.send(rows);
        else
        res.send({ 'success': false, 'data': [], 'message': "Something went wrong while get widget by user!" });
    })
});

// upload widget 
app.post('/uploadWidget', (req, res) => {
    console.log(req.body);
    var w = req.body;
    var is_public = false;
        mysqlConnection.query('SELECT * FROM ai_mp_users where id = ? ', [w.user_id], (err, data, datafields) => {
            if (!err)
                {
                    if(data[0].role == 'ADMIN' || data[0].role == "INTERNAL"){
                        is_public = true;  
                    }
                    var sql = "INSERT INTO ai_mp_components (`title`,`type`,`rate`,`description`,`image`,`purchase_option`,`size`, "
                    + " `downloaded`,`refresh`,`no_of_comments`,`download_link`,`user_id`,'is_public' ) "
                    + " VALUES ('" + w.title + "','" + w.type + "','" + w.rate + "','" + w.description + "','" + w.images + "','" + w.purchase_option + "','" + w.size + "','"
                    + w.downloaded + "','" + w.refresh + "','" + w.no_of_comments + "','" + w.download_link + "','" + w.user_id + "','" + is_public + "')";
                    mysqlConnection.query(sql, (err, rows, fields) => {
                        if (!err)
                            res.send(rows);
                        else
                            res.send(err);
                    }); 
                }
            else
               { res.send(err);}
        })
   
});

app.get('/widgetDetails/:id', (req, res) => {
    mysqlConnection.query('SELECT * FROM ai_mp_components where id = ?', [req.params.id], (err, rows, fields) => {
        if (!err)
            res.send(rows);
        else
            res.send(err);
    })
});

app.put('/approveWidget/:id', (req, res) => {

    const userRole = req.body.userRole; // Retrieve role from the request body

    if (userRole !== 'SUPER_ADMIN') {
        return res.status(403).send({ 'success': false, 'message': "Access denied. Only SUPER_ADMIN can approve widgets." });
    }

    // const widgetId = parseInt(req.params.id, 10);

    // if (isNaN(widgetId)) {
    //     return res.status(400).send({ 'success': false, 'message': "Invalid widget ID." });
    // }

    let query = "update ai_mp_components set is_public = true where id ="+req.params.id;
    mysqlConnection.query(query, [req.params.id], (err, rows, fields) => {
        if (!err) {
            res.send({ 'success': true, 'message': "Widget has been approved" });
        }
        else {
            console.log(err);
            res.send({ 'success': false, 'message': "error while approve widget" });
        }
    })
})
app.put('/update/:id', (req, res) => {
    console.log('req body :', req.body);
    const body = req.body;

    let isObjNotNull = false;
    var mysqlTimestamp = moment(Date.now()).format('YYYY-MM-DD HH:mm:ss');

    var query = "update ai_mp_components set";
    if (body.title && body.title != 'null') {
        isObjNotNull = true;
        query = query.concat(' title= "' + body.title + '"');
    }
    if (body.category && body.category && body.category != 'null') {
        if (isObjNotNull) {
            query = query.concat(',');
        }
        isObjNotNull = true;
        query = query.concat(' category =  "' + body.category + '"')
    }
    if (body.rate && body.rate && body.rate != 'null') {
        if (isObjNotNull) {
            query = query.concat(',');
        }
        isObjNotNull = true;
        query = query.concat(' rate = ' + body.rate)
    }
    if (body.description && body.description && body.description != 'null') {
        if (isObjNotNull) {
            query = query.concat(',');
        }
        isObjNotNull = true;
        query = query.concat(' description =  "' + body.description + '"')
    }
    if (body.image && body.image && body.image != 'null') {
        if (isObjNotNull) {
            query = query.concat(',');
        }
        isObjNotNull = true;
        query = query.concat(' image = "' + body.image + '"')
    }
    if (body.purchase_option && body.purchase_option && body.purchase_option != 'null') {
        if (isObjNotNull) {
            query = query.concat(',');
        }
        isObjNotNull = true;
        query = query.concat(' purchase_option = "' + body.purchase_option + '"')
    }
    if (body.size && body.size && body.size != 'null') {
        if (isObjNotNull) {
            query = query.concat(',');
        }
        isObjNotNull = true;
        query = query.concat(' size = ' + body.size)
    }
    if (body.downloaded && body.downloaded && body.downloaded != 'null') {
        if (isObjNotNull) {
            query = query.concat(',');
        }
        isObjNotNull = true;
        query = query.concat(' downloaded = ' + body.downloaded)
    }
    if (body.refresh && body.refresh && body.refresh != 'null') {
        if (isObjNotNull) {
            query = query.concat(',');
        }
        isObjNotNull = true;
        query = query.concat(' refresh = ' + body.refresh)
    }
    if (body.no_of_comments && body.no_of_comments && body.no_of_comments != 'null') {
        if (isObjNotNull) {
            query = query.concat(',');
        }
        isObjNotNull = true;
        query = query.concat(' no_of_comments = ' + body.no_of_comments)
    }
    if (body.download_link && body.download_link && body.download_link != 'null') {
        if (isObjNotNull) {
            query = query.concat(',');
        }
        isObjNotNull = true;
        query = query.concat(' download_link = "' + body.download_link + '"')
    }
    if (body.details && body.details && body.details != 'null') {
        if (isObjNotNull) {
            query = query.concat(',');
        }
        isObjNotNull = true;
        query = query.concat(' details = "' + body.details + '"')
    }
    if (body.features && body.features && body.features != 'null') {
        if (isObjNotNull) {
            query = query.concat(',');
        }
        isObjNotNull = true;
        query = query.concat(' features = "' + body.features + '"')
    }
    if (body.seller_name && body.seller_name && body.seller_name != 'null') {
        if (isObjNotNull) {
            query = query.concat(',');
        }
        isObjNotNull = true;
        query = query.concat(' seller_name = "' + body.seller_name + '"')
    }
    if (body.comment_id && body.comment_id && body.comment_id != 'null') {
        if (isObjNotNull) {
            query = query.concat(',');
        }
        isObjNotNull = true;
        query = query.concat(' comment_id = "' + body.comment_id + '"')
    }
    if (body.file_path && body.file_path && body.file_path != 'null') {
        if (isObjNotNull) {
            query = query.concat(',');
        }
        isObjNotNull = true;
        query = query.concat(' file_path = "' + body.file_path + '"')
    }
    if (body.price && body.price && body.price != 'null') {
        if (isObjNotNull) {
            query = query.concat(',');
        }
        isObjNotNull = true;
        query = query.concat(' price = ' + body.price)
    }
    if (body.video_url && body.video_url && body.video_url != 'null') {
        if (isObjNotNull) {
            query = query.concat(',');
        }
        isObjNotNull = true;
        query = query.concat(' video_url = "' + body.video_url + '"')
    }
    if (body.created_date && body.created_date && body.created_date != 'null') {
        if (isObjNotNull) {
            query = query.concat(',');
        }
        isObjNotNull = true;
        query = query.concat(' created_date = "' + moment(body.created_date).format('YYYY-MM-DD HH:mm:ss') + '"')
    }
    if (body.last_update_date && body.last_update_date && body.last_update_date != 'null') {
        if (isObjNotNull) {
            query = query.concat(',');
        }
        isObjNotNull = true;
        query = query.concat(' last_update_date = "' + mysqlTimestamp + '"')
    }
    if (body.user_id && body.user_id && body.user_id != 'null') {
        if (isObjNotNull) {
            query = query.concat(',');
        }
        isObjNotNull = true;
        query = query.concat(' user_id = "' + body.user_id + '"')
    }
    if (body.sub_category && body.sub_category && body.sub_category != 'null') {
        if (isObjNotNull) {
            query = query.concat(',');
        }
        isObjNotNull = true;
        query = query.concat(' sub_category = "' + body.sub_category + '"')
    }
    if (body.main_page && body.main_page && body.main_page != 'null') {
        if (isObjNotNull) {
            query = query.concat(',');
        }
        isObjNotNull = true;
        query = query.concat(' main_page = ' + body.main_page + '"')
    }


    query = query.concat(' where id = ' + body.id);
    mysqlConnection.query(query, [req.params.id], (err, rows, fields) => {
        if (!err) {
            res.send({ 'success': true, 'message': "Widget has been updated" });
        }
        else {
            console.log(err);
            res.send({ 'success': false, 'message': "error while updating user details" });
        }
    })

    //need change
    // mysqlConnection.query('Update ai_mp_components set '+col+' = '+val+' where id = ?', [req.params.id],  (err, rows, fields) => {
    //     if (!err)
    //         res.send(rows);
    //     else
    //         res.send(err);
    // })
});

app.delete('/delete/:id', (req, res) => {
    mysqlConnection.query('Delete FROM ai_mp_components where id = ?', [req.params.id], (err, rows, fields) => {
        if (!err)
            res.send({ 'success': true, data: rows, 'message': "Component deleted." });
        // res.send({success: true, data : rows });
        else
            res.send({ 'success': false, data: rows, 'message': "Component delete failed." });
    })
});

app.delete('/delete/:component_id/:comment_id', (req, res) => {
    mysqlConnection.query('Delete FROM ai_mp_components where id = ?', [req.params.id], (err, rows, fields) => {
        if (!err)
            res.send({ 'success': true, data: rows, 'message': "Component deleted." });
        // res.send({success: true, data : rows });
        else
            res.send({ 'success': false, data: rows, 'message': "Component delete failed." });
    })
});

app.get('/getWidgetJson/:id', (req, res) => {
    mysqlConnection.query('SELECT * FROM ai_mp_components where id = ?', [req.params.id], (err, rows, fields) => {
        if (!err) {
            var fpath = rows[0].file_path;
            if (fpath != null && fpath != undefined && fpath != "") {
                var fileName = path.basename(fpath);
                // var files = fs.createReadStream(fpath);
                res.writeHead(200, { 'Content-disposition': 'attachment; filename=' + fileName + '' }); //here you can add more headers
                fs.createReadStream(fpath).pipe(res);
            }
        }
        else
            res.send(err);
    })
});

app.post('/makeComment',async (req, res) =>  {
    addComment(req,res);
});
async function addComment(req, res){

    var c = req.body;
    var rateCol = '';
    var q = '';
    if (c.rate == 1) {
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

    
        if (c.id > 0) {
            //Already commented
            var mysqlTimestamp = moment(Date.now()).format('YYYY-MM-DD HH:mm:ss');
            var updateQuery = "UPDATE  ai_mp_comments  SET comment = '" + c.comment + "',date = '" + mysqlTimestamp + "', rating = '" +c.rate +"' WHERE id="+c.id;
            mysqlConnection.query(updateQuery, (err, rows, fields) => {
                    if (err) {
                        console.log('makecomment ', err);
                        res.send({ 'success': false, message: "Failed! Comment not added" });

                    } else {
                        console.log('success');
                        res.send({ 'success': true, message: "Comment updated successfully" });
                    }
                })

           

        }
        else {
            // add new comment
            var mysqlTimestamp = moment(Date.now()).format('YYYY-MM-DD HH:mm:ss');
            var insertQuery = "INSERT INTO `ai_mp_comments` (`user_id`, `comment`, `date`, `component_id`,`rating`)" +
            " VALUES ('" + c.user_id + "','" + c.comment + "','" + mysqlTimestamp + "','" + c.component_id + "'," + c.rate + ")";

            mysqlConnection.query(insertQuery, (err, rows, fields) => {
                    if (err) {
                        console.log('makecomment ', err);
                        res.send({ 'success': false, message: "Failed! Comment not added" });

                    } else {
                        console.log('success');
                        res.send({ 'success': true, message: "Comment added  successfully" });
                    }
                })

        }

    //     await mysqlConnection.query("select * from ai_mp_comments where component_id = ? and user_id = ?", [c.component_id, c.user_id], (err, rows, fields) => {
    // })

    // await mysqlConnection.query('SELECT * FROM ai_mp_component_rating where component_id = ?', [c.component_id], (err, rows, fields) => {
    //     if (!err) {
    //         if (rows.length == 0) {
    //             q = "INSERT INTO `ai_mp_component_rating` (`component_id`,`" + rateCol + "`)"
    //                 + " VALUES (" + c.component_id + "," + 1 + ")";
    //         } else {
    //             q = "UPDATE ai_mp_component_rating set  `" + rateCol + "` = '" + (rows[0][rateCol] + 1) + "'";
    //         }
    //         mysqlConnection.query(q, (err, rows, fields) => {
    //             console.log('success update ai_mp_component_rating');
    //         });
    //     }
    //     else
    //         console.log('success update ai_mp_component_rating');
    // });

    // await mysqlConnection.query('SELECT avg(rating) as "rate" , count(user_id) FROM ai_mp_comments where component_id = ? group by component_id ', [c.component_id], (err, rows, fields) => {
    //     if (!err) {
    //         if (rows.length > 0) {
    //             mysqlConnection.query('Update ai_mp_components set rate = ? where id = ?', [Math.round(rows[0].rate), c.component_id], (err, rows, fields) => {
    //                 if (!err) {
    //                     res.send({ 'success': true, message: "success ai_mp_components rate" });
    //                 } else {
    //                     res.send(err);
    //                 }
    //             })
    //         } else {

    //             res.send({ 'success': true, message: "Comment added" });
    //         }
    //     } else {
    //         res.send(err);
    //     }
    // });

}


app.post('/deleteComment',async (req, res) =>  {
    removeComment(req,res);
});
async function removeComment(req,res){
    var c = req.body;
    await mysqlConnection.query("select * from ai_mp_comments where id = ?", [c.id], (err, rows, fields) => {
        if (rows.length > 0) {
            //Already commented
            var deleteQuery = "DELETE from `ai_mp_comments` WHERE id = ?";
            mysqlConnection.query(deleteQuery,[c.id], (err, rows, fields) => {
                    if (err) {
                        console.log('delete comment failed', err);
                        res.send({ 'success': false, message: "Failed! Comment delete failed" });
                    } else {
                        console.log('delete comment success');
                        res.send({ 'success': true, message: "Comment deleted  successfully" });
                    }
                })
        }
        else {
            console.log('delete comment failed', err);
        }
    })
}
// Group BY c.user_id 
app.get('/comment/:wid', (req, res) => {
    var q = "Select u.id as user_id , concat(u.first_name, ' ', u.last_name) as username,c.id, c.date ,  c.comment, c.rating,u.profile_image  from ai_mp_comments c join ai_mp_users u ON c.user_id = u.id where c.component_id = ? and ( c.comment != '' or c.comment != null )  Order BY  c.date ASC"
    mysqlConnection.query(q, [req.params.wid], (err, rows, fields) => {
        if (!err) {
            res.send(rows);
        } else
            res.send(err);
    });
})

app.get('/ratingcount/:wid', (req, res) => {

    q = "SELECT component_id,rating, COUNT(rating) as count FROM ai_mp_comments WHERE component_id = ? GROUP BY rating order by rating;"
    mysqlConnection.query(q, [req.params.wid, req.params.wid], (err, rows, fields) => {
        if (!err) {
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
    var body = req.body;
    console.log(body.email);
    var current_date = moment(Date.now()).format('YYYY-MM-DD HH:mm:ss');
    // var query1= "INSERT INTO `ai_mp_subscribe` ( `email_id`, `time`)"+
    // " VALUES ("+c.email_id+","+currenta_date+")";

    // q= "INSERT INTO `ai_mp_widget_rating` (`component_id`,`"+rateCol+"`)"
    // +" VALUES ("+c.component_id+","+ 1 +")"; 

    var query1 = "INSERT INTO `ai_mp_subscription` ( `email`,`time`)" +
        " VALUES ('" + body.email + "','" + current_date + "')";
    // var selectQuery= "SELECT * FROM  `ai_mp_subscription` where email = ?";
    // + body.email;

    mysqlConnection.query(query1, (err, rows, fields) => {
        if (!err) {
            res.send({ 'success': true, message: "user subscribed" });
        }
        else {
            res.send({ 'success': false, message: "user subscription failed" });
        }
    })

});

app.get("/downloadWidget/:fileName", (req, res) => {
    if (fs.existsSync(path.join(WidgetDirectoryFiles, req.params.fileName))) {
        const file = path.resolve(WidgetDirectoryFiles, decodeURI(req.params.fileName));
        //No need for special headers
        if(req.params.fileName.indexOf('.exe')> -1){
            res.setHeader('Content-disposition', 'attachment; filename='+req.params.fileName);
            //filename is the name which client will see. Don't put full path here.
            
            // res.setHeader('Content-type', 'application/x-msdownload');      //for exe file
            
            var file1 = fs.createReadStream(path.join(WidgetDirectoryFiles, req.params.fileName));
            //replace filepath with path of file to send
            file1.pipe(res);
            //send file
        }
        else{
        res.download(file);
        }
    } else {
        res.send({ 'success': false, message: "Unable to download the file." });
    }

})


var storeWidgetImages = multer.diskStorage({
    destination: function (req, file, callback) {
        console.log(file);
        callback(null, WidgetDirectoryImages);
    },
    filename: function (req, file, callback) {
        var fName = Date.now() + '_' + file.originalname;
        wObject.images += fName + ",";
        console.log('widget ----> ', wObject, fName)
        callback(null, fName);
    }
});
var uploadWidgetImages = multer({ storage: storeWidgetImages })

app.post('/uploadWidgetImages/:widgetId', uploadWidgetImages.array('uploadedImages[]', 10), (req, res, err) => {

    if (err) {
        console.log('error');
        console.log(err);
    }

    var file = req.files;
    console.log('files : ', file);
    res.end();
});

app.get('*', (req, res) => {

    res.sendFile(path.resolve('marketplace/index.html'));

});

http.createServer(app).listen(80)
// https.createServer(options, app).listen(443);
