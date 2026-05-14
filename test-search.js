const fs = require('fs');
const catalog = JSON.parse(fs.readFileSync('./src/data/catalog.json', 'utf8'));

const query = "ISRO";
const terms = query.toLowerCase().split(' ').filter(Boolean);
const selectedCategory = 'all';

const matchingProjects = catalog.projects.highlights.filter((project) => {
  const searchableText = [
    project.title,
    project.subtitle,
    project.detail,
    project.showcase?.heroTitle,
    project.showcase?.heroDescription,
  ].filter(Boolean).join(' ').toLowerCase();

  return terms.every((term) => searchableText.includes(term));
});

console.log(matchingProjects.length);
console.log(matchingProjects[0]?.title);
