import "./GeneralSettings.css";

export default function GeneralSettings() {
    const disableRolls = window.localStorage.getItem("telekinesis-disableRolls") == "true" ? "true" : "false";
        
    return (
        <div id="app-settings">
            <label htmlFor="disable-rolls">Disable 3D Dice</label>
            <input id="disable-rolls" type="checkbox" defaultChecked={disableRolls == "true"} onChange={(e) =>
                window.localStorage.setItem("telekinesis-disableRolls", e.target.checked.toString())
            }></input>
        </div>
    );
}