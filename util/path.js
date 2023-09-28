const path = require('path');

module.exports = path.dirname(require.main.filename);
// res.sendFile(path.join(__dirname, '../', 'views', 'shop.html')) 코드를 더 깔끔하게 수정할 수 있게끔;