
var response = require("./response");
var Constants = require("../utils/constants");

exports.addNewAddress = (req, res) => {
  let sql = `INSERT INTO address (address, street, city, country, created_at) VALUES (?, ?, ?, ?, ?)`;
  con.query(
    sql,
    [
      req.body.address,
      req.body.street,
      req.body.city,
      req.body.country,
      Date.now()
    ],
    (err, result) => {
      if (err) throw err;
      else if (result.length === 0) {
        response.onError(res, Constants.Strings.ERROR, 204);
      } else {
        response.onSuccess(res, {}, Constants.Strings.Add, 200);
      }
    }
  );
};

exports.getAddress = (req, res) => {
  let sql = "SELECT * FROM address";
  con.query(sql, (err, result) => {
    console.log(result);
    if (err) throw err;
    else if (result.length === 0) {
      response.onError(res, Constants.Strings.DATA_NOT_FOUND, 204);
    } else {
      response.onSuccess(res, result, 200, Constants.Strings.Data_Fetch);
    }
  });
};

exports.deleteAddress = (req, res) => {
  let sql = "DELETE FROM address WHERE id = ?";
  con.query(sql, [req.body.id], (err, result) => {
    if (err) throw err;
    else if (result.length === 0 || result.affectedRows === 0) {
      response.onError(res, Constants.Strings.ERROR, 204);
    } else {
      response.onSuccess(res, {}, Constants.Strings.Data_Deleted, 200);
    }
  });
};

exports.updateAddress = (req, res) => {
  let sql =
    "UPDATE address SET address = ?, street = ?, city = ?, country = ?, updated_on = ? WHERE id = ?";
  con.query(
    sql,
    [
      req.body.address,
      req.body.street,
      req.body.city,
      req.body.country,
      Date.now(),
      req.body.id
    ],
    (err, result) => {
      if (err) throw err;
      else if (result.length === 0) {
        response.onError(res, Constants.Strings.ERROR, 204);
      } else {
        response.onSuccess(res, {}, Constants.Strings.Update, 200);
      }
    }
  );
};
