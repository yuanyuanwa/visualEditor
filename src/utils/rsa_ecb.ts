
const forge: any = (window as any).forge

//公钥
let publicKeyAll = ``;
//私钥
let privateKeyAll = ``;

//RSA设置公钥
export function rsa_setPublicKey(publicEncryKey: any) {
    publicKeyAll = '-----BEGIN PUBLIC KEY-----\n' + publicEncryKey + '\n-----END PUBLIC KEY-----';
}


// 公钥加密密钥 的方法
export function rsa_encrypt(proclaimedText: any) {
    var publicKey = forge.pki.publicKeyFromPem(publicKeyAll)
    var bytes = forge.util.encodeUtf8(proclaimedText)
    var rsaCipherText = forge.util.encode64(publicKey.encrypt(bytes, 'RSA-OAEP', {
        md: forge.md.sha256.create(),
        mgf1: {
            md: forge.md.sha1.create()
        }
    }))
    return rsaCipherText
}

// 私钥解密密钥 的方法
export function rsa_decrypt(rsaCipherText: any) {
    var privateKey = forge.pki.privateKeyFromPem(privateKeyAll)
    var rsaCipherTextAll = forge.util.binary.base64.decode(rsaCipherText);
    var decrypted = privateKey.decrypt(rsaCipherTextAll, 'RSA-OAEP', {
        md: forge.md.sha256.create(),
        mgf1: {
            md: forge.md.sha1.create()
        }
    })
    // console.log(decrypted)
    var proclaimedText = forge.util.decodeUtf8(decrypted)
    return proclaimedText
}

// 私钥解密密钥循环 的方法
export function rsa_Recycle(rsaCipherText: any) {
    var privateKey = forge.pki.privateKeyFromPem(privateKeyAll)
    var rsaCipherTextAll = forge.util.binary.base64.decode(rsaCipherText);
    var decrypted = privateKey.decrypt(rsaCipherTextAll, 'RSA-OAEP', {
        md: forge.md.sha256.create(),
        mgf1: {
            md: forge.md.sha1.create()
        }
    })
    return decrypted
}

//拼接解密
export function rsa_getProclaimedText(rsaCipherText: any) {
    var proclaimedText = forge.util.decodeUtf8(rsaCipherText)
    return proclaimedText
}