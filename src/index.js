export default Behavior({
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
      this._didStart = true;

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
    };

    defFields.lifetimes.created = function() {
      if (!this._didStart) {
        this._didCreate = true;
        return;
      }
      if (created) {
        return created.call(this);
      }
    };
    defFields.lifetimes.ready = function() {
      if (!this._didStart) {
        this._didReady = true;
        return;
      }
      if (ready) {
        return ready.call(this);
      }
    };
    defFields.lifetimes.attached = function() {
      if (!this._didStart) {
        this._didAttach = true;
        return;
      }
      if (attached) {
        return attached.call(this);
      }
    };
    defFields.lifetimes.detached = function() {
      if (!this._didStart) {
        this._didAttach = undefined;
        return;
      }
      if (detached) {
        return detached.call(this);
      }
    };
    defFields.pageLifetimes.show = function() {
      if (!this._didStart) {
        this._didShow = true;
        return;
      }
      if (show) {
        return show.call(this);
      }
    };
    defFields.pageLifetimes.hide = function() {
      if (!this._didStart) {
        this._didShow = undefined;
        return;
      }
      if (hide) {
        return hide.call(this);
      }
    };
    if (moved) {
      defFields.lifetimes.moved = function() {
        if (!this._didStart) {
          return;
        }
        return moved.call(this);
      };
    }
    if (resize) {
      defFields.pageLifetimes.resize = function() {
        if (!this._didStart) {
          return;
        }
        return resize.call(this);
      };
    }
    if (onLoad) {
      defFields.methods.onLoad = function(options) {
        if (!this._didStart) {
          return;
        }
        return onLoad.call(this, options);
      };
    }
    if (onShow) {
      defFields.methods.onShow = function() {
        if (!this._didStart) {
          return;
        }
        return onShow.call(this);
      };
    }
    if (onReady) {
      defFields.methods.onReady = function() {
        if (!this._didStart) {
          return;
        }
        return onReady.call(this);
      };
    }
    if (onHide) {
      defFields.methods.onHide = function() {
        if (!this._didStart) {
          return;
        }
        return onHide.call(this);
      };
    }
    if (onUnload) {
      defFields.methods.onUnload = function() {
        if (!this._didStart) {
          return;
        }
        return onUnload.call(this);
      };
    }
    if (onShareAppMessage) {
      defFields.methods.onShareAppMessage = function() {
        if (!this._didStart) {
          return;
        }
        return onShareAppMessage.call(this);
      };
    }
    if (onResize) {
      defFields.methods.onResize = function(evt) {
        if (!this._didStart) {
          return;
        }
        return onResize.call(this, evt);
      };
    }
    if (onPageScroll) {
      defFields.methods.onPageScroll = function(evt) {
        if (!this._didStart) {
          return;
        }
        return onPageScroll.call(this, evt);
      };
    }
    if (onPullDownRefresh) {
      defFields.methods.onPullDownRefresh = function() {
        if (!this._didStart) {
          wx.stopPullDownRefresh();
          return;
        }
        return onPullDownRefresh.call(this);
      };
    }
    if (onReachBottom) {
      defFields.methods.onReachBottom = function() {
        if (!this._didStart) {
          return;
        }
        return onReachBottom.call(this);
      };
    }
    if (onTabItemTap) {
      defFields.methods.onTabItemTap = function(evt) {
        if (!this._didStart) {
          return;
        }
        return onTabItemTap.call(this, evt);
      };
    }
  },
});
