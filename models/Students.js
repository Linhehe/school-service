/**
 * Created by linhehe on 15/6/24.
 */
var mongoose = require('mongoose');

var StudentSchema = new mongoose.Schema(
    {
        name: String,
        sex: String,
        subject: String, // 科目(文/理)
        professional: String, // 专业
        class: String, // 班级
        teacher: String, // 班主任
        dorm: String, // 宿舍
        phone: String, // 电话卡
        bankCard: String, //银行卡
        isReports: Boolean, // 是否报道
        isPay: Boolean, // 缴费状态

        registerPhone: String, // 注册手机号
        ID_card: String, // 身份证号码
        password: String // 密码
    });

mongoose.model('Student', StudentSchema);