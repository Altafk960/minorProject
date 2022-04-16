const crypto = require("crypto");
const algorithm = "aes-256-ctr";
const secretKey = "vOVH6sdmpNWjRRIqCc7rdxs01lwHzfr3";
const iv = Buffer.from("ff ff ff ff ff f");
const encrypt = (text) => {
  console.log(iv);
  const cipher = crypto.createCipheriv(algorithm, secretKey, iv);
  const encrypted = Buffer.concat([cipher.update(text), cipher.final()]);
  return {
    content: encrypted.toString("hex"),
  };
};

const decrypt = (hash) => {
  console.log(iv);
 // console.log(hash);
  const decipher = crypto.createDecipheriv(
    algorithm,
    secretKey,
    Buffer.from(iv, "hex")
  );

  const decrpyted = Buffer.concat([
    decipher.update(Buffer.from(hash, "hex")),
    decipher.final(),
  ]);

  return decrpyted;
};

module.exports = {
  encrypt,
  decrypt,
};
