async function run() {
  const res = await fetch('https://chesswize.com/');
  const text = await res.text();
  const imgs = text.match(/<img[^>]+src=\"([^\"]+)\"/g);
  console.log(imgs ? imgs.join('\n') : 'no images');
}
run();
