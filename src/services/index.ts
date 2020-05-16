import userRoutes from './user/user.routes';
import instructorRoutes from './instructor/instructor.routes';
import studentRoutes from './student/student.routes';

export default [...userRoutes, ...instructorRoutes, ...studentRoutes];
