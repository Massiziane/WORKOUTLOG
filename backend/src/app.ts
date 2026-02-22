import express from 'express';
import cors from 'cors';
import userRoutes from './routes/user.routes';
import programRoutes from './routes/program.routes';
import categoryRoutes from './routes/category.routes';
import setTemplateRoutes from './routes/setTemplate.routes';
import workoutRoutes from './routes/workout.routes';
import workoutExerciseRoutes from './routes/workoutExercise.routes';
import workoutSetRoutes from './routes/workoutSet.routes';
import exerciseRoutes from './routes/exercise.route';
import muscleGroupRouter from './routes/muscleGroup.routes';  

const app = express();

app.use(cors({
  origin: [
    "http://localhost:5173",
    "https://workoutlog-c5r8.onrender.com"
  ],
  credentials: true
}));


app.use(express.json());


app.use('/users', userRoutes);
app.use('/programs', programRoutes);
app.use('/categories', categoryRoutes);
app.use('/setTemplates', setTemplateRoutes);
app.use('/workouts', workoutRoutes);
app.use('/workoutExercises', workoutExerciseRoutes);
app.use('/workoutSet', workoutSetRoutes);
app.use('/exercises', exerciseRoutes);
app.use("/muscle-groups", muscleGroupRouter);

export default app
