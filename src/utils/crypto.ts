import CryptoJS from "crypto-js";

const generateEncryptedData = (data: any) => {
  return CryptoJS.AES.encrypt(
    JSON.stringify(data),
    process.env.ENC_KEY || ""
  ).toString();
};

const decryptData = (data: any) => {
  var decryptedData = CryptoJS.AES.decrypt(
    data,
    process.env.ENC_KEY || ""
  ).toString(CryptoJS.enc.Utf8);
  console.log(JSON.parse(JSON.parse(decryptedData)));
  return JSON.parse(JSON.parse(decryptedData));
};

export { generateEncryptedData, decryptData };
