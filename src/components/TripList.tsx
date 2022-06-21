import "./TripList.css";
import { useEffect, useState } from "react";

interface TripListModel {
  title: string;
  price: string;
  id: string;
}

const TripList: React.FC = () => {
  const [trips, setTrips] = useState<TripListModel[]>([]);

  useEffect(() => {
    fetch("http://localhost:3000/trips")
      .then((response) => response.json())
      .then((json) => setTrips(json));
  }, []);

  return (
    <div className="trip-list">
      <h2>TripList</h2>
      <ul>
        {trips.map((trip) => (
          <li key={trip.id}>
            <h3>{trip.title}</h3>
            <p>{trip.price}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TripList;
