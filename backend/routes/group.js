const express = require('express'); 
const {getGroups, groupById, getOneGroup, createGroup, updateGroup} = require('../controllers/group')

const router= express.Router();

router.get('/groups', getGroups);
router.get('/getgroup/:groupId', getOneGroup);
router.post('/creategroup', createGroup);
router.put('/updategroup/:groupId', updateGroup);


router.param("groupId",groupById);
module.exports = router
