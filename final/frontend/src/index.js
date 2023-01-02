import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import {ChatProvider} from './hooks/useData'
import { Auth0Provider } from "@auth0/auth0-react";
import {ApolloClient, InMemoryCache, ApolloProvider} from '@apollo/client';

const client = new ApolloClient({
    uri: 'https://finalprojectbackend-production-77b8.up.railway.app/graphql',
    cache: new InMemoryCache(),
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
      <ApolloProvider client={client}>
          <Auth0Provider domain='dev-470m0yzjwr08gok5.us.auth0.com' clientId='Hsip7rajodFYjCgS79g1tSXwuUZSfMPA' redirectUri={window.location.origin}>
              <ChatProvider>
                  <App/>
              </ChatProvider>
          </Auth0Provider>
      </ApolloProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
