const login =
  "SELECT `id`, `username`,roleId,fullName FROM users WHERE isactive=1 and isdelete=0 and username=:username and password=:password;";

module.exports = {
  login,
};
