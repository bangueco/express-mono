import logger from "@lib/utils/logger";
import app from "./app";

app.listen(3000, () => {
  logger.info("Server running at PORT: 3000");
});