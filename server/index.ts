import express from 'express';

const app = express();

app.get('/', (req, res) => {
  res.send('yay');
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`server started on port ${port}`);
});
