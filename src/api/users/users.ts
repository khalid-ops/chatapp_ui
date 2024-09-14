import { User } from "@/lib/types/user";
import { apiInstance }  from "../index";
export const fetchUsers = async () => {
    const response = await apiInstance.get<User[]>('/users');
    return response.data;
}