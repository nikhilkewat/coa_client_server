const save_testMaster = `INSERT INTO coaTestMaster (testName, productId) VALUES(:testName, :productId);  `;

const update_testMaster = `UPDATE coaTestMaster SET testName=:testName, modifiedDateTime=NOW(),modifiedBy=1 WHERE id=:id`;

const get_testMaster_list = `SELECT cm.id,testName,GROUP_CONCAT(result) testResultsGroupConcat, cm.productId, p.productName, cm.id value, CONCAT_WS(' - ', testName, p.productName) label 
FROM coaTestMaster cm 
LEFT JOIN coaTestResult cr ON cr.coaTestMasterId = cm. id  
LEFT JOIN products p ON p.id = cm.productId
WHERE cm.isActive=1 AND cm.isDelete=0 GROUP BY 1 ORDER BY 1 ; `;

const delete_testMaster = `UPDATE coaTestMaster SET isActive=0,isDelete=1,deletedDateTime=NOW(),deletedBy=1 WHERE id=:id ;`;

const insert_test_master_result = `INSERT INTO coaTestResult (coaTestMasterId, result) VALUES(:coaTestMasterId, TRIM(:result)); `;

const update_test_master_result = `UPDATE coaTestResult SET isActive=0,isDelete=1 WHERE coaTestMasterId=:coaTestMasterId;`;

module.exports = {
  get_testMaster_list,
  save_testMaster,
  update_testMaster,
  delete_testMaster,
  insert_test_master_result,
  update_test_master_result
};
