import rimraf from "rimraf"
import path from "path"
import fs from "fs"

// 1. Add a new script for today (or if already for today and more, for next day without one)

const sketchFs = fs.readdirSync(path.join("src", "sketches"))
console.log(sketchFs)

type DateEls = [number, number, number]

const dateToEls = (date: Date): DateEls => [
  date.getFullYear(),
  date.getMonth() + 1,
  date.getDate(),
]

const lz = (n: number): string => (n < 10 ? `0${n}` : String(n))
const range = (n: number): number[] => Array(n).map((_, i) => i + 1)
const monthName = (n: number): string =>
  [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ][n - 1]

const today = dateToEls(new Date())
const regex = /(\d{4})-(\d{2})-(\d{2})\.ts/

const existing = sketchFs
  .filter(n => regex.test(n))
  .map(
    (n: string): DateEls => {
      const matches = n.match(regex)
      if (matches) {
        const ry = parseInt(matches[1])
        const rm = parseInt(matches[2])
        const rd = parseInt(matches[3])
        return [ry, rm, rd]
      } else {
        throw new Error(`Unable to parse despite regex check: ${n}`)
      }
    }
  )
  .sort((a: DateEls, b: DateEls) => {
    // JS search is awful... array of numbers does do lexicographical but as strings wtf!!! so e.g. 9 > 30
    const [a1, a2, a3] = a
    const [b1, b2, b3] = b
    return a1 > b1 || a2 > b2 || a3 > b3 ? -1 : 1
  }) as DateEls[]

console.log({ existing })

const mostRecent = existing[0]
let nextDay: DateEls
let nextDate: Date

const [ty, tm, td] = today
const [ny, nm, nd] = mostRecent

if (!(ty <= ny || tm <= nm || td <= nd)) {
  console.log("Create for today")
  nextDay = today
} else {
  console.log("Creating for next available day")
  nextDay = dateToEls(
    new Date(mostRecent[0], mostRecent[1] - 1, mostRecent[2] + 1)
  )
}
nextDate = new Date(nextDay[0], nextDay[1] - 1, nextDay[2])
console.log(`Next date is: ${nextDate.toLocaleDateString()}`)

// rather than re-reading:
existing.push(nextDay)

fs.writeFileSync(
  path.join(
    "src",
    "sketches",
    `${nextDay[0]}-${lz(nextDay[1])}-${lz(nextDay[2])}.ts`
  ),
  `import { SCanvas, Rect, v } from "solandra"

export default {
  name: "${nextDate.toLocaleDateString()}",
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
`
)

// 2. Remove al pages
// TODO

// 3. Create Month pages for all months (god this awful code)
const yearsAndMonths = [...new Set(existing.map(([y, m]) => `${y}-${m}`))].map(
  el => el.split("-").map(n => parseInt(n))
)
console.log(yearsAndMonths)

yearsAndMonths.forEach(([y, m]) => {
  const sketches = existing.filter(el => el[0] === y && el[1] === m)
  fs.writeFileSync(
    path.join("src", "pages", `${y}-${lz(m)}.tsx`),
    `import React from "react"
import { Link } from "gatsby"
import { FixedSizeCanvas } from "solandra-react"

import Layout from "../components/layout"
import SEO from "../components/seo"
import {
  Container,
  H1,
  H2,
  H3,
  Spacer,
  Grid,
  PreviewContainer,
} from "../components/Elements"

${sketches
  .map(
    ([sy, sm, sd], i) =>
      `import s${lz(i + 1)} from "../sketches/${sy}-${lz(sm)}-${lz(sd)}"`
  )
  .join("\n")}
const sketches = [${range(sketches.length)
      .map(n => `s${lz(n)}`)
      .join(", ")}]

const IndexPage = () => (
  <Layout>
    <SEO title="Home" />

    <Container>
      <H1>${monthName(m)} 2019</H1>
      <H3>By James Porter</H3>
      <p>
        A series of algorithmic sketches, powered by{" "}
        <a href="https://solandra.netlify.com">Solandra</a>.
      </p>

      <Spacer large />
      <Grid>
        {sketches.map((sk, i) => (
          <PreviewContainer key={i}>
          <FixedSizeCanvas
            sketch={sk}
            seed={1}
            width={320}
            height={320}
          />
        </PreviewContainer>
        ))}
      </Grid>
    </Container>
  </Layout>
)

export default IndexPage`
  )
})

// 4. Create index page, with N or whatever available latest
const sketches = existing.slice(0, 10)
fs.writeFileSync(
  path.join("src", "pages", `index.tsx`),
  `import React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import {
  Container,
  H1,
  H2,
  H3,
  Spacer,
  Grid,
  PreviewContainer,
} from "../components/Elements"

${sketches
  .map(
    ([sy, sm, sd], i) =>
      `import s${lz(i + 1)} from "../sketches/${sy}-${lz(sm)}-${lz(sd)}"`
  )
  .join("\n")}
const sketches = [${range(sketches.length)
    .map(n => `s${lz(n)}`)
    .join(", ")}]

const IndexPage = () => (
  <Layout>
    <SEO title="Home" />

    <Container>
      <H1>Daily Sketches</H1>
      <H3>By James Porter</H3>
      <p>
        A series of algorithmic sketches, powered by{" "}
        <a href="https://solandra.netlify.com">Solandra</a>.
      </p>

      <Spacer large />

      <H2>Latest</H2>

      <Spacer />
      <Grid>
        {sketches.map((sk, i) => (
          <PreviewContainer key={i}>
          <FixedSizeCanvas
            sketch={sk}
            seed={1}
            width={320}
            height={320}
          />
        </PreviewContainer>
        ))}
      </Grid>

${yearsAndMonths
  .map(([y, m]) => `<Link to="./${y}-${lz(m)}">${monthName(m)} ${y}</Link>`)
  .join("\n")}
    </Container>
  </Layout>
)

export default IndexPage
`
)

// 5. Create 404 page
fs.writeFileSync(
  path.join("src", "pages", `404.tsx`),
  `import React from "react"
import { Link } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"

const NotFoundPage = () => (
  <Layout>
    <SEO title="404: Not found" />
    <h1>Not Found</h1>
    <Link to="/">Home</Link>
  </Layout>
)

export default NotFoundPage
`
)
