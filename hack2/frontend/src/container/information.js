/****************************************************************************
  FileName      [ information.js ]
  PackageName   [ src ]
  Author        [ Chin-Yi Cheng ]
  Synopsis      [ display the information of restaurant ]
  Copyright     [ 2022 11 ]
****************************************************************************/

import React from 'react'
import Stars from '../components/stars';
import '../css/restaurantPage.css'

const Information = ({ info, rating }) => {
    const getTag = (tags) => {
        return (
            <>
                {tags.map(x => <div className={'tag'} key={x}>{x}</div>)}
            </>
        )
    }

    const getPriceTag = (price) => {
        let priceText = ""
        for (let i = 0; i < price; i++)
            priceText += "$"
        return (
            <>
                <div className={'tag'} key={priceText}>{priceText}</div>
            </>
        )
    }

    const getBusiness = (time) => {
        if(info.time.all){
            return (
                <div className='businessTime'>
                    <div className={'singleDay'}>
                        <div className={'day'}>Mon</div>
                        <div className={'time'}>{info.time.all}</div>
                    </div>
                    <div className={'singleDay'}>
                        <div className={'day'}>Tue</div>
                        <div className={'time'}>{info.time.all}</div>
                    </div>
                    <div className={'singleDay'}>
                        <div className={'day'}>Wed</div>
                        <div className={'time'}>{info.time.all}</div>
                    </div>
                    <div className={'singleDay'}>
                        <div className={'day'}>Thr</div>
                        <div className={'time'}>{info.time.all}</div>
                    </div>
                    <div className={'singleDay'}>
                        <div className={'day'}>Fri</div>
                        <div className={'time'}>{info.time.all}</div>
                    </div>
                    <div className={'singleDay'}>
                        <div className={'day'}>Sat</div>
                        <div className={'time'}>{info.time.all}</div>
                    </div>
                    <div className={'singleDay'}>
                        <div className={'day'}>Sun</div>
                        <div className={'time'}>{info.time.all}</div>
                    </div>
                </div>
            )
        }
        else{
            return (
                <div className='businessTime'>
                    <div className={'singleDay'}>
                        <div className={'day'}>Mon</div>
                        <div className={'time'}>{info.time.Mon? info.time.Mon:'Closed'}</div>
                    </div>
                    <div className={'singleDay'}>
                        <div className={'day'}>Tue</div>
                        <div className={'time'}>{info.time.Tue? info.time.Tue:'Closed'}</div>
                    </div>
                    <div className={'singleDay'}>
                        <div className={'day'}>Wed</div>
                        <div className={'time'}>{info.time.Wed? info.time.Wed:'Closed'}</div>
                    </div>
                    <div className={'singleDay'}>
                        <div className={'day'}>Thr</div>
                        <div className={'time'}>{info.time.Thr? info.time.Thr:'Closed'}</div>
                    </div>
                    <div className={'singleDay'}>
                        <div className={'day'}>Fri</div>
                        <div className={'time'}>{info.time.Fri? info.time.Fri:'Closed'}</div>
                    </div>
                    <div className={'singleDay'}>
                        <div className={'day'}>Sat</div>
                        <div className={'time'}>{info.time.Sat? info.time.Sat:'Closed'}</div>
                    </div>
                    <div className={'singleDay'}>
                        <div className={'day'}>Sun</div>
                        <div className={'time'}>{info.time.Sun? info.time.Sun:'Closed'}</div>
                    </div>
                </div>
            )
        }


    }

    return (
        <div className='infoContainer'>
            <h2>{info.name}</h2>
            <div className='infoRow'>
                <div className='rate'>
                    {rating === 0 ? <p>No Rating</p> : <Stars rating={rating} displayScore={true} />}

                </div>
                <div className='distance'>{info.distance / 1000} km</div>
            </div>
            <div className='infoRow'>
                {getPriceTag(info.price)}
                {getTag(info.tag)}
            </div>
            <h5>Business hours:</h5>
            {getBusiness(info.time)}
        </div>
    )
}
export default Information