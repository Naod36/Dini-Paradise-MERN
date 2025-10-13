// seed.js

const mongoose = require("mongoose");
require("dotenv").config();

// const router = express.Router();
const MenuItem = require("./models/MenuItem");

const MONGODB_URI =
  process.env.MONGODB_URI || "mongodb://localhost:27017/dini-paradise";

async function seedDatabase() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log("✅ Connected to MongoDB Menu Item Model");

    const data = [
      {
        name: "Doro Wat",
        description:
          "Traditional Ethiopian chicken stew slow-cooked with berbere spice and served with injera.",
        price: 280,
        category: "Main Dish",
        isPopular: true,
        image: {
          src: "https://images.unsplash.com/photo-1617196034796-73dfa7b38d2c",
          public_id: "menu/doro_wat_v1",
          alt: "Traditional Ethiopian Doro Wat with injera",
        },
      },
      {
        name: "Injera with Tibs",
        description:
          "Spiced sautéed beef served on fluffy injera with mixed vegetables.",
        price: 250,
        category: "Main Dish",
        isPopular: true,
        image: {
          src: "https://images.unsplash.com/photo-1617196034832-9b8b9e6d80c1",
          public_id: "menu/tibs_v1",
          alt: "Injera with beef tibs",
        },
      },
      {
        name: "Kitfo",
        description:
          "Minced raw or lightly cooked beef seasoned with mitmita and niter kibbeh.",
        price: 320,
        category: "Main Dish",
        isPopular: true,
        image: {
          src: "https://images.unsplash.com/photo-1600628422010-90c893f82a5f",
          public_id: "menu/kitfo_v1",
          alt: "Ethiopian Kitfo with cheese and greens",
        },
      },
      {
        name: "Shiro Wot",
        description:
          "Rich and spicy chickpea stew cooked with berbere and garlic, served with injera.",
        price: 180,
        category: "Vegan Dish",
        isPopular: false,
        image: {
          src: "https://images.unsplash.com/photo-1633933034867-1a1ac2cb0a7c",
          public_id: "menu/shiro_v1",
          alt: "Ethiopian Shiro Wot served on injera",
        },
      },
      {
        name: "Firfir",
        description:
          "Torn injera mixed with spicy berbere sauce and onions, a breakfast favorite.",
        price: 160,
        category: "Breakfast",
        isPopular: true,
        image: {
          src: "https://images.unsplash.com/photo-1645112700583-bda4b422d3b4",
          public_id: "menu/firfir_v1",
          alt: "Ethiopian firfir with berbere sauce",
        },
      },
      {
        name: "Chechebsa",
        description:
          "Soft pieces of flatbread fried in spiced butter and berbere, served with honey.",
        price: 150,
        category: "Breakfast",
        isPopular: false,
        image: {
          src: "https://images.unsplash.com/photo-1627308595229-7830a5c91f9f",
          public_id: "menu/chechebsa_v1",
          alt: "Traditional Ethiopian chechebsa",
        },
      },
      {
        name: "Burger Deluxe",
        description:
          "Juicy beef burger with lettuce, tomato, cheese, and house sauce served with fries.",
        price: 220,
        category: "Fast Food",
        isPopular: true,
        image: {
          src: "https://images.unsplash.com/photo-1550317138-10000687a72b",
          public_id: "menu/burger_v1",
          alt: "Beef burger with fries",
        },
      },
      {
        name: "Pizza Margherita",
        description:
          "Classic Italian pizza with tomato sauce, mozzarella, and fresh basil.",
        price: 260,
        category: "Pizza",
        isPopular: true,
        image: {
          src: "https://images.unsplash.com/photo-1601924582971-c9e8e7b9b1c5",
          public_id: "menu/pizza_v1",
          alt: "Pizza Margherita with basil",
        },
      },
      {
        name: "Spaghetti Bolognese",
        description:
          "Spaghetti pasta served with slow-cooked beef and tomato sauce.",
        price: 230,
        category: "Pasta",
        isPopular: false,
        image: {
          src: "https://images.unsplash.com/photo-1589308078055-93e1c9f99a4d",
          public_id: "menu/spaghetti_v1",
          alt: "Spaghetti Bolognese",
        },
      },
      {
        name: "Lasagna",
        description:
          "Layers of pasta, cheese, and rich tomato meat sauce baked to perfection.",
        price: 270,
        category: "Pasta",
        isPopular: true,
        image: {
          src: "https://images.unsplash.com/photo-1603133872878-684f5192e3b3",
          public_id: "menu/lasagna_v1",
          alt: "A delicious plate of lasagna",
        },
      },
      {
        name: "Fruit Juice Mix",
        description:
          "Freshly blended papaya, avocado, and mango layered juice.",
        price: 120,
        category: "Beverage",
        isPopular: false,
        image: {
          src: "https://images.unsplash.com/photo-1627835933309-0c75f70f5b88",
          public_id: "menu/juice_mix_v1",
          alt: "Layered fruit juice in glass",
        },
      },
      {
        name: "Macchiato",
        description:
          "Strong espresso with a dash of steamed milk and perfect crema.",
        price: 80,
        category: "Beverage",
        isPopular: true,
        image: {
          src: "https://images.unsplash.com/photo-1558877385-0a758dee3467",
          public_id: "menu/macchiato_v1",
          alt: "Ethiopian macchiato coffee",
        },
      },
      {
        name: "Lemon Mint Juice",
        description: "Refreshing lemon and mint juice served chilled.",
        price: 90,
        category: "Beverage",
        isPopular: false,
        image: {
          src: "https://images.unsplash.com/photo-1613470203453-7bdecc4cf5ef",
          public_id: "menu/lemon_mint_v1",
          alt: "Glass of lemon mint juice",
        },
      },
      {
        name: "Fasting Beyaynetu",
        description:
          "Colorful platter of lentils, shiro, gomen, and misir served on injera.",
        price: 210,
        category: "Vegan Dish",
        isPopular: true,
        image: {
          src: "https://images.unsplash.com/photo-1617196034795-12e5c19b62d2",
          public_id: "menu/beyaynetu_v1",
          alt: "Ethiopian fasting beyaynetu platter",
        },
      },
      {
        name: "Fish Goulash",
        description:
          "Tender fish cubes cooked with tomato, onion, and berbere sauce.",
        price: 290,
        category: "Seafood",
        isPopular: false,
        image: {
          src: "https://images.unsplash.com/photo-1601050690597-3c62b94f4f85",
          public_id: "menu/fish_goulash_v1",
          alt: "Ethiopian fish goulash dish",
        },
      },
      {
        name: "Chicken Sandwich",
        description:
          "Grilled chicken breast with lettuce, tomato, and mayo in soft bread.",
        price: 200,
        category: "Fast Food",
        isPopular: false,
        image: {
          src: "https://images.unsplash.com/photo-1606755962773-d324e0a130aa",
          public_id: "menu/chicken_sandwich_v1",
          alt: "Chicken sandwich with veggies",
        },
      },
      {
        name: "Avocado Juice",
        description:
          "Creamy avocado blended with honey and milk for a rich drink.",
        price: 100,
        category: "Beverage",
        isPopular: true,
        image: {
          src: "https://images.unsplash.com/photo-1577803645773-f96470509666",
          public_id: "menu/avocado_juice_v1",
          alt: "Glass of fresh avocado juice",
        },
      },
      {
        name: "Cappuccino",
        description:
          "Smooth espresso with steamed milk and foamed top, sprinkled with cocoa.",
        price: 85,
        category: "Beverage",
        isPopular: false,
        image: {
          src: "https://images.unsplash.com/photo-1510626176961-4b57d4fbad03",
          public_id: "menu/cappuccino_v1",
          alt: "Cup of cappuccino with foam art",
        },
      },
      {
        name: "Pancakes with Honey",
        description: "Soft golden pancakes served with pure Ethiopian honey.",
        price: 170,
        category: "Breakfast",
        isPopular: false,
        image: {
          src: "https://images.unsplash.com/photo-1565958011705-44e211b43c2d",
          public_id: "menu/pancakes_v1",
          alt: "Stack of pancakes with honey drizzle",
        },
      },
      {
        name: "Shekla Tibs",
        description:
          "Sizzling beef cubes served in clay pot with onions, chili, and butter.",
        price: 310,
        category: "Main Dish",
        isPopular: true,
        image: {
          src: "https://images.unsplash.com/photo-1617196034780-6f1b1b4d932f",
          public_id: "menu/shekla_tibs_v1",
          alt: "Ethiopian shekla tibs in clay pot",
        },
      },
    ];

    await MenuItem.insertMany(data);
    console.log("✅ Data inserted successfully!");
  } catch (err) {
    console.error("❌ Error inserting data:", err);
  } finally {
    mongoose.connection.close();
  }
}

// Run it
seedDatabase();
