const samples = [
  {
    id: 0,
    author: "My first quote",
    content:
      "Spend all night ensuring people don't sleep sleep all day found somthing move i bite it tail, milk the cow.",
    date: "2019-12-10"
  },
  {
    id: 1,
    author: "My second quote",
    content:
      "Spend all night ensuring people don't sleep sleep all day found somthing move i bite it tail, milk the cow.",
    date: "2019-11-10"
  },
  {
    id: 2,
    author: "My third quote",
    content:
      "Spend all night ensuring people don't sleep sleep all day found somthing move i bite it tail, milk the cow.",
    date: "2019-12-15"
  }
];

export const quoteSamples = samples.sort((a, b) => a.date < b.date);
