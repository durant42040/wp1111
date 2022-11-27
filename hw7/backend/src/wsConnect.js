import {UserModel, ChatBoxModel, MessageModel} from './models/chatbox'

const makeName = (name, to) => {
    return [name, to].sort().join('-');
};

const validateUser = async (name) => {
    console.log('finding '+ name)
    const exist = await UserModel.findOne({name})
    if(exist) return exist;
}

const sendData = (data, ws) => {
    ws.send(JSON.stringify(data));
}

const sendStatus = (payload, ws) => {
    sendData(["status", payload], ws);
};

const broadcastMessage = (wss, data, status) => {
    wss.clients.forEach((client) => {
    sendData(data, client);
    sendStatus(status, client);
});
};


export default {
    initData: (wss) => {
        MessageModel?.deleteMany({}, () => {
            broadcastMessage(wss, ['cleared'],
                {type: 'info', msg: 'Message cache cleared.'})
        })
    },
    onMessage: (wss) => (
        async (byteString) => {
            const {data} = byteString
            const {task, payload} = JSON.parse(data)
            switch (task) {
                case 'chat': {
                    var {name, to} = payload;
                    const chatBox = makeName(name, to)
                    const Messages = await MessageModel?.find({chatBox: chatBox})
                    wss.clients.forEach((client) => {
                        const payload = Messages.map((e) => {
                            const body = e.body;
                            to = (e.name === name)? to: name;
                            name = e.name
                            return {name, to, body}
                        })
                        sendData(['start', payload], client);
                    });
                    break;
                }
                case 'message': {
                    const {name, to, body} = payload;
                    const chatBox = makeName(name, to)
                    const message = new MessageModel({chatBox, name, body})
                    try {
                        await message.save();
                    } catch (e) {
                        throw new Error
                        ("Message DB save error: " + e);
                    }
                    broadcastMessage(wss,
                        ['output', [payload]],
                        {
                            type: 'success', msg: 'Message sent.'
                        });
                    break;
                }
                case 'clear': {
                    MessageModel?.deleteMany({}, () => {
                        broadcastMessage(wss, ['cleared'],
                            {type: 'info', msg: 'Message cache cleared.'})
                    })
                    break;
                }
                default:
                    break;
            }
        }
    )
}

/*
case 'input': {
                    const {name, body} = payload;
                    const message = new Message({name, body})
                    try {
                        await message.save();
                    } catch (e) {
                        throw new Error
                        ("Message DB save error: " + e);
                    }
                    broadcastMessage(wss,
                        ['output', [payload]],
                        {
                            type: 'success', msg: 'Message sent.'
                        });
                    break;
                }
                case 'clear': {
                    Message.deleteMany({}, () => {
                        broadcastMessage(wss, ['cleared'],
                            {type: 'info', msg: 'Message cache cleared.'})
                    })
                    break;
                }

 */










