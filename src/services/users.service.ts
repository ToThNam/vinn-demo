import axiosClient from "services";

import { Iusers } from "types/users/users";

const UserServices = {
  getAllUsers(): Promise<Iusers> {
    const url: string = `/users`;
    return axiosClient.get(url);
  },
  getUserById(id: string): Promise<Iusers> {
    const url: string = `/users/${id}`;
    return axiosClient.get(url);
  }
};

export default UserServices;
