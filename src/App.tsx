import './App.css'
import StyleSettings from "./StyleSettings.tsx";
import OwlbearTheme from "./OwlbearTheme.tsx";
import GeneralSettings from "./GeneralSettings.tsx";

function App() {
  return (
    <OwlbearTheme>
      <div id="main">
        <GeneralSettings />
        <StyleSettings/>
      </div>
    </OwlbearTheme>
  )
}

export default App
