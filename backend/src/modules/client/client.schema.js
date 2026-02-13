export const createClientSchema = (body) => {
    if (!body.phone) return { error: "Phone is required" };
    if (!body.city) return { error: "City is required" };

    return {};
};
