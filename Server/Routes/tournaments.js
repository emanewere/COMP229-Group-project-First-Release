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
    res.render('tournaments/details', { title: 'Createatournament', page: 'details', tournaments: '' });
});
router.post('/add', (req, res, next) => {
    let newTournament = new tournaments_1.default({
        "Name": req.body.name,
        "StartDate": req.body.startdate,
        "WinnerFirstQuarterFinal": "WinnerFirstQuarterFinal",
        "WinnerSecondQuarterFinal": "WinnerSecondQuarterFinal",
        "WinnerThirdQuarterFinal": "WinnerThirdQuarterFinal",
        "WinnerFourthQuarterFinal": "WinnerFourthQuarterFinal",
        "WinnerFirstSemiFinal": "WinnerFirstSemiFinal",
        "WinnerSecondSemiFinal": "WinnerSecondSemiFinal",
        "WinnerFinal": "WinnerFinal"
    });
    tournaments_1.default.create(newTournament, (err) => {
        if (err) {
            console.error(err);
            res.end(err);
        }
        res.redirect('/tournaments');
    });
});
router.get('/:id/:match', (req, res, next) => {
    let id = req.params.id;
    let match = req.params.match;
    tournaments_1.default.findById(id, {}, {}, (err, tournamentItemToEdit) => {
        if (err) {
            console.error(err);
            res.end(err);
        }
        res.render('tournaments/bracketsEditOne', { title: 'Bracketfortournament', page: 'bracketsEditOne', tournaments: tournamentItemToEdit });
    });
});
router.get('/:id', (req, res, next) => {
    let id = req.params.id;
    tournaments_1.default.findById(id, {}, {}, (err, tournamentItemToEdit) => {
        if (err) {
            console.error(err);
            res.end(err);
        }
        if (tournamentItemToEdit.IsSet === "TRUE") {
            res.render('tournaments/brackets', { title: 'Bracketfortournament', page: 'brackets', tournaments: tournamentItemToEdit });
        }
        else {
            res.render('tournaments/registerplayers', { title: 'Registerplayers', page: 'edit', tournaments: tournamentItemToEdit });
        }
    });
});
router.post('/:id/:match', (req, res, next) => {
    let id = req.params.id;
    let match = req.params.match;
    tournaments_1.default.findById(id, {}, {}, (err, tournamentItemToEdit) => {
        if (err) {
            console.error(err);
            res.end(err);
        }
        else {
            let updatedTournamentItem = new tournaments_1.default({
                "_id": id,
                "PlayerOne": req.body.name,
                "StartDate": req.body.startdate,
                "PlayerOne": req.body.playerone,
                "PlayerTwo": req.body.playertwo,
                "PlayerThree": req.body.playerthree,
                "PlayerFour": req.body.playerfour,
                "PlayerFive": req.body.playerfive,
                "PlayerSix": req.body.playersix,
                "PlayerSeven": req.body.playerseven,
                "PlayerEight": req.body.playereight,
                "IsSet": "TRUE",
                "WinnerFirstQuarterFinal": req.body.winnerfirstquarterfinal,
                "WinnerSecondQuarterFinal": req.body.winnersecondquarterfinal,
                "WinnerThirdQuarterFinal": req.body.winnerthirdquarterfinal,
                "WinnerFourthQuarterFinal": req.body.winnerfourthquarterfinal,
                "WinnerFirstSemiFinal": req.body.winnerfirstsemifinal,
                "WinnerSecondSemiFinal": req.body.winnersecondsemifinal,
                "WinnerFinal": req.body.winnerfinal
            });
            if (match === "one") {
                updatedTournamentItem.WinnerFirstQuarterFinal = "Greece";
            }
            else if (match === "two") {
                updatedTournamentItem.WinnerSecondQuarterFinal = "Germany";
            }
            else if (match === "three") {
                updatedTournamentItem.WinnerThirdQuarterFinal = "Brazil";
            }
            else if (match === "four") {
                updatedTournamentItem.WinnerFourthQuarterFinal = "Dutch";
            }
            else if (match === "five") {
                updatedTournamentItem.WinnerFirstSemiFinal = "Greece";
            }
            else if (match === "six") {
                updatedTournamentItem.WinnerSecondSemiFinal = "Brazil";
            }
            else if (match === "seven") {
                updatedTournamentItem.WinnerFinal = "Brazil";
            }
            tournaments_1.default.updateOne({ _id: id }, updatedTournamentItem, {}, (err) => {
                if (err) {
                    console.error(err);
                    res.end(err);
                }
                tournaments_1.default.findById(id, {}, {}, (err, tournamentItemToEdit) => {
                    if (err) {
                        console.error(err);
                        res.end(err);
                    }
                    res.render('tournaments/brackets', { title: 'Bracketfortournament', page: 'brackets', tournaments: tournamentItemToEdit });
                });
            });
        }
    });
});
router.post('/:id', (req, res, next) => {
    let id = req.params.id;
    tournaments_1.default.findById(id, {}, {}, (err, tournamentItemToEdit) => {
        if (err) {
            console.error(err);
            res.end(err);
        }
        else {
            let updatedTournamentItem = new tournaments_1.default({
                "_id": id,
                "PlayerOne": req.body.name,
                "StartDate": req.body.startdate,
                "PlayerOne": req.body.playerone,
                "PlayerTwo": req.body.playertwo,
                "PlayerThree": req.body.playerthree,
                "PlayerFour": req.body.playerfour,
                "PlayerFive": req.body.playerfive,
                "PlayerSix": req.body.playersix,
                "PlayerSeven": req.body.playerseven,
                "PlayerEight": req.body.playereight,
                "IsSet": "TRUE"
            });
            tournaments_1.default.updateOne({ _id: id }, updatedTournamentItem, {}, (err) => {
                if (err) {
                    console.error(err);
                    res.end(err);
                }
                tournaments_1.default.findById(id, {}, {}, (err, tournamentItemToEdit) => {
                    if (err) {
                        console.error(err);
                        res.end(err);
                    }
                    res.render('tournaments/brackets', { title: 'Bracketfortournament', page: 'brackets', tournaments: tournamentItemToEdit });
                });
            });
        }
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