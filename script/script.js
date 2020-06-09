let point = 10;
let t = 1000;
let head;
let config = {
    width: window.innerWidth,
    height:window.innerHeight,
    backgroundColor:'#ccc',
    scene:{
        preload:preload,
        create:create,
        update:update,
    }
}

let game = new Phaser.Game(config)
function preload(){
    this.load.image('bee','Assets/bee.png')
}
function create(){
    let W = game.config.width;
    let H = game.config.height;
    head = this.add.text(20,10,'Catch The Bee',{ font: `30px Arial`, fill: '#fff' })
    this.score = 0;
    this.scoreText = '';
    
    this.bee = this.add.sprite(W/2,H/2,'bee').setScale(.1);
    
    this.input.on('pointerdown',run,this)

}
function update(){
    
}

let interval;
let level;
function run(){
    interval = setInterval(appear,t,this.bee);
    this.input.on('pointerdown',addscore,this)
    this.input.off('pointerdown', run);
    head.setText("")
    let style = { font: `20px Arial`, fill: '#fff' };

    this.scoreText = this.add.text(20, 20, 'score: ' + this.score, style);
    level = setInterval(levelup,5000,this.bee);
}
function appear(q){
    q.x = Phaser.Math.Between(50,game.config.width-50);
    q.y = Phaser.Math.Between(50,game.config.width-50);
}

function addscore(){
    this.score+=point;
    console.log(this.score)
    this.scoreText.setText('score: ' + this.score);

}

function changetime(){
    if(t>500){
        t-=500;
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