import { useState } from "react";
import "./App.css";
import TripList from "./components/TripList";

function App() {
  const [showTrips, setShowTrips] = useState<boolean>(true);

  return (
    <div className="App">
      <TripList />
    </div>
  );
}

export default App;

//npx json-server --watch ./data/db.json
