// @cliDescription  Generates an opinionated container.

module.exports = async function (context) {
  // grab some features
  const { parameters, print, strings, ignite } = context
  const { pascalCase, isBlank } = strings

  // validation
  if (isBlank(parameters.first)) {
    print.info(`${context.runtime.brand} generate screen <name>\n`)
    print.info('A name is required.')
    return
  }

  const name = pascalCase(parameters.first)
  const screenName = name.endsWith('Screen') ? name : `${name}Screen`
  const props = { name: screenName }

  const jobs = [
    {
      template: `screen.ejs`,
      target: `App/Containers/${screenName}.js`
    },
    {
      template: `screen-style.ejs`,
      target: `App/Containers/Styles/${screenName}Style.js`
    }
  ]

  // make the templates
  await ignite.copyBatch(context, jobs, props)
}
