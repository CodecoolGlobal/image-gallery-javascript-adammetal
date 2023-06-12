const path = require('path');

const SRC_DIR = path.join(__dirname, 'src');
const OUT_DIR = path.join(__dirname, 'out');
const PUB_DIR = path.join(__dirname, 'public');

module.exports = {
  mode: 'development',
  entry: path.join(SRC_DIR, 'index.js'),
  output: {
    path: OUT_DIR,
    filename: 'dist.js'
  },
  devServer: {
    static: {
      directory: PUB_DIR
    }
  },
  devtool: 'eval-cheap-source-map'
}