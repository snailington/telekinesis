import ReactDOM from "react-dom/client";
import WaitForOwlbear from "../WaitForOwlbear.tsx";
import OverlayApp from "./OverlayApp.tsx";

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <WaitForOwlbear>
        <OverlayApp />
    </WaitForOwlbear>,
)