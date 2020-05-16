import userRoutes from './user/routes';
import instructorRoutes from './instructor/routes';
import studentRoutes from './student/routes';

export default [...userRoutes, ...instructorRoutes, ...studentRoutes];
