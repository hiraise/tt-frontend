import { User } from "@/domain/user/user.entity";

interface ApiUser {
  id: string | number;
  username?: string;
  email: string;
  avatarUrl?: string;
}

export function mapUserFromApi(data: ApiUser): User {
  return {
    id: String(data.id),
    username: String(data.username ?? ""),
    email: data.email,
    avatarUrl: String(data.avatarUrl ?? ""),
  };
}

export function mapUserToApi(user: User): ApiUser {
  return {
    id: user.id,
    username: user.username,
    email: user.email,
    avatarUrl: user.avatarUrl,
  };
}
