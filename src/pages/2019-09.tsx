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

import s1 from "../sketches/2019-09-04"

const IndexPage = () => (
  <Layout>
    <SEO title="Home" />

    <Container>
      <H1>September 2019</H1>
      <H3>By James Porter</H3>
      <p>
        A series of algorithmic sketches, powered by{" "}
        <a href="https://solandra.netlify.com">Solandra</a>.
      </p>

      <Spacer large />

      <Grid>
        <PreviewContainer>
          <FixedSizeCanvas
            sketch={s1.sketch}
            seed={1}
            width={320}
            height={320}
          />
        </PreviewContainer>

        <PreviewContainer>
          <FixedSizeCanvas
            sketch={s1.sketch}
            seed={2}
            width={320}
            height={320}
          />
        </PreviewContainer>
      </Grid>
    </Container>
  </Layout>
)

export default IndexPage
