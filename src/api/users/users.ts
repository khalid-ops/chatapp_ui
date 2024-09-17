import { User } from "@/lib/types/user";
import { apiInstance }  from "../index";
export const fetchUsers = async () => {
    const response = await apiInstance.get<User[]>('/users');
    return response.data;
}

export const AddContact = async (userId: string, contactId: string) => {
    return apiInstance.post('/users/contact', {
            userId, contactId
    })
}

export const fetchUserFriends = async (userId: string) => {
    const response = await apiInstance.get<User[]>(`/users/contacts/${userId}`);
    return response.data;
}