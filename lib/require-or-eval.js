'use strict';

/**
 * requireOrEval
 * =============
 *
 * Module, which assists in supporting transitional (from 'eval' to 'require') BEM formats.
 *
 * For example, earlier `bemjson` looked like this:
 * ```javascript
 * ({
 *     block: 'button'
 * })
 * ```
 *
 * New `bemjson` looks like this:
 * ```javascript
 * module.exports = {
 *     block: 'button'
 * };
 * ```
 */

var nodeEval = require('node-eval'),
    vowFs = require('vow-fs');

/**
 * @name requireOrEval
 * @param String filePath path to file which needs to be required or evaled
 * @returns Promise
 */
module.exports = function (filePath) {
    // Replace slashes with backslashes for windows paths for correct require cache work.
    var isWinPath = /^\w{1}:/.test(filePath);
    filePath = isWinPath ? filePath.replace(/\//g, '\\') : filePath;

    return vowFs.read(filePath, 'utf8').then(nodeEval);
};
