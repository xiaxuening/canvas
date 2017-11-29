var Actor = Class.extend({
    //构造函数
    init : function(){
        //把自己push到Game的演员数组
        game.actors.push(this);
    },
    update : function(){

    },
    render : function(){
        throw new Error("必须重写render方法");
    }
})