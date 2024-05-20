
// global.foodData = require('./db')(function call(err, data, CatData) {
//   console.log(data)
//   if(err) console.log(err);
//   global.foodData = data;
//   global.foodCategory = CatData;
// })

// const express = require('express')
// const app = express()
// const port = 5000
// app.use((req, res, next) => {
//   res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
//   res.header(
//     "Access-Control-Allow-Headers",
//     "Origin, X-Requested-With, Content-Type, Accept"
//   );
//   next();
// });
// app.use(express.json())

// app.get('/', (req, res) => {
//   res.send('Hello World!')
// })

// app.use('/api/auth', require('./Routes/Auth'));

// app.listen(port, () => {
//   console.log(`Example app listening on http://localhost:${port}`)
// })



const express = require('express');
const connectToMongoDB = require('./db');

const app = express();
const port = 5000;

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.use('/api/auth', require('./Routes/Auth'));

connectToMongoDB((err, foodData, foodCategory) => {
  if (err) {
    console.error('Failed to connect to MongoDB', err);
    process.exit(1); // Exit the process with failure
  } else {
    global.foodData = foodData;
    global.foodCategory = foodCategory;

    app.listen(port, () => {
      console.log(`Example app listening on http://localhost:${port}`);
    });
  }
});
