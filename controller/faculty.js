const Faculty = require('../model/Faculty');

class facultyController {

    // [GET] /faculty/
    async getAllFaculty(req, res, next) {
        const faculties = await Faculty.find().sort({name: 1});
        return res.status(200).json(faculties)
    }

    // [GET] /faculty/:slug
    async getFacultyBySlug(req, res, next){
        const { slug } = req.params
        const faculty = await Faculty.findOne({slug: slug})
        return res.status(200).json(faculty);
    }

    // [POST] /faculty/
    async addFaculty(req, res, next) {
        const newFaculty = new Faculty(req.value.body)
        await newFaculty.save()
        return res.status(201).json({
            success: true
        })
    }

    // [PATCH] /faculty/:id
    async updateFaculty(req, res, next) {
        const { id } = req.value.params
        const newFaculty = req.value.body;
        const result = await Faculty.findByIdAndUpdate(id, newFaculty, {new: true})
        return res.status(200).json(newFaculty)
    }

    // [DELETE] /faculty/
    async delete(req, res, next) {
        const { id } = req.value.params
        const faculty = await Faculty.deleteOne({ id })
        return res.status(200).json(faculty)
    }
}

module.exports = new facultyController