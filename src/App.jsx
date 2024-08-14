import "./styles.css";
import Route from "./router/Router";
import { useAuth } from "./hook/use-auth";
import LoadingWeb from "./component/LoadingWeb";

function App() {
  const { loading } = useAuth();

  if (loading) {
    return (
      <div className="background">
        <LoadingWeb />
      </div>
    );
  }
  return (
    <div className="background">
      <Route />
    </div>
  );
}
export default App;

//    {/* <Route /> */}
