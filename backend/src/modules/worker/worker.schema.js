// simple reusable validator format

export const createWorkerSchema = (body) => {
    if (!body.phone) return { error: "Phone is required" };
    if (!body.city) return { error: "City is required" };

    if (!Array.isArray(body.skills) || body.skills.length === 0) {
        return { error: "At least one skill is required" };
    }

    return {};
};

export const availabilitySchema = (body) => {
    if (typeof body.availability !== "boolean") {
        return { error: "Availability must be true/false" };
    }

    return {};
};
