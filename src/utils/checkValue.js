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