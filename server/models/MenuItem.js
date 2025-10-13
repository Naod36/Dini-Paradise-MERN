const mongoose = require("mongoose");

const MenuItemSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Menu item name is required"],
      trim: true,
    },
    description: {
      type: String,
      required: [true, "Description is required"],
    },
    price: {
      type: Number,
      required: [true, "Price is required"],
    },
    category: {
      type: String,
      required: [true, "Category is required"],
      // Using an enum is great for ensuring data consistency!
      enum: [
        "Pasta",
        "Pizza",
        "Salad",
        "Dessert",
        "Beverage",
        "Main Dish",
        "Breakfast",
        "Vegan Dish",
        "Fast Food",
        "Seafood",
      ],
    },
    isPopular: {
      // Renamed from 'popular' for clarity (a common boolean convention)
      type: Boolean,
      default: false,
    },
    // We embed the image details directly in the menu item
    image: {
      src: {
        type: String,
        required: [true, "Image URL is required"],
      },
      public_id: {
        type: String,
        required: [true, "Image public_id is required for future deletes"],
      },
      alt: {
        type: String,
        required: [true, "Image alt text is required"],
      },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("MenuItem", MenuItemSchema);
