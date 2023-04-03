import setMongo from "./mongo.js";
import setRoutes from './routes.js';
import dotenv from 'dotenv';
dotenv.config();
import morgan from 'morgan';
import express from 'express';
import path from 'path';
import fixJob from "./cron/fixCron.js";
import cors from "cors";
const __dirname = path.dirname(new URL(import.meta.url).pathname);

dotenv.config();
const app = express();
app.set('port', (process.env.PORT || 3000));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan('dev'));
app.use('/', express.static(path.join(__dirname, '../public')));

const main = async (): Promise<any> => {
  try {
    await setMongo();
    const corsOptions = {
      origin: 'http://localhost',
    };
    app.use(cors(corsOptions));
    setRoutes(app);
    fixJob.start();
    app.get('/*', (req: any, res: { sendFile: (arg0: any) => void; }) => {
      res.sendFile(path.join(__dirname, '../public/index.html'));
    });
    app.listen(app.get('port'), () => console.info(`Server listening on port ${app.get('port')}`));
  } catch (err) {
    console.error(err);
  }
};

main();

export { app };
