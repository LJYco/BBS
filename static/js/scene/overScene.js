(function( w ) {
    /*
     * constrcutor { OverScene } 游戏结束场景
     * param { options: Object } 所有的参数
     * param { overText: string } over提示语
     * */
    function OverScene( overText ) {
        this.overText = overText || 'GAME OVER!';

        // 提示语大小和坐标
        this.font = '900 30px 微软雅黑';
        this.textX = 0;
        this.textY = 0;

        // 按钮大小和坐标
        this.btnWidth = 400;
        this.btnHeight = 100;
        this.btnFont = '900 40px 微软雅黑';
        this.btnX = 0;
        this.btnY = 0;

        // 获取一个监听者
        this.observer = getObserver();
    }

    // 给原型扩充方法
    util.extend( OverScene.prototype, {

        // 初始化按钮坐标
        _initBtnCoord: function( canvas ) {
            // 画布中心
            var centerX = canvas.width / 2,
                centerY = canvas.height / 2;

            // 按钮绘制在画布正中间
            this.btnX = centerX - this.btnWidth / 2;
            this.btnY = centerY - this.btnHeight / 2;

            // 提示语绘制在按钮上面
            this.textX = centerX;
            this.textY = this.btnY - 50;
        },

        // 绘制场景
        draw: function( drawCtx ) {

            // 阴影
            drawCtx.ctx.save();
            drawCtx.ctx.fillStyle = 'rgba( 100, 100, 100, 0.8 )';
            drawCtx.ctx.fillRect( 0, 0, drawCtx.ctx.canvas.width, drawCtx.ctx.canvas.height );
            drawCtx.ctx.restore();

            // 初始化文字按钮坐标
            this._initBtnCoord( drawCtx.ctx.canvas );

            // 绘制提示语
            getText({
                x: this.textX,
                y: this.textY,
                text: this.overText,
                style: 'red',
                font: this.font,
                align: 'center',
                baseline: 'bottom'
            }).draw( drawCtx );

            // 重新开始按钮
            getButton({
                x: this.btnX,
                y: this.btnY,
                width: this.btnWidth,
                height: this.btnHeight,
                text: '重新开始',
                font: this.btnFont,
                textStyle: 'gold',
                buttonStyle: 'gold',
            }).draw( drawCtx );

            // 绑定按钮点击事件
            this._bind( drawCtx.ctx );
        },

        // 添加场景退场事件
        addListener: function( eventHandle ) {
            this.observer.addListener( 'overEnd', eventHandle );
        },

        // 绑定按钮点击事件( 触发场景退场事件 )
        _bind: function( ctx ) {
            var self = this;
            ctx.rect( this.btnX, this.btnY, this.btnWidth, this.btnHeight );
            ctx.canvas.addEventListener('click', function handle( e ) {
                var x = e.pageX - ctx.canvas.offsetLeft;
                var y = e.pageY - ctx.canvas.offsetTop;
                if ( ctx.isPointInPath( x, y ) ) {
                    // 取消事件绑定，触发场景退场事件
                    ctx.canvas.removeEventListener( 'click', handle );
                    self.observer.trigger( 'overEnd' );
                }
            });
        }
    } );

    // 暴露工厂
    w.getOverScene = function() {
        return new OverScene();
    }
    
}( window ));