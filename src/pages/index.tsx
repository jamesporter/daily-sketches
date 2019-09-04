import React from "react"
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
        <PreviewContainer />
        <PreviewContainer />
        <PreviewContainer />
        <PreviewContainer />
      </Grid>

      <Link to="./2019-09">September 2019</Link>
    </Container>
  </Layout>
)

export default IndexPage
