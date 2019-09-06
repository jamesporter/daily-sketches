import React from "react"
import { Link } from "gatsby"
import { FullScreenCanvas } from "solandra-react"

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

import sketch from "../sketches/2019-09-06"
const DayPage = () => (
  <Layout>
    <SEO title="Home" />
    <FullScreenCanvas
      sketch={sketch.sketch}
      seed={1}
      playing={sketch.play}
    />
  </Layout>
)

export default DayPage