var util = {

    // 角度转换为弧度
    angleToRadian: function (angle) {
        return Math.PI / 180 * angle;
    },

    /*
    * 混入继承
    * */
    extend: function (o1, o2) {
        for ( var key in o2 ) {
            // 只把o2自己的属性copy到o1身上
            if ( o2.hasOwnProperty(key) ) {
                o1[key] = o2[key];
            }
        }
    },

    /*
     * @function { getCanvasContext } 创建画布，并返回画布的绘图环境
     * @param { containerSelector: string } 用来获取存放canvas的容器
     * @param { width: number } 画布的宽
     * @param { height: number } 画布的高
     * @return { Context ｝ 并返回画布的绘图环境
     * */
    getCanvasContext: function( containerSelector, width, height ) {
        var canvas = document.createElement( 'canvas' );
        width && (canvas.width = width);
        height && (canvas.height = height);
        containerSelector && (document.querySelector( containerSelector ).appendChild( canvas ));
        return canvas.getContext( '2d' );
    },

    /*
     * function { getImage } 用来加载图片资源
     * param { imgUrl: Object } 要加载图片的url
     * */
    getImage: function( imgUrl, callback ) {
        var imgNames = Object.keys( imgUrl ),
            i = 0,
            len = imgNames.length,
            key, img,
            imgObj = {},
            imgLoadedNumber = 0;

        // 遍历所有的图片url，依次创建图片对象，
        // 然后把创建好的图片对象添加到imgObj中
        for ( ; i < len; i++ ) {
            key = imgNames[i];
            img = new Image();
            img.src = imgUrl[key];
            imgObj[key] = img;
            img.addEventListener('load', function () {
                // 当所有图片加载完毕后，执行回调，
                // 并把加载好的图片资源对象传过去
                if ( ++imgLoadedNumber >= len ) {
                    callback( imgObj );
                }
            });
        }
    }
};
