import { Request, Response, Router } from "express"
import path from "path"
import { INPUT_DIRECTORY, OUTPUT_DIRECTORY } from "./constants"
import fs from "fs"
import { resizeImage } from "./utilities"
const router = Router()

router.get("/", async (req: Request, res: Response) => {
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
    res
      .status(400)
      .send("Image doesn't exist. Please provide a valid image name")
    return
  }

  try {
    const parsedHeight = parseInt(height ?? 200)
    if (isNaN(parsedHeight)) {
      res.status(400).send("Invalid height. Please provide a number")
      return
    }
    const parsedWidth = parseInt(width ?? 200)
    if (isNaN(parsedWidth)) {
      res.status(400).send("Invalid width. Please provide a number")
      return
    }
    const newFilename = `${name}-W${parsedWidth}H${parsedHeight}${imageExtension}`
    const outputPath = path.resolve(OUTPUT_DIRECTORY, newFilename)
    if (fs.existsSync(outputPath)) {
      console.log("Image Accessed")
      res.status(200).sendFile(outputPath)
    } else {
      console.log("Image Processed")
      await resizeImage(name, parsedWidth, parsedHeight, imageExtension)
      res.status(200).sendFile(outputPath)
    }
  } catch (e) {
    res.status(400).send("Error resizing the image")
  }
})

export default router
