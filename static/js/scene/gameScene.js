(function ( w ) {

    /*
    * constructor { GameScene } 游戏操作的场景
    * */
    function GameScene() {

        // 该场景中所需的角色
        this.roles = [];

        // 获取一个监听者
        this.observer = getObserver();
    }

    // 扩展原型方法
    util.extend( GameScene.prototype, {

        // 创建该场景的所有角色
        initRoles: function( ctx, imgMap ) {
            var i;

            // 清除之前的角色
            this.roles = [];

            // 重新统计角色的数量
            Sky.len = 0;
            Land.len = 0;
            Pipe.len = 0;

            // 背景
            this.roles.push( new Sky({ img: imgMap.sky }) );
            this.roles.push( new Sky({ img: imgMap.sky }) );

            // 管道
            for ( i = 0; i < 6; i++ ) {
                this.roles.push( new Pipe({ downImg: imgMap.pipeDown, upImg: imgMap.pipeUp,
                    renderHeight: ctx.canvas.height - imgMap.land.height }) );
            }

            // 大地
            for ( i = 0; i < 4; i++ ) {
                this.roles.push( new Land({ img: imgMap.land,
                    renderHeight: ctx.canvas.height }) );
            }

            // 计时文字
            this.roles.push( new Timer({ x: ctx.canvas.width, y: 0,
                align: 'right', baseline: 'top', style: 'deeppink'}) );

            // 小鸟
            this.roles.push( new Bird({ img: imgMap.bird, widthFrame: 3 }) );
        },

        // 判断小鸟是否死亡
        isBirdDie: function( ctx, imgMap ) {
            var bird, birdCoreX, birdCoreY;

            // 小鸟的中心坐标
            bird = this.roles[ this.roles.length - 1 ];
            birdCoreX = bird.x + bird.width / 2;
            birdCoreY = bird.y + bird.height / 2;

            // 根据小鸟中心点，判断是否飞出画布或者撞向大地或者撞向管道
            if ( ctx.isPointInPath( birdCoreX, birdCoreY ) || birdCoreY < 0
                    || birdCoreY > ctx.canvas.height - imgMap.land.height){
                return true;
            }

            return false;
        },

        // 添加小鸟死亡的听众
        addListener: function( eventHandle ) {
            this.observer.addListener( 'birdDie', eventHandle );
        },

        /*
        * function 场景绘制
        * param { drawCtx: Object } 绘制上下文
        * */
        draw: function( drawCtx ) {

            // 清除画布&上一次绘制的管道路径
            drawCtx.ctx.clearRect( 0, 0, drawCtx.ctx.canvas.width, drawCtx.ctx.canvas.height );
            drawCtx.ctx.beginPath();

            // 让所有角色开演
            this.roles.forEach( function ( role ) {
                role.draw( drawCtx );
            } );

            // 判断小鸟是否死亡，死亡则发布消息通知
            if ( this.isBirdDie( drawCtx.ctx, drawCtx.imgMap ) ) {
                this.observer.trigger( 'birdDie' );
            }
        },

        // 更新角色在场景中表演下一帧时的数据
        update: function( delay ) {
            this.roles.forEach( function ( role ) {
                role.update( delay );
            } );
        }
    } );

    // 暴露工厂
    w.getGameScene = function () {
        return new GameScene();
    }

}( window ));
