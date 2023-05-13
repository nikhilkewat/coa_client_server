import { useRef } from "react";
import { format } from "date-fns";
import { useLocation } from "react-router-dom";
// import Watermark from "react-awesome-watermark";
import { COAReportResult } from "./useCOAReportHooks";
import ReactToPrint from "react-to-print";

const LetterHeadPrint = () => {
  const {
    state: { data }
  } = useLocation();
  const componentRef = useRef(null);
  const css = `@media print {@page {
    size: portrait;
    margin:2%;
  }
    #footer {
      position: fixed;
      bottom: 0;
    }
   `;
  return (
    <div className="container-fluid">
      <h1 className="header-title">{`COA Test Master`}</h1>
      <div className="card">
        <div className="card-body">
          <div className="row g-2 mb-2">
            <div className="col-lg-12">
              <ReactToPrint
                trigger={() => (
                  <button className="btn btn-warning no_print btn-sm">
                    <i className="fa fa-print" />
                    <span className="ml-2">{"Print"}</span>
                  </button>
                )}
                content={() => componentRef.current}
              />
            </div>
          </div>
          <style>{css}</style>
          <div className="row g-2" ref={componentRef}>
            <div className="col-lg-12">
              {/* <Watermark
                text="1"
                style={{
                  width: 300,
                  height: 300,
                  horizontalSpace: 50,
                  verticalSpace: 50
                }}
                multiple
                className="space-props-test"
              >
                <div className="inner-watermark" />
              </Watermark> */}
              <table className="table table-sm table-borderless">
                <thead>
                  <tr>
                    <td>
                      <div
                        className="col-lg-12"
                        style={{
                          display: "flex",
                          justifyContent: "space-between"
                        }}
                      >
                        <img
                          src={require("../../Assets/images/coa_logo.jpeg")}
                          alt="coa_logo"
                          height={50}
                        />
                        <div
                          style={{
                            width: "40%",
                            borderLeft: "50px solid transparent",
                            borderTop: "50px solid #3A3F91"
                          }}
                        ></div>
                      </div>
                    </td>
                  </tr>
                </thead>
                <tbody style={{ height: "80vh" }}>
                  <tr
                    style={{
                      pageBreakInside: "avoid",
                      pageBreakAfter: "auto"
                    }}
                  >
                    <td>
                      <table className="table table-sm">
                        <tr>
                          <td
                            style={{
                              display: "flex",
                              justifyContent: "center"
                            }}
                          >
                            <b>{`CERTIFICATE OF ANALYSIS`}</b>
                          </td>
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
                              {`${format(new Date(data.mfgDate), "dd-MM-yyy")}`}
                            </td>
                            <td>
                              <b>{`Exp Date: `}</b>
                              {`${format(new Date(data.expDate), "dd-MM-yyy")}`}
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
                          {data.details.map(
                            (x: COAReportResult, index: number) => (
                              <tr
                                style={{
                                  pageBreakInside: "avoid",
                                  pageBreakAfter: "auto"
                                }}
                              >
                                <td>{index + 1}</td>
                                <td>{x.testName}</td>
                                <td>{x.result}</td>
                                <td>{x.specification}</td>
                                <td>{x.grade}</td>
                              </tr>
                            )
                          )}
                        </tbody>
                      </table>
                      <br />

                      <br />
                    </td>
                  </tr>
                  <tr
                    style={{
                      pageBreakInside: "avoid",
                      pageBreakAfter: "auto"
                    }}
                  >
                    <td>
                      <table className="table table-sm">
                        <tr>
                          <td>
                            <b>{`Conclusion: `}</b>
                            {`The above referred sample complies/ `}{" "}
                            <span
                              style={{ textDecoration: "line-through" }}
                            >{`doesn't complies`}</span>{" "}
                            {` as per `}
                            <b>{`FCC + IHS`}</b>
                            {`specification`}
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                  <tr
                    style={{
                      pageBreakInside: "avoid",
                      pageBreakAfter: "auto"
                    }}
                  >
                    <td>
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
                            <th scope="row">{"Signature"}</th>
                            <td>{data.preparedBy || ``}</td>
                            <td>{data.approvedBy || ``}</td>
                            <td>{data.reviewedBy || ``}</td>
                          </tr>
                          <tr>
                            <th scope="row">{"Date"}</th>
                            <td>{`${format(new Date(), "dd-MM-yyy")}`}</td>
                            <td>{`${format(new Date(), "dd-MM-yyy")}`}</td>
                            <td>{`${format(new Date(), "dd-MM-yyy")}`}</td>
                          </tr>
                        </tbody>
                      </table>
                    </td>
                  </tr>
                </tbody>
                <tfoot style={{ bottom: 0 }}>
                  <tr>
                    <td>
                      <div
                        className="col-lg-12"
                        style={{ bottom: 0, fontSize: "small" }}
                        id="footer"
                      >
                        <div className="d-flex justify-content-between">
                          <div>
                            <p>
                              <b>{`Head Office :`}</b>
                              <span>{`Plot No. 475, Post: Luna, Taluka: Padra, District: Vadodara,Pin: 391440`}</span>
                              <br />
                              {`Gujarat, India`}
                            </p>
                            <p>
                              <b>{`USA Office :`}</b>
                              <span>{`MS FINE CHEM 57 Bright Ridge dr, Schaumburg, IL 60194`}</span>
                            </p>
                          </div>
                          <div className="d-flex flex-fill ">
                            <div
                              style={{
                                width: "9%",
                                borderBottom: "103px solid #3A3F91",
                                borderLeft: "100px solid transparent"
                              }}
                              className="footerDiv "
                            ></div>
                            <div
                              className="d-flex flex-column flex-fill align-items-end pe-1 justify-content-center"
                              style={{
                                color: "#A8CF42",
                                fontWeight: "bold",
                                backgroundColor: "#3A3F91",
                                fontSize: "x-small"
                              }}
                            >
                              <p>
                                <label>
                                  <i className="fa-solid fa-globe"></i>
                                  {` www.valajipharmachem.co.in`}{" "}
                                </label>
                              </p>
                              <p>
                                <label>
                                  <i className="fa-solid fa-envelope"></i>
                                  {` valajipharmachem@gmail.com`}{" "}
                                </label>
                              </p>
                            </div>
                          </div>
                        </div>
                        <div
                          style={{
                            backgroundColor: "#A8CF42",
                            color: "#3A3F91",
                            fontWeight: "bold",
                            textAlign: "center"
                          }}
                        >{`ISO, FDCA, FSSAI, GMP, GLP, KOSHER & HALAL CERTIFIED COMPANY`}</div>
                      </div>
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LetterHeadPrint;
