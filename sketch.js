var pipes=[];
var bird;
var score=0;
document.getElementById("a").style.textAlign = "center";
document.getElementById("a").style.fontSize = "xx-large";
document.getElementById('a').innerHTML="Press Spacebar to Play"+'<br>';
function setup(){
    createCanvas(400,600);
    bird= new Bird();
    pipes.push(new Pipe());
}    

function draw(){
    background(0);
    for(var i=pipes.length-1;i>=0;i--)
    {      
        pipes[i].update();
        pipes[i].show();
        if(pipes[i].hit(bird))
        {
            var ctx = canvas.getContext("2d");
            ctx.font = "30px Arial";
            ctx.fillText("GAME OVER",width/2-90,height/2);
            flag=1;
            exit();
        }
        if(pipes[i].pass(bird))
        {
            score++;
            document.getElementById("a").style.textAlign = "center";
            document.getElementById("a").style.fontSize = "xx-large";
            document.getElementById('a').innerHTML= "Score: " + Math.round(score/3);     
        }

        if(pipes[i].offscreen()){
            pipes.splice(i,1);
        }
    }

    bird.update();
    bird.show();
    if(frameCount%70==0)
        pipes.push(new Pipe());
}    
function keyPressed(){
    if(key==' ')
    {
        bird.velocity+=-15;
    }
}
function reload(event){
    location.reload();
}

function Pipe(){
    this.up=random(height/4,height/2);
    this.bottom=random(height/4,height/2);
    this.x=width;
    this.w=20;
    this.speed=-5;

    this.hit=function(bird){
        if(bird.y < this.up || bird.y > height-this.bottom){
            if(bird.x > this.x && bird.x < this.x+this.w){
                return true;
            }
        }
        return false
    }  
    this.pass=function(bird){
        if(bird.y > this.up || bird.y < height-this.bottom){
            if(bird.x > this.x && bird.x < this.x+this.w){
                return true;
            }
        }
        return false
    }

    this.show=function(){
        fill(255);
        rect(this.x,0,this.w,this.up);
        rect(this.x,height-this.bottom,this.w,this.bottom);
    }

    this.update=function(){
        this.x+=this.speed;
    }

    this.offscreen=function(){
        if(this.x<-this.w)
            return true;
        else
            return false;
    }
}



function Bird(){
    this.x=20;
    this.y=height/2;
    this.gravity=1;
    this.velocity=0;
    this.show=function(){
        fill(255);
        ellipse(this.x,this.y,20,20);
    }
    this.update=function(){
        this.velocity+=this.gravity;
        this.y+=this.velocity;
        if(this.y>height)
        {
            this.y=height;
            this.velocity=0;
        }   
        if(this.y<0)
        {
            this.y=0;
            this.velocity=0;
        }
    }
}
