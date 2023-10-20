// const raw = require('raw-body')
// const inflate = require('inflation')
// const xml2js = require('xml2js')

// module.exports = {
//   async getXml () {
//     let result = ''
//     const xml = await raw(inflate(this.req))
//     xml2js.parseString(xml, (err, res) => {
//       result = res.xml
//     })
//     return result
//   }
// }
