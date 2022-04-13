import express from "express"
import sharp from "sharp"
import fs, { promises as fsPromises } from "fs"
import path from "path"
import { INPUT_DIRECTORY, OUTPUT_DIRECTORY } from "./constants"
const app = express()
const PORT = 3000

if (!fs.existsSync(OUTPUT_DIRECTORY)) {
  fsPromises.mkdir(OUTPUT_DIRECTORY)
}
app.get("/image", async (req, res) => {
  const { name, height, width, ext } = req.query as {
    name: string
    height: string
    width: string
    ext: string
  }

  const imageExtension = ext ? `.${ext}` : ".jpg"
  const imageFileName = `${name}${imageExtension}`
  const savedImage = path.resolve(INPUT_DIRECTORY, imageFileName)

  if (!fs.existsSync(savedImage)) {
    res.status(400).send("Image doesn't exist.")
    return
  }

  try {
    const parsedHeight = parseInt(height ?? 200)
    const parsedWidth = parseInt(width ?? 200)

    const newFilename = `${name}-W${parsedWidth}H${parsedHeight}${imageExtension}`
    const outputPath = path.resolve(OUTPUT_DIRECTORY, newFilename)

    if (fs.existsSync(outputPath)) {
      console.log("Image Accessed")
      res.status(200).sendFile(outputPath)
    } else {
      console.log("Image Processed")
      await sharp(`${INPUT_DIRECTORY}/${imageFileName}`)
        .resize(parsedWidth, parsedHeight)
        .toFile(`${OUTPUT_DIRECTORY}/${newFilename}`)
      res.status(200).sendFile(outputPath)
    }
  } catch (e) {
    res.status(400).send("Error resizing the image")
  }
})

app.listen(PORT, () =>
  console.log("Server is listening on http://localhost:" + PORT)
)
export default app
