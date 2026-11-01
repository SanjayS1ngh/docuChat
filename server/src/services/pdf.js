const pdfParse = require('pdf-parse/lib/pdf-parse.js');

async function extractPages(buffer) {
  const pages = [];
  await pdfParse(buffer, {
    pagerender: async (pageData) => {
      const content = await pageData.getTextContent();
      const text = content.items.map((item) => item.str).join(' ');
      pages.push(text);
      return text;
    },
  });
  return pages;
}

module.exports = { extractPages };