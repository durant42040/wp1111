const Subscription = {
  message: {
    subscribe: (parent, {from, to}, {pubsub}) => {
      const chatBoxName =[from, to].sort().join('_');
      console.log('subscription')
      return pubsub.subscribe(`chatBox ${chatBoxName}`);
    },
  },
};

export { Subscription as default };
