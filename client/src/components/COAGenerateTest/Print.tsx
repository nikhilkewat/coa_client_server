import { useRef } from "react";
import { format } from "date-fns";
import { useLocation } from "react-router-dom";
import { COAReportResult } from "./useCOAReportHooks";
import ReactToPrint from "react-to-print";

const Print = () => {
  const { state: { data } } = useLocation();
  const componentRef = useRef(null);
  const css = `@media print {@page {
    size: landscape;
    margin: 5%;
  } `;
  return (
    <div className="container-fluid">
      <h1 className="header-title">{`COA Test Master`}</h1>
      <div className="card">
        <div className="card-body">
          <div className="row g-2 mb-2">
            <div className="col-lg-12">
              <ReactToPrint
                trigger={() =>
                  <button className="btn btn-warning no_print btn-sm">
                    <i className="fa fa-print" />
                    <span className="ml-2">
                      {"Print"}
                    </span>
                  </button>}
                content={() => componentRef.current}
              />
            </div>
          </div>
          <style>{css}</style>
          <div className="row g-2" ref={componentRef}>
            <div className="col-lg-12">
              <table className="table table-sm">
                <tr>
                  <td style={{display:"flex", justifyContent:"center"}}><b>{`CERTIFICATE OF ANALYSIS`}</b></td>
                </tr>
              </table>
              <table className="table table-bordered table-sm">
                <tbody>
                  <tr>
                    <td>
                      <b>{`Product: `}</b>
                      {`${data.productName}`}
                    </td>
                    <td>
                      <b>{`Customer: `}</b>
                      {/* {`${data.customerName}`} */}
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <b>{`Grade: `}</b>
                      {`${data.grade}`}
                    </td>
                    <td>
                      <b>{`CAS No: `}</b>
                      {`${data.casNo}`}
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <b>{`Batch No: `}</b>
                      {`${data.batchNo}`}
                    </td>
                    <td>
                      <b>{`AR No: `}</b>
                      {`${data.arNo}`}
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <b>{`Mfg Date: `}</b>
                      {`${format(new Date(data.mfgDate),"dd-MM-yyy")}`}
                    </td>
                    <td>
                      <b>{`Exp Date: `}</b>
                      {`${format(new Date(data.expDate),"dd-MM-yyy")}`}
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <b>{`Molecular Weight: `}</b>
                      {`${data.molecularWeight}`}
                    </td>
                    <td>
                      <b>{`Molecular Formula: `}</b>
                      {`${data.molecularFormula}`}
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <b>{`Supply Qty.: `}</b>
                      {`${data.supplyQty}`}
                    </td>
                    <td>
                      <b>{`Page No: `}</b>
                      {`${data.pageNo}`}
                    </td>
                  </tr>
                </tbody>
              </table>
              <br />
              <table className="table table-bordered table-sm">
                <thead>
                  <tr>
                    <th>{`Sr. No.`}</th>
                    <th>{`Test`}</th>
                    <th>{`Result`}</th>
                    <th>{`Specification`}</th>
                    <th>{`Grade`}</th>
                  </tr>
                </thead>
                <tbody>
                  {data.details.map((x: COAReportResult, index: number) =>
                    <tr>
                      <td>
                        {index + 1}
                      </td>
                      <td>
                        {x.testName}
                      </td>
                      <td>
                        {x.result}
                      </td>
                      <td>
                        {x.specification}
                      </td>
                      <td>
                        {x.grade}
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
              <br />
              <table className="table table-sm">
                <tr>
                  <td>
                    <b>{`Conclusion: `}</b>
                    {`The above referred sample complies/ `} <span style={{textDecoration:"line-through"}}>{`doesn't complies`}</span> {` as per `}
                    <b>{`FCC + IHS`}</b>
                    {`specification`}
                  </td>
                </tr>
              </table>
              <br />
              <table className="table table-bordered table-sm">
                <thead>
                  <tr>
                    <th>{``}</th>
                    <th>{`Prepared By`}</th>
                    <th>{`Approved By`}</th>
                    <th>{`Reviewed By`}</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th scope="row">
                      {"Signature"}
                    </th>
                    <td>
                      {data.preparedBy||``}
                    </td>
                    <td>
                      {data.approvedBy||``}
                    </td>
                    <td>
                      {data.reviewedBy||``}
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">
                      {"Date"}
                    </th>
                    <td>
                      {`${format(new Date(), "dd-MM-yyy")}`}
                    </td>
                    <td>
                      {`${format(new Date(), "dd-MM-yyy")}`}
                    </td>
                    <td>
                      {`${format(new Date(), "dd-MM-yyy")}`}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Print;
