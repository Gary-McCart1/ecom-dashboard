import OrderBlock from "./components/OrderBlock";
import SalesBlock from "./components/SalesBlock";
import OrderValueBlock from "./components/OrderValueBlock";
import TopProductsBlock from "./components/TopProductsBlock";
import MessagesBlock from "./components/MessagesBlock";
import OrdersChart from "./components/OrdersChart";
import CumulativeTotals from "./components/CumulativeTotals";
import ProtectedRoute from "./components/ProtextedRoute";

const Home = () => {
  return (
    <ProtectedRoute>
      <div className="m-20">
        <div className="">
          <h1 className="text-4xl font-bold">Dashboard</h1>
        </div>
        <div className="grid grid-cols-3 gap-4 mt-15">
          <OrderBlock />
          <SalesBlock />
          <OrderValueBlock />
        </div>
        <div className="grid grid-cols-3 gap-4 mt-5">
          <TopProductsBlock />
          <div className="col-span-2">
            <MessagesBlock />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <OrdersChart />
          </div>
          <div>
            <CumulativeTotals />
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default Home;
