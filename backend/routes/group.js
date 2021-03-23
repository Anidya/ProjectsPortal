const express = require('express'); 
const {getGroups, groupById, getOneGroup, createGroup, addField} = require('../controllers/group')

const router= express.Router();

router.get('/groups', getGroups);
router.get('/getgroup/:groupId', getOneGroup);
router.post('/creategroup', createGroup);


router.param("groupId",groupById);
module.exports = router
