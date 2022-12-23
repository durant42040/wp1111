const Mutation = {
    createChatBox: async (parent, {name1, name2}, {ChatBoxModel}, info) => {
        const name = [name1, name2].sort().join('_');
        let box = await ChatBoxModel.findOne({name})
        if (!box) box = await new ChatBoxModel({name}).save();
        return box;
    },
    createMessage: async (parent, {name, to, body}, {ChatBoxModel, pubsub}, info) => {
        console.log('ok')
        const message = {sender: name, body};
        const chatBoxName = [name, to].sort().join('_')
        let chatBox = await ChatBoxModel.findOne({name: chatBoxName})
        if (!chatBox) chatBox = await new ChatBoxModel({name: chatBoxName}).save();
        chatBox.messages.push(message)
        await chatBox.save();
        pubsub.publish(`chatBox ${chatBoxName}`, {message});
        return message;
    }
}

export default Mutation;