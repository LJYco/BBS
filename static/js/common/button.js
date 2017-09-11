(function( w ) {
    /*
     * constructor { Button } 按钮
     * param { x : number } x轴坐标
     * param { y : number } y轴坐标
     * param { width : number } 宽度
     * param { height : number } 高度
     * param { text : string } 文本
     * param { lineWidth : number } 边框线宽
     * param { radius : number } 按钮圆角半径
     * param { font : number } 文本样式
     * param { fillStyle : string } 文本样式
     * param { buttonStyle : string } 按钮样式
     * */
    function Button( options ) {
        this.x = options.x;
        this.y = options.y;
        this.width = options.width || 200;
        this.height = options.height || 50;
        this.lineWidth = options.lineWidth || 4;
        this.radius = options.radius || 10;
        this.text = options.text;
        this.font = options.font || '20px 微软雅黑';
        this.textStyle = options.textStyle;
        this.buttonStyle = options.buttonStyle;
    }

    // 扩展原型方法
    Button.prototype = {
        constructor: Button,

        // 绘制按钮和文本
        draw: function( drawCtx ) {
            drawCtx.ctx.save();

            // 清除路径&绘制按钮
            drawCtx.ctx.beginPath();
            drawCtx.ctx.strokeStyle = this.buttonStyle;
            drawCtx.ctx.lineWidth = this.lineWidth;
            this._drawSide( drawCtx.ctx );
            this._drawCorner( drawCtx.ctx );
            drawCtx.ctx.stroke();

            // 绘制文本
            this._drawText( drawCtx );

            drawCtx.ctx.restore();
        },

        // 绘制按钮4条边
        _drawSide: function( ctx ) {
            // 上边
            ctx.moveTo( this.x + this.radius, this.y );
            ctx.lineTo( this.x + this.width - this.radius, this.y );
            // 右边
            ctx.moveTo( this.x + this.width, this.y + this.radius );
            ctx.lineTo( this.x + this.width, this.y + this.height - this.radius );
            // 下边
            ctx.moveTo( this.x + this.width - this.radius, this.y + this.height );
            ctx.lineTo( this.x + this.radius, this.y + this.height );
            // 左边
            ctx.moveTo( this.x, this.y + this.height - this.radius );
            ctx.lineTo( this.x, this.y + this.radius );
            ctx.stroke();
        },

        // 绘制按钮4个圆角角落
        _drawCorner: function( ctx ) {
            // 左上角
            ctx.moveTo( this.x, this.y + this.radius );
            ctx.arcTo( this.x, this.y,
                this.x + this.radius, this.y, this.radius );
            // 右上角
            ctx.moveTo( this.x + this.width - this.radius, this.y );
            ctx.arcTo( this.x + this.width, this.y,
                this.x + this.width, this.y + this.radius, this.radius );
            // 右下角
            ctx.moveTo( this.x + this.width, this.y + this.height - this.radius );
            ctx.arcTo( this.x + this.width, this.y + this.height,
                this.x + this.width - this.radius, this.y + this.height, this.radius );
            // 左下角
            ctx.moveTo( this.x + this.radius, this.y + this.height );
            ctx.arcTo( this.x, this.y + this.height,
                this.x, this.y + this.height - this.radius, this.radius );
        },

        // 绘制按钮内的文字
        _drawText: function( drawCtx ) {
            getText( {
                text: this.text,
                x: this.x + this.width / 2,
                y: this.y + this.height / 2,
                font: this.font,
                style: this.textStyle
            } ).draw( drawCtx );
        }
    };

    // 暴露工厂函数
    w.getButton = function ( options ) {
        return new Button( options );
    };

}( window ));
