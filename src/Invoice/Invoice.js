import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom';

const Invoice = () => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const text1 = useRef("");

  useEffect(() => {
    console.log(text1.current.value)
  }, [])

  const [invoiceData, setInvoiceData] = useState({
    invoice_no: "",
    invoice_date: "",
    invoice_amount: "",
    deduction: "",
    deduction_reason: "",
    received_transfer: "",
  });

  const [paymentData, setPaymentData] = useState({
    payment_date: "",
    payment_ref_no: "",
    received_payment_transfer: "",
  });

  const [vendorData, setVendorData] = useState({
    vendor_name: "",
    vendor_address: "",
    vendor_mobileno: "",
    vendor_GSTno: "",
    vendor_PanCard: "",
    vendor_TDS: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInvoiceData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleChang = (e) => {
    const { name, value } = e.target;
    setPaymentData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleVendor = (e) => {
    const { name, value } = e.target;
    setVendorData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const invoiceRequest = axios.post(
      "http://127.0.0.1:8000/invoice/",
      invoiceData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const paymentRequest = axios.post(
      "http://127.0.0.1:8000/payment/",
      paymentData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const vendorRequest = axios.post(
      "http://127.0.0.1:8000/vendor/",
      vendorData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
      


    Promise.all([invoiceRequest, paymentRequest,vendorRequest])
      .then(([invoiceResponse, paymentResponse,vendorResponse]) => {
       
        const invoiceId = invoiceResponse.data.message.id;
        const paymentId = paymentResponse.data.message.id;
        const vendorId = vendorResponse.data.message.id;

        // Store the IDs in local storage
        localStorage.setItem("invoiceId", invoiceId);
        localStorage.setItem("paymentId", paymentId);
        localStorage.setItem("vendorId", vendorId);

        // console.log(localStorage.getItem("invoiceId"));

        console.log("Invoice Response:", invoiceResponse.data);
        console.log("Payment Response:", paymentResponse.data);
        console.log("Vendor Response:", vendorResponse.data)

        navigate('/review');
        alert("Data submitted successfully");
      })
      .catch((error) => {
        console.log(error);
        if (error.response && error.response.status === 400) {
          alert("Invalid data");
        }
      });
  };

  return (
    <>
      <div className="container">
        <div className="row ">
          <div className="col-md-12">
          <br/>
            <form onSubmit={handleSubmit}>
            <div className="card w-100 mt-5">
                <h4 className="text-center">vender Form</h4>
                <div className="card-body">
                  <div className="row">
                    <div className="col-md-6 mb-2">
                      <h6 className="text-muted">Vendor Name:</h6>
                      <input
                        type="text"
                        className="form-control"
                        ref={text1}
                        name="vendor_name"
                        autoComplete="off"
                        value={vendorData.vendor_name}
                        onChange={handleVendor}
                      />
                    </div>
                    <div className="col-md-6 mb-2">
                      <h6 className="text-muted">Vendor Address:</h6>
                      <input
                        type="text"
                        className="form-control"
                        name="vendor_address"
                        value={vendorData.vendor_address}
                        autoComplete="off"
                        onChange={handleVendor}
                      />
                    </div>
                    <div className="col-md-6 mb-2">
                      <h6 className="text-muted">Mobile Number:</h6>
                      <input
                        type="text"
                        className="form-control"
                        autoComplete="off"
                        name="vendor_mobileno"
                        value={vendorData.vendor_mobileno}
                        onChange={handleVendor}
                      />
                    </div>
                    <div className="col-md-6 mb-2">
                      <h6 className="text-muted">GST Number:</h6>
                      <input
                        type="text"
                        className="form-control"
                        autoComplete="off"
                        name="vendor_GSTno"
                        value={vendorData.vendor_GSTno}
                        onChange={handleVendor}
                      />
                    </div>
                    <div className="col-md-6 mb-2">
                      <h6 className="text-muted">PanCard Number :</h6>
                      <input
                        type="text"
                        className="form-control"
                        autoComplete="off"
                        name="vendor_PanCard"
                        value={vendorData.vendor_PanCard}
                        onChange={handleVendor}
                      />
                    </div>
                    <div className="col-md-6 mb-2">
                      <h6 className="text-muted">TDS Amount:</h6>
                      <input
                        type="text"
                        className="form-control"
                        autoComplete="off"
                        name="vendor_TDS"
                        value={vendorData.vendor_TDS}
                        onChange={handleVendor}
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="card w-100 mt-3">
                <h4 className="text-center">Invoice Form</h4>
                <div className="card-body">
                  <div className="row">
                    <div className="col-md-6 mb-2">
                      <h6 className="text-muted">Invoice No:</h6>
                      <input
                        type="text"
                        className="form-control"
                        name="invoice_no"
                        autoComplete="off"
                        value={invoiceData.invoice_no}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="col-md-6 mb-2">
                      <h6 className="text-muted">Invoice Date:</h6>
                      <input
                        type="text"
                        className="form-control"
                        name="invoice_date"
                        value={invoiceData.invoice_date}
                        placeholder="yyyy-mm-dd"
                        autoComplete="off"
                        onChange={handleChange}
                      />
                    </div>
                    <div className="col-md-6 mb-2">
                      <h6 className="text-muted">Invoice Amount:</h6>
                      <input
                        type="text"
                        className="form-control"
                        autoComplete="off"
                        name="invoice_amount"
                        value={invoiceData.invoice_amount}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="col-md-6 mb-2">
                      <h6 className="text-muted">Deduction:</h6>
                      <input
                        type="text"
                        className="form-control"
                        autoComplete="off"
                        name="deduction"
                        value={invoiceData.deduction}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="col-md-6 mb-2">
                      <h6 className="text-muted">Deduction Reason:</h6>
                      <input
                        type="text"
                        className="form-control"
                        autoComplete="off"
                        name="deduction_reason"
                        value={invoiceData.deduction_reason}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="col-md-6 mb-2">
                      <h6 className="text-muted">Received Transfer:</h6>
                      <input
                        type="text"
                        className="form-control"
                        autoComplete="off"
                        name="received_transfer"
                        value={invoiceData.received_transfer}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="card w-100 mt-3">
                <h4 className="text-center">Payment Details</h4>
                <div className="card-body">
                  <div className="row">
                    <div className="col-md-6 mb-2">
                      <h6 className="text-muted">Payment Date:</h6>
                      <input
                        type="text"
                        className="form-control"
                        name="payment_date"
                        placeholder="yyyy-mm-dd"
                        autoComplete="off"
                        value={paymentData.payment_date}
                        onChange={handleChang}
                      />
                    </div>
                    <div className="col-md-6 mb-2">
                      <h6 className="text-muted">Referal Number:</h6>
                      <input
                        type="text"
                        className="form-control"
                        name="payment_ref_no"
                        value={paymentData.payment_ref_no}
                        autoComplete="off"
                        onChange={handleChang}
                      />
                    </div>
                    <div className="col-md-6 mb-2">
                      <h6 className="text-muted">Received Transfer:</h6>
                      <input
                        type="text"
                        className="form-control"
                        autoComplete="off"
                        name="received_payment_transfer"
                        value={paymentData.received_payment_transfer}
                        onChange={handleChang}
                      />
                    </div>
                    <div className="col-md-6 mt-3 text-center  w-20">
                  
                      <button type="submit" className="btn btn-primary" >
                        Next Page...
                      </button>
                    
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Invoice;
