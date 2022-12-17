const Mutation = {
  createChatBox: async (parent, {name1, name2}, {ChatBoxModel}) => {
    const name = [name1, name2].sort().join('_')
    let box = await ChatBoxModel.findOne({name});
    if (!box){
      box = await new ChatBoxModel({name}).save();
      // console.log("not found")
    }
    // else console.log('found')
    return box;
  },
  createMessage: async (parent, {name, to, body}, {pubsub, ChatBoxModel}) => {
    const chatBoxName = [name, to].sort().join('_');
    let chatBox = await ChatBoxModel.findOne({name: chatBoxName});
    if (!chatBox) chatBox = await new ChatBoxModel({chatBoxName}).save();
    const newMsg = {sender: name, body};
    chatBox.messages.push(newMsg);
    await chatBox.save();
    pubsub.publish(`chatBox ${chatBoxName}`, {
      message: newMsg,
    });
    return newMsg;
  },

};

export default Mutation