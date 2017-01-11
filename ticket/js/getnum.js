/**
 * Created by huqiwen on 16/7/6. 设置人数
 */
var GetNumUrl = "json/GetNum.json";
var Num = 0; //人数
var Block_num = 4; //默认位数
var NumArr = [];
//html
var Block = "<div class=\"num_show\"> <p class=\"num_anime\"></p> <p class=\"num_num\"> </p> <p class=\"num_anime1\"></p> </div>"
$(function () {

  GetFirstNum();
  $(".refresh").click(function () {
    $(".number0").html("?");
    $(".number1").html("?");
    $(".number2").html("?");
    $(".number3").html("?");
    $(".number4").html("?");
    setTimeout(function(){
      GetFirstNum();
    },50)
  });

});

$(".close_alert").click(function () {
  $('#alert_rule').modal('hide');
  GetFirstNum();

});
$(".ticket_btn").click(function () {
  window.location.href="rank.html"

});

var GetNewNum = function () {
  $.ajax({
    url: GetNumUrl,
    type: 'post',
    async: false,
    dataType: "json",
    data: {},
    error: function () {
    },
    success: function (data) {
      if(data.status =="1"){
        Num ++;
        Block_num = data.flag;
        SetBlockNum(Num,Block_num);
      }
    }
  });
}


var GetFirstNum = function () {  //初始人数 包括位数
  $.ajax({
    url: GetNumUrl,
    type: 'post',
    async: false,
    dataType: "json",
    data: {},
    error: function () {
    },
    success: function (data) {
      if(data.status =="1"){
        Num = data.num;
        Block_num = data.flag;
        SetBlockNum(Num,Block_num);
      }
    }
  });
}

var SetBlockNum = function (Num,block_num) {  //设置数字
  NumArr = (Num+"").split("");
  if(block_num=="5"){
    var len = 5 - NumArr.length; //处理数组
    for(var i = 0;i<len;i++){
      NumArr.unshift(0);
    }
    $(".num div:nth-last-child(2)").css("margin-right","4%");
    $(".num div:nth-last-child(1)").show();
  }else{
    var len = 4 - NumArr.length; //处理数组
    for(var i = 0;i<len;i++){
      NumArr.unshift(0);
    }
  }
  NumArr[NumArr.length-1] = "?";
  for(var i= 0;i<NumArr.length;i++){
    if( $(".number"+i).html()==NumArr[i]){

    }else{
      //if(i==3){
      //  $(".number"+i).html("?");
      //}
      $(".number"+i).html(NumArr[i]);

    }

    //setTimeout(function(){

    //},2000);
  }
}
