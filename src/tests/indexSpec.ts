import supertest from "supertest"
import app from "../index"

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
