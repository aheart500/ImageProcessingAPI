import { resizeImage } from "../utilities"
import fs from "fs"
import path from "path"
import { OUTPUT_DIRECTORY } from "../constants"

describe("Sharp functions", () => {
  it("resizes and saves the image in thumbnails", async () => {
    await resizeImage("fjord", 200, 200, ".jpg")
    const outputPath = path.resolve(OUTPUT_DIRECTORY, "fjord-W200H200.jpg")
    expect(fs.existsSync(outputPath)).toBe(true)
  })
})
