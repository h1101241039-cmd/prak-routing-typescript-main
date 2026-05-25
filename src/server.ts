import * as http from 'http';

const PORT = 3000; // Biarkan Node.js berjalan di port 3000

// Data statis (Tugas 1 & 2)
const products = [
  { id: 1, name: "Laptop" },
  { id: 2, name: "Mouse" }
];

const users = [
  { id: 123, name: "Budi Santoso" }
];

const server = http.createServer((req, res) => {
  const startTime = Date.now(); // Middleware: catat waktu mulai (Tugas 3)
  
  const url = req.url || '/';
  const method = req.method || 'GET';

  const sendResponse = (statusCode: number, contentType: string, data: string) => {
    res.writeHead(statusCode, { 'Content-Type': contentType });
    res.end(data);

    // Middleware: catat waktu selesai dan print log (Tugas 3)
    const duration = Date.now() - startTime;
    console.log(`[Node.js] ${method} ${url} - ${duration}ms`);
  };

  // Routing Halaman Utama
  if (url === '/' && method === 'GET') {
    sendResponse(200, 'text/html', '<h1>Halaman Utama Node.js</h1>');
  } 
  // GET /products (Tugas 1)
  else if (url === '/products' && method === 'GET') {
    sendResponse(200, 'application/json', JSON.stringify(products));
  } 
  // POST /products (Tugas 1)
  else if (url === '/products' && method === 'POST') {
    sendResponse(201, 'application/json', JSON.stringify({ message: "Produk berhasil ditambahkan (simulasi)" }));
  } 
  // GET /users/:id (Tugas 2)
  else if (url.startsWith('/users/') && method === 'GET') {
    const parts = url.split('/'); // Memecah url "/users/123" menjadi ["", "users", "123"]
    const id = parseInt(parts[2]);
    const user = users.find(u => u.id === id);

    if (user) {
      sendResponse(200, 'application/json', JSON.stringify(user));
    } else {
      sendResponse(404, 'application/json', JSON.stringify({ message: "User tidak ditemukan" }));
    }
  } 
  else {
    sendResponse(404, 'text/html', '<h1>404 Not Found</h1>');
  }
});

server.listen(PORT, () => {
  console.log(`Server Node.js berjalan di http://localhost:${PORT}`);
});