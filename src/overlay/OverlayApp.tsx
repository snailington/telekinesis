import Roll from "./Roll.tsx"
import MagicCircle, {DiceMessage} from "magic-circle-api";
import {useState, useEffect} from "react";

export default function OverlayApp() {
    const [rolls, setRolls] = useState(() => new Array<DiceMessage>());
    const [displayLimit, setDisplayLimit] = useState(-1);

    useEffect(() => MagicCircle.onMessage(rolls[rolls.length-1], (msgs) => {
        let updates = 0;
        for(const msg of msgs) {
            if(msg.type != "dice") continue;
            rolls.push(msg as DiceMessage);
            updates++;
        }
        if(updates == 0) return;
        if(displayLimit == -1) setDisplayLimit(rolls[rolls.length-1].id)
        setRolls(Array.from(rolls));
    }), [rolls, displayLimit])
    
    return (
        <>
            {rolls.filter((r) => r.id > displayLimit).map((r) =>
                <Roll key={r.id} msg={r} clearRoll={setDisplayLimit}/>)}
        </>
    );
}