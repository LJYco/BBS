/*
 * 管道的一些特征：
 * 0、上下管道是成对出现的，所以x坐标可以共享
 * 1、两个管道之间间隔两个管道，相当于一个管道占用3个管道宽度
 * 2、上下管道的间距是一样的
 * 3、管道高度是随机生成的，如果随机生成了上管道的高度，那么下管道就可以计算了
 * 4、当管道走出画布，从右边出来时，需要重新生成管道的高度
 * 5、第一根管道第一次绘制时，需要和画布产生一个距离
 * */

(function ( w ) {

    /*
     * constructor { Pipe } 管道
     * param { options: Object } 所有的参数
     * param { options.downImage: Image } 口朝下的管道，在画布的上面
     * param { options.upImage: Image } 口朝上的管道，在画布的下面
     * param { options.pipeSpace: number } 上下管道的间距
     * param { options.minHeight: number } 管道最小高度
     * param { renderHeight：number } 上下管道绘制区域的高度
     * */
    function Pipe( options ) {

        // 管道图片
        this.downImg = options.downImg;
        this.upImg = options.upImg;

        // 管道宽高
        this.width = options.downImg.width;
        this.height = options.upImg.height;

        // 管道间距&最小高度&最大高度
        this.pipeSpace = options.pipeSpace || 150;
        this.minHeight = options.minHeight || 100;
        this.maxHeight = options.renderHeight - this.pipeSpace - this.minHeight;

        // 根据数量初始化x坐标( 1个管道占用3个管道宽 )
        this.x = 300 + this.width * 3 * Pipe.len;
        this.y = 0;

        // 统计管道的数量
        Pipe.len++;

        // 每秒初始速度
        this.speed = 100;

        // 加速度
        this.accelerate = 1;
        
        this._initPipeY();
    }
    
    // 管道实例的数量
    Pipe.len = 0;

    // 原型扩展方法
    util.extend(Pipe.prototype, {

        // 计算上下管道的y轴坐标
        _initPipeY: function() {

            // 随机生成上管道高度，并做最小限制
            // var randomHeight = Math.ceil(this.minHeight + Math.random() * (this.maxHeight - this.minHeight));
            var randomHeight = Math.ceil(Math.random() * this.maxHeight);
            randomHeight = randomHeight < this.minHeight? this.minHeight : randomHeight;

            // 根据上管道高，计算上下管道y轴坐标
            this.downY = randomHeight - this.height  // 口朝下管道的y轴坐标
            this.upY = randomHeight + this.pipeSpace;    // 口朝上管道的y轴坐标
        },

        /*
        * function 绘制管道
        * param { drawCtx: Object } 绘制上下文
        * */
        draw: function( drawCtx ) {
            drawCtx.ctx.drawImage( drawCtx.imgMap.pipeDown, this.x, this.downY );
            drawCtx.ctx.drawImage( drawCtx.imgMap.pipeUp, this.x, this.upY );
            this._drawPath( drawCtx );
        },

        /*
         * function 根据管道的宽度以及坐标绘制相应的矩形路径
         * param { drawCtx: Object } 绘制上下文
         * */
        _drawPath: function( drawCtx ) {
            drawCtx.ctx.rect( this.x, this.downY, this.width, this.height );
            drawCtx.ctx.rect( this.x, this.upY, this.width, this.height );
        },

        // 刷新下一帧数据
        update: function( delay ) {

            // 计算最新的x轴坐标 = 初始速度 * 时间 + 加速度 * 时间^2 / 2
            this.x -= this.speed * delay + this.accelerate * delay * delay / 2;

            // 刷新速度 = 初始速度 + 加速度 * 时间
            this.speed = this.speed + this.accelerate * delay;
            
            // 管道走出画布，重新生成管道的上下y轴坐标，再向右拼接，
            if ( this.x < -this.width ) {
                this.x += this.width * 3 * Pipe.len;
                this._initPipeY();
            }
        }
    });

    w.Pipe = Pipe;

}( window ));
