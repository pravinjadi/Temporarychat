import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './components/home';
import ChatRoom from './components/chatroom';

function App() {
    return (
        <Router>
            <Switch>
                <Route path="/" exact component={Home} />
                <Route path="/room/:roomCode" render={(props) => <ChatRoom roomCode={props.match.params.roomCode} />} />
            </Switch>
        </Router>
    );
}

export default App;
