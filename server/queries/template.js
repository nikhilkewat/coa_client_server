const save_template = `INSERT INTO templates (template) VALUES(:template);  `;

const update_template = `UPDATE templates SET template=:template, modifiedDateTime=NOW(),modifiedBy=1 WHERE id=:id`;

const get_template_list = `SELECT t.id, template, GROUP_CONCAT(tm.testName) applicableTests, GROUP_CONCAT(tt.testId) testIds
FROM templates t
LEFT JOIN template_test_tran tt ON tt.templateId = t.id
LEFT JOIN coatestmaster tm ON tm.id = tt.testId
WHERE t.isActive=1 AND t.isDelete=0
GROUP BY t.id
ORDER BY t.id;`;

const delete_template = `UPDATE templates SET isActive=0,isDelete=1,deletedDateTime=NOW(),deletedBy=1 WHERE id=:id ;`;

const insert_template_test = `INSERT INTO template_test_tran (templateId, testId) VALUES(:templateId, :testId); `;

const update_template_test = `UPDATE template_test_tran SET isActive=0,isDelete=1 WHERE templateId=:templateId;`;

module.exports = {
  get_template_list,
  save_template,
  update_template,
  delete_template,
  insert_template_test,
  update_template_test
};
