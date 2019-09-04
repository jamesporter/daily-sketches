import { SCanvas, Rect, v } from "solandra"

export default {
  name: "Crystals",
  notes: "",
  sketch: (s: SCanvas) => {
    s.background(215, 80, 20)
    s.forTiling({ n: 10, type: "square", margin: 0.1 }, (p, d, c, i) => {
      s.setFillColour(215 + i * 2, 100, 50)
      const h = d[1] * s.random()
      s.fill(new Rect({ at: v.add(p, [0, d[1] - h]), w: d[0], h }))
    })
  },
}
