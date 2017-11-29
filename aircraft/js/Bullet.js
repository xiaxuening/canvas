var Bullet = Actor.extend({
    init : function(x,y,o){
        this.Img = game.R['bullet1'];
        this.x = x;
        this.y = y;
        this.o = o;
        this.speed = 0.5

        this._super();
    },
    update : function(x){

        if(this.o == game.fj){
            this.y -=this.speed * 30;
            if(this.y < -14){
                this.die();
            };
            if(x && x >= 33 && x <= 320 -33){
                this.x = x;
            }
        }else{
            this.y +=this.speed * 30;
            if(this.y > 568){
                this.die();
            };
        }

    },
    render : function(){
        game.ctx.drawImage(this.Img,this.x,this.y,6,14);

        if(this.o == game.enemy){
            if(this.y > game.fj.y  &&  this.y < game.fj.y+80 && this.x > game.fj.x && this.x < game.fj.x+66){
            }
        }else if (this.y > game.enemy.y  &&  this.y < game.enemy.y+game.enemy.height && this.x > game.enemy.x && this.x < game.enemy.x+game.enemy.width){

               game.enemy.life--;
               if(game.enemy.life < 0){
                   game.enemy.huantu();
                   game.enemy.die();
               }

        }

    },
    die : function(){
        game.actors = _.without(game.actors,this)
    }
})