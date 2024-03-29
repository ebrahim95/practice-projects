import express from 'express';
import diagnosesRouter from './routes/diagnoses';
import patientRouter from './routes/patients';
// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-var-requires
const cors = require('cors');
const app = express();
app.use(express.json());
// eslint-disable-next-line @typescript-eslint/no-unsafe-call
app.use(cors());
app.get('/api/ping', (_req, res) => {
  // res.set('Access-Control-Allow-Origin', 'http://localhost:3000');
  return res.send('pong');
});


app.use('/api/patients', patientRouter);
app.use('/api/diagnoses', diagnosesRouter);
const PORT = 3001;

app.listen(PORT, () => {
  console.log(`Server is connected to PORT ${PORT}`);
});
