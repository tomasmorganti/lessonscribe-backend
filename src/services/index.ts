import authRoutes from './auth/routes';
import userRoutes from './user/routes';

export default [...userRoutes, ...authRoutes];
