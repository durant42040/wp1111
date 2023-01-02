import {useState, useEffect, useContext, createContext} from "react";
import axios from 'axios'
import {CREATE_ARTICLE_MUTATION} from "../graphql";
import {useMutation} from "@apollo/client";

const ChatContext = createContext({
    i: true,
    active: '',
    open: false,
    article: '',
    title: '',
    months: [],
    edit: false,
    content: '',
    description: '',
    image: '',
    headline: false,
    id: ''
});

const ChatProvider = (props) => {
    const [active2, setActive2] = useState('Box Score');
    const [content, setContent] = useState('')
    const [description, setDescription] = useState('')
    const [image, setImage] = useState(null)
    const [headline, setHeadline] = useState(false)
    const [i, setI] = useState(true)
    const [open, setOpen] = useState(false)
    const [title, setTitle] = useState('')
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    const [publishArticle] = useMutation(CREATE_ARTICLE_MUTATION)
    const [edit, setEdit] = useState(false)
    const [id, setId] = useState('')
    const [games, setGames] = useState([])
    const [active, setActive] = useState('Home')

    const instance = axios.create({
        baseURL: 'https://www.balldontlie.io/api/v1'
    })

    const date = new Date();
    date.setDate(date.getDate() - 1)

    const getGame = async (id, i, e, a) => {
        const {data: {data}} = await instance.get('/stats?seasons[]=2022&per_page=50&game_ids[]='+id)
        let hmax = undefined
        let vmax = undefined
        if(data.length) vmax = data.filter((e) => e.player.team_id === a[i].visitor_team.id).reduce(function(prev, current) {
            return (prev.pts > current.pts) ? prev : current
        })
        if(vmax) e.vgameLeader = {name: (vmax.player.first_name+' '+vmax.player.last_name), pts: vmax.pts, ast: vmax.ast, reb: vmax.reb}
        else e.vgameLeader = {}
        if(data.length) hmax = data.filter((e) => e.player.team_id === a[i].home_team.id).reduce(function(prev, current) {
            return (prev.pts > current.pts) ? prev : current
        })
        if(hmax) e.hgameLeader = {name: (hmax.player.first_name+' '+hmax.player.last_name), pts: hmax.pts, ast: hmax.ast, reb: hmax.reb}
        else e.hgameLeader = {}
    }

    const getGames = async (year, month, day) => {
        const today = '/games?dates[]='+year+'-'+month+'-0'+day+'"'
        const {
            data: {data, meta},
        } = await instance.get(today);
        data.forEach((e) => {
            if(e.status[1] === ':') e.time = e.status[0]+e.status[2]
            else e.time = e.status[0]+e.status[1]+e.status[3]
        })
        data.sort((a, b) => (a.time - b.time))
        data.forEach((e, i, a) => getGame(e.id, i, e, a))
        setGames(data)
    }

    useEffect(() => {
        getGames(date.getFullYear(), (date.getMonth()+1), date.getDate())
    }, [])

    useEffect(() => {
        if(i < 3){
            setTimeout(() => {
                setI(i+1)
            }, 1000)
        }
    }, [i])

    useEffect(() => {
        setTimeout(() => {
            setI(i + 1)
        }, 60000)
    }, [i])

    return (
        <ChatContext.Provider value={{i, setI, active, setActive, open, setOpen, title, setTitle, publishArticle, months, edit, setEdit,
            content, setContent, description, setDescription, image, setImage, headline, setHeadline, id, setId, games, getGames, active2, setActive2}}{...props}/>
    )
}

const useData = () => useContext(ChatContext);

export {useData, ChatProvider};