
import TransportScreen from "./features/transport/TransportScreen";

export default function App() {
  return (
    <div className="fixed bottom-0 right-4 z-50 w-[420px] max-h-[95vh] flex flex-col items-end justify-end p-8 pointer-events-none pr-8">
      <div className="pointer-events-auto w-full">
        <TransportScreen />
      </div>
    </div>
  );
}
