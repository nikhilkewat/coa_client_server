import { useLocation } from "react-router-dom";

const RoutePages = () => {
  const { state } = useLocation();
  return (
    <div className="card">
      <div className="card-body">{`${state}`}</div>
    </div>
  );
};

export default RoutePages;
