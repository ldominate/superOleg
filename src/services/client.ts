import axios from "axios";

/**
 * Этот экземпляр клиента мы можем использовать внутри redux
 * действий, для добавления токенов авторизации и других заголовков.
 */
const client = axios.create({
    baseURL: "https://jsonplaceholder.typicode.com"
});

export default client;