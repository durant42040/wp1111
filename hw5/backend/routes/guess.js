import express from 'express'
import {genNumber} from '../core/getNumber'
const router = express.Router()
var ans = 0
router.post('/start', (_, res) => {
    ans = genNumber()
    res.json({ msg: 'The game has started.' })
})


router.get('/guess', (req, res) => {
    const num = req.query.number
    if(num <= 100 && num >= 1){
       if(num > ans) res.json({ msg: 'Smaller' })
       else if(num < ans) res.json({ msg: 'Larger' })
       else res.json({ msg: 'Equal' })
    }
    else {
        res.status(406).send({ msg: 'Not a legal number.' })
    }

})


router.post('/restart', (_, res) => {
    ans = genNumber()
    res.json({ msg: 'The game has started.' })
})

router.get('/start', function (req, res, next) {
    res.json({ msg: ans })
    })

export default router