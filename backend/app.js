import fs from 'node:fs/promises';

import bodyParser from 'body-parser';
import express from 'express';

const app = express();

app.use(bodyParser.json());
app.use(express.static('public'));

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PUT, DELETE, OPTIONS'
  );
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-Requested-With,content-type'
  );
  next();
});

app.get('/challenges', async (req, res) => {
  const { max, search } = req.query;
  const challengesFileContent = await fs.readFile('./data/challenges.json');
  let challenges = JSON.parse(challengesFileContent);

  if (search) {
    challenges = challenges.filter((challenge) => {
      const searchableText = `${challenge.title} ${challenge.description} ${challenge.location}`;
      return searchableText.toLowerCase().includes(search.toLowerCase());
    });
  }

  if (max) {
    challenges = challenges.slice(challenges.length - max, challenges.length);
  }

  res.json({
    challenges: challenges.map((challenge) => ({
      id: challenge.id,
      title: challenge.title,
      image: challenge.image,
      deadline: challenge.deadline,
      description: challenge.description,
      status: challenge.status,
    })),
  });
});

app.get('/challenges/images', async (req, res) => {
  const imagesFileContent = await fs.readFile('./data/images.json');
  const images = JSON.parse(imagesFileContent);

  res.json({ images });
});

app.get('/challenges/:id', async (req, res) => {
  const { id } = req.params;

  const challengesFileContent = await fs.readFile('./data/challenges.json');
  const challenges = JSON.parse(challengesFileContent);

  const challenge = challenges.find((challenge) => challenge.id === id);

  if (!challenge) {
    return res
      .status(404)
      .json({ message: `For the id ${id}, no challenge could be found.` });
  }

  setTimeout(() => {
    res.json({ challenge });
  }, 1000);
});

app.post('/challenges', async (req, res) => {
  const { challenge } = req.body;

  if (!challenge) {
    return res.status(400).json({ message: 'challenge is required' });
  }

  console.log(challenge);

  if (
    !challenge.title?.trim() ||
    !challenge.description?.trim() ||
    !challenge.deadline?.trim() ||
    !challenge.time?.trim() ||
    !challenge.image?.trim() ||
    !challenge.location?.trim()
  ) {
    return res.status(400).json({ message: 'Invalid data provided.' });
  }

  const challengesFileContent = await fs.readFile('./data/challenges.json');
  const challenges = JSON.parse(challengesFileContent);

  const newchallenge = {
    id: Math.round(Math.random() * 10000).toString(),
    ...challenge,
  };

  challenges.push(newchallenge);

  await fs.writeFile('./data/challenges.json', JSON.stringify(challenges));

  res.json({ challenge: newchallenge });
});

app.put('/challenges', async (req, res) => {

  const { status, id } = req.body;
  console.log(status, id)
  if (!id) {
    return res.status(400).json({ message: 'challenge is required' });
  }

  if (
    !status?.trim() || !id?.trim()
  ) {
    return res.status(400).json({ message: 'Invalid data provided.' });
  }

  const challengesFileContent = await fs.readFile('./data/challenges.json');
  const challenges = JSON.parse(challengesFileContent);

  const challengeIndex = challenges.findIndex((item) => item.id === id);

  if (challengeIndex === -1) {
    return res.status(404).json({ message: 'challenge not found' });
  }

  challenges[challengeIndex] = {
    ...challenges[challengeIndex],
    status,
  }

  await fs.writeFile('./data/challenges.json', JSON.stringify(challenges));

  setTimeout(() => {
    res.json({ challenge: challenges[challengeIndex] });
  }, 1000);

});

app.delete('/challenges/:id', async (req, res) => {
  const { id } = req.params;

  const challengesFileContent = await fs.readFile('./data/challenges.json');
  const challenges = JSON.parse(challengesFileContent);

  const challengeIndex = challenges.findIndex((challenge) => challenge.id === id);

  if (challengeIndex === -1) {
    return res.status(404).json({ message: 'challenge not found' });
  }

  challenges.splice(challengeIndex, 1);

  await fs.writeFile('./data/challenges.json', JSON.stringify(challenges));

  setTimeout(() => {
    res.json({ message: 'challenge deleted' });
  }, 1000);
});

app.listen(3000, () => {
  console.log('Server running on port 3000');
});
