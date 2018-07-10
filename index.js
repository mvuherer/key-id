const crypto = require('crypto');

let privateHexKey = '73757065722E7365637265742E6B6579';

function keyToHex(ascii) {
  if (!ascii) {
    return false;
  }

  const hexArray = [];
  const optimisedAscii = ascii.toString().substring(0, 16).padStart(16, '.');

	for (let index = 0; index < optimisedAscii.length; index ++) {
		hexArray.push(Number(optimisedAscii.charCodeAt(index)).toString(16));
  }

	return hexArray.join('').toUpperCase();
}

module.exports.setPrivateKey = (privateKey) => {
  privateHexKey = keyToHex(privateKey);

  return privateHexKey;
}

module.exports.idToKey = (id, privateKey) => {
  try {
    const iv = Buffer.from('');
    const key = Buffer.from(keyToHex(privateKey) || privateHexKey, 'hex');
    const cipher = crypto.createCipheriv('aes-128-ecb', key, iv);

    const chunks = [];
    chunks.push(cipher.update(Buffer.from(id.toString(), 'utf8'), 'buffer', 'hex'));
    chunks.push(cipher.final('hex'));

    return chunks.join('').toUpperCase();
  } catch (e) {
    return false;
  }
};

module.exports.keyToId = (key, privateKey) => {
  try {
    const keyBuffer = Buffer.from(keyToHex(privateKey) || privateHexKey, 'hex');
    const phraseBuffer = Buffer.from(key, 'hex');
    const ivBuffer = Buffer.from('');
    const decipher = crypto.createDecipheriv('aes-128-ecb', keyBuffer, ivBuffer);

    let decrypted = decipher.update(phraseBuffer, 'buffer', 'utf8');
    decrypted += decipher.final('utf8');

    return parseInt(decrypted, 10) || decrypted;
  } catch (e) {
    return false;
  }
};
