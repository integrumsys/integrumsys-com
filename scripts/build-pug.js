'use strict';
const upath = require('upath');
const sh = require('shelljs');
const renderPug = require('./render-pug');

const srcPath = upath.resolve(upath.dirname(__filename), '../src');

(async () => {
    const files = sh.find(srcPath).filter(_isPugPage);
    await Promise.all(files.map((filePath) => renderPug(filePath)));
})();

function _isPugPage(filePath) {
    return (
        filePath.match(/\.pug$/) &&
        !filePath.match(/include/) &&
        !filePath.match(/mixin/) &&
        !filePath.match(/\/pug\/layouts\//)
    );
}
