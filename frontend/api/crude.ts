import axios from 'axios';

const getEncodedCredentials = (): string => {
    const username = localStorage.getItem('username');
    const password = localStorage.getItem('password');
    if (!username || !password) {
        throw new Error('Credentials not found in local storage');
    }
    return Buffer.from(`${username}:${password}`).toString('base64');
};

// Generic GET function
export const get = async <T>(url: string): Promise<T> => {
    const response = await axios.get<T>(url, {
        headers: {
            'Authorization': `Basic ${getEncodedCredentials()}`
        }
    });
    return response.data;
};

// Generic POST function
export const post = async <T, U>(url: string, data: T): Promise<U> => {
    const response = await axios.post<U>(url, data, {
        headers: {
            'Authorization': `Basic ${getEncodedCredentials()}`
        }
    });
    return response.data;
};

export const postFormData = async <T>(url: string, data: FormData): Promise<T> => {
    const response = await axios.post<T>(url, data, {
        headers: {
            'Authorization': `Basic ${getEncodedCredentials()}`,
            'Content-Type': 'multipart/form-data'
        }
    });
    return response.data;
};

// Generic PUT function
export const put = async <T, U>(url: string, data: T): Promise<U> => {
    const response = await axios.put<U>(url, data, {
        headers: {
            'Authorization': `Basic ${getEncodedCredentials()}`
        }
    });
    return response.data;
};




// Generic DELETE function
export const deleteItem = async <T>(url: string, data: T): Promise<void> => {
    await axios.delete(url, {
        headers: {
            'Authorization': `Basic ${getEncodedCredentials()}`
        }
    });
};

export const toQueryString = (params: Record<string, any>): string => {
    return Object.keys(params)
        .filter(key => params[key] !== undefined && params[key] !== null)
        .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
        .join('&');
};
