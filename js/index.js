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
            device:''
        },
        computed:{
            startTime(){
                var start = new Date(2023,0,9).getTime();
                var end =Date.now();
                return Math.ceil((end-start)/1000/86400);
            },
        },
        methods:{
            getIP(){
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
                var mail =prompt("請輸入電子信箱以取得模板！！");
                if(mail==null){
                }
                else{
                    var mod =document.getElementById("mod");
                    mod.innerText="傳送中";
                    var formData =new FormData();
                    formData.append("mail",mail);
                    formData.append("ip",this.ip);
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
                if(document.cookie.includes("lastVisit=")){
                    this.visitText="很榮幸能夠再度相見！！";
                    setTimeout(function(){
                        vm.visitText="上次造訪時間為：\n"+last;
                        setTimeout(function(){
                            vm.visitText="我是可愛的小檸檬🍋🍋"
                            setTimeout(function(){
                                vm.visitText="祝您有個愉快的體驗~~"
                                setTimeout(function(){
                                    vm.visitText="🤩🤩"
                                    setTimeout(function(){
                                        vm.visitText=""
                                    },2800)
                                },2800)
                            },3100)
                        },3800)
                    },3100)
                }
                else{
                    this.visitText="初次見面您好！！"
                    setTimeout(function(){
                        this.visitText="歡迎蒞臨本網頁😚😚"
                        setTimeout(function(){
                            vm.visitText="我是可愛的小檸檬🍋🍋"
                            setTimeout(function(){
                                vm.visitText="祝您有個愉快的體驗~~"
                                setTimeout(function(){
                                    vm.visitText="🤩🤩"
                                    setTimeout(function(){
                                        vm.visitText=""
                                    },3100)
                                },3100)
                            },3100)
                        },3100)
                    },3100)
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
        }
    });

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
    // msg
    vm.queryMsg();

    window.addEventListener("keydown",(e)=>{
        var ps = document.getElementsByClassName("img-all")[0].style.left.split("px")[0];
        if(ps=="") ps=0;
        if(e.keyCode==37){
            if((-ps/1400)>=1){
                vm.changeImg(Math.ceil((-ps/1400)))
            }
        }
        if(e.keyCode==39){ 
            if((-ps/1400)+2 <= vm.bannerArr.length){
                vm.changeImg(Math.ceil((-ps/1400)+2))
            } 
        }
    },false)
}
