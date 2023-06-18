const HttpError = require('../helpers');

const handleImageByJimp = name => {
  return (error, path) => {
    if (error) {
      throw HttpError(error);
    }
    path
      .resize(250, 250)
      .quality(60)
      .write(`./public/avatars/${name}`)
      .getExtension();
  };
};

module.exports = handleImageByJimp;
