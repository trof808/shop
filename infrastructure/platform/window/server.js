"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createWindowApi = void 0;
var createWindowApi = function () { return ({
    getLocationHref: function () {
        return '';
    },
    changeLocationHref: function (_url) {
        // do nothing
    },
    delayClose: function () {
        // do nothing
    },
    open: function () {
        // null cause client window returns Window | null
        return null;
    },
    reload: function (_forcedReload) {
        // do nothing
    },
    historyBack: function () {
        // do nothing
    },
    historyPush: function () {
        // do nothing
    },
    historyReplace: function () {
        // do nothing
    },
    setTitle: function () {
        // do nothing
    },
}); };
exports.createWindowApi = createWindowApi;
