import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import WaitForOwlbear from "./WaitForOwlbear.tsx";
import OBR from "@owlbear-rodeo/sdk";

OBR.onReady(() => {
  OBR.modal.open({
    id: "moe.snail.telekinesis/overlay",
    url: "/overlay.html",
    fullScreen: true,
    hideBackdrop: true,
    hidePaper: true,
    disablePointerEvents: true
  });
});

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <WaitForOwlbear>
    <App />
  </WaitForOwlbear>,
)
