import "./App.css";
import { trpc } from "./trcp/trpc-client";

function App() {
  const query = trpc.hello.useQuery();
  return (
    <div>{query.isFetching ? <p>Loading....</p> : <p>{query.data}</p>}</div>
  );
}

export default App;
