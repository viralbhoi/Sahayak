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

export const getClientById = async (id) => {
    const client = await clientRepository.findById(id);

    if (!client) {
        throw new AppError("Client not found", 404);
    }

    return client;
};
