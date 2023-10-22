import mongoose from 'mongoose';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import express from 'express';
import router from './routes/project';
import morgan from 'morgan';

const port = parseInt(process.env.PORT || '8000', 10);
var app = express();

const uri = "mongodb+srv://vaibhav:vaibhav@cluster0.cwk6nps.mongodb.net/projects?retryWrites=true&w=majority";

var options = {
  connectTimeoutMS: 30000,
  useNewUrlParser: true,
  useUnifiedTopology: true,
};
const connect = mongoose.connect(uri,options);

connect.then((db) => {
  console.log("Connected correctly to database");
}, (err) => { console.log(err); });



app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(morgan('combined'));

app.use(cors())
const createError = (statusCode: number) => {
  console.error("error");
}

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

app.get('/testw',(req,res)=>{
  res.send("this is test")
})
app.use('/project',router);

const server = app.listen(port);

function onListening() {
  const addr = server.address();
  const bind = typeof addr === 'string' ? addr : addr?.port;
  console.log(`Listening on ${bind} in ${app.get('env')} environment`);
  console.log(`Server ready at http://localhost:${bind}`);
  console.log({ a: 'asdfasf' });
}

server.on('listening', onListening);

