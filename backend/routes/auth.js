const express = require('express');
const { teachersignup, teachersignin, studentsignin, studentsignup, signout } = require('../controllers/auth');
const router= express.Router();


router.post('/teachersignup', teachersignup);
router.post('/teachersignin', teachersignin);

router.post('/studentsignup', studentsignup);
router.post('/studentsignin', studentsignin);

router.get('/signout', signout);



module.exports = router;