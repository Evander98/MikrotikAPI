const router = require('express').Router()
const {
    onConnect,
    getAllUser,
    getUser,
    addHotspotUser,
    removeHotspotUser,
    hotspotUserLength,
    hotspotHostLength,
    getHotspotHost,
    hotspotActiveLength,
    getHotspotActive,
    serverList,
    profileList,
    allProfile,
    profileLength,
    activateHotpsotUser
} = require('../controllers').mikrotikController

router.get('/connect', onConnect)
router.post('/getAllUser', getAllUser)
router.post('/getUser', getUser)
router.post('/addHotspotUser', addHotspotUser)
router.post('/removeHotspotUser', removeHotspotUser)
router.post('/getHotspotUserLength', hotspotUserLength)
router.post('/getHotspotHostLength', hotspotHostLength)
router.post('/getHotspotHost', getHotspotHost)
router.post('/getHotspotActiveLength', hotspotActiveLength)
router.post('/getHotspotActive', getHotspotActive)
router.post('/serverList', serverList)
router.post('/profileList', profileList)
router.post('/allProfile', allProfile)
router.post('/getProfileLength', profileLength)
router.post('/activateHotspotUser', activateHotpsotUser)

module.exports = router