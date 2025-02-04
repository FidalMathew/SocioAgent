import {Link} from "react-router-dom";

export default function Home() {
  return (
    <div>
      <div>hello</div>
      <Link to="/dashboard">Dashboard</Link>
    </div>
  );
}
