let point = 10;
let t = 1000;
let head;
let interval;
let level;


let config = {
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
    this.load.image('bee','script/Assets/bee.png')
}
function create(){
    let W = game.config.width;
    let H = game.config.height;
    head = this.add.text(20,10,'Catch The Bee',{ font: `30px Arial`, fill: '#fff' })
    this.score = 0;
    this.scoreText = '';
    
    this.bee = this.add.sprite(W/2,H/2,'bee').setScale(W*H/3000000);
    this.bee.setInteractive();

    
    this.bee.on('pointerdown',addscore,this);
    this.input.on('pointerdown',run,this);


}
function update(){
    
}

function run(){
    interval = setInterval(appear,t,this.bee);
    
    this.input.off('pointerdown', run);
    head.setText("")
    let style = { font: `20px Arial`, fill: '#fff' };

    this.scoreText = this.add.text(20, 20, 'score: ' + this.score, style);
    level = setInterval(levelup,5000,this.bee);

}
function appear(q){
    q.x = Phaser.Math.Between(50,game.config.width-30);
    q.y = Phaser.Math.Between(50,game.config.width-30);
}

function addscore(){
    this.score+=point;
    console.log(this.score)
    this.scoreText.setText('score: ' + this.score);

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
