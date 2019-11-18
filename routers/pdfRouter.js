const router = require('express').Router()
const { htmlToPdf } = require('../controllers').pdfController

router.get('/print', htmlToPdf)

module.exports = router