window.onload=function(){
    const vm=new Vue({
        el:'#box',
        data:{
            bannerArr:[],
            position:0,
            currentTimer:0,
            content:[],
            post:[],
            project:[],
            record:[],
            inputMsg:'',
            outputMsg:[],
            ip:'',
            main_index:1,
            sendEnabled:true,
            timer:0,
            last:0,
            pt:[],
            visitText:'',
            device:'',
            loader:true,
            percent:0,
            changebgTimes:1,
            currentBg:"black",
            updateList:[],
            deltaTime:[{
                time:'',
                title:'Days'
            },
            {
                time:'',
                title:'Hours'
            },
            {
                time:'',
                title:'Minutes'
            },
            {
                time:'',
                title:'Seconds'
            }],
        },
        computed:{
            // startTime(){
            //     var start = new Date(2023,0,9).getTime();
            //     var end =Date.now();
            //     return Math.ceil((end-start)/1000/86400);
            // },
        },
        methods:{
            getIP(){
                var user = navigator.userAgent;
                if(user.includes("Mobile")){
                    this.loader=false;
                    alert("請使用PC以利於獲取最佳體驗！");
                }
                fetch('https://api.ipify.org?format=json')
                .then(resp=>{
                    return resp.json();
                })
                .then(function(data){
                        vm.ip=data.ip;
                        vm.testIP();
                    }
                )
            },
            getBanner(){
                fetch("banner.json")
                .then(function(resp){
                    return resp.json();
                })
                .then(function(data){
                    vm.bannerArr=data;
                    setTimeout(function(){
                        var block=document.getElementsByClassName("block")[0];
                        block.style="background:white;";
                    },80);
                });
            },
            changeImg(id){
                clearInterval(this.currentTimer);
                var block=document.getElementsByClassName("block");
                var ps=1400*(id-1);
                for(var i=0 ;i<block.length;i++){
                    if(i==(id-1)){
                        block[i].style="background:white";
                    }
                    else{
                        block[i].style="background:";
                    }
                }
                
                this.currentTimer = setInterval(function(){
                    if(vm.position < ps){
                        vm.position+=14;
                        document.getElementById("img-all").style.left=-vm.position+"px";
                    }
                    else if(vm.position > ps){
                        vm.position-=14;
                        document.getElementById("img-all").style.left=-vm.position+"px";
                    }
                    else{
                        vm.timerflag=true;
                        clearInterval(vm.currentTimer);
                    }
                }, 10);
            },
            // 取得 Main 內容
            getContent(){
                fetch("cj.json")
                .then(function(resp){
                    return resp.json();
                })
                .then(function(data){
                    vm.content=data;
                });
            },
            getPost(){
                fetch("post.json")
                .then(function(resp){
                    return resp.json();
                })
                .then(function(data){
                    vm.post=data;
                });
            },
            getProject(){
                fetch("project.json")
                .then(function(resp){
                    return resp.json();
                })
                .then(function(data){
                    vm.project=data;
                });
            },
            getRecord(){
                fetch("record.json")
                .then(function(resp){
                    return resp.json();
                })
                .then(function(data){
                    vm.record=data;
                });
            },
            getPt(){
                fetch("pt.json")
                .then(function(resp){
                    return resp.json();
                })
                .then(function(data){
                    vm.pt=data;
                });
            },
            getList(){
                fetch("updateList.json")
                .then(function(resp){
                    return resp.json();
                })
                .then(function(data){
                    vm.updateList=data;
                });
            },
            // 更換內容
            changeMainIndex(index){
                clearInterval(this.timer);
                var contentBox =document.getElementById("content-all");
                contentBox.style="opacity:0%";
                var percent=0;         
                this.timer= setInterval(function(){
                    percent+=1.5;
                    contentBox.style="opacity:"+percent+"%";
                    if(percent>=100){
                        clearInterval(vm.timer);
                    }
                },12);
                this.main_index=index;
            },
            // 相簿換頁
            contentImg(id,arr,method){
                var box =document.getElementById(id);
                var length= arr.length;
                var ps = window.getComputedStyle(box).getPropertyValue("left").split("px")[0];
                if(method==1 && ps!=-(480*(length-1))){
                   
                   box.style.left=(ps-480)+"px";
                }
                if(method==2 && ps<0){
                    box.style.left=(+ps+480)+"px";
                }
            },
            // 取得留言
            queryMsg(){
                var config={
                    method:"GET",
                    redirect: 'follow'
                }
                fetch("https://script.google.com/macros/s/AKfycbz7OaprvZtIQoBqvGQq8Lc-9FE6QIe3Xk_Ua2e15oUbCFkw9eZovLGQkNySZ5GgBKGE/exec",config)
                .then(resp=>resp.json())
                .then(function(data){
                    var i;
                    vm.outputMsg=[];
                    for(i=0 ; i<data['data'].length ;i++){
                        vm.outputMsg.push("匿名"+(i+1)+" : "+data['data'][i]);
                    }  
                    vm.last=i;
                })
            }
            ,
            sendMail(){
                var mail =prompt("請輸入電子信箱！！");
                var msg  =prompt("請輸入想對未來的自己說的話！！");
                if(mail==null || msg==null || mail.trim()=="" || msg.trim()==""){
                    alert("內容錯誤或內容不可為空");
                }
                else if(msg.trim().length<50){
                    alert("內容需多於50字");
                }
                else{
                    var mod =document.getElementById("mod");
                    mod.innerText="傳送中";
                    var formData =new FormData();
                    formData.append("mail",mail);
                    formData.append("msg",msg);
                    formData.append("ip",this.ip);
                    formData.append("device",this.device);
                    var config={
                        method:"post",
                        body:formData,
                        redirect:"follow"
                    }
                    fetch("https://script.google.com/macros/s/AKfycbxHBASX9rru8lUfQqou2tc9YiG90kVFIMuiSiGxjoRs8G_cYwAROoh_cFS-RBrr0W_z5Q/exec",config)
                    .then(res=>res.text())
                    .then(function(res){
                        if(res=="mail success"){
                            mod.innerText="已發送";
                        }
                        else if(res=="block"){
                            mod.innerText="異常操作";
                            vm.testIP();
                        }
                        else{
                            mod.innerText="發送失敗";
                        }
                    });
                }
            }
            ,
            // 檢測惡意IP
            testIP(){
                var formData = new FormData();
                formData.append("ip",vm.ip);
                formData.append("device",vm.device);
                var config={
                    method:"POST",
                    body:formData,
                    redirect: 'follow'
                }
                fetch("https://script.google.com/macros/s/AKfycbyJNVEIpFPzw5v666DBWz4sUOxUtXLM_QSECY7VmC9dhYy_tM8OtYQArEfbSKjPz2uj/exec",config)
                .then(resp=>resp.text())
                .then(function(data){
                    if(data==="block"){
                            document.getElementById("bg").innerHTML="<h1 style='color:red; font-size:60px; padding-top:20px; padding-left:20px;'>您因觸犯網路條約，已被系統自動屏蔽！！</h1>";
                            var time = 5;
                            setInterval(() => {
                            time--;
                            if(time==0){
                                window.location.href="https://www.google.com";
                            }
                            }, 1000);
                            
                        }
                    }
                )
            },
            // 發布留言
            sendMsg(){
                this.sendEnabled=false;
                var formdata = new FormData();
                formdata.append("msg",this.inputMsg);
                formdata.append("ip",this.ip);
                formdata.append("device",this.device);
                var config={
                    method:"post",
                    body:formdata,
                    redirect: 'follow'
                }
                if(this.inputMsg.trim()==''){
                    alert("資料不可為空");
                    this.sendEnabled=true;
                }
                else{
                    this.outputMsg.push("匿名"+(this.last+1)+" : "+this.inputMsg);
                    vm.inputMsg='';
                    fetch("https://script.google.com/macros/s/AKfycbz7OaprvZtIQoBqvGQq8Lc-9FE6QIe3Xk_Ua2e15oUbCFkw9eZovLGQkNySZ5GgBKGE/exec",config)
                    .then(resp=>resp.text())
                    .then(function(resp){
                        if(resp == 'success'){
                            vm.sendEnabled=true;
                            vm.queryMsg();
                        }
                        else{
                            vm.sendEnabled=true;
                            alert("傳送失敗");
                        }
                    });
                }
            },
            // 上次造訪時間
            lastVisit(){  
                var cookieArr =document.cookie.split(";");
                var last;
                for(var i=0; i<cookieArr.length ;i++){
                    if(cookieArr[i].includes("lastVisit=")){
                        last = cookieArr[i].split("=")[1];
                        break;
                    }
                }
                var currentTime = new Date().getFullYear()+"/"+(+new Date().getMonth()+1)+"/"+new Date().getDate()+" "+(new Date().toString().split(" ")[4]);
                var expires = new Date(Date.now()+86400*365*2*1000).toUTCString();
                document.cookie = "lastVisit="+currentTime+";expires="+expires+";";
            },
            // 取得裝置識別碼
            getDevice(){
                if(!document.cookie.includes("device")){
                    var code=new Date().getTime();
                    var expires = new Date(Date.now()+86400*365*2*1000).toUTCString();
                    document.cookie="device="+code+";expires="+expires+";"
                    this.device=code;
                    localStorage.setItem("device",this.device);
                }
                else{
                    var cookies =document.cookie.split(";");
                    for(var i=0 ;i<cookies.length ;i++){
                        if(cookies[i].split("=")[0].trim()=="device"){
                            this.device=cookies[i].split("=")[1];
                        }
                    }
                }
            },
            progress(){
                if(this.loader){
                    var column = document.getElementsByClassName("row-c");    
                    const progress = setInterval(function(){
                        vm.percent+=Math.round(Math.random()*4.5);
                        document.getElementById("percent").style="width:"+vm.percent+"%";
                        if(vm.percent>=100){
                            vm.percent=100;
                            var slider = document.getElementById("switch");
                            column[3].click();
                            slider.click();
                            vm.fadeOut();
                            window.addEventListener("click",(e)=>{
                                document.getElementById("audio").play();
                            })
                            clearInterval(progress);
                        }
                        else if(vm.percent>=80) column[0].click();
                        else if(vm.percent>=60) column[1].click();
                        else if(vm.percent>=40) column[2].click();
                        else if(vm.percent>=5) column[3].click();
                    },120);
                }
                else{
                    document.getElementsByClassName("hideOnce")[0].style="display:block";
                }
            },
            fadeOut(){
                var out =document.getElementsByClassName("out")[0];
                var op=100;
                const fadeOut = setInterval(function(){
                    op-=5;
                    out.style="opacity:"+op+"%";
                    if(op<0){
                        vm.contentFadeIn();
                        vm.vanta();
                        vm.loader=false;
                        clearInterval(fadeOut);
                    }
                },60);
            },
            contentFadeIn(){
                var content =document.getElementsByClassName("hideOnce")[0];
                content.style="display:block; opacity:0;";
                var cop = 0;
                //document.getElementById("botAll").style="display:block;z-index:1004;height:45px;";
                const contentFadeIn=setInterval(function(){
                    cop+=5;
                    content.style="display:block; opacity:"+cop+"%";
                    if(cop>=100){
                        clearInterval(contentFadeIn);
                    }
                },50);
            },
            vanta(flag){
                var bgColor = (flag==undefined|| flag=="black")?0x7192f:0xd1ff;
                VANTA.BIRDS({
                    el: "#bg",
                    mouseControls: true,
                    touchControls: true,
                    gyroControls: false,
                    minHeight: 1055.00,
                    minWidth: 1440.00,
                    scale: 2.00,
                    scaleMobile: 2.00,
                    backgroundColor: bgColor,
                    color1: 0xf22626,
                    birdSize: 0.60,
                    wingSpan: 3.00,
                    speedLimit: 6.00,
                    separation: 50.00,
                    cohesion: 10.00
                })
            },
            changeBg(){
                var row = document.getElementById("row");
                if(this.changebgTimes==1){}
                else{
                    if(this.currentBg=="black"){
                        this.currentBg="white";
                        row.style="background:rgba(255,255,255,0)";
                        this.vanta("white");
                    }
                    else{
                        this.currentBg="black";
                        this.vanta("black");
                    }
                }
                this.changebgTimes++;
            },
            calTime(){
                var start = new Date(2023,0,9).getTime(); 
                var delta;
                setInterval(() => {
                    delta=Date.now()-start;
                    this.deltaTime[0].time=parseInt(delta/1000/86400),
                    delta-=this.deltaTime[0].time*1000*86400;
                    this.deltaTime[1].time=parseInt(delta/1000/3600);
                    delta-=this.deltaTime[1].time*1000*3600;
                    this.deltaTime[2].time=parseInt(delta/1000/60);
                    delta-=this.deltaTime[2].time*1000*60;
                    this.deltaTime[3].time=parseInt(delta/1000);
                }, 1000);
            }
        }
    });
    vm.calTime();
    // initial
    vm.getIP();
    vm.getBanner();
    vm.lastVisit();
    vm.getDevice();
    // main
    vm.getPost();
    vm.getProject();
    vm.getRecord();
    vm.getContent();
    vm.getPt();
    vm.getList();
    // msg
    vm.queryMsg();
    vm.progress();
    window.addEventListener("keydown",(e)=>{
        var ps = document.getElementsByClassName("img-all")[0].style.left.split("px")[0];
        document.getElementById("audio").play();
        if(ps=="") ps=0;
        if(e.keyCode==37) if((-ps/1400)>=1) vm.changeImg(Math.ceil((-ps/1400)))
        if(e.keyCode==39) if((-ps/1400)+2 <= vm.bannerArr.length) vm.changeImg(Math.ceil((-ps/1400)+2))
        // Enter
        if(e.keyCode==13 && vm.inputMsg.trim()!='')vm.sendMsg();
    },false)
    // 禁止複製
    document.body.oncopy = function(){
        event.returnValue=false;
    }

    // 離開視窗
    var title =document.title;
    window.addEventListener("blur",()=>{
        document.title="See you next time ❤️";
    })
    window.addEventListener("focus",()=>{
        document.title=title;
    })
}

//屏蔽F12和右键
// function click(e) {
//     if (document.all) {
//         if (event.button == 2 || event.button == 3) {
//             oncontextmenu = 'return false';
//         }
//     }
//     if (document.layers) {
//         if (e.which == 3) {
//             oncontextmenu = 'return false';
//         }
//     }
// }
// if (document.layers) {
//     document.captureEvents(Event.MOUSEDOWN);
// }
// document.onmousedown = click;
// document.oncontextmenu = new Function("return false;")

// document.onkeydown = document.onkeyup = document.onkeypress = function () {
//     if (window.event.keyCode == 123) {
//         window.event.returnValue = false;
//         return (false);
//     }
// }