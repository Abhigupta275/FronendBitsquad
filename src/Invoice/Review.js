import React, { useEffect, useState } from "react";
import axios from "axios";
import "./review.css";

const Review = () => {

  const [invoiceDetails,setInvoiceDetails] = useState([]);
  const [paymentDetails,setPaymentDetails] = useState([]);
  const [vendorDetails,setVendorDetails] = useState([]);


  const token = localStorage.getItem("token");
  const invoiceId = localStorage.getItem("invoiceId");
  const paymentId = localStorage.getItem("paymentId");
  const vendorId = localStorage.getItem("vendorId");

  const fetchInvoiceDetails = async () =>{
    try {
      const invoiceResponse = await axios.get(
        `http://127.0.0.1:8000/invoice/?id=${invoiceId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setInvoiceDetails(invoiceResponse.data.message[0]);


    }catch(e){
      console.log(e);
    }
  }
  const fetchVendorDetails = async () =>{
    try {
      const vendorResponse = await axios.get(
        `http://127.0.0.1:8000/vendor/?id=${vendorId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setVendorDetails(vendorResponse.data.message[0])
      console.log("vendorResponse :"+ vendorResponse);
      console.log(vendorDetails);
      console.log("vendor: "+ vendorDetails)
    }catch(e){
      console.log(e);
    }
  }
  const fetchPaymentDetails = async () =>{
    try {
      const paymentResponse = await axios.get(
        `http://127.0.0.1:8000/payment/?id=${paymentId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setPaymentDetails(paymentResponse.data.message[0])
    }catch(e){
      console.log(e);
    }
  }


  // const invoiceDetails = async () => {
  //   try {
      
  //     const invoiceDetails = async () => {
  //     const paymentResponse = await axios.get(
  //       `http://127.0.0.1:8000/payment/?id=${paymentId}`,
  //       {
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //         },
  //       }
  //     );
  //     const vendorResponse = await axios.get(
  //       `http://127.0.0.1:8000/vendor/?id=${vendorId}`,
  //       {
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //         },
  //       }
  //     );

      // const invoiceD = invoiceResponse.data;
      // const paymentD = paymentResponse.data;
      // const vendorD = vendorResponse.data;

      // const invoiceData = invoiceDetails.message.map((item) => item);
      // const paymentData = paymentDetails.message.map((item) => item);
      // const vendorData = vendorDetails.message.map((item) => item);

      // console.log(invoiceData);
      // console.log(paymentData);
      // console.log(vendorData);

      // setInvoice(invoiceData);
      // setVendor(vendorData);

      //   console.log(invoiceDetails);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  useEffect(() => {
    fetchInvoiceDetails();
    fetchVendorDetails();
    fetchPaymentDetails();
  }, []);

  return (
    <>
      <form>
        {
       
          <div className="container reviewContainer">
            <div className="card w-100 mt-3">
              <div className="card-body w-100">
                <div className="row mb-2">
                  <div className="col-md-4">
                    <label>Vendor Name:</label>
                    <input
                      type="text"
                      className="form-control"
                      name="vendor_name"
                      autoComplete="off"
                      value={vendorDetails.vendor_name}
                      readOnly
                    />
                  </div>
                  <div className="col-md-4">
                    <label>GST:</label>
                    <input
                      type="text"
                      className="form-control"
                      name="vendor_GSTno"
                      autoComplete="off"
                      value={vendorDetails.vendor_GSTno}
                      readOnly
                    />
                  </div>
                  <div className="col-md-4">
                    <label>Mobile Number:</label>
                    <input
                      type="text"
                      className="form-control"
                      name="vendor_mobileno"
                      autoComplete="off"
                      value={vendorDetails.vendor_mobileno}
                      readOnly
                    />
                  </div>
                </div>

                <div className="row mb-2">
                  <div className="col-md-4">
                    <label>Vendor Id:</label>
                    <input
                      type="text"
                      className="form-control"
                      name="vendor"
                      autoComplete="off"
                      value={vendorDetails.vendor}
                      readOnly
                    />
                  </div>
                  <div className="col-md-4">
                    <label>Account</label>
                    <input
                      type="text"
                      className="form-control"
                      name="account"
                      autoComplete="off"
                      value={vendorDetails.account}
                      readOnly
                    />
                  </div>
                  <div className="col-md-4">
                    <label>TDS:</label>
                    <input
                      type="text"
                      className="form-control"
                      name="tds_tax"
                      autoComplete="off"
                      value={vendorDetails.tds_tax}
                      readOnly
                    />
                  </div>
                </div>

                <div className="row mb-2">
                  <div className="col-md-4">
                    <label>PAN NO:</label>
                    <input
                      type="text"
                      className="form-control"
                      name="vendor_PanCard"
                      autoComplete="off"
                      value={vendorDetails.vendor_PanCard}
                      readOnly
                    />
                  </div>
                  <div className="col-md-4">
                    <label>Vendor Address:</label>
                    <input
                      type="text"
                      className="form-control"
                      name="vendor_address"
                      autoComplete="off"
                      value={vendorDetails.vendor_address}
                      readOnly
                    />
                  </div>
                  <div className="col-md-4">
                    <label>TDS:</label>
                    <input
                      type="text"
                      className="form-control"
                      name="vendor_TDS"
                      autoComplete="off"
                      value={vendorDetails.vendor_TDS}
                      readOnly
                    />
                  </div>
                </div>

                <div className="row mb-2">
                  <div className="col-md-4">
                    <label>Invoice Id:</label>
                    <input
                      type="text"
                      className="form-control"
                      name="invoice_detail"
                      autoComplete="off"
                      value={vendorDetails.invoice_detail}
                      readOnly
                    />
                  </div>
                  <div className="col-md-4">
                    <label>Amount</label>
                    <input
                      type="text"
                      className="form-control"
                      name="amount"
                      autoComplete="off"
                      value={paymentDetails.amount}
                      readOnly
                    />
                  </div>
                  <div className="col-md-4">
                    <label>Payment Id:</label>
                    <input
                      type="text"
                      className="form-control"
                      name="payment_id"
                      autoComplete="off"
                      value={paymentDetails.payment_id}
                      readOnly
                    />
                  </div>
                </div>
        
                <div className="row mb-2">
                  <div className="col-md-4">
                    <label>Invoice Number:</label>
                    <input
                      type="text"
                      className="form-control"
                      name="invoice_no"
                      autoComplete="off"
                      value={invoiceDetails.invoice_no}
                      readOnly
                    />
                  </div>
                  <div className="col-md-4">
                    <label>Deduction:</label>
                    <input
                      type="text"
                      className="form-control"
                      name="deduction"
                      autoComplete="off"
                      value={invoiceDetails.deduction}
                      readOnly
                    />
                  </div>
                  <div className="col-md-4">
                    <label>Invoice Date:</label>
                    <input
                      type="text"
                      className="form-control"
                      name="invoice_date"
                      autoComplete="off"
                      value={invoiceDetails.invoice_date}
                      readOnly
                    />
                  </div>
                </div>

                <div className="row mb-2">
                  <div className="col-md-4">
                    <label>Invoice Amount:</label>
                    <input
                      type="text"
                      className="form-control"
                      name="invoice_amount"
                      autoComplete="off"
                      value={invoiceDetails.invoice_amount}
                      readOnly
                    />
                  </div>
                  <div className="col-md-4">
                    <label>Deduction Reason:</label>
                    <input
                      type="text"
                      className="form-control"
                      name="deduction_reason"
                      autoComplete="off"
                      // value={item.deduction_reason}
                      readOnly
                    />
                  </div>
                  <div className="col-md-4">
                    <label>Reverse Transfer:</label>
                    <input
                      type="text"
                      className="form-control"
                      name="received_transfer"
                      autoComplete="off"
                      // value={item.received_transfer}
                      readOnly
                    />
                  </div>
                </div>

                <div className="row mb-2">
                  <div className="col-md-4">
                    <label>Payment Date:</label>
                    <input
                      type="text"
                      className="form-control"
                      name="payment_date"
                      autoComplete="off"
                      // value={item.payment_date}
                      readOnly
                    />
                  </div>
                  <div className="col-md-4">
                    <label>Referal Number:</label>
                    <input
                      type="text"
                      className="form-control"
                      name="ref_no"
                      autoComplete="off"
                      // value={item.ref_no}
                      readOnly
                    />
                  </div>

                  <div className="col-md-4 text-center mt-3">
                      <button type="submit" className="btn btn-primary" >
                        Submit
                      </button>
                    
                    </div>
                  
                </div>
              </div>
            </div>
          </div>
        }
      </form>
    </>
  );
};
export default Review;