const login =
  "SELECT `id`, `username` FROM user_master WHERE isactive=1 and isdelete=0 and username=:username and password=:password;";

module.exports = {
  login,
};
