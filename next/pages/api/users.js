import { promises as fs } from 'fs';
import path from 'path';

export default async function handler(req, res) {
  const { userid } = req.query;

  const jsonFilePath = path.join(process.cwd(), 'public', 'users.json');
  const jsonData = await fs.readFile(jsonFilePath, 'utf-8');
  const users = JSON.parse(jsonData);

  const user = users.find((u) => u.userid === userid);

  if (user) {
    res.status(200).json(user);
  } else {
    res.status(404).json({ message: 'User not found' });
  }
}
