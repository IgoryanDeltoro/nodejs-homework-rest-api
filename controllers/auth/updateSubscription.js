const { User } = require('../../models');

const { HttpError } = require('../../helpers');

const updateSubscription = async (req, res) => {
  const { _id: owner } = req.user;

  const subscription = await User.findByIdAndUpdate({ _id: owner }, req.body, {
    new: true,
  });

  if (!subscription) {
    throw HttpError(404);
  }
  res.json(subscription);
};

module.exports = updateSubscription;
