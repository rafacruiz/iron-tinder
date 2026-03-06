import "./App.css";

import { Routes, Route } from 'react-router';

import { HomePage, LoginPage } from "./pages";

// TODO: Import Routes, Route from react-router-dom
// TODO: Import your page components (LoginPage, SignupPage, ProfilePage, etc.)
// TODO: Import your Navbar component

// TODO: Set up your routes:
//   /signup  → SignupPage (public)
//   /profile → ProfilePage (protected)
//   /matches → MatchesPage (protected)
//   /matches/:matchId → ConversationPage (protected)
//   /        → SuggestionsPage (protected, home)

function App() {
  return (<>
    <Routes>              
      <Route 
        path='/login' 
        element={ <LoginPage /> } />
                     
      <Route 
        path='/' 
        element={ <HomePage /> } />
    </Routes>
  </>);
}

export default App;
