
/**
 * 
 * prabintp@aol.com
 * last updated oct 24 2013
 */
//Module dependencies
var express = require('express'),
routes = require('./routes'),
api = require('./routes/api'),
http = require('http'),
path = require('path'),
//clientSessions = require("client-sessions"),
mysql = require('mysql'),
passport = require('passport'),
LocalStrategy = require('passport-local').Strategy;
  
//MySQL

var sqlInfo = {
    host: 'localhost', 
    user: 'root',
    password: '', 
    database: 'sa'
}

/*
var sqlInfo = {
  host: 'ap01-user01.c0ye1hvnkw6z.ap-southeast-1.rds.amazonaws.com', 
  user: 'uHJnIOAz4pfz8',
  password: 'p1ER20bCzfHjp', 
  database: 'd14a406252e744680aca10c5e2ca8026c',
  port:3306
}
*/
/*
if(process.env.VCAP_SERVICES){
	var menv = JSON.parse(process.env.VCAP_SERVICES);
	var mysql = menv['mysql-5.1'][0]['credentials'];
	
	var sqlInfo = {
  host: 'ap01-user01.c0ye1hvnkw6z.ap-southeast-1.rds.amazonaws.com', 
  user: 'uHJnIOAz4pfz8',
  password: 'p1ER20bCzfHjp', 
  database: 'd14a406252e744680aca10c5e2ca8026c',
  port:3306
}
	
	
	}else{
		
	var sqlInfo = {
    host: 'localhost', 
    user: 'root',
    password: 'exalt', 
    database: 'sa'
}
		
		}
*/		
		

	

global.client = mysql.createConnection(sqlInfo);

client.connect();
  

  

var app = module.exports = express();

//connect to mongodb

if(process.env.VCAP_SERVICES){
    var env = JSON.parse(process.env.VCAP_SERVICES);
    var mongo = env['mongodb-1.8'][0]['credentials'];
}
else{
    var mongo = {
        "hostname":"localhost",
        "port":27017,
        "username":"",
        "password":"",
        "name":"",
        "db":"sa"
    }
}
var generate_mongo_url = function(obj){
    obj.hostname = (obj.hostname || 'localhost');
    obj.port = (obj.port || 27017);
    obj.db = (obj.db || 'test');
    if(obj.username && obj.password){
        return "mongodb://" + obj.username + ":" + obj.password + "@" + obj.hostname + ":" + obj.port + "/" + obj.db;
    }
    else{
        return "mongodb://" + obj.hostname + ":" + obj.port + "/" + obj.db;
    }
}
global.mongourl = generate_mongo_url(mongo);
    
//mongodb connect ends     

/**
 * Configuration
 */

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.static(path.join(__dirname, 'public')));

app.use(express.cookieParser("secret"));
app.use(express.session({
    secret: 'keyboard cat'
}));
app.use(passport.initialize());
app.use(passport.session());

app.use(app.router);
 



passport.use(new LocalStrategy(
 
    function(username, password, done) {
        
        return check_auth_user(username,password,done);
      
    }
 
    ));
  


  

// development only
if (app.get('env') === 'development') {
    app.use(express.errorHandler());
}

// production only
if (app.get('env') === 'production') {
// TODO
}



/**
 * routes start---------------------------------------------------------------
 */
// home page views
app.get('/home', routes.index);
app.get('/logout', function(req, res){
  
    req.logout();
    res.redirect('/home');
});

//sites
app.get('/sites',routes.sites);
app.get('/sites/new',routes.new_sites);
app.get('/sites/get_sites',routes.get_sites);

//browser
app.get('/browser',routes.sites);


app.get('/partials/:name', routes.partials);
// JSON API
app.get('/api/name', api.name);
// redirect all others to the index (HTML5 history)
app.post('/login',
    passport.authenticate('local', {
        successRedirect: '/dash',
        failureRedirect: '/home'
    })
    );
//to project dashboard
app.get('/dash',routes.dash);
//to project dashboard
app.get('/signup',routes.signup);
//to project dashboard
app.post('/signup_submit',routes.signup_submit);
//to test mongodb not ness
app.get('/log',routes.log);
//to project dashboard
app.get('/popular',routes.popular);

/**
 * ajax calls starts
 */
//get todays top content json ajax
app.get('/dash/today_top_content',routes.topContent);
app.post('/ischeck/email',routes.check_isemail);
/**
 * ajax calls ends
 */
// redirect all others to the index (HTML5 history)
app.get('*', routes.index);
/**
 * routes end---------------------------------------------------------------------
 */


/**
 * Start Server
 */

http.createServer(app).listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
});


function check_auth_user(username,password,done,public_id){
    var sql="SELECT * FROM members WHERE email = '"+ username +"' and password = '"+ password +"' limit 1";
    console.log(sql);
    client.query(sql,
        function (err,results) {
               
            if (err) throw err;
    
            if(results.length > 0){
        
                var res=results[0];   
                passport.serializeUser(function(res, done) {
                    done(null,res);
                });

                passport.deserializeUser(function(id, done) {
                    done(null,res);
  
                });
                //console.log(JSON.stringify(results));
                //console.log(results[0]['member_id']);
                return done(null, res);
            }else{
                return done(null, false); 
        
            }
    
        });
    
}

    
