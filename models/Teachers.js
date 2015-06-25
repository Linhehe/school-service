/**
 * Created by linhehe on 15/6/24.
 */
var mongoose = require('mongoose');

var TeacherSchema = mongoose.Schema(
    {
        name: String,
        abstract: String, // 简介
        mobilePhone: String,
        QQ: String,
        email: String,
        address: String, // 办公地址

        registerPhone: String, // 注册手机
        password: String
    });

mongoose.model('Teacher', TeacherSchema);