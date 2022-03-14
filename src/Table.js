import axios from "axios";

import React, { useEffect } from "react";

export default function Table() {
  const [loading, setLoading] = React.useState(false);
  const [dataa, setDataa] = React.useState([]);
  const [rows, setRows] = React.useState([]);

  const fetchData = async () => {
    setLoading(true);
    try {
      let res = await axios.get(
        `https://design2.alphakor.com/dmooseapi/api/v1/procurementrequests/?prid=35`
      );
      generateId(res?.data?.data);
      setDataa(res?.data?.data);
    } catch (E) {
      console.log(E);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const generateId = (arr) => {
    if (arr && arr.length) {
      let data = [];
      let element = arr[0];
      data = element.lstProcurmentDetails.map((procurment, i) => ({
        ...procurment,
        id: i,
      }));

      setRows([...data]);
    }
  };
  const handleClick = async () => {
    try {
      await axios.put(
        `https://design2.alphakor.com/dmooseapi/api/v1/procurementrequests/?procurementRequestId=35&status=Submitted`
      );
      window.alert("Procurement Requisition has been Approved");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="col-9 mx-auto mt-5 ">
      <h6 style={{ fontSize: "22px", textTransform: "capitalize" }}>
        Procurement Requisition Approval
      </h6>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        {dataa.map((d) => (
          <>
            <div>
              <p className="">
                Created by : {d.createdById === 0 ? "-" : d.createdById}
              </p>
              <p>Sales input by :</p>
            </div>
            <div>
              <p>Created on : {d.createdDate}</p>
              <p>Sales input created on :</p>
            </div>
          </>
        ))}

        <div>
          <button
            className="btn btn-primary"
            style={{ paddingTop: "8px", paddingBottom: "8px" }}
            onClick={handleClick}
          >
            Approve Requisition
          </button>
        </div>
      </div>

      <br />
      <br />

      <div className="shadow  p-3 bg-white">
        <table className="table table-hover">
          <thead className="border text-dark ">
            <tr>
              <th className="border">Product Name</th>
              <th className="border">Required Quantity</th>
              <th className="border">Vendor Name</th>
              <th className="border">Quantity to order</th>
              <th className="border">Unit cost</th>
              <th className="border">Extented cost</th>
            </tr>
          </thead>

          {loading ? (
            <tbody>
              <tr>
                <td className="loading-div">loading....</td>
              </tr>
            </tbody>
          ) : (
            <tbody>
              {rows.map((procurement) => (
                <>
                  <tr>
                    <th
                      className="border"
                      scope="row"
                      rowSpan={procurement.lstVendors.length}
                      style={{ verticalAlign: "middle" }}
                    >
                      {procurement.productName}
                    </th>
                    <td
                      className="border"
                      scope="row"
                      rowSpan={procurement.lstVendors.length}
                      style={{ verticalAlign: "middle" }}
                    >
                      {procurement.quantityBySales}
                    </td>
                    {procurement.lstVendors.slice(0, 1).map((vendor) => (
                      <>
                        <td className="border">{vendor?.vendorName || "0"}</td>
                        <td className="border">
                          {vendor?.quantityForPO || "0"}
                        </td>
                        <td className="border">{vendor?.unitPrice || "0"}</td>
                        <td
                          className="border"
                          rowSpan={procurement.lstVendors.length}
                          style={{ verticalAlign: "middle" }}
                        >
                          {procurement?.extendedAmount || "0"}
                        </td>
                      </>
                    ))}
                  </tr>

                  {procurement.lstVendors.slice(1).map((vendor) => (
                    <tr>
                      <td className="border">{vendor?.vendorName || "0"}</td>
                      <td className="border">{vendor?.quantityForPO || "0"}</td>
                      <td className="border">{vendor?.unitPrice || "0"}</td>
                    </tr>
                  ))}
                </>
              ))}
            </tbody>
          )}
        </table>
      </div>
    </div>
  );
}
