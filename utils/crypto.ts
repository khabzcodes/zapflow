import crypto from 'crypto-js';

const encryptionSecretKey = process.env.ENCRYPTION_SECRET_KEY!;

export const encrypt = (text: string) => {
  const encryptedText = crypto.AES.encrypt(
    text,
    encryptionSecretKey,
  ).toString();
  return encryptedText;
};

export const decrypt = (cipherText: string) => {
  const bytes = crypto.AES.decrypt(cipherText, encryptionSecretKey);
  const decryptedText = bytes.toString(crypto.enc.Utf8);
  return decryptedText;
};
