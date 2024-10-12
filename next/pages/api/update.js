// /pages/api/update.js
import fs from 'fs';
import path from 'path';

const jsonFilePath = path.join(process.cwd(), 'public/users.json');

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { userId } = req.body;
    let users = JSON.parse(fs.readFileSync(jsonFilePath, 'utf8'));
    const user = users.find(u => u.userid === userId);

    if (user) {
      user.recycledItems += 1;
      fs.writeFileSync(jsonFilePath, JSON.stringify(users, null, 2));
      res.status(200).json({ success: true, recycledItems: user.recycledItems });
    } else {
      res.status(404).json({ success: false, message: 'User not found' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
