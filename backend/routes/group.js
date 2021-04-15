const express = require('express'); 
const {getGroups, groupById, getOneGroup, createGroup, updateGroup, updateGroupFiles, getReport, getSynopsis} = require('../controllers/group')

const router= express.Router();

router.get('/groups', getGroups);
router.get('/getgroup/:groupId', getOneGroup);
router.post('/creategroup', createGroup);
router.put('/updategroup/:groupId', updateGroup);
router.put('/updategroupfiles/:groupId', updateGroupFiles);
router.get('/report/:groupId', getReport)
router.get('/synopsis/:groupId', getSynopsis)

router.param("groupId",groupById);
module.exports = router
