import {useChat} from './hooks/useChat'
import Title from '../components/Title'
import LogIn from '../components/LogIn'

const SignIn = () => {
    const {displayStatus, setMe, setSignedIn, me} = useChat()
    const onLogin = (name) => {
        if (!name){
            displayStatus({
                type: false,
                msg: "Missing username",
            });
            return;
        }
        setSignedIn(true);
    }

    return(
        <>
            <Title/>
            <LogIn me={me} setName={setMe} onLogin={onLogin}/>
        </>
    )
}

export default SignIn