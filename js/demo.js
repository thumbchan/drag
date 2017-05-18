var box=document.getElementById("box");
box.style.top=((document.documentElement.clientHeight||document.body.clientHeight)-box.offsetHeight)/2+"px";
box.style.left=((document.documentElement.clientWidth||document.body.clientWidth)-box.offsetWidth)/2+"px";

box.onmousedown=down;


function down(e){
	e=e||window.event;
	//记录初始位置
	this["strX"]=e.clientX;
	this["strY"]=e.clientY;
	
	this["strL"]=parseFloat(this.style.left);
	this["strT"]=parseFloat(this.style.top);
	
	//给元素绑定移动和抬起的事件
	
	if(this.setCapture){
		this.setCapture();
	    this.onmousemove=move;
	    this.onmouseup=up;
	}else{
		//改变this指向才能绑定到document。
		var _this=this;
		document.onmousemove=function(e){
			move.call(_this,e);
		}
	    document.onmouseup=function(e){
	    	up.call(_this,e);
	    	
	    }
	}
	
}
function move(e){
	e=e||window.event;
	var curL=(e.clientX-this["strX"])+this["strL"];
	var curT=(e.clientY-this["strY"])+this["strT"];
	
	
	var minL=0,minT=0,
	maxL=(document.documentElement.clientWidth||document.body.clientWidth)-this.offsetWidth,
	maxT=(document.documentElement.clientHeight||document.body.clientHeight)-this.offsetHeight;
	
	curL=curL<minL?minL:(curL>maxL?maxL:curL);
	curT=curT<minT?minT:(curT>maxT?maxT:curT);
	
	this.style.left=curL+"px";
	this.style.top=curT+"px";
	
}
function up(e){
	if(this.releaseCapture){
		this.onmousemove=null;
	    this.onmouseup=null;
	    this.releaseCapture();
	}else{
		document.onmousemove=null;
		document.onmouseup=null;
	}
	
}
//当鼠标移动过快的时候，鼠标会脱离盒子，导致盒子的up事件没法触发，统称鼠标焦点丢失。
//解决办法，在ie和火狐有setcapture方法，绑定盒子和鼠标事件。

//谷歌上述方法无效，不兼容。只有把事件绑定给body。

