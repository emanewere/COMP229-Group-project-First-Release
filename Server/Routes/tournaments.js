"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
exports.default = router;
const tournaments_1 = __importDefault(require("../Models/tournaments"));
router.get('/', (req, res, next) => {
    tournaments_1.default.find((err, tournaments) => {
        if (err) {
            return console.error(err);
        }
        else {
            res.render('tournaments/index', {
                title: 'Tournaments',
                page: 'tournaments',
                tournaments: tournaments
            });
        }
    });
});
router.get('/add', (req, res, next) => {
    res.render('tournaments/details', { title: 'Create a tournament', page: 'details', tournaments: '' });
});
router.post('/add', (req, res, next) => {
    let newTournament = new tournaments_1.default({
        "Name": req.body.name,
        "StartDate": req.body.startdate
    });
    tournaments_1.default.create(newTournament, (err) => {
        if (err) {
            console.error(err);
            res.end(err);
        }
        res.redirect('/tournaments');
    });
});
router.get('/:id', (req, res, next) => {
    let id = req.params.id;
    tournaments_1.default.findById(id, {}, {}, (err, tournamentItemToEdit) => {
        if (err) {
            console.error(err);
            res.end(err);
        }
        res.render('tournaments/details', { title: 'Edit a tournament information', page: 'details', tournaments: tournamentItemToEdit });
    });
});
router.post('/:id', (req, res, next) => {
    let id = req.params.id;
    let updatedTournamentItem = new tournaments_1.default({
        "_id": id,
        "Name": req.body.name,
        "StartDate": req.body.startdate,
    });
    tournaments_1.default.updateOne({ _id: id }, updatedTournamentItem, {}, (err) => {
        if (err) {
            console.error(err);
            res.end(err);
        }
        res.redirect('/tournaments');
    });
});
router.get('/delete/:id', (req, res, next) => {
    let id = req.params.id;
    tournaments_1.default.remove({ _id: id }, (err) => {
        if (err) {
            console.error(err);
            res.end(err);
        }
        res.redirect('/tournaments');
    });
});
//# sourceMappingURL=tournaments.js.map