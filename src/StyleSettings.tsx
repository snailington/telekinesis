import {Dispatch, FormEvent, SetStateAction, useEffect, useState} from "react";
import OBR, {Metadata} from "@owlbear-rodeo/sdk";
import "./StyleSettings.css";

const TEXTURES = [
    { id: "none", name: "None" },
    { id: "clouds", name: "Clouds 1" },
    { id: "cloudy_2", name: "Clouds 2" },
    { id: "fire", name: "Fire" },
    { id: "marble", name: "Marble" },
    { id: "water", name: "Water" },
    { id: "ice", name: "Ice" },
    { id: "paper", name: "Paper" },
    { id: "speckles", name: "Speckled" },
    { id: "glitter", name: "Glitter" },
    { id: "glitter_2", name: "Glitter 2" },
    { id: "stars", name: "Stars" },
    { id: "stainedglass", name: "Stained Glass" },
    { id: "wood", name: "Wood" },
    { id: "metal", name: "Metal" },
    { id: "skulls", name: "Skulls" },
    { id: "leopard", name: "Leopard Skin" },
    { id: "tiger", name: "Tiger Skin" },
    { id: "cheetah", name: "Cheetah Skin" },
    { id: "dragon", name: "Dragon Skin" },
    { id: "lizard", name: "Lizard Skin" },
    { id: "bird", name: "Bird" },
    { id: "astral", name: "Astral" },
    { id: "acleaf", name: "Leaf" },
    { id: "thecage", name: "Cage" },
    { id: "isabelle", name: "Isabelle" },
    { id: "bronze01", name: "Bronze 1" },
    { id: "bronze02", name: "Bronze 2" },
    { id: "bronze03", name: "Bronze 3" },
    { id: "bronze03a", name: "Bronze 3a" },
    { id: "bronze03b", name: "Bronze 3b" },
    { id: "bronze04", name: "Bronze 4" },
]

interface OptionsElements extends HTMLCollection {
    bgColor: HTMLInputElement;
    fgColor: HTMLInputElement;
    material: HTMLSelectElement;
    texture: HTMLSelectElement;
}

function validateHex(input: string) {
    if(input.match(/^#[0-9a-fA-F]{6}$/)) return input;
    return undefined;
}

export default function StyleSettings() {
    const [style, setStyle]: [Style, Dispatch<SetStateAction<Style>>] = useState(() => {
        const s = window.localStorage.getItem("telekinesis-style");
        let style = {
            background: "#C70505",
            foreground: "#FFFFFF",
            material: "plastic",
            texture: "none"
        };
        if(s) {
            const loaded = JSON.parse(s);
            if(loaded && typeof loaded == "object") style = {...style, ...loaded};
        }
        return style;
    });
    
    useEffect(() => {
        const metadata: Partial<Metadata> = {};
        metadata["moe.snail.telekinesis/style"] = {...style};
        OBR.player.setMetadata(metadata);
    }, [style]);
    
    function submit(evt: FormEvent<HTMLFormElement>) {
        evt.preventDefault();
        
        const form: OptionsElements = (evt.target as HTMLFormElement).elements as OptionsElements;
        const bgColor: string = validateHex(form.bgColor.value) || style.background;
        const fgColor: string = validateHex(form.fgColor.value) || style.foreground;
        const material: string = form.material.value || style.material;
        const texture: string = form.texture.value || style.texture;
        
        const newStyle = {
            background: bgColor,
            foreground: fgColor,
            material: material,
            texture: texture
        }
        
        window.localStorage.setItem("telekinesis-style", JSON.stringify(newStyle));
        setStyle(newStyle);
    }
    
    return (
        <form onSubmit={submit}>
            <label htmlFor="bgColor">Die Color:</label>
            <input id="bgColor" type="color" name="bgColor" defaultValue={style.background}></input>
            
            <label htmlFor="fgColor">Label Color:</label>
            <input id="fgColor" type="color" name="fgColor" defaultValue={style.foreground}></input>
            
            <label htmlFor="material">Material:</label>
            <select id="material" name="material">
                {[["wood", "Mattest"], ["plastic", "Matte"], ["none", "Shiny"],
                  ["glass", "Shiniest"], ["metal", "Metallic"]].map(([value, label]) =>
                      <option value={value} selected={style.material == value}>{label}</option>
                  )}
            </select>
            
            <label htmlFor="texture">Texture:</label>
            <select id="texture" name="texture">
                {TEXTURES.map((t) =>
                    <option value={t.id} selected={style.texture == t.id}>{t.name}</option>)}
            </select>
            
            <button type="submit">Save</button>
        </form>
    );
}