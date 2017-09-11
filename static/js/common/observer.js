(function( w ) {

    /*
    * constructor { Observer } 观察者
    * */
    function Observer() {
        this.listeners = {}; // 按照事件类型存储听众列表
    }

    // 扩展原型方法
    util.extend( Observer.prototype, {

        // 添加听众，如果是第一个监听此消息的听众，则创建一个新事件的听众列表
        addListener: function( eventType, eventHandle ) {
            (this.listeners[ eventType ] || (this.listeners[ eventType ] = []) )
                .push( eventHandle );
        },

        // 发布消息，如果存在此消息的听众，则一一告知
        trigger: function( eventType, data ) {
            var listes = this.listeners[ eventType ];
            listes && listes.forEach( function( eventHandle ) {
                eventHandle( data );
            });
        }

    } );

    // 暴露工厂
    w.getObserver = function() {
        return new Observer();
    };

}( window ));
