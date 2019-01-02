export default function hold(WrappedConfig = {}) {
  return {
    ...WrappedConfig,

    onLoad(options) {
      if (!this._didStartPage) {
        this._shouldOnLoad = true;
        return;
      }

      if (WrappedConfig.onLoad) {
        WrappedConfig.onLoad.call(this, options);
      }
    },
    onReady() {
      if (!this._didStartPage) {
        this._shouldOnReady = true;
        return;
      }

      if (WrappedConfig.onReady) {
        WrappedConfig.onReady.call(this);
      }
    },
    onShow() {
      if (!this._didStartPage) {
        this._shouldOnShow = true;
        return;
      }

      if (WrappedConfig.onShow) {
        WrappedConfig.onShow.call(this);
      }
    },
    onHide() {
      if (!this._didStartPage) {
        this._shouldOnShow = false;
        return;
      }

      if (WrappedConfig.onHide) {
        WrappedConfig.onHide.call(this);
      }
    },
    onUnload() {
      if (!this._didStartPage) {
        this._shouldOnLoad = false;
        this._shouldOnReady = false;
        this._shouldOnShow = false;
        return;
      }

      if (WrappedConfig.onUnload) {
        WrappedConfig.onUnload.call(this);
      }
    },
    onPullDownRefresh() {
      if (!this._didStartPage) {
        wx.stopPullDownRefresh();
        return;
      }

      if (WrappedConfig.onPullDownRefresh) {
        WrappedConfig.onPullDownRefresh.call(this);
      }
    },
    onReachBottom() {
      if (!this._didStartPage) {
        return;
      }

      if (WrappedConfig.onReachBottom) {
        WrappedConfig.onReachBottom.call(this);
      }
    },
    onPageScroll(options) {
      if (!this._didStartPage) {
        return;
      }

      if (WrappedConfig.onPageScroll) {
        WrappedConfig.onPageScroll.call(this, options);
      }
    },
    onTabItemTap(options) {
      if (!this._didStartPage) {
        return;
      }

      if (WrappedConfig.onTabItemTap) {
        WrappedConfig.onTabItemTap.call(this, options);
      }
    },

    startPage() {
      this._didStartPage = true;

      if (this._shouldOnLoad) {
        this._shouldOnLoad = false;

        if (WrappedConfig.onLoad) {
          WrappedConfig.onLoad.call(this, this.options);
        }
      }
      if (this._shouldOnReady) {
        this._shouldOnReady = false;

        if (WrappedConfig.onReady) {
          WrappedConfig.onReady.call(this);
        }
      }
      if (this._shouldOnShow) {
        this._shouldOnShow = false;

        if (WrappedConfig.onShow) {
          WrappedConfig.onShow.call(this);
        }
      }
    },

    endPage() {
      this._didStartPage = false;
      this._shouldOnLoad = true;
      this._shouldOnReady = true;
    },
  };
}
