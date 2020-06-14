let point = 10;
let t = 1000;
let head;
let interval;
let level;
let play;
let pre_x=window.innerWidth/2;

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
    this.score = 0;
    this.scoreText = '';
    this.highscore = '';
    this.bee = this.add.sprite(W/2,H/2-50,'bee').setScale(W*H/3000000);
    this.bee.setInteractive();
    play = this.add.text(W/2-60,H/2,'Play',{font:'70px Arial',fill:'#fff',align:'center'})
    play.alpha=.2;
    this.tweens.add({
        targets: [this.bee],
        y: W/2+10,
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

}
function update(){
    
}

function run(){
    this.tweens.killTweensOf(play)
    
    interval = setInterval(appear,t,this.bee);
    this.bee.on('pointerdown',addscore,this);
    this.back.on('pointerdown',subscore,this);

    this.input.off('pointerdown');
    head.setText("")
    play.setText("")
    let style = { font: `20px Arial`, fill: '#fff' };

    this.scoreText = this.add.text(10, 30, 'score: ' + this.score, style);
    this.highscore = this.add.text(10, 10, 'HighScore: ' + localStorage.getItem('highscore'), style);

    level = setInterval(levelup,12000,this.bee);

}
function appear(q){
    q.x = Phaser.Math.Between(50,game.config.width-30);
    q.y = Phaser.Math.Between(50,game.config.width-30);
    if(q.x>pre_x){
        q.setFlip(true,false);
        pre_x=q.x;
    }else{
        q.setFlip(false,false);
        pre_x=q.x;
    }
    
}

function addscore(){
    this.score+=point;
    this.scoreText.setText('score: ' + this.score);
    if(localStorage.getItem('highscore')<this.score){
        localStorage.setItem('highscore',this.score)
        this.highscore.setText('HighScore:'+this.score)
    }

}
function subscore(){
    this.score-=point/2;
    this.scoreText.setText('score: ' + this.score);
    if(this.score<0){
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
