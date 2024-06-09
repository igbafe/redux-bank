import { useSelector } from "react-redux";
import "./App.css";
import AccountOperations from "./features/accounts/AccountOperations";
import BalanceDisplay from "./features/accounts/BalanceDisplay";
import CreateCustomer from "./features/customers/CreateCustomer";
import Customer from "./features/customers/Customer";

function App() {
  const fullName = useSelector((store) => store.customer.fullName);
  return (
    <div className="App">
      <h1 className=" pl-4 text-3xl font-bold">The React-redux Bank</h1>
      {fullName === "" ? (
        <CreateCustomer />
      ) : (
        <>
          <BalanceDisplay  />
          <Customer />
          <AccountOperations />
        </>
      )}
    </div>
  );
}

export default App;
