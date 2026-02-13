export const createJobSchema = (body) => {
    if (!body.client_id) return { error: "client_id is required" };
    if (!body.skill_id) return { error: "skill_id is required" };
    if (!body.city) return { error: "city is required" };

    return {};
};
