import "./TripList.css";
import { useEffect, useState, useCallback } from "react";

interface TripListModel {
  title: string;
  price: string;
  id: string;
  loc: string;
}

const TripList: React.FC = () => {
  const [trips, setTrips] = useState<TripListModel[]>([]);
  const [url, setUrl] = useState<string>("http://localhost:3000/trips");

  const fetchTrips = useCallback(async () => {
    const response = await fetch(url);
    const json = await response.json();
    setTrips(json);
  }, [url]);

  useEffect(() => {
    fetchTrips();
  }, [url, fetchTrips]);

  console.log(trips);

  return (
    <div className="trip-list">
      <h2>TripList</h2>
      <ul>
        {trips.map((trip) => (
          <li key={trip.id}>
            <h3>{trip.title}</h3>
            <p>{trip.price}</p>
            <small>location: {trip.loc}</small>
          </li>
        ))}
      </ul>
      <div className="filters">
        <button
          onClick={() => setUrl("http://localhost:3000/trips?loc=europe")}
        >
          European Trips
        </button>
        <button
          onClick={() => setUrl("http://localhost:3000/trips?loc=america")}
        >
          American Trips
        </button>
        <button onClick={() => setUrl("http://localhost:3000/trips")}>
          All Trips
        </button>
      </div>
    </div>
  );
};

export default TripList;
