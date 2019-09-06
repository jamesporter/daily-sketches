import React from "react"
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

import s01 from "../sketches/2019-09-06"
import s02 from "../sketches/2019-09-05"
import s03 from "../sketches/2019-09-04"
import s04 from "../sketches/2019-09-07"
const sketches = [s01, s02, s03, s04]

const IndexPage = () => (
  <Layout>
    <SEO title="Home" />

    <Container>
      <Link to="/" style={{ textDecoration: 'none' }}><H3>Daily Sketches</H3></Link>
      <H1>September 2019</H1>
      <H3>By James Porter</H3>
      <p>
        A series of algorithmic sketches, powered by{" "}
        <a href="https://solandra.netlify.com">Solandra</a>.
      </p>

      <Spacer large />
      <Grid>
      <Link to="day-2019-09-06">
          <PreviewContainer>
            <FixedSizeCanvas
              sketch={sketches[0].sketch}
              seed={1}
              width={320}
              height={320}
            />
          </PreviewContainer>
        </Link>
      <Link to="day-2019-09-05">
          <PreviewContainer>
            <FixedSizeCanvas
              sketch={sketches[1].sketch}
              seed={1}
              width={320}
              height={320}
            />
          </PreviewContainer>
        </Link>
      <Link to="day-2019-09-04">
          <PreviewContainer>
            <FixedSizeCanvas
              sketch={sketches[2].sketch}
              seed={1}
              width={320}
              height={320}
            />
          </PreviewContainer>
        </Link>
      <Link to="day-2019-09-07">
          <PreviewContainer>
            <FixedSizeCanvas
              sketch={sketches[3].sketch}
              seed={1}
              width={320}
              height={320}
            />
          </PreviewContainer>
        </Link>
      </Grid>
    </Container>
  </Layout>
)

export default IndexPage