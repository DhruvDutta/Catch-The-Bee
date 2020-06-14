let point = 10;
let t = 1000;
let head;
let interval;
let level;
let play;
let pre_x=window.innerWidth/2;
let bee;
let score =0;
let scoreText ='';
let beespeed=1;
if(localStorage.getItem('highscore')==null){
    localStorage.setItem('highscore',0)
}else{
    highscore = localStorage.getItem('highscore')
}


let config = {
    type: Phaser.AUTO,
    width: window.innerWidth - 16,
    height:window.innerHeight-16,
    backgroundColor:'#ccc',
    scene:{
        preload:preload,
        create:create,
        update:update,
    }
}

let game = new Phaser.Game(config)
function preload(){
    this.load.image('bee','script/Assets/bee.png');
    this.load.image('back','script/Assets/back1.jpg');

}
function create(){
    let W = game.config.width;
    let H = game.config.height;
    this.back = this.add.sprite(W/2,H/2,'back').setScale(.6)
    this.back.setInteractive();
    head = this.add.text(20,10,'Catch The Bee',{ font: `30px Arial`, fill: '#fff' })

    this.highscore = '';
    bee = this.add.sprite(W/2,H/2-50,'bee').setScale(W*H/3000000);
    bee.setInteractive();
    play = this.add.text(W/2-60,H/2,'Play',{font:'70px Arial',fill:'#fff',align:'center'})
    play.alpha=.2;
    this.tweens.add({
        targets: [bee],
        y: (H/2)-20,
        duration: 1500,
        ease: 'Sine.easeInOut',
        loop: -1,
        yoyo: true
    });
    this.tweens.add({
        targets:[play],
        alpha:1,
        duration:700,
        ease:'Sine.easeInOut',
        loop:-1,
        yoyo:true
    })
    this.input.on('pointerdown',run,this);
    flyto()
}
function update(){
   /* if(bee.x<x-1){
        bee.x+=beespeed;
    }else if(bee.x>x+1){
        bee.x-=beespeed;
    }else{
        flyto();
    }
    if(bee.y<y){
        bee.y+=beespeed;
    }else if(bee.y>y){
        bee.y-=beespeed;
    }else{
        flyto();
    }
 */   
}
let x;
let y;

function flyto(){
    x = Phaser.Math.Between(50,game.config.width-30);
    y = Phaser.Math.Between(50,game.config.width-30);
    console.log(x,y)
    
}


function run(){
    this.tweens.killTweensOf(play)
    
    interval = setInterval(appear,t,bee);
    bee.on('pointerdown',addscore,this);
    this.back.on('pointerdown',subscore,this);

    this.input.off('pointerdown');
    head.setText("")
    play.setText("")
    let style = { font: `20px Arial`, fill: '#fff' };

    scoreText = this.add.text(10, 30, 'score: ' + score, style);
    this.highscore = this.add.text(10, 10, 'HighScore: ' + localStorage.getItem('highscore'), style);

    level = setInterval(levelup,12000,bee);

}
function appear(q){
    q.x = Phaser.Math.Between(50,game.config.width-30);
    q.y = Phaser.Math.Between(50,game.config.width-30);
    if(bee.x>pre_x){
        bee.setFlip(true,false);
        pre_x=bee.x;
    }else{
        bee.setFlip(false,false);
        pre_x=bee.x;
    }
    
}

function addscore(){
    score+=point;
    scoreText.setText('score: ' + score);
    if(localStorage.getItem('highscore')<score){
        localStorage.setItem('highscore',score)
        this.highscore.setText('HighScore:'+score)
    }

}
function subscore(){
    score-=point/2;
    scoreText.setText('score: ' + score);
    if(score<0){
        document.write('<center><h2 style="margin-top:50vh;">Game Over</h2><hr><a href="https://dhruvdutta.github.io/mywebsite/">View More</a><hr></center>')
        throw new Error('Game Over');
    };
}

function changetime(){
    if(t>200){
        t-=200;
        point+=20;

    }else{
        clearInterval(level)
    }
}

function levelup(b){
    changetime();
    clearInterval(interval);
    interval = setInterval(appear,t,b);
}



