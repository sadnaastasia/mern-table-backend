import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';

import InfoModel from './model.js';

mongoose
  .connect(
    'mongodb+srv://admin:wwwww@cluster0.jthed.mongodb.net/info?retryWrites=true&w=majority&appName=Cluster0    '
  )
  .then(() => {
    console.log('Db ok');
  })
  .catch((err) => {
    console.log('Db err', err);
  });

const app = express();

app.use(express.json());
app.use(cors());

app.get('/', async (req, res) => {
  try {
    const infos = await InfoModel.find();
    res.json(infos);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "The table hasn't been gotten",
    });
  }
});

app.get('/:id', async (req, res) => {
  try {
    const infoId = req.params.id;
    const data = await InfoModel.findOne({
      _id: infoId,
    });
    res.json(data);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "The info hasn't been gotten",
    });
  }
});

app.post('/', async (req, res) => {
  try {
    const doc = new InfoModel({
      company: req.body.company,
      vacancy: req.body.vacancy,
      salary: req.body.salary,
      status: req.body.status,
      note: req.body.note,
    });

    const info = await doc.save();

    res.json(info);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "The info hasn't been posted",
    });
  }
});

app.patch('/:id', async (req, res) => {
  try {
    const infoId = req.params.id;
    await InfoModel.updateOne(
      {
        _id: infoId,
      },
      {
        company: req.body.company,
        vacancy: req.body.vacancy,
        salary: req.body.salary,
        status: req.body.status,
        note: req.body.note,
      }
    );
    res.json({ succes: true });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "The info hasn't been updated",
    });
  }
});

app.delete('/:id', async (req, res) => {
  const infoId = req.params.id;
  await InfoModel.findOneAndDelete({
    _id: infoId,
  });
  res.json({ succes: true });
});

app.listen(4444, (err) => {
  if (err) {
    console.log(err);
  }
  console.log('Server ok');
});
