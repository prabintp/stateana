
/*
 * GET home page.
 */

exports.index = function(req, res){
    //record_visit(req, res);
    if(req.user)
        res.render('dash',{
            username: req.user['member_id']
        });
    else
        res.render('index');
};
/*
function get_function(err,html){
    console.log(html)
    
}
*/
exports.login = function(req, res){
  
    res.render('login');
};

exports.log = function(req, res){
  
    print_visits(req, res);
};



exports.popular = function(req, res){
    if(req.session.lastPage) {
        res.write('Last page was: ' + req.session.lastPage + '. ');
    }
    res.render('popular');
}



exports.partials = function (req, res) {
    var name = req.params.name;
    res.render('partials/' + name);
};

exports.check_isemail = function (req, res) {
    var mailid = req.body.field;
    console.log(mailid);
    
    require('mongodb').connect(mongourl, function(err, conn){
        conn.collection('members', function(err, coll){
            coll.findOne({
                email:mailid
            }, {}, function(err, doc){
                if(doc){
                         res.send({isUnique:false});
                     
                }
                else{
                    res.send({isUnique:true}); 
                }
            });
        });
    });
  
};

//dash items

exports.dash = function(req, res){
    
    
   if(!req.user)
        res.redirect('/home');
    else
        res.render('dash',{
            username: req.user['first_name']
        }); 
  
    
};

exports.topContent_bk = function(req, res) {
    sql1='SELECT v.ProjectID,v.pageURL as name,count(ProjectID) as count,DateTimeEnter FROM cf4a_VisitLog v  WHERE ProjectID = 1 and date(DateTimeEnter) = CURDATE() group by pageURL order by DateTimeEnter desc';
   // sql1='SELECT v.* FROM cf4a_VisitLog v  WHERE ProjectID = 1';
 console.log(sql1);
    client.query(sql1,
        function (err, results) {
            console.log(results);   
            if (err) throw err;        
                
            res.end(JSON.stringify(results));

        });
              
};

exports.topContent = function(req, res) {
   sql1='SELECT v.ProjectID,v.pageURL as name,count(ProjectID) as count,DateTimeEnter FROM cf4a_VisitLog v  WHERE ProjectID = 1 group by pageURL order by DateTimeEnter desc';
 
  client.query(sql1,
            function (err, results) {
               
                if (err) throw err;
               
    res.end(JSON.stringify(results));

             });
   

             
};

//signup process
exports.signup = function (req, res) {
    if(!req.user)
        res.render('signup',{
            title: 'signup'
        }); 
    else
        res.redirect('/dash');
};

//signup process
exports.signup_submit = function (req, res) {
    if(req.body.email && req.body.password){
       
        /* Connect to the DB and auth */
        require('mongodb').connect(mongourl, function(err, conn){
        
    
            conn.collection('members', function(err, coll){
        
                var member_data = {
                    'ip': req.connection.remoteAddress, 
                    'ts': new Date() ,
                    'email': req.body.email ,
                    'password' : req.body.password,
                    'status':'1',
                    'member_type':'1'
                };
                console.log(member_data);
              coll.insert( member_data, {
                safe:true
            }, function(err){
                
                
                return true;
                
            });
            });
        });
       
    }
   
    if(!req.user){
      
      
      
      
    }
      
    else
        res.redirect('/dash');
};

exports.sites=function(req, res){

    if(!req.user)
        res.redirect('/home');
    else
        res.render('sites',{
            username: req.user['first_name']
        }); 

}
exports.get_sites=function(req, res){
    console.log(req.user);
   sql='SELECT * FROM sa_projects p where member_id=1 order by project_id desc';
 
  client.query(sql,
            function (err, results) {
               
                if (err) throw err;
               
    res.end(JSON.stringify(results));

             });

}
exports.new_sites=function(req, res){

        res.render('new_site',{
            username: req.user['first_name']
        }); 

}

var record_visit = function(req, res){
    /* Connect to the DB and auth */
    require('mongodb').connect(mongourl, function(err, conn){
        conn.collection('ips', function(err, coll){
            /* Simple object to insert: ip address and date */
            object_to_insert = {
                'ip': req.connection.remoteAddress, 
                'ts': new Date()
            };
            /* Insert the object then print in response */
            /* Note the _id has been created */
            coll.insert( object_to_insert, {
                safe:true
            }, function(err){
                console.log(object_to_insert);
                return true;
            /*res.writeHead(200, {'Content-Type': 'text/plain'});
    res.write(JSON.stringify(object_to_insert));
    res.end('\n');*/
            });
        });
    });
}
    
var print_visits = function(req, res){
    /* Connect to the DB and auth */
    require('mongodb').connect(mongourl, function(err, conn){
        conn.collection('ips', function(err, coll){
            coll.find({}, {
                limit:10, 
                sort:[['_id','desc']]
            }, function(err, cursor){
                cursor.toArray(function(err, items){
                    res.writeHead(200, {
                        'Content-Type': 'text/plain'
                    });
                    for(i=0; i<items.length;i++){
                        res.write(JSON.stringify(items[i]) + "\n");
                    }
                    res.end();
                });
            });
        });
    });
}
    
var user_create = function(req, res){
    /* Connect to the DB and auth */
    require('mongodb').connect(mongourl, function(err, conn){
        
    
        conn.collection('members', function(err, coll){
        
            var member_data = {
                'ip': req.connection.remoteAddress, 
                'ts': new Date() ,
                'email': req.body.email ,
                'password' : req.body.password,
                'status':'1',
                'member_type':'1'
            };
            coll.insert( member_data, {
                safe:true
            }, function(err){
                return true;
   
            });
        });
    });
   
}
