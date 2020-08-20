// var logger = require("../utils/logController");

exports.onError = (res, message, code, err = null) => {
  let body = {
    responseCode: code,
    message: message,
    success: false
  };
  // logger.logUpdate(body, res.log_id, err);
  res.json(body);
};

exports.onSuccess = (res, result, message, code, err = null) => {
  message = message || "";
  let body = {
    responseCode: code,
    result: result,
    success: true,
    message: message
  };
  // logger.logUpdate(body, res.log_id, err);
  res.json(body);
};
