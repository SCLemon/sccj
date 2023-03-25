

window.onload=function(){
    const vm=new Vue({
        el:'#box',
        data:{
            bannerArr:[],
            position:0,
            currentTimer:0,
            content:[],
            inputMsg:'',
            outputMsg:[],
            ip:'',
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
            getContent(){
                fetch("cj.json")
                .then(function(resp){
                    return resp.json();
                })
                .then(function(data){
                    vm.content=data;
                });
            },
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
            queryMsg(){
                var config={
                    method:"GET",
                    redirect: 'follow'
                }
                fetch("https://script.google.com/macros/s/AKfycbz7OaprvZtIQoBqvGQq8Lc-9FE6QIe3Xk_Ua2e15oUbCFkw9eZovLGQkNySZ5GgBKGE/exec",config)
                .then(resp=>resp.json())
                .then(function(data){
                    vm.outputMsg=[];
                    for(var i=0 ; i<data['data'].length ;i++){
                        vm.outputMsg.push("匿名"+(i+1)+" : "+data['data'][i][0]);
                    }
                    vm.inputMsg='';
                })
            }
            ,
            sendMsg(){
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
                }
                else{
                    fetch("https://script.google.com/macros/s/AKfycbz7OaprvZtIQoBqvGQq8Lc-9FE6QIe3Xk_Ua2e15oUbCFkw9eZovLGQkNySZ5GgBKGE/exec",config)
                    .then(resp=>resp.text())
                    .then(function(resp){
                        if(resp == 'success'){
                            console.log(resp);
                            alert("發布成功");
                            vm.queryMsg();
                        }
                        else{
                            console.log(resp);
                            alert("傳送失敗");
                        }
                    });
                }
            }
        }
    });
    vm.getIP()
    vm.getBanner();
    vm.getContent();
    vm.queryMsg();
}
