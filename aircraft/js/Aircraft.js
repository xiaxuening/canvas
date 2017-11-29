var Aircraft = Actor.extend({
    init : function(x,y){
        this.Img = game.R['my'];
        this.x = (320 -66) /2;
        this.y = (568-80);
        this._super();
    },
    update : function(x,y){
        if(x && y){
            if(x >= 33 && x <= 320 -33){
                this.x = x - 33;
            };
            if(y >= 40 && y <= 568 -40){
                this.y = y - 40;
            }

        }
    },
    render : function(){
        game.ctx.drawImage(this.Img,this.x,this.y,66,80);
        if(game.f % 2 == 0){
            this.bullet = new Bullet(this.x+33,this.y-20,this);
        }

    }


})