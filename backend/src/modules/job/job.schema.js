export const createJobSchema = (body) => {
    if (!body.skill) return { error: "skill is required" };
    if (!body.city) return { error: "city is required" };
    return {};
};
