import '../common/common';import "../../less/page/index.less";console.log($('form[data-toggle="validator"]'))//初始化操作$(document).ready(function () {    //请求默认值    // $.ajax({    //     type: "get",    //     url: `/pub/sylla/api/pub-rzzc/pre/info`,    //     success: function (data) {    //         console.log(data);    //         if (data.data.sltMailAcc) {    //             // $('#inputEmail').attr('disabled','true').val(data.data.sltMailAcc)    //         } else {    //             $('#inputEmail').val(data.data.dftMailAcc)    //         }    //     },    //     error: function (error) {    //         console.log(error)    //     }    // });    //设置邮箱密码    // $("#inputEmail").on("input",function(e){    //   //获取input输入的值    //   if(!e.delegateTarget.value){    //     $('.help-block1').html('账号的范例，如：JasonZhang@sogou-inc.com;')    //   }    // });    $('#form').validator({        custom: {            required: function ($el) {                console.log($('#inputEmail').val().length)                if ($('#inputEmail').val().length==0) {                    console.log(33)                    return "邮箱不能为空"                }            },            pattern1: function ($el) {                if (!/^(?=.*[a-zA-Z-])[0-9a-zA-Z][a-zA-Z0-9-]{0,13}[0-9a-zA-Z]$/.test($('#inputEmail').val()))                    return "邮箱格式不对"            },            pattern2: function ($el) {                if (!/^(?![a-zA-Z]+$)(?![A-Z0-9]+$)(?![A-Z\W_]+$)(?![a-z0-9]+$)(?![a-z\W_]+$)(?![0-9\W_]+$)[a-zA-Z0-9\W_]{8,}$/.test($('#inputPassword').val()))                    return "密码格式不对"            },            equals2: function ($el) {                if ($('#inputPassword').val()&&$('#inputPassword').val().indexOf($('#inputEmail').val()) !== -1) {                    console.log(2)                    return "密码不要包含邮箱"                }            },            axj:function () {                var result = '';                $.ajax({                    url : '/pub/sylla/api/pub-rzzc/set/mail',                    type : "get",                    data : { mailAcc: $('#inputEmail').val(),mailPwd: '123qwe++'},                    async : false,                    success : function(data) {                        result = data.statusText;                    }                });                return result;            }        },        feedback: {            success: 'glyphicon-flash',            error: 'glyphicon-flash'        },    }).on('submit', function (e) {        e.preventDefault();        let mail=$('#inputEmail').val();        let code=$('#inputPassword').val();        // if(code.indexOf(mail)!==-1){        //   $('.input1').addClass('has-error');        //   $('.help-block1').html('<ul class="list-unstyled"><li>密码不要包含邮箱</li></ul>')        // }else{        // $.post('/pub/sylla/api/pub-rzzc/set/mail',  { mailAcc: mail, mailPwd: code } )        //     .done(function( textStatus) {        //         errors.push(textStatus.statusText)        //         console.log(errors)        //     }).always(function () { $.Deferred().resolve(errors)})          //          $.ajax({            type: "post",            url: `/pub/sylla/api/pub-rzzc/set/mail?mailAcc=${mail}&mailPwd=${code}`,            success: function (data) {              if(data.status===1013){                // $('.input1').addClass('has-error');                // $('.help-block1').html(`<ul class="list-unstyled"><li>${data.statusText}</li></ul>`)              }              if(data.status===0){                //设置成功后处理              }            },            error: function (error) {              console.log(error)            }          });    });    //密码显示隐藏切换    $(".glyphicon-eye").click(function () {        $(this).toggleClass(function () {            if ($(this).hasClass('glyphicon-eye-close')) {                $(this).removeClass('glyphicon-eye-close');                return 'glyphicon-eye-open';            } else {                $(this).removeClass('glyphicon-eye-open');                return 'glyphicon-eye-close';            }        });        if ($(this).hasClass('glyphicon-eye-close')) {            $('#form').find('#inputPassword').attr('type', 'password');        } else {            $('#form').find('#inputPassword').attr('type', 'text');        }    })});