# Daily Sketches

Create algorithmic art everyday with [Solandra](https://solandra.netlify.com)

* [Sample deploy (of this repo)](https://daily-sketches.netlify.com)
* [James Porter's Daily Sketches](https://sketches.amimetic.co.uk)

## Code

* `yarn` to install dependencies
* `gatsby develop` to start coding
* `yarn gen` to generate a new sketch for today (or the next day you haven't done one for). The file will be placed in `src/sketches`.

## Customise 

Customise the config in package.json, especially the dsConfig stuff. The styling is intentionally basic, you probably will want to customise.

**NB Don't edit files in pages directory as these get generated.** Instead customise the generated code in `generate.ts`
