// * ////////////////////////////////////////////////////////////////////////
// *
// * FileName     [ info.js ]
// * PackageName  [ server ]
// * Synopsis     [ Get restaurant info from database ]
// * Author       [ Chin-Yi Cheng ]
// * Copyright    [ 2022 11 ]
// *
// * ////////////////////////////////////////////////////////////////////////

import Info from '../models/info'


exports.GetSearch = async (req, res) => {
    /*******    NOTE: DO NOT MODIFY   *******/
    const priceFilter = req.query.priceFilter
    const mealFilter  = req.query.mealFilter
    const typeFilter  = req.query.typeFilter
    const sortBy      = req.query.sortBy
    /****************************************/
    console.log('req: ',req.query)
    // NOTE Hint:
    // use `db.collection.find({condition}).exec(err, data) {...}`
    // When success,
    //   do `res.status(200).send({ message: 'success', contents: ... })`
    // When fail,
    //   do `res.status(403).send({ message: 'error', contents: ... })`
    var restaurants = await Info.find()
    Info.find().exec(function(err, res){
        if (err) res.status(403).send({message: 'error', contents: []});
    })
    if(sortBy === 'price'){
        restaurants.sort((a, b) => a.price - b.price)
    }
    else{
        restaurants.sort((a, b) => a.distance - b.distance);
    }
    const filtermeal = (e) => {
        return ((e.tag.some(x => x === 'Breakfast') && mealFilter.some(x => x === 'Breakfast')) || (e.tag.some(x => x === 'Lunch') && mealFilter.some(x => x === 'Lunch'))|| (e.tag.some(x => x === 'Dinner') && mealFilter.some(x => x === 'Dinner')))
    }
    const filtertype = (e) => {
        return ((e.tag.some(x => x === 'Chinese') && typeFilter.some(x => x === 'Chinese')) || (e.tag.some(x => x === 'American') && typeFilter.some(x => x === 'American'))|| (e.tag.some(x => x === 'Italian') && typeFilter.some(x => x === 'Italian'))|| (e.tag.some(x => x === 'Japanese') && typeFilter.some(x => x === 'Japanese'))|| (e.tag.some(x => x === 'Korean') && typeFilter.some(x => x === 'Korean'))|| (e.tag.some(x => x === 'Thai') && typeFilter.some(x => x === 'Thai')))
    }
    restaurants.forEach((e) => {
        var b = (!priceFilter || priceFilter.some(x => x.length === e.price)) && (!mealFilter || filtermeal(e)) && (!typeFilter || filtertype(e))
        if(!b) restaurants = restaurants.filter(x => x !== e);
    })
    console.log('restaurants', restaurants)
    res.status(200).send({message: 'success', contents: restaurants})

    // TODO Part I-3-a: find the information to all restaurants

    // TODO Part II-2-a: revise the route so that the result is filtered with priceFilter, mealFilter and typeFilter
    // TODO Part II-2-b: revise the route so that the result is sorted by sortBy
}

exports.GetInfo = async (req, res) => {
    /*******    NOTE: DO NOT MODIFY   *******/
    const id = req.query.id
    /****************************************/
    console.log('id', id)
    // NOTE USE THE FOLLOWING FORMAT. Send type should be 
    // if success:
    // {
    //    message: 'success'
    //    contents: the data to be sent. Hint: A dictionary of the restaruant's information.
    // }
    // else:
    // {
    //    message: 'error'
    //    contents: []
    // }
    const restaurant = await Info.find({id: id})
    console.log(restaurant)
    res.status(200).send({message: 'success', contents: restaurant[0]})
    // TODO Part III-2: find the information to the restaurant with the id that the user requests
}












