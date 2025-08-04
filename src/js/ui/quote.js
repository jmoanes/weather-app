// Quotes logic

const quotes = [
  { text: "Wherever you go, no matter what the weather, always bring your own sunshine.", author: "Anthony J. D'Angelo" },
  { text: "Sunshine is delicious, rain is refreshing, wind braces us up, snow is exhilarating.", author: "John Ruskin" },
  { text: "There is no such thing as bad weather, only different kinds of good weather.", author: "John Ruskin" },
  { text: "Some people feel the rain. Others just get wet.", author: "Bob Marley" },
  { text: "To appreciate the beauty of a snowflake it is necessary to stand out in the cold.", author: "Aristotle" },
  { text: "Climate is what we expect, weather is what we get.", author: "Mark Twain" },
  { text: "The sound of the rain needs no translation.", author: "Alan Watts" }
];

export function getRandomQuote() {
  const q = quotes[Math.floor(Math.random() * quotes.length)];
  return `<div class="quote-section">“${q.text}”<br><span class="quote-author">— ${q.author}</span></div>`;
} 