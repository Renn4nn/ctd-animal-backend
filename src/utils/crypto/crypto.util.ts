// src/utils/crypto/crypto.util.ts
import { createCipheriv, createDecipheriv, scrypt } from 'node:crypto';
import { promisify } from 'node:util';

const scryptAsync = promisify(scrypt);

async function getCryptoConfig() {
  const password = process.env.ENCRYPTION_PASSWORD;
  const ivString = process.env.ENCRYPTION_IV;
  if (!password || !ivString) {
    throw new Error('As variáveis de ambiente ENCRYPTION_PASSWORD ou ENCRYPTION_IV não foram definidas!');
  }
  const iv = Buffer.from(ivString, 'hex');
  if (iv.length !== 16) {
    throw new Error('O ENCRYPTION_IV deve ter exatamente 16 bytes (32 caracteres hexadecimais).');
  }

  const key = (await scryptAsync(password, 'salt', 32)) as Buffer;
  return { key, iv };
}

export async function encrypt(text: string) {
  if (!text) return text;

  const { key, iv } = await getCryptoConfig();
  const cipher = createCipheriv('aes-256-ctr', key, iv);

  const encrypted = Buffer.concat([
    cipher.update(text, 'utf8'),
    cipher.final(),
  ]);

  return encrypted.toString('hex');
}

export async function decrypt(encryptedText: string) {
  if (!encryptedText) return encryptedText;

  const { key, iv } = await getCryptoConfig();
  const decipher = createDecipheriv('aes-256-ctr', key, iv);

  const decrypted = Buffer.concat([
    decipher.update(Buffer.from(encryptedText, 'hex')),
    decipher.final(),
  ]);

  return decrypted.toString('utf8');
}