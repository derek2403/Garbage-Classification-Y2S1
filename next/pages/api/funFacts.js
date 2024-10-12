// pages/api/funFacts.js

const funFacts = {
  cardboard: [
    "Cardboard can be recycled up to 7 times before the fibers become too weak.",
    "The first cardboard box was produced commercially in England in 1817.",
    "Recycling 1 ton of cardboard saves 9 cubic yards of landfill space.",
    "Corrugated cardboard boxes were first used for packaging in the 1850s."
  ],
  glass: [
    "Glass can be recycled endlessly without losing quality or purity.",
    "Recycling one glass bottle saves enough energy to light a 100-watt bulb for 4 hours.",
    "Glass takes over 4000 years to decompose naturally.",
    "The first glass bottles were made around 1500 BC in Mesopotamia."
  ],
  metal: [
    "Recycling aluminum uses 95% less energy than making new aluminum from raw materials.",
    "A used aluminum can is recycled and back on the grocery shelf as a new can in as little as 60 days.",
    "Steel is the most recycled material in the world.",
    "Recycling one aluminum can saves enough energy to run a TV for 3 hours."
  ],
  paper: [
    "Recycling one ton of paper saves 17 trees.",
    "The average American uses 7 trees a year in paper, wood, and other products made from trees.",
    "Paper can be recycled 5 to 7 times before the fibers become too short.",
    "The first paper recycling mill in the United States was built in 1690 in Philadelphia."
  ],
  plastic: [
    "It takes up to 1000 years for plastic to decompose.",
    "Recycling one ton of plastic bottles saves the equivalent energy usage of a two-person household for one year.",
    "The first fully synthetic plastic was invented in 1907.",
    "Every year, about 8 million tons of plastic waste escapes into the oceans."
  ],
  trash: [
    "The average person generates 4.5 pounds of trash every day.",
    "Composting can reduce the amount of household waste by up to 30%.",
    "The largest landfill in the world is in Las Vegas and covers 2,200 acres.",
    "It takes 500 years for an average sized plastic water bottle to fully decompose."
  ]
};

export default function handler(req, res) {
  if (req.method === 'POST') {
    const { category } = req.body;
    
    if (!category || !funFacts[category.toLowerCase()]) {
      return res.status(400).json({ error: 'Invalid category' });
    }

    const facts = funFacts[category.toLowerCase()];
    const randomFact = facts[Math.floor(Math.random() * facts.length)];

    res.status(200).json({ fact: randomFact });
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}