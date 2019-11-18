const fs = require('fs')
const hbs = require('handlebars')
const pdf = require('html-pdf')

module.exports = {
    htmlToPdf : (req, res) => {
        fs.readFile('./template/receipt.html', {encoding : 'utf-8'}, (err, readResult) => {
            if (err) throw err
            // console.log(readResult)
            // res.send(readResult)
            var template = hbs.compile(readResult)
            var data = {
                server : 'server',
                date : '15-09-2019',
                time : '12:02',
                username : 'evan',
                password : '1234'
            }
            var hbsResult = template(data)
            var options = {
                format : 'A8'
            }
            pdf.create(hbsResult, options).toFile('./template/receipt.pdf', (err, pdfResult) => {
                if(err) throw err
                console.log(pdfResult)
                res.send('PDF Created')
            })
        })
    }
}