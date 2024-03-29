import dotenv from 'dotenv'
dotenv.config()
import './db/config'
/** swagger  */
/* INTERFAZ GRAFICA DE LA DOCUMENTACION */
import swaggerUi from 'swagger-ui-express'
import swaggerJsDoc from 'swagger-jsdoc'
// import { options } from './swaggerOptions' ORIGINAL
import { swaggerConfig } from './swaggerDoc'


'./middlewares/authGoogle'
'./middlewares/authFacebook'

import passport from 'passport'
import cors from 'cors'
import express from 'express'
import morgan from 'morgan'
import session from 'cookie-session'

const app = express()
app.use(cors({origin:'http://localhost:8080'}));
/** routes v1 */
import router from './routes/v1'
'./middlewares/isLoggedIn'

// const app = express();
app.use(session({
  name: process.env.NAME_COOKIE,
  keys: ['key1','key2']
}))

app.use(passport.initialize());
app.use(passport.session());

app.use(morgan('tiny'));
// app.use(cors());
app.use(express.json());

/**application/x-www-form-urlencoded */
app.use(express.urlencoded({ extended: true }));

/** jsDocs */
// const specs = swaggerJsDoc(options) ORIGINAL;
const swaggerUrl = 'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.18.3/swagger-ui.min.css'
/** Middlewares router */
app.use('/v1',router);
/**swagger */
// app.use('/v1/docs',swaggerUi.serve,swaggerUi.setup(specs)) ORIGINAL;

app.use('/v1/docs',swaggerUi.serve,swaggerUi.setup(swaggerConfig,{customCssUrl: swaggerUrl}));



app.use(express.static('public'));
const history = require('connect-history-api-fallback');
app.use(history());


/** Connection database */
app.listen(process.env.PORT || 3000,()=>{
  console.log(`Listen on port ${process.env.PORT}`)  
})
