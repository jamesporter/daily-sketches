import { SCanvas, Rect, v, RegularPolygon } from "solandra"

export default {
  name: "05 September 2019",
  notes: "",
  play: false,
  sketch: (s: SCanvas) => {
    s.background(153, 80, 95)
    s.downFrom(4, n => {
      s.setFillColour(153 - n * 5, 90, 40 - n * 5)
      s.fill(
        new RegularPolygon({ at: s.meta.center, r: (0.6 * n) / 5, n: n + 2 })
      )
    })
  },
}
