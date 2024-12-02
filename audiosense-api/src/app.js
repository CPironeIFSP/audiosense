import express from 'express'
import userRoutes from "./routes/userRoutes.js"
import institutionRoutes from "./routes/institutionRoutes.js"

const app = express();
app.use(express.json());

app.use("/user", userRoutes);
app.use("/institution", institutionRoutes);

export default app;