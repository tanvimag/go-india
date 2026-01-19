import { Link } from "react-router-dom";

export default function DestinationCard({ title }) {
  return (
    <div className="card">
      <h3>{title}</h3>
      <Link to={`/destination/${title}`}>View Details</Link>
    </div>
  );
}
