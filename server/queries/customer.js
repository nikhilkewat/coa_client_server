const save_customer = `INSERT INTO customer (fullName,address,contactPersonName,contactPersonName1,contactPersonEmail,contactPersonEmail1,contactPersonMobile,contactPersonMobile1) VALUES( :fullName,:address,:contactPersonName,:contactPersonName1,:contactPersonEmail,:contactPersonEmail1,:contactPersonMobile,:contactPersonMobile1);  `;

const update_customer = `UPDATE customer SET fullName=:fullName,address=:address,contactPersonName=:contactPersonName,contactPersonName1=:contactPersonName1,contactPersonEmail=:contactPersonEmail,contactPersonEmail1=:contactPersonEmail1,contactPersonMobile=:contactPersonMobile,contactPersonMobile1=:contactPersonMobile1 ,modifiedDateTime=NOW(),modifiedBy=1 WHERE id=:id ;`;

const get_customer_list = `SELECT id,fullName,address,contactPersonName,contactPersonName1,contactPersonEmail,contactPersonEmail1,contactPersonMobile,contactPersonMobile1,id value,fullName label FROM customer WHERE isActive=1 AND isDelete=0 ORDER BY 1 ; `;

const delete_customer = `UPDATE customer SET isActive=0,isDelete=1,deletedDateTime=NOW(),deletedBy=1 WHERE id=:id`;

module.exports = {
  get_customer_list,
  save_customer,
  update_customer,
  delete_customer
};
