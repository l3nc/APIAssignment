/**
 * help catch any error if it happens
 *
 * @param {*} fn
 *
 */
module.exports = (fn) => {
  return (req, res, next) => {
    fn(req, res, next).catch(next);
  };
};
