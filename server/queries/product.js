const save_product = `INSERT INTO products (productCode,productName,casNo,molecularWeight,molecularFormula) VALUES( :productCode,:productName,:casNo,:molecularWeight,:molecularFormula);  `;

const update_product = `UPDATE products SET productCode=:productCode,productName=:productName,casNo=:casNo,molecularWeight=:molecularWeight,molecularFormula=:molecularFormula,modifiedDateTime=NOW(),modifiedBy=1 WHERE id=:id ;`;

const get_product_list = `SELECT id,productCode,productName,casNo,molecularWeight,molecularFormula,id value,CONCAT_WS(' - ',productCode,productName) label FROM products WHERE isActive=1 AND isDelete=0 ORDER BY 1 ; `;

const delete_product = `UPDATE products SET isActive=0,isDelete=1,deletedDateTime=NOW(),deletedBy=1 WHERE id=:id`;

module.exports = {
  get_product_list,
  save_product,
  update_product,
  delete_product
};
