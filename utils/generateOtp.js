import { randomInt } from 'crypto';

const generateOTP = () => {
    // Generate a 6-digit OTP
    const otp = randomInt(100000, 999999);
    return otp.toString(); // Convert to string for easy use
};
export default generateOTP;