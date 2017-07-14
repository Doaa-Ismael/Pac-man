var canvas = document.createElement("canvas");
canvas.height = 400;
canvas.width = 600;
var context = canvas.getContext("2d");
var score = 3 ;
var player =  {
	x:10, 
	y:10,
	pacdir:0, 
	pacmouth: 320, 
	speed:9
};
var enemy=  {
	x:100, 
	y:100,
	speed:4, 
	gnum:1,
	moving:0, 
	diry:0, 
	dirx:0, 
	flash:0
}, ghost = false;
var dot=  {
	x:10, 
	y:10,
	exist: false, 
	countdown : 0, 
	gostnum : 0

}
function myNum(n) {
	return Math.floor(Math.random()*n);
}
var mainImage = new Image();
mainImage.ready = false;
mainImage.src = "pac.png";
mainImage.onload = checkLoad ;
function checkLoad() {
	this.ready = true;
	play();
}
function play() {
	render();
	window.requestAnimationFrame(play);
}
function render() {
	context.fillStyle = "#000";
	context.font = '20px serif';
	context.fillRect(0, 0, 600, 400);
	if(score==0)
	{
		context.fillStyle = "#FFF";
		context.font = '40px serif';
		context.fillText("Game Over! :(", 150, 180);
		return;
	}
	if(!ghost)
	{
		enemy.gnum = myNum(5)*64;
		enemy.x = myNum(450);
		enemy.y = myNum(250)+30;
		ghost = true;
	}
	if(!dot.exist) {

		dot.exist = true;
		dot.x = myNum(355);
		dot.y = myNum(443);
	}
	if(enemy.moving < 0 )
	{
		enemy.moving = myNum(20)*3;
		enemy.speed = myNum(5);
		enemy.dirx = 0;
		enemy.diry = 0;
		if(enemy.moving % 2) {
		if(player.x < enemy.x){enemy.dirx = -enemy.speed;}else{enemy.dirx = enemy.speed;}
			}else{
			if(player.y < enemy.y){enemy.diry = -enemy.speed;}else{enemy.diry = enemy.speed;}
		}
	}
	if(Math.abs(player.x - dot.x) <= 30 && Math.abs(player.y - dot.y) <= 30) {
		console.log("hit");
		dot.exist = false;
		dot.countdown = 500;
		dot.gostnum = enemy.gnum ;
		//enemy.gnum = 384;
		dot.x = 0;
		dot.y = 0;
	}
	if(dot.exist) {
		context.fillStyle = "#FFF";
		context.beginPath();
		context.arc(dot.x, dot.y, 7, 0, 2*Math.PI , true);
		//scontext.stroke();
		context.closePath();
		context.fill();
	}

	enemy.x += enemy.dirx;
	enemy.y += enemy.diry;
	enemy.moving--;
	if(enemy.x >= (canvas.width -32)) 	enemy.x = 0;
	if(enemy.y >=  (canvas.height - 32)) enemy.y = 0;
	if(enemy.x < 0) enemy.x = canvas.width-32;
	if(enemy.y < 0) enemy.y = canvas.height-32;

	////////////////////// collision detection //////////////////////////////////
	if(Math.abs(enemy.x - player.x) <= 25 && Math.abs(enemy.y - player.y) <= 25) {
		console.log("Ghost");
		ghost = false;
		score--;
	}

	if(enemy.flash == 32) enemy.flash = 64;
		else enemy.flash = 32;
	context.drawImage(mainImage, enemy.gnum, enemy.flash, 32, 32, enemy.x, enemy.y, 32, 32);
	/*                       x-corner-canv, y-corner-canv, x-corner-image, y-corner-image , -width, -height image-width, image-height */	
	context.drawImage(mainImage, player.pacmouth, player.pacdir, 32, 32, player.x, player.y, 32, 32);
	context.fillStyle = "#FFF";
	context.fillText("Trials: " + score , 520, 20);
}
//var keyclick = {};
document.addEventListener("keydown", function (e) {
	//keyclick[e.keyCode] = true;
	move(e.keyCode);
}, false);
function move(keycode) {
		if (keycode == 37 ) { player.x-=player.speed;      player.pacdir = 64 }
		else if (keycode == 40) { player.y+=player.speed;      player.pacdir = 32 }
		else if(keycode == 38) { player.y-=player.speed;      player.pacdir = 96 } 
		else if (keycode == 39) { player.x+=player.speed;      player.pacdir = 0 }
		if (player.x >= canvas.width-32) { player.x = 0;}
		else if (player.x < 0) player.x = canvas.width -32;
		if (player.y >= canvas.height-32) player.y = 0;
		else if (player.y < 0 ) player.y = canvas.height-32;
		if(player.pacmouth == 320) player.pacmouth=352;
		else player.pacmouth = 320;
	render();
}
var btn = document.createElement("button");
var t = document.createTextNode("Play Again");       // Create a text node
btn.appendChild(t);    

btn.addEventListener("click", function () {
	score = 3;
	render();
}, false);


document.body.appendChild(canvas);
document.body.appendChild(btn);



















