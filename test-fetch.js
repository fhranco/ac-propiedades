async function test() {
  const res = await fetch('http://localhost:3000/api/propiedades');
  const text = await res.text();
  console.log('Status:', res.status);
  console.log('Body:', text);
}
test();
