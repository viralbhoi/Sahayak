export const buildFilters = (query, allowedFields) => {
    const filters = [];
    const values = [];
    let idx = 1;

    for (const field of allowedFields) {
        if (query[field]) {
            filters.push(`${field} = $${idx++}`);
            values.push(query[field]);
        }
    }

    return { clause: filters.join(" AND "), values };
};
