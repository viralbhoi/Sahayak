export const idParamSchema = (params) => {
    const id = Number(params.id);

    if (!params.id || isNaN(id) || id <= 0) {
        return { error: "Valid id is required" };
    }

    return {};
};
