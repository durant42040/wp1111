const Query = {
  async chatbox(parent, {name1, name2}, context, info){
    const {ChatBoxModel} = context
    const name = [name1, name2].sort().join("_");
    let box = await ChatBoxModel.findOne({name});
    if (!box) box = await new ChatBoxModel({name}).save();
    return box
  },
};

export default Query;