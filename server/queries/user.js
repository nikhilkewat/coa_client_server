const save_user = `INSERT INTO users (fullName,userName,password,roleId) VALUES( :fullName,:userName,:password,:roleId);  `;

const update_user = `UPDATE users SET fullName=:fullName,userName=:userName,modifiedDateTime=NOW(),modifiedBy=1 WHERE id=:id`;

const get_user_list = `SELECT id,fullName,userName,password,roleId FROM users WHERE isActive=1 AND isDelete=0 ORDER BY 1 ; `;

const delete_user = `UPDATE users SET isActive=0,isDelete=1,deletedDateTime=NOW(),deletedBy=1 WHERE id=:id`;

module.exports = {
  get_user_list,
  save_user,
  update_user,
  delete_user
};
