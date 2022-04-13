import supertest from "supertest"
import app from "../index"
import fs from "fs"
import path from "path"
import { OUTPUT_DIRECTORY } from "../constants"
const request = supertest(app)

describe("Endpoint test", () => {
  it("gets the resized image", async () => {
    const response = await request.get(
      "/image?name=palmtunnel&height=500&width=200"
    )
    expect(response.status).toEqual(200)
  })
  it("throws error when providing a string inside height", async () => {
    const response = await request.get(
      "/image?name=palmtunnel&height=ds&width=200"
    )
    expect(response.status).toEqual(400)
  })
})

describe("Sharp functions", () => {
  it("resizes and saves the image in thumbnails", async () => {
    await request.get("/image?name=fjord&height=500&width=200")
    const outputPath = path.resolve(OUTPUT_DIRECTORY, "fjord-W200H500.jpg")
    expect(fs.existsSync(outputPath)).toBe(true)
  })
})
