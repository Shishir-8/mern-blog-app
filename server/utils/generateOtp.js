import crypto from "node:crypto"


export function generateOtp(length= 6) {
    const min = Math.pow(10, length -1);
    const max = Math.pow(10, length) - 1
    return crypto.randomInt(min, max + 1).toString()
}