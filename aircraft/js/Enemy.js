var Enemy = Actor.extend({
    init : function(){
        this.type = _.random(0,2);

        this.Img = [game.R["enemy1_fly_1"],game.R["enemy2_fly_1"],game.R["enemy3_fly_1"]][this.type];
        this.Bz = [game.R["xx"],game.R["dd"],game.R["zz"]][this.type];
        switch(this.type){
            case 0:
                this.x = _.random(34,286);
                this.height = 15;
                this.width = 16;
                this.life = 5;
                break;
            case 1:
                this.x = _.random(110,210);
                this.height = 156;
                this.width = 55;
                this.life = 10;
                break;
            case 2:
                this.x = _.random(46,274);
                this.height = 47;
                this.width = 22.5;
                this.life = 8;
                break;

        };
        this.y = 0;
        this.speed = 0.1;
        this._super();
    },
    update : function(){
        this.y += this.speed * 2;
        if(this.y > 568){
            this.die();
        };
    },
    render : function(){
        game.ctx.drawImage(this.Img,this.x,this.y);
        // if(game.f % 30 == 0){
        //     this.bullet = new Bullet(this.x + this.width ,this.y+this.height,this);
        // }

    },
    die : function(){
        game.actors = _.without(game.actors,this);
        console.log(1111);
    },
    huantu : function(){
        game.ctx.drawImage(this.Bz,this.x,this.y);
    }
})