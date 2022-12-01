/****************************************************************************
  FileName      [ searchPage.js ]
  PackageName   [ src ]
  Author        [ Chin-Yi Cheng ]
  Synopsis      [ display the search result ]
  Copyright     [ 2022 11 ]
****************************************************************************/

import React, { useState, useEffect } from 'react'
import '../css/searchPage.css'
import { useNavigate, useLocation } from 'react-router-dom'

import axios from 'axios'
const instance = axios.create({
    baseURL: 'http://localhost:4000/api'
})

const SearchPage = () => {
    const { state } = useLocation();
    const [restaurants, setRestaurant] = useState([])
    const navigate = useNavigate();
    const ToRestaurant = (id) => {
        navigate('/restaurant/'+id)
    }
    const getPrice = (price) => {
        let priceText = ""
        for (let i = 0; i < price; i++)
            priceText += "$"
        return (priceText)
    }

    const getRestaurant = async () => {
        const {
            data: { message, contents },
        } = await instance.get('/getSearch', {params: state});
        setRestaurant(contents)
    }


    useEffect(() => {
        getRestaurant()
    }, [state.priceFilter, state.mealFilter, state.typeFilter, state.sortBy])


    return (

        <div className='searchPageContainer'>
            {
                restaurants.map((item) => (
                    <div className='resBlock' id={item.id} key={item.id} onClick={() => {ToRestaurant(item.id)}}>
                        <div className={'resImgContainer'}><img className={'resImg'} src={item.img}/></div>
                        <div className={'resInfo'}>
                            <div className={'title'}>
                                <p className={'name'}>{item.name}</p>
                                <p className={'price'}>{getPrice(item.price)}</p>
                                <p className='distance'>{(item.distance)/1000} km</p>
                            </div>
                            <p className='description'>
                                {item.tag.join(', ')}
                            </p>
                        </div>
                    </div>
                ))
            }
        </div>
    )
}
export default SearchPage























