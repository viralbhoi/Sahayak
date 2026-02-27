export const requestOtpSchema = (body) => {
    if (!body.phone) return { error: "Phone is required" };
    return {};
};

export const verifyOtpSchema = (body) => {
    if (!body.phone) return { error: "Phone is required" };
    if (!body.otp) return { error: "OTP is required" };
    return {};
};
