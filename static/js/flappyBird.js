(function(w) {

    /*
     * constructor { FlappyBird } 飞翔的小鸟游戏
     * param { gameContainer: string } 元素选择器，用来获取展示游戏的容器
     * */
    function FlappyBird(gameContainer) {

        // 游戏画面的宽高
        this.width = 800;
        this.height = 600;

        // 获取绘图上下文
        this.ctx = util.getCanvasContext(gameContainer, this.width, this.height);

        // 游戏所需的图片资源地址&游戏所需的图片资源
        this.imgSrc = {
            bird: '/static/img/bird.png',
            land: '/static/img/land.png',
            pipeDown: '/static/img/pipeDown.png',
            pipeUp: '/static/img/pipeUp.png',
            sky: '/static/img/sky.png'
        };
        this.imgMap = {};

        // 载入场景、游戏场景和结束场景
        this.loadingScene = getLoadingScene({
            loadingText: 'Flappy Bird'
        });
        this.gameScene = getGameScene();
        this.overScene = getOverScene();

        var self = this;

        // loading退场进入游戏场景
        this.loadingScene.addListener(function() {
            self._loadImg(function() {
                self.run();
            });
        });

        // 添加小鸟死亡听众(游戏场景退场)
        this.gameScene.addListener(function() {
            self.end();
        });

        // over退场重新进入游戏场景
        this.overScene.addListener(function() {
            self.run();
        });

        // 游戏开关
        this.isRun = false;

        // 上一帧的时间&当前帧的时间&两帧间隔时间(单位秒)
        this.lastFrameTime = 0;
        this.currentFrameTime = 0;
        this.delay = 0;
    }

    // 扩展原型方法
    FlappyBird.prototype = {
        constructor: FlappyBird,

        // 初始化游戏资源
        _loadImg: function(cbk) {
            var self = this;
            util.getImage(this.imgSrc, function(imgMap) {
                self.imgMap = imgMap;
                cbk();
            });
        },

        // 绘制游戏
        run: function() {

            // 初始化游戏角色
            this.gameScene.initRoles(this.ctx, this.imgMap);

            // 重新计算last时间
            this.lastFrameTime = Date.now();

            var self = this;

            // 播放游戏场景
            self.isRun = true;
            (function loop() {
                if (self.isRun) {
                    self.draw();
                    requestAnimationFrame(loop);
                }
            }());
        },

        // 绘制场景内容
        draw: function() {

            // 第一次绘制该场景时last时间为最新时间
            this.lastFrameTime = this.lastFrameTime || Date.now();

            // 当前帧绘制的时间
            this.currentFrameTime = Date.now();

            // 当前帧与上一帧的时间间隔，以秒为单位计算
            this.delay = (this.currentFrameTime - this.lastFrameTime) / 1000;

            // 上一帧绘制的时间
            this.lastFrameTime = this.currentFrameTime;

            // 绘制上下文
            var drawCxt = {
                game: this,
                imgMap: this.imgMap,
                ctx: this.ctx,
                cvs: this.ctx.canvas,
                lastFrameTime: this.lastFrameTime,
                currentFrameTime: this.currentFrameTime,
                delay: this.delay
            };

            // 绘制游戏画面，可能触发birdDie事件
            this.gameScene.draw(drawCxt);
            this.gameScene.update(this.delay);
        },

        /*
         * 先切入loadding场景，然后加载游戏资源，
         * 加载完毕后初始化剩余的场景对象，
         * 再监听游戏场景中小鸟的死亡事件，
         * 最后轮回播放场景内容。
         * */
        start: function() {
            var self = this;
            this.loadingScene.draw({
                ctx: this.ctx
            });
        },

        // 暂停游戏，休息场景切入(暂无)
        pause: function() {
            this.isRun = false;
        },

        // 结束游戏，结束场景切入
        end: function() {
            this.isRun = false;
            this.overScene.draw({
                ctx: this.ctx
            });
        }
    }

    // 单例模式
    var game = null;
    w.getFlappyBird = function(gameContainer) {
        if (!game) {
            game = new FlappyBird(gameContainer);
        }
        return game;
    };

}(window));