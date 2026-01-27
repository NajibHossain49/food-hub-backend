export type Role = "CUSTOMER" | "PROVIDER" | "ADMIN";

export interface UserPublic {
  id: string;
  name: string;
  email: string;
  emailVerified: boolean;
  image?: string | null;
  avatarUrl?: string | null;
  phone?: string | null;
  role: Role;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  providerProfileId?: string | null;
}
