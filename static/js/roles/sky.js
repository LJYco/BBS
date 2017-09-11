(function ( w ) {

    /*
     * constructor { Sky } 天空
     * param { options: Object } 所有的参数
     * param { options.img: Image } 天空图片
     * */
    function Sky( options ) {

        this.img = options.img;

        // 根据数量初始化x坐标
        this.x = options.img.width * Sky.len;
        this.y = 0;

        // 统计天空的数量
        Sky.len++;

        // 初始速度
        this.speed = 100;
    }

    // 记录天空的数量
    Sky.len = 0;

    // 给原型扩展方法
    Sky.prototype = {
        constructor: Sky,

        /*
        * function 绘制背景
        * param { drawCtx: Object } 绘制上下文
        * */
        draw: function( drawCtx ) {
            drawCtx.ctx.drawImage( drawCtx.imgMap.sky, this.x, this.y );
        },

        // 计算下一帧数据
        update: function( delay ) {

            // 匀速
            this.x -= this.speed * delay;

            // 如果背景走出画布，那么该画布向右拼接
            if ( this.x < -this.img.width ) {
                this.x += this.img.width * Sky.len;
            }
        }
    };

    w.Sky = Sky;

}(window));