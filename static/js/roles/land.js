(function ( w ){

    /*
     * constructor { Land } 大地
     * param { options: Object } 所有的参数
     * param { options.img: Image } 大地图片
     * param { renderHeight：number } 大地绘制区域的高度
     * */
    function Land( options ) {

        this.img = options.img;

        // 根据大地数量初始化x坐标，根据场景高初始化y坐标
        this.x = options.img.width * Land.len;
        this.y = options.renderHeight - options.img.height;

        // 统计大地的数量
        Land.len++;

        // 初始速度
        this.speed = 100;
    }

    // 记录大地的数量
    Land.len = 0;

    // 扩展原型
    Land.prototype = {
        constrcutor: Land,

        /*
        * function 绘制大地
        * param { drawCtx: Object } 绘制上下文
        * */
        draw: function( drawCtx ) {
            drawCtx.ctx.drawImage( drawCtx.imgMap.land, this.x, this.y );
        },

        // 更新下一帧数据
        update: function( delay ) {

            // 匀速
            this.x -= this.speed * delay;

            // 走出画布，向右拼接，实现无缝轮播
            if (this.x < -this.img.width) {
                this.x += this.img.width * Land.len;
            }
        }
    };

    w.Land = Land;

}( window ));
