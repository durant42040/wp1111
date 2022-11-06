import { Router } from "express";
import User from '../../models/ScoreCard'
import mongoose from 'mongoose';
import bodyParser from 'body-parser';

const router = Router();
var card = true;
var add = true;
const saveUser = async (name, subject, score) => {
    const exist1 = await User.findOne({name})
    const exist2 = await User.findOne({subject})
    const exist3 = await User.findOne({score})
    card = !(exist1 && exist2 && exist3)
    add = !(exist1 && exist2 && !exist3)
    if(!card) return;
    if(add) {
        try {
        const newUser = new User({name, subject, score});
        console.log("Created user", newUser);
        return newUser.save();
    } catch (e) { throw new Error("User creation error: " + e); }
    }
    else {
        await User.updateOne({name, subject}, {$set: {score}});
    }

};

const deleteDB = async () => {
    try {
        await User.deleteMany({});
        console.log("Database deleted");
    } catch (e) { throw new Error("Database deletion failed"); }
};

router.use(bodyParser.json())
router.delete("/cards", (req, res) => {
    deleteDB();
    res.json({message: "Database cleared."})
});
router.post("/card", async (req, res) => {
    card = true;
    add = true;
    await saveUser(req.body.name, req.body.subject, req.body.score)
    var verb = add? "Adding(" : "Updating("
    res.json({message: card? verb + req.body.name+", "+req.body.subject+", "+req.body.score+")" : "Card already exists", card: card})
})

router.get("/cards", async (req, res) => {
    if(req.query.type == 'name'){
        const exist = await User.findOne({name: req.query.queryString})
        const found = await User.find({name: req.query.queryString})
        if(exist){
        res.json({messages: found.map(m => "Found card with name: ("+m.name+", "+m.subject+", "+m.score+")")});
        }
        else {
            res.json({message: "Name ("+req.query.queryString+") not found"})
        }
    }
    else {
        const exist = await User.findOne({subject: req.query.queryString})
        const found = await User.find({subject: req.query.queryString})
        if(exist){
        res.json({messages: found.map(m => "Found card with name: ("+m.name+", "+m.subject+", "+m.score+")")})
    }
        else {
            res.json({message: "Subject ("+req.query.queryString+") not found"})
        }
    }


});

export default router;
export {saveUser, deleteDB};
