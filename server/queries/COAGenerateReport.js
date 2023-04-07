const save_coa_report_master = `INSERT INTO coa_test_result_master (productId,grade,batchNo,arNo,supplyQty,pageNo,mfgDate,expDate) VALUES (:productId,:grade,:batchNo,:arNo,:supplyQty,:pageNo,:mfgDate,:expDate);`;

const save_coa_report_tran = `INSERT INTO coa_test_result_tran (coaReportMasterId,testId,templateId,grade,result,specification) VALUES (:coaReportMasterId,:testId,:templateId,:grade,:result,:specification);`;

const get_coa_report_master = `SELECT ctrm.id, p.productCode, p.productName, ctrm.grade, ctrm.batchNo, ctrm.arNo,ctrm.supplyQty,ctrm.pageNo,ctrm.mfgDate,ctrm.expDate,DATE_FORMAT(ctrm.createDateTime,"%d-%m-%Y") TestDate FROM coa_test_result_master ctrm 
JOIN products p ON p.id = ctrm.productId
WHERE ctrm.isActive=1 AND ctrm.isDelete=0;`;

const get_coa_report_tran = `SELECT ctrt.id,t.template,ctm.testName,ctrt.grade,ctrt.result,ctrt.specification,ctrt.coaReportMasterId
FROM coa_test_result_tran ctrt
JOIN coatestmaster ctm ON ctm.id = ctrt.testId
JOIN templates t ON t.id = ctrt.templateId
WHERE ctrt.isActive=1 AND ctrt.isDelete=0;`;

module.exports = {
  save_coa_report_master,
  save_coa_report_tran,
  get_coa_report_master,
  get_coa_report_tran
};
