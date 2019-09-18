export default Behavior({
  data: { holding: true },

  definitionFilter(defFields) {
    defFields.lifetimes = defFields.lifetimes || {};
    defFields.pageLifetimes = defFields.pageLifetimes || {};
    defFields.methods = defFields.methods || {};

    const { created, attached, ready, moved, detached } = defFields.lifetimes;
    const { show, hide, resize } = defFields.pageLifetimes;
    const {
      onLoad,
      onShow,
      onReady,
      onHide,
      onUnload,
      onShareAppMessage,
      onResize,
      onPageScroll,
      onPullDownRefresh,
      onReachBottom,
      onTabItemTap,
    } = defFields.methods;

    defFields.methods.unhold = function() {
      this.setData({ holding: false }, () => {
        if (this._didCreate) {
          if (created) {
            created.call(this);
          }
        }
        if (this._didReady) {
          if (ready) {
            ready.call(this);
          }
          if (onReady) {
            onReady.call(this);
          }
        }
        if (this._didAttach) {
          if (attached) {
            attached.call(this);
          }
          if (onLoad) {
            onLoad.call(this, this.options);
          }
        }
        if (this._didShow) {
          if (show) {
            show.call(this);
          }
          if (onShow) {
            onShow.call(this);
          }
        }
      });
    };

    function createMethodForHold(method, cancel) {
      return function() {
        if (this.data.holding) {
          if (cancel) {
            return cancel.apply(this, arguments);
          }
          return;
        }

        if (method) {
          return method.apply(this, arguments);
        }
      };
    }

    defFields.lifetimes.created = createMethodForHold(created, function() {
      this._didCreate = true;
    });
    defFields.lifetimes.ready = createMethodForHold(ready, function() {
      this._didReady = true;
    });
    defFields.lifetimes.attached = createMethodForHold(attached, function() {
      this._didAttach = true;
    });
    defFields.lifetimes.detached = createMethodForHold(detached, function() {
      this._didAttach = false;
    });
    defFields.pageLifetimes.show = createMethodForHold(show, function() {
      this._didShow = true;
    });
    defFields.pageLifetimes.hide = createMethodForHold(hide, function() {
      this._didShow = false;
    });
    if (moved) {
      defFields.lifetimes.moved = createMethodForHold(moved);
    }
    if (resize) {
      defFields.pageLifetimes.resize = createMethodForHold(resize);
    }
    if (onLoad) {
      defFields.methods.onLoad = createMethodForHold(onLoad);
    }
    if (onShow) {
      defFields.methods.onShow = createMethodForHold(onShow);
    }
    if (onReady) {
      defFields.methods.onReady = createMethodForHold(onReady);
    }
    if (onHide) {
      defFields.methods.onHide = createMethodForHold(onHide);
    }
    if (onUnload) {
      defFields.methods.onUnload = createMethodForHold(onUnload);
    }
    if (onShareAppMessage) {
      defFields.methods.onShareAppMessage = createMethodForHold(
        onShareAppMessage
      );
    }
    if (onResize) {
      defFields.methods.onResize = createMethodForHold(onResize);
    }
    if (onPageScroll) {
      defFields.methods.onPageScroll = createMethodForHold(onPageScroll);
    }
    if (onPullDownRefresh) {
      defFields.methods.onPullDownRefresh = createMethodForHold(
        onPullDownRefresh,
        function() {
          wx.stopPullDownRefresh();
        }
      );
    }
    if (onReachBottom) {
      defFields.methods.onReachBottom = createMethodForHold(onReachBottom);
    }
    if (onTabItemTap) {
      defFields.methods.onTabItemTap = createMethodForHold(onTabItemTap);
    }
  },
});
