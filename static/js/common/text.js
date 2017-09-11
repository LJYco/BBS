(function (w) {
    /*
     * constructor { Text } 文本
     * param { options: Object } 所有的参数
     * param { text : string } 绘制的文本
     * param { x : number } x轴坐标
     * param { y : number } y轴坐标
     * param { font : number } 文本样式
     * param { style : string } 文本颜色
     * param { align : string } 横向对其方式
     * param { baseline : string } 纵向对其方式
     * */
    function Text( options ) {
        this.text = options.text;
        this.x = options.x;
        this.y = options.y;
        this.fillStyle = options.style;
        this.font = options.font || '24px 微软雅黑';
        this.align = options.align || 'center';
        this.baseline = options.baseline || 'middle';
    }

    /*
    * function 把指定文本绘制到画布上
    * param { drawCtx: Object } 绘制上下文
    * */
    Text.prototype.draw = function( drawCtx ) {

        // 把默认的状态保存一份
        drawCtx.ctx.save();

        drawCtx.ctx.font = this.font;
        drawCtx.ctx.textAlign = this.align;
        drawCtx.ctx.textBaseline = this.baseline;
        drawCtx.ctx.fillStyle = this.fillStyle;
        drawCtx.ctx.fillText(this.text, this.x, this.y);

        // 文本绘制完毕后，恢复默认的状态
        drawCtx.ctx.restore();
    };

    // 暴露工厂函数
    w.getText = function ( options ) {
        return new Text( options );
    };

    // 把构造函数通过原型一起暴露到外界。
    w.getText.prototype.init = Text;

}(window));
