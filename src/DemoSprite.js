var DemoSprite = cc.Sprite.extend({
    onEnter:function () {
        cc.log("onEnter");
        this._super();

        this.addTouchEventListener();
    },
    onExit:function () {
        cc.log("onExit");
        this._super();
    },
    addTouchEventListener:function(){
		this.touchListener = cc.EventListener.create({
			event: cc.EventListener.TOUCH_ONE_BY_ONE,
			swallowTouches: true,
			onTouchBegan: function (touch, event) {
				var pos = touch.getLocation();
				var target = event.getCurrentTarget();
				if ( cc.rectContainsPoint(target.getBoundingBox(),pos)) {
//					target.removeTouchEventListener();
					//响应精灵点中
//					cc.log("pos.x="+pos.x+",pos.y="+pos.y);
					target.stopAllActions();

                    var frames = [];
                    for (var i = 1; i < 6; i++) {
                        var str = "0"+i+".png";
//                        cc.log(str);
                        var frame = cc.spriteFrameCache.getSpriteFrame(str);
                        frames.push(frame);
                    }

                    var animation = new cc.Animation(frames, 0.02);
                    var action = new cc.Animate(animation);
					target.runAction(action);

					return true;
				}
				return false;
			}
		});

		cc.eventManager.addListener(this.touchListener,this);
	},
	removeTouchEventListener:function(){
        cc.eventManager.removeListener(this.touchListener);
    }
});
