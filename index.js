import crypto from 'node:crypto';
const key = crypto.randomBytes(32);
const iv = crypto.randomBytes(16);
const message = "Introduction to Computer Security";

function encrypt (text, key){
    const cipher = crypto.createCipheriv('aes-256-cbc', key, iv);
    let encryptedText = cipher.update(text, 'utf8', 'hex');
    encryptedText += cipher.final('hex');
    return {
        iv: iv.toString('hex'),
        encrypedText: encryptedText
    };
}
function decrypt (resultEncryption, iv, key) {
    const decipher = crypto.createDecipheriv('aes-256-cbc', key, iv);
    let decrypted = decipher.update(resultEncryption, 'hex', 'utf-8');
    decrypted += decipher.final('utf8');
    return decrypted;
}

const result = encrypt(message,key);
const resultDecryption = decrypt(result.encrypedText, iv, key);
console.log("Encypted message:", result);
console.log("Decrypted message:", resultDecryption);
