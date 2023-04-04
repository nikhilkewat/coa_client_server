const save_coa_report_master = `INSERT INTO coa_test_result_master (productId,grade,batchNo,arNo,supplyQty,pageNo,mfgDate,expDate) VALUES (:productId,:grade,:batchNo,:arNo,:supplyQty,:pageNo,:mfgDate,:expDate)`;

const save_coa_report_tran = `INSERT INTO coa_test_result_tran (coaReportMasterId,testId,templateId,grade,result,specification) VALUES (:coaReportMasterId,:testId,:templateId,:grade,:result,:specification)`;



module.exports = {
  save_coa_report_master,
  save_coa_report_tran,

};
