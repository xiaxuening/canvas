var Scene = Actor.extend({
    init : function(){
        this.bindEvent();
    },
    changeScene : function(num){
        //信号量关联
        game.sceneNum = num;

        switch(num){
            case 0:

                break;
            case 1:
                game.actors=[];
                game.bg = new Background();
                game.fj = new Aircraft();

                break;
            case 2:

                break;
        }
    },
    show : function(){
        switch(game.sceneNum){
            case 0:


                break;
            case 1:
                if(game.f % 80 == 0){
                  game.enemy =   new Enemy();
                }
                _.each(game.actors,function(actor){
                    actor.update();
                    actor.render();
                });

                break;
            case 2:


                break;

        }
    },
    bindEvent : function(){
        $(game.canvas).mousemove(function(event){
            game.fj.update(event.offsetX,event.offsetY);
            game.fj.bullet.update(event.offsetX)
        })
    }
})