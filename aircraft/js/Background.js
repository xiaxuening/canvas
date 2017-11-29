var Background = Actor.extend({
    init : function(){
        this.bg = game.R["bg"];
        this.y = 0;
        this.speed = 1
        this._super();
    },
    update : function(){
        this.y+=this.speed;
        if(this.y > 568) this.y = 0;
    },

    render : function(){
        game.ctx.drawImage(this.bg,0,this.y,320,568);
        game.ctx.drawImage(this.bg,0,this.y -568,320,568);
    }
})