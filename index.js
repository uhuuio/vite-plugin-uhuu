const plugin = require('./plugin')
(function (root, factory, undef) {
    if (typeof module.exports === 'object' && typeof exports === "object") {
        // CommonJS, factory can require any module
        module.exports = exports = factory();
    }
    else if (typeof define === "function" && define.amd) {
        define(factory); // AMD
    }
    else {
        root.config = factory(); // Global (browser)
    }
}(this, function () {
    return plugin
}))
