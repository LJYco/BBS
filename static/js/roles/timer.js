(function (w) {
    /*
     * constructor { Timer } 计时器
     * param { ctx : Context } 绘图环境对象
     * param { x : number } 绘制文本时候的x轴坐标
     * param { y : number } 绘制文本时候的y轴坐标
     * param { font : number } 绘制文本时的样式
     * param { align : string } 绘制文本时的横向对其方式
     * param { baseline : string } 绘制文本时的纵向对其方式
     * param { fillStyle : string } 绘制文本时的颜色
     * */
    function Timer( options ) {
        getText.prototype.init.call(this, options); // 借用Text构造函数给实例添加属性
        this.durationTime = 0;  // 游戏运行时长
        this.text = '坚持了0小时0分钟0秒！'; // 默认的文本
    }

    // Timer实例继承Object.create返回的对象，
    // 这个对象继承Text.prototype,
    // 那么DateText实例就间接继承了Text.prototype。
    Timer.prototype = Object.create( getText.prototype.init.prototype );

    // 给原型扩充方法
    util.extend( Timer.prototype, {

        // 更新下一帧时绘制的文本
        update: function( delay ) {

            // 更新游戏运行时长(单位秒)
            // 然后根据这个时长，动态设置text为可读性比较强的文本
            this.durationTime += delay;
            var hours = Math.floor(this.durationTime / (60 * 60));
            var minutes = Math.floor(this.durationTime % (60 * 60) / 60);
            var seconds = Math.floor(this.durationTime % 60);
            this.text = '坚持了' + hours + '小时' + minutes + '分钟' + seconds + '秒！';
        }
    });

    w.Timer = Timer;

}(window));
