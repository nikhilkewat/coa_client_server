const save_product = `INSERT INTO products (productCode,productName,casNo,modecularWeight,molecularWeight) VALUES( :productCode,:productName,:casNo,:modecularWeight,:molecularWeight);  `;

const update_product = `UPDATE products SET productCode=:productCode,productName=:productName,casNo=:casNo,modecularWeight=:modecularWeight,molecularWeight=:molecularWeight,modifiedDateTime=NOW(),modifiedBy=1 WHERE id=:id ;`;

const get_product_list = `SELECT id,productCode,productName,casNo,modecularWeight,molecularWeight,id value,CONCAT_WS(' - ',productCode,productName) label FROM products WHERE isActive=1 AND isDelete=0 ORDER BY 1 ; `;

const delete_product = `UPDATE products SET isActive=0,isDelete=1,deletedDateTime=NOW(),deletedBy=1 WHERE id=:id`;

module.exports = {
  get_product_list,
  save_product,
  update_product,
  delete_product
};
