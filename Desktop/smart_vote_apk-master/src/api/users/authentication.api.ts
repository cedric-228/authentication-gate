import type { twofactor } from "../../data/models/twofactor";
// import type { user } from "../../data/models/user.model";
import axiosInstance from "../axios_instance";
import type { LoginData } from "../../data/models/login.model";

export const authenticationApi = {
    // login: async (formData: FormData): Promise<user> => {
    //     const response = await axiosInstance.post('/login', formData);
    //     return response.data;
    // },

    twoFactor: async (formData: FormData): Promise<twofactor> => {
        const response = await axiosInstance.post('/twofactorcode-verify', formData);
        return response.data;
    },

}
export const login = async (data: LoginData) => {
  console.log(" Données envoyées au backend :", data);
  const response = await axiosInstance.post("/login", data);
  return response.data;
};
