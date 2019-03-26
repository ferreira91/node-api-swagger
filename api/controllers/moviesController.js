'use strict';

var db = require('../../config/db')();

module.exports = { getAll, save, getOne, update, remove };

// GET /movies
function getAll(req, res, next) {
    res.json(db.find());
}

// POST /movies
function save(req, res, next) {
    res.json({
        status: Boolean(db.save(req.body)),
        description: "Movie added to the list!"
    }); 
}

// GET /movies/{id}
function getOne(req, res, next) {
    var id = req.swagger.params.id.value;
    var movie = db.find(id);

    if (movie) {
        res.json(movie);
    } else {
        res.status(204).send();
    }
}

// DELETE /movies/{id}
function remove(req, res, next) {
    var id = req.swagger.params.id.value;

    if (db.remove(id)) {
        res.json({
            status: true,
            description: "Movie deleted!"
        })
    } else { 
        res.status(204).send();
    }
}

// UPDATE /movies/{id}
function update(req, res, next) {
    var id = req.swagger.params.id.value;
    var movie = req.body;

    if (db.update(id, movie)) {
        res.json({
            status: true,
            description: "Movie updated!"
        })
    } else {
        res.status(204).send(); 
    }
}

