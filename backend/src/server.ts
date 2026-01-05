import express from 'express';
import userRoutes from './routes/user.routes';
import programRoutes from './routes/program.routes';
import categoryRoutes from './routes/category.routes';
import setTemplateRoutes from './routes/setTemplate.routes';
import workoutRoutes from './routes/workout.routes';
import workoutExerciseRoutes from './routes/workoutExercise.routes';
import workoutSetRoutes from './routes/workoutSet.routes';
import progressRoutes from './routes/progress.routes';
import exerciseRoutes from './routes/exercise.route';


const app = express();
app.use(express.json());


app.use('/users', userRoutes);
app.use('/programs', programRoutes);
app.use('/categories', categoryRoutes);
app.use('/setTemplates', setTemplateRoutes);
app.use('/workouts', workoutRoutes);
app.use('/workoutExercises', workoutExerciseRoutes);
app.use('/workoutSet', workoutSetRoutes);
app.use('/progress', progressRoutes);
app.use('/exercises', exerciseRoutes);


app.listen(3000, () => {
    console.log("Le serveur est lance sur le port 3000")
});

