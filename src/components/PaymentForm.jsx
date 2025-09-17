import React, { useState } from 'react';
import { payablePayment } from 'payable-ipg-js';
import { getCheckValue, getCheckValueToken } from '../utils/checkValue';

const PaymentForm = () => {
  const [amount, setAmount] = useState('100.00');
  const [invoiceId, setInvoiceId] = useState('INV' + Math.random().toString(36).substring(7));
  const [customerFirstName, setCustomerFirstName] = useState('John');
  const [customerLastName, setCustomerLastName] = useState('Doe');
  const [customerEmail, setCustomerEmail] = useState('john.doe@example.com');
  const [customerMobilePhone, setCustomerMobilePhone] = useState('0715117264');
  const [customerRefNo, setCustomerRefNo] = useState('CUST_' + Math.random().toString(36).substring(7));

  // Replace with your actual credentials (merchantToken should be server-side in production)
  const merchantKey = '42F77B3164786C34'; // Placeholder
  const merchantToken = 'F7D2F2DE639DED1F35E913A9DE95BD5A'; // Placeholder - DO NOT USE IN PRODUCTION CLIENT-SIDE
  const currencyCode = 'LKR';
  const testMode = true; // Sandbox mode

  const handleOneTimePayment = () => {
    const checkValue = getCheckValue(merchantKey, invoiceId, amount, currencyCode, merchantToken);
    console.log('Check Value (One-Time):', checkValue);
    const payment = {
      checkValue,
      orderDescription: 'Test One-Time Payment',
      invoiceId,
      logoUrl: 'https://ipgv2-comm.payable.lk/images/chocolate2.png',
      notifyUrl: 'https://payable-reactjs-demo.vercel.app', // Your server webhook
      returnUrl: 'https://payable-reactjs-demo.vercel.app', // Your success redirect
      merchantKey,
      customerFirstName,
      customerLastName,
      customerMobilePhone,
      customerEmail,
      billingAddressStreet: '123 Main Street',
      billingAddressCity: 'Colombo',
      billingAddressCountry: 'LK',
      amount,
      currencyCode,
      paymentType: '1', // One-time
    };

    payablePayment(payment, testMode);
  };

  const handleTokenizePayment = () => {
    const checkValue = getCheckValueToken(merchantKey, invoiceId, amount, currencyCode, customerRefNo, merchantToken);
    console.log('Check Value for Tokenize:', checkValue);
    const payment = {
      checkValue,
      orderDescription: 'Test Tokenize Payment',
      invoiceId,
      logoUrl: 'https://ipgv2-comm.payable.lk/images/chocolate2.png',
      notifyUrl: 'https://payable-reactjs-demo.vercel.app', // Your server webhook
      returnUrl: 'https://payable-reactjs-demo.vercel.app', // Your success redirect
      merchantKey,
      customerFirstName,
      customerLastName,
      customerMobilePhone,
      customerEmail,
      billingAddressStreet: '123 Main Street',
      billingAddressCity: 'Colombo',
      billingAddressCountry: 'LK',
      amount,
      currencyCode,
      paymentType: '3', // Tokenize
      isSaveCard: '1',
      doFirstPayment: '1',
      customerRefNo,
    };

    payablePayment(payment, testMode);
  };

  return (
    <div>
      <h2>Payment Details</h2>
      <label>Amount ({currencyCode}): </label>
      <input type="text" value={amount} onChange={(e) => setAmount(e.target.value)} /><br />
      <label>Invoice ID: </label>
      <input type="text" value={invoiceId} onChange={(e) => setInvoiceId(e.target.value)} /><br />
      <label>First Name: </label>
      <input type="text" value={customerFirstName} onChange={(e) => setCustomerFirstName(e.target.value)} /><br />
      <label>Last Name: </label>
      <input type="text" value={customerLastName} onChange={(e) => setCustomerLastName(e.target.value)} /><br />
      <label>Email: </label>
      <input type="email" value={customerEmail} onChange={(e) => setCustomerEmail(e.target.value)} /><br />
      <label>Mobile: </label>
      <input type="text" value={customerMobilePhone} onChange={(e) => setCustomerMobilePhone(e.target.value)} /><br />
      <label>Customer Ref No (for Tokenize): </label>
      <input type="text" value={customerRefNo} onChange={(e) => setCustomerRefNo(e.target.value)} /><br />
      
      <button onClick={handleOneTimePayment}>Test One-Time Payment</button>
      <button onClick={handleTokenizePayment}>Test Tokenize & Pay</button>
    </div>
  );
};

export default PaymentForm;