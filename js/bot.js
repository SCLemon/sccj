var cookieArr =document.cookie.split(";");
var last='';
for(var i=0; i<cookieArr.length ;i++){
  if(cookieArr[i].includes("lastVisit=")){
    last = cookieArr[i].split("=")[1];
     break;
  }
}
var botui = new BotUI('botui-app');
botui.message.bot( // show first message
   'Nice to meet you!!'
  ).then(function () {
    return botui.message.bot({ // second one
      delay: 1000, // wait 1 sec.
      content: 'I am SCLemon who majors in ESS in NTHU.'
    });
  }).then(function () {
    return botui.message.bot({ // second one
      delay: 1000, // wait 1 sec.
      content: 'How can I help you?'
    });
  }).then(function () {
    return botui.action.button({ // let user do something
      delay: 1000,
      action: [
        {
          text: 'I would like to know how this page work.',
          value: 'yes'
        },
        // {
        //   text: 'Nothing,I just passing by here',
        //   value: 'no'
        // }
      ]
    });
  }).then(function (res) {
    if(res.value=="yes"){
      return botui.message.bot({
        delay: 1000,
        content: "This is based on VueJS,VantaJS,BotUI,and some plugins.",
      });
    }
    else{
      // return botui.message.bot({
      //   delay: 1000,
      //   content: "That's fine. Wish you have a nice day~",
      // });
    } 
  }).then(function () {
    return botui.action.button({ // let user do something
      delay: 1000,
      action: [
        {
          text: 'Anything else?',
          value: 'yes'
        },
        // {
        //   text: 'All right! Thank you~',
        //   value: 'no'
        // }
      ]
    });
  }).then(function (res) {
    if(res.value=="yes"){
      return botui.message.bot({
        delay: 1000,
        content: "This also use the technique as Google AppScript to create an message board.",
      });
    }
    else{
      // return botui.message.bot({
      //   delay: 1000,
      //   content: "That's fine. Wish you have a nice day~",
      // });
    } 
  }).then(function (res) {
    return botui.message.bot({
      delay: 1000,
      content: "And added a method to let it instantly update and filter some filthy words.",
    });
  }).then(function (res) {
    return botui.message.bot({
      delay: 1000,
      content: "In order to punish whom breaks the rule,this website would automaticly block them.",
    });
  }).then(function () {
    return botui.action.button({ // let user do something
      delay: 1000,
      action: [
        {
          text: 'What are the rules?',
          value: 'yes'
        },
        // {
        //   text: 'All right! Thank you~',
        //   value: 'no'
        // }
      ]
    });
  }).then(function (res) {
    if(res.value=="yes"){
      return botui.message.bot({
        delay: 1000,
        content: "The rules includes using filthy words and using some tools to attack or catch someone.",
      });
    }
    else{
      // return botui.message.bot({
      //   delay: 1000,
      //   content: "That's fine. Wish you have a nice day~",
      // });
    } 
  }).then(function (res) {
    return botui.message.bot({
      delay: 1000,
      content: "Just as if you input '白痴' at the message board,the system would not insert this data into the database.",
    });
  }).then(function (res) {
    return botui.message.bot({
      delay: 1000,
      content: "And next time,you would be block by the system forever even if you change your IP Address.",
    });
  }).then(function (res) {
    return botui.message.bot({
      delay: 1000,
      content: "Thus,please be a nice visitor~",
    });
  }).then(function () {
    return botui.action.button({ // let user do something
      delay: 1000,
      action: [
        {
          text: 'What about other features?',
          value: 'yes'
        },
        // {
        //   text: 'All right! Thank you~',
        //   value: 'no'
        // }
      ]
    });
  }).then(function (res) {
    if(res.value=="yes"){
      return botui.message.bot({
        delay: 1000,
        content: "It's also record the lastTime you visit this website.",
      });
    }
    else{
      // return botui.message.bot({
      //   delay: 1000,
      //   content: "That's fine. Wish you have a nice day~",
      // });
    } 
  }).then(function (res) {
    return botui.message.bot({
      delay: 1000,
      content: "If you are the new visitor,it would record this time.",
    });
  }).then(function (res) {
    return botui.message.bot({
      delay: 1000,
      content: "If you have visited this website,it would return as yyyy-MM-dd HH-mm-ss.",
    });
  }).then(function (res) {
    if(last!='')
    return botui.message.bot({
      delay: 1000,
      content: "Your lastVist:"+last,
    });
  }).then(function () {
    return botui.action.button({ // let user do something
      delay: 1000,
      action: [
        {
          text: 'Nice,And I would want to know how to contact you?',
          value: 'yes'
        },
        {
          text: 'Thank you~ End the chat.',
          value: 'no'
        }
      ]
    });
  }).then(function (res) {
    if(res.value=="yes"){
      return botui.message.bot({
        delay: 1000,
        content: "It can be available from the Contact in the sidebar.",
      });
    }
    else{
      return botui.message.bot({
        delay: 1000,
        content: "That's fine.",
      });
    } 
  }).then(function (res) {
    return botui.message.bot({
      delay: 1000,
      content: "And if there is anything wrong,plz contact us.",
    });
  }).then(function (res) {
    return botui.message.bot({
      delay: 1000,
      content: "I would sincerely thank you!!",
    });
  }).then(function (res) {
    return botui.message.bot({
      delay: 1000,
      content: "Wish you have a nice day~",
    });
  }).then(function () {
    return botui.action.button({ // let user do something
      delay: 1000,
      action: [
        {
          text: 'Have a Nice Day,too!!',
          value: 'yes'
        },
        {
          text: 'Thank you~.',
          value: 'no'
        }
      ]
    });
  });


  // 操縱開關
  var bot =document.getElementById("botAll");
  var chatroom =document.querySelector(".bot");
  bot.style="display:none; height:45px; z-index:1004;";
  var title =document.querySelector(".botTitle");
  var stat="hide";
  changeBot=function(){
    console.log("change")
    if(stat=="open"){
        stat="hide";
        bot.style="display:block; height:45px; z-index:1004;";
        chatroom.style="display:none;";
        title.style="color:rgba(255,255,255,0.7);";
    }else{
        stat="open";
        bot.style="display:block; height:362px; z-index:1004;";
        chatroom.style="display:block;";
        title.style="color:rgba(255,255,255,1.0);";
    }
}