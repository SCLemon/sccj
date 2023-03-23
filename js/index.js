window.onload=function(){
    const vm=new Vue({
        el:'#box',
        data:{
            bannerArr:[],
            position:0,
            currentTimer:0,
            content:[],
        },
        computed:{
            startTime(){
                var start = new Date(2023,0,9).getTime();
                var end =Date.now();
                return Math.ceil((end-start)/1000/86400);
            }
        },
        methods:{
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
                console.log(ps)
                if(method==1 && ps!=-(480*(length-1))){
                   box.style.left=(ps-480)+"px";
                }
                if(method==2 && ps<0){
                    box.style.left=(+ps+480)+"px";
                }
            }
        }
    });
    vm.getBanner();
    vm.getContent();
}
