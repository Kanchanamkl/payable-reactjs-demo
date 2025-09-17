import CryptoJS from 'crypto-js';

export function getCheckValue(merchant_key, invoice_id, amount, currency, merchant_token) {
  const mToken = CryptoJS.SHA512(merchant_token).toString().toUpperCase();
  const txt = `${merchant_key}|${invoice_id}|${amount}|${currency}|${mToken}`;
  return CryptoJS.SHA512(txt).toString().toUpperCase();
}

export function getCheckValueToken(merchant_key, invoice_id, amount, currency, customer_ref_no, merchant_token) {
  const mToken = CryptoJS.SHA512(merchant_token).toString().toUpperCase();
  const txt = `${merchant_key}|${invoice_id}|${amount}|${currency}|${customer_ref_no}|${mToken}`;
  return CryptoJS.SHA512(txt).toString().toUpperCase();
}


export function getListCheckValue(merchantId, customerId, merchantToken) {
    const mToken = CryptoJS.SHA512(merchantToken).toString();
    const txt = `${merchantId}|${customerId}|${mToken}`;
    return CryptoJS.SHA512(txt).toString();
  }
  
  export async function listSavedCards(merchantId, customerId, merchantToken, isTest = true) {
    const rootUrl = isTest ? 'https://sandboxipgpayment.payable.lk' : 'https://ipgpayment.payable.lk';
    const checkValue = getListCheckValue(merchantId, customerId, merchantToken);
    const response = await fetch(`${rootUrl}/ipg/v2/tokenize/listCard`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ merchantId, customerId, checkValue }),
    });
    return response.json();
  }

  export  function getDeleteCheckValue(merchantId, customerId, tokenId, merchantToken) {
    const mToken = CryptoJS.SHA512(merchantToken).toString();
    const txt = `${merchantId}|${customerId}|${tokenId}|${mToken}`;
    return CryptoJS.SHA512(txt).toString();
  }
  
  export  async function deleteSavedCard(merchantId, customerId, tokenId, merchantToken, isTest = true) {
    const rootUrl = isTest ? 'https://sandboxipgpayment.payable.lk' : 'https://ipgpayment.payable.lk';
    const checkValue = getDeleteCheckValue(merchantId, customerId, tokenId, merchantToken);
    const response = await fetch(`${rootUrl}/ipg/v2/tokenize/deleteCard`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ merchantId, customerId, tokenId, checkValue }),
    });
    return response.json();
  }