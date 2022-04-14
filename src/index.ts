import express from "express"
import imageRoutes from "./routes"
const app = express()
const PORT = 3001

app.use("/image", imageRoutes)

app.listen(PORT, () =>
  console.log("Server is listening on http://localhost:" + PORT)
)
export default app
