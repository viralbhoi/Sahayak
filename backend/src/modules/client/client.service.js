import * as clientRepository from "./client.repository.js";

export const createClient = async (data) => {
    const { name, phone, city } = data;

    if (!phone || !city) {
        throw new Error("Phone and city are required");
    }

    const client = await clientRepository.createClient({
        name,
        phone,
        city,
    });

    return client;
};
