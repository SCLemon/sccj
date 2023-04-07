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
            pt:[]
        },
        computed:{
            startTime(){
                var start = new Date(2023,0,9).getTime();
                var end =Date.now();
                return Math.ceil((end-start)/1000/86400);
            }
        },
        methods:{
            getIP(){
                fetch('https://api.ipify.org?format=json')
                .then(resp=>{
                    return resp.json();
                })
                .then(function(data){
                        vm.ip=data.ip;
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
                        vm.outputMsg.push("匿名"+(i+1)+" : "+data['data'][i][0]);
                    }  
                    vm.last=i;
                })
            }
            ,
            sendMail(){
                var mail =prompt("請輸入電子信箱以取得模板！！");
                if(mail==null){
                    console.log("null");
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
            // 發布留言
            sendMsg(){
                this.sendEnabled=false;
                var formdata = new FormData();
                formdata.append("msg",this.inputMsg);
                formdata.append("ip",this.ip);
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
            }
        }
    });
    // initial
    vm.getIP()
    vm.getBanner();
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
