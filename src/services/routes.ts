import userRoutes from "./user/userRoutes";
import authRoutes from "./auth/authRoutes";

export default [
    ...userRoutes,
    ...authRoutes
];