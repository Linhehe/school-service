var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/stu');
require('../models/Students');
require('../models/Teachers');

var Student = mongoose.model('Student');
var Teacher = mongoose.model('Teacher');

Student.remove().exec();
Teacher.remove().exec();

var stu1 = new Student({name:'stu1', sex:'man', password:'123', registerPhone:'13726224321', ID_card:'456'});
var teacher1 = new Teacher({name:'teacher1', abstract:'He is a teacher', mobilePhone:'13726224126', QQ:'123456789', email:'123456789@qq.com', address:'in the school'});

stu1.save();
teacher1.save();

var AV = require('avoscloud-sdk').AV;
AV.initialize("mu443zud8ylc3jcce2z1r6gmxks1g3lpflwp1awklu1xr91m", "ru4c00901eb62p0k8qea7xvxdtuqs3qfrm7zn9ztz41edjml");

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

// 登陆
router.get('/sessions', function(req, res, next){
  if(req.query.usertype == '学生')
  {
    //
    Student.findOne({name: req.query.username, password: req.query.password}, function(err,doc){
      //
      if(err != null){
        next(err);
      }
      else{
        res.json(doc);
        console.log(req.query.username+req.query.password)
      }
    });
  }
  if(req.query.usertype == '教师')
  {
    //
    Teacher.findOne({name: req.query.username, password: req.query.password}, function(err,doc){
      //
      if(err != null){
        next(err);
      }
      else{
        res.json(doc);
      }
    });
  }
});

// 短信验证(发送)
router.get('/code', function(req,res,next){
  console.log('phone:'+req.query.phone);
  AV.Cloud.requestSmsCode({
    mobilePhoneNumber: req.query.phone,
    name: '短信验证',
    op: '手机验证',
    ttl: 5
  }).then(function(){
    //发送成功
    console.log('success');
  }, function(err){
    //发送失败
    console.log('error');
  });
});

// 短信验证(接收)
router.get('/codetwo', function(req,res,next){
  console.log(req.query.codes);
  console.log(req.query.phone);
  AV.Cloud.verifySmsCode(req.query.codes, req.query.phone).then(function(){
    //验证成功
    console.log('验证成功');
  }, function(err){
    //验证失败
    console.log('验证失败'+req.query.codes);
  });
});

// 注册
router.post('/sessions', function(req,res,next){
  console.log(req.body);
  Student.findOne({registerPhone: req.body.registerPhone}, function(err,doc){
    if(err != null){
      next(err);
    }
    else{
      if(doc != null){
        // 注册的手机号码已存在，不能再次注册
        console.log('find!!');
        res.send('phone');
      }else{
        Student.findOne({ID_card: req.body.ID_card}, function(err,doc){
          if(err != null){
            next(err);
          }
          else{
            if(doc != null){
              // 注册的身份证号码已经存在
              res.send('idcard');
            }else{
              // 可以注册
              console.log('no find!!');
              var student = new Student({registerPhone: req.body.registerPhone, ID_card: req.body.ID_card, password: req.body.password});
              student.save(function (err, student) {
                if(err){ next(err); }

                res.json(student);
                console.log(req.body);
              });
            }
          }
        });
      }
    }
  });
});

module.exports = router;
