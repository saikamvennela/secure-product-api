import express from "express";
import helmet from "helmet";
import rateLimit from "express-rate-limit";

import productRoutes from "./routes/productRoutes";
import { errorHandler } from "./middleware/errorHandler";

const app = express();

const PORT = 5000;

// Helmet security middleware
app.use(helmet());

// Maximum request body = 10 KB
app.use(express.json({ limit: "10kb" }));

// Rate limiter
const limiter = rateLimit({
  windowMs: 10 * 60 * 1000,
  limit: 50,

  standardHeaders: "draft-8",
  legacyHeaders: false,

  message: {
    success: false,
    message: "Too many requests. Please try again later."
  }
});

// Apply limiter to API routes
app.use("/api/v1", limiter);

// Product API
app.use("/api/v1/products", productRoutes);

// Invalid route
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found"
  });
});

// Centralized error handler
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});