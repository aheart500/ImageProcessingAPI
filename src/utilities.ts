import { INPUT_DIRECTORY, OUTPUT_DIRECTORY } from "./constants"
import fs, { promises as fsPromises } from "fs"
import sharp from "sharp"

if (!fs.existsSync(OUTPUT_DIRECTORY)) {
  fsPromises.mkdir(OUTPUT_DIRECTORY)
}

export const resizeImage = async (
  imageName: string,
  width: number,
  height: number,
  ext: string
): Promise<void> => {
  try {
    const newFilename = `${imageName}-W${width}H${height}${ext}`
    await sharp(`${INPUT_DIRECTORY}/${imageName}${ext}`)
      .resize(width, height)
      .toFile(`${OUTPUT_DIRECTORY}/${newFilename}`)
  } catch (e) {
    console.log(e)
  }
}
