export interface UserListData {
  total_count: number;
  incomplete_result: boolean;
  items: {
    login: string;
    id: number;
    avatar_url: string;
  }[];
}

export const getUserList = (search: string): Promise<UserListData> => {
  return fetch(`${process.env.API_HOST}/users?q=${search}`)
    .then((res) => res.json());
}
