const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

// ==========================================
// IN-MEMORY DATABASE
// ==========================================
const PRODUCTS = [
  // --- JACKETS ---
  { id: 1,  title: "Noir Oversized Trench",    price: 120, category: "jackets",     image: "https://images.unsplash.com/photo-1559551409-dadc959f76b8?w=500&q=80&sat=-100" },
  { id: 2,  title: "Leather Biker Jacket",      price: 250, category: "jackets",     image: "https://images.unsplash.com/photo-1487222477894-8943e31ef7b2?w=500&q=80&sat=-100" },
  { id: 3,  title: "Denim Trucker",             price: 80,  category: "jackets",     image: "https://images.unsplash.com/photo-1577803645773-f96470509666?w=500&q=80&sat=-100" },
  { id: 4,  title: "Puffer Down Vest",          price: 95,  category: "jackets",     image: "https://images.unsplash.com/photo-1552668693-d0738e00eca8?w=500&q=80&sat=-100" },
  { id: 5,  title: "Wool Blend Coat",           price: 180, category: "jackets",     image: "https://images.unsplash.com/photo-1539533018447-63fcce2678e3?w=500&q=80&sat=-100" },
  // --- TOPS ---
  { id: 6,  title: "Essential White Tee",       price: 25,  category: "tops",        image: "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=500&q=80&sat=-100" },
  { id: 7,  title: "Heavyweight Black Hoodie",  price: 65,  category: "tops",        image: "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=500&q=80&sat=-100" },
  { id: 8,  title: "Striped Linen Shirt",       price: 45,  category: "tops",        image: "https://images.unsplash.com/photo-1552668693-d0738e00eca8?w=500&q=80&sat=-100" },
  { id: 9,  title: "Graphic Streetwear Tee",    price: 35,  category: "tops",        image: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=500&q=80&sat=-100" },
  { id: 10, title: "Mock Neck Sweater",         price: 55,  category: "tops",        image: "https://images.unsplash.com/photo-1559551409-dadc959f76b8?w=500&q=80&sat=-100" },
  { id: 11, title: "Oversized Grey Sweatshirt", price: 50,  category: "tops",        image: "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=500&q=80&sat=-100" },
  { id: 12, title: "Silk Button Up",            price: 90,  category: "tops",        image: "https://images.unsplash.com/photo-1621335829175-95f437384d7c?w=500&q=80&sat=-100" },
  // --- BOTTOMS ---
  { id: 13, title: "Slim Fit Charcoal Jeans",  price: 60,  category: "bottoms",     image: "https://images.unsplash.com/photo-1542272454315-4c01d7abdf4a?w=500&q=80&sat=-100" },
  { id: 14, title: "Pleated Dress Trousers",   price: 70,  category: "bottoms",     image: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=500&q=80&sat=-100" },
  { id: 15, title: "Cargo Utility Pants",      price: 55,  category: "bottoms",     image: "https://images.unsplash.com/photo-1487222477894-8943e31ef7b2?w=500&q=80&sat=-100" },
  { id: 16, title: "Raw Denim Selvedge",       price: 110, category: "bottoms",     image: "https://images.unsplash.com/photo-1516961642265-531546e84af2?w=500&q=80&sat=-100" },
  { id: 17, title: "Light Wash Relaxed Fit",   price: 50,  category: "bottoms",     image: "https://images.unsplash.com/photo-1582552938357-32b906df40cb?w=500&q=80&sat=-100" },
  { id: 18, title: "Black Joggers",            price: 40,  category: "bottoms",     image: "https://images.unsplash.com/photo-1552346154-21d32810aba3?w=500&q=80&sat=-100" },
  // --- SHOES ---
  { id: 19, title: "Monochrome Sneakers",      price: 95,  category: "shoes",       image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=500&q=80&sat=-100" },
  { id: 20, title: "Leather Chelsea Boots",    price: 140, category: "shoes",       image: "https://images.unsplash.com/photo-1605733513597-a8f8341084e6?w=500&q=80&sat=-100" },
  { id: 21, title: "High Top Canvas",          price: 60,  category: "shoes",       image: "https://images.unsplash.com/photo-1607522370275-f14206abe5d3?w=500&q=80&sat=-100" },
  { id: 22, title: "Suede Loafers",            price: 110, category: "shoes",       image: "https://images.unsplash.com/photo-1533867617858-e7b97e060509?w=500&q=80&sat=-100" },
  { id: 23, title: "Running Trainers",         price: 85,  category: "shoes",       image: "https://images.unsplash.com/photo-1539185441755-769473a23570?w=500&q=80&sat=-100" },
  // --- ACCESSORIES ---
  { id: 24, title: "Urban Leather Tote",       price: 85,  category: "accessories", image: "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=500&q=80&sat=-100" },
  { id: 25, title: "Minimalist Silver Watch",  price: 150, category: "accessories", image: "https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=500&q=80&sat=-100" },
  { id: 26, title: "Woolen Scarf",             price: 35,  category: "accessories", image: "https://images.unsplash.com/photo-1606760227091-3dd870d97f1d?w=500&q=80&sat=-100" },
  { id: 27, title: "Black Baseball Cap",       price: 25,  category: "accessories", image: "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=500&q=80&sat=-100" },
  { id: 28, title: "Gold Chain Necklace",      price: 120, category: "accessories", image: "https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=500&q=80&sat=-100" },
  { id: 29, title: "Leather Wallet",           price: 45,  category: "accessories", image: "https://images.unsplash.com/photo-1512413914633-b5043f4041ea?w=500&q=80&sat=-100" },
  { id: 30, title: "Sunglasses",              price: 75,  category: "accessories", image: "https://images.unsplash.com/photo-1577803645773-f96470509666?w=500&q=80&sat=-100" },
];

// In-memory cart store: { [email]: CartItem[] }
const CARTS = {};

// ==========================================
// ROUTES
// ==========================================

// GET all products
app.get("/api/products", (req, res) => {
  res.json(PRODUCTS);
});

// GET products by category (must be before /:id to avoid param clash)
app.get("/api/products/category/:catName", (req, res) => {
  const category = req.params.catName.toLowerCase();
  const filtered = PRODUCTS.filter((p) => p.category.toLowerCase() === category);
  res.json(filtered);
});

// GET single product by id
app.get("/api/products/:id", (req, res) => {
  const product = PRODUCTS.find((p) => p.id === parseInt(req.params.id));
  product ? res.json(product) : res.status(404).json({ message: "Not found" });
});

// GET all categories
app.get("/api/categories", (req, res) => {
  const categories = [...new Set(PRODUCTS.map((p) => p.category))];
  res.json(categories);
});

// POST add a new product (seller dashboard)
app.post("/api/products", (req, res) => {
  const { title, price, category, image, description } = req.body;
  const newProduct = {
    id: Date.now(),
    title,
    price: Number(price),
    category,
    image,
    description: description || "No description provided.",
  };
  PRODUCTS.push(newProduct);
  console.log("New product added:", newProduct.title);
  res.json({ success: true, product: newProduct });
});

// POST login (mock — no real auth)
app.post("/api/auth/login", (req, res) => {
  const { email } = req.body;
  if (!email) return res.status(400).json({ message: "Email required" });
  res.json({
    success: true,
    token: "mock-jwt-token-123",
    user: { email, name: "User" },
  });
});

// GET cart by user email header
app.get("/api/cart", (req, res) => {
  const user = req.headers["x-user-email"];
  res.json(CARTS[user] || []);
});

// POST add item to cart (or increment quantity)
app.post("/api/cart", (req, res) => {
  const user = req.headers["x-user-email"];
  const { productId } = req.body;
  if (!user) return res.status(401).json({ message: "Login required" });

  const product = PRODUCTS.find((p) => p.id === productId);
  if (!product) return res.status(404).json({ message: "Invalid product" });

  if (!CARTS[user]) CARTS[user] = [];

  const existingItem = CARTS[user].find((item) => item.product.id === productId);
  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    CARTS[user].push({ product, quantity: 1 });
  }

  res.json({ success: true, cart: CARTS[user] });
});

// PUT update cart item quantity
app.put("/api/cart/update", (req, res) => {
  const user = req.headers["x-user-email"];
  const { productId, change } = req.body;

  if (!CARTS[user]) return res.json([]);

  const itemIndex = CARTS[user].findIndex((item) => item.product.id === productId);
  if (itemIndex > -1) {
    CARTS[user][itemIndex].quantity += change;
    if (CARTS[user][itemIndex].quantity <= 0) {
      CARTS[user].splice(itemIndex, 1);
    }
  }

  res.json(CARTS[user]);
});

// ==========================================
// START
// ==========================================
app.listen(PORT, () => {
  console.log(`\n🚀 NOIR BACKEND running at: http://localhost:${PORT}`);
});
