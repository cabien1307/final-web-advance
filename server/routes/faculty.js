const router = require('express-promise-router')()

const {validateBody, schemas, validateParams} = require('../middleware/validateRouter')
const facultyController = require('../controller/faculty');

router.get('/', facultyController.getAllFaculty)
router.get('/:slug', facultyController.getFacultyBySlug)
router.post('/', validateBody(schemas.facultySchema) ,facultyController.addFaculty)
router.patch('/:id', validateParams(schemas.idSchema, 'id'), validateBody(schemas.facultyUpdateSchema), facultyController.updateFaculty)
router.delete('/:id', validateParams(schemas.idSchema, 'id'), facultyController.delete)

module.exports = router
