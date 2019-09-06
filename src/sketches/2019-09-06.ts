import { SCanvas, Rect, v, SimplePath } from "solandra"

export default {
  name: "06 September 2019",
  notes: "",
  play: false,
  sketch: (s: SCanvas) => {
    s.background(323, 80, 20)
    s.setStrokeColour(0, 0, 80, 0.5)
    s.lineWidth = 0.002
    const pt = SimplePath.withPoints([])
    s.times(250, () => pt.addPoint(s.randomPoint))
    s.draw(pt)
  },
}
