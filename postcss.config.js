const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');

module.exports = {
    pluggins: [
        autoprefixer,
        cssnano({ preset: 'default' })
    ]
}