class HSToggleClass {
  constructor(el, options = {}) {
    this.el = el;

    const data = el.getAttribute('data-hs-toggle-class');
    const dataOptions = data ? JSON.parse(data) : {};
    const config = {
      ...dataOptions,
      ...options,
    };

    this.target = typeof config.target === 'string'
      ? document.querySelector(config.target)
      : config.target;

    this.classOn = config.on || '';
    this.classOff = config.off || '';

    this._handleChange = this._handleChange.bind(this);

    if (this.target) this._init();
  }

  _init() {
    this._applyClass(); // Set initial state
    this.target.addEventListener('change', this._handleChange);

    // Add to collection
    if (!window.$hsToggleClassCollection) {
      window.$hsToggleClassCollection = [];
    }

    window.$hsToggleClassCollection.push({
      el: this.el,
      instance: this,
    });
  }

  _handleChange() {
    this._applyClass();
  }

  _applyClass() {
    if (!this.target || !(this.target instanceof HTMLInputElement)) return;

    const isChecked = this.target.checked;

    this.el.classList.remove(this.classOn, this.classOff);
    this.el.classList.add(isChecked ? this.classOn : this.classOff);
  }

  destroy() {
    if (this.target) {
      this.target.removeEventListener('change', this._handleChange);
    }

    window.$hsToggleClassCollection = window.$hsToggleClassCollection.filter(
      (item) => item.el !== this.el
    );
  }

  // Static method to get an instance by element or selector
  static getInstance(target, returnWrapper = false) {
    const el = typeof target === 'string' ? document.querySelector(target) : target;

    const item = window.$hsToggleClassCollection?.find(
      (item) => item.el === el
    );

    return item ? (returnWrapper ? item : item.instance) : null;
  }

  static autoInit() {
    if (!window.$hsToggleClassCollection) {
      window.$hsToggleClassCollection = [];
    }

    // Clean up stale elements
    window.$hsToggleClassCollection = window.$hsToggleClassCollection.filter(
      (item) => document.contains(item.el)
    );

    document
      .querySelectorAll('[data-hs-toggle-class]:not(.--prevent-on-load-init)')
      .forEach((el) => {
        const exists = window.$hsToggleClassCollection.find(
          (item) => item.el === el
        );

        if (!exists) {
          new HSToggleClass(el);
        }
      });
  }
}

// Register globally and auto-init
if (typeof window !== 'undefined') {
  window.HSToggleClass = HSToggleClass;

  window.addEventListener('load', () => {
    HSToggleClass.autoInit();

    // Debug log (optional)
    // console.log('Toggle class collection:', window.$hsToggleClassCollection);
  });
}

export default HSToggleClass;
