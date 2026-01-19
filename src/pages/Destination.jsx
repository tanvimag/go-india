import { useParams } from "react-router-dom";

export default function Destination() {
  const { name } = useParams();

  return (
    <div className="destination">
      <h1>{name}: Land of Kings</h1>
      <p>Discover amazing places...</p>
    </div>
  );
}
