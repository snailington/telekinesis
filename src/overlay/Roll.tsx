import {useRef} from "react";
import DiceBox from "@3d-dice/dice-box-threejs";
import MagicCircle, {DiceMessage} from "magic-circle-api";
import "./Roll.css";
import OBR from "@owlbear-rodeo/sdk";

const MD_STYLE_KEY = "moe.snail.telekinesis/style";

function getFgColor(bgColor: string) {
    const r = parseInt(bgColor.substring(1, 3), 16);
    const g = parseInt(bgColor.substring(3, 5), 16);
    const b = parseInt(bgColor.substring(5, 7), 16);

    if(r + g + b > 380) return "#000000";
    else return "#FFFFFF";
}

function getStyle(color: string, meta: any) {
    return {
        background: meta.background || color,
        foreground: meta.foreground || getFgColor(color),
        material: meta.material || "plastic",
        texture: meta.texture || "none"
    };
}

export default function Roll({msg, clearRoll}: {msg: DiceMessage, clearRoll: (id: number) => void}) {
    const rollRef = useRef(null);
    const id = `roll-${msg.id}`;
    
    if(window.localStorage.getItem("telekinesis-disableRolls") == "true") {
        clearRoll(msg.id);
        return <></>;
    }
    
    async function makeRoll() {
        let style;
        if(msg.player == OBR.player.id) {
            style = getStyle(
                await OBR.player.getColor(),
                (await OBR.player.getMetadata())[MD_STYLE_KEY]
            );
        } else {
            const players = await OBR.party.getPlayers();
            const player = players.find((p) => p.id == msg.player);
            if(player) {
                style = getStyle(
                    player.color,
                    player.metadata[MD_STYLE_KEY]
                )
            }
        }
        
        console.log(style);
        
        try {
            const diceBox = new DiceBox("#" + id, {
                theme_customColorset: style,
                light_intensity: 1,
                sounds: true,
                onRollComplete: () => {
                    setTimeout(() => {
                        if(rollRef.current) {
                            const elm = rollRef.current as HTMLElement;
                            elm.style.opacity = "0";
                        }
                        setTimeout(() => clearRoll(msg.id), 5000);
                    }, 2500);
                }
            });
    
            await diceBox.initialize();
            const diceString = MagicCircle.toDiceString(msg.metadata, false) + "@" +
                msg.metadata.results?.join(",");
            console.log(diceString);
            diceBox.roll(diceString);
        } catch(e) {
            console.log("(telekinesis) exception", e);
            setTimeout(() => clearRoll(msg.id), 7500);
        }
    }
    
    makeRoll();
    
    return (
        <div id={id} className="roll" ref={rollRef}></div>
    );
}