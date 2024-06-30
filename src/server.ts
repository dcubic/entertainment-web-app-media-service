import dotenv from "dotenv";
import { createApp } from './app/app'

dotenv.config();
const app = createApp();
const port = 7000;

app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});
