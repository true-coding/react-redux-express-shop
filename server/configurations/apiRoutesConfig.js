import authenticationRouter from '../routes/authenticationRoutes';
import cors                 from 'cors';
import wildcardRouter       from '../routes/wildcardRoute';
import adminRouter          from "../routes/adminRoutes";


export default function ConfigApiRoutes(app) {
  app.use(cors());
  app.use(authenticationRouter);
  app.use(adminRouter);
  app.use(wildcardRouter);
}
