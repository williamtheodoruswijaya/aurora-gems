import "next-auth";
import "next-auth/jwt";

declare module "next-auth" {
  enum Role {
    BUYER = "BUYER",
    SELLER = "SELLER",
  }
  interface User {
    id: string;
    username: string;
    email: string;
    role: Role;
  }

  interface Session {
    user: User & {
      id: string;
      username: string;
      email: string;
      role: Role;
    };
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    username: string;
    email: string;
    role: Role;
  }
}
