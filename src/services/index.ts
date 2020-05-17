import userRoutes from './user/user.routes';
import instructorRoutes from './instructor/instructor.routes';
import studentRoutes from './student/student.routes';
import lessonRoutes from './lesson/lesson.routes';

export default [...userRoutes, ...instructorRoutes, ...studentRoutes, ...lessonRoutes];
