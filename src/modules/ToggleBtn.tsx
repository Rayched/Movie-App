//테마 전환하는 Toggle Button

import { useRecoilState } from "recoil";
import { isDark } from "./atoms";
import styled from "styled-components";

const Toggles = styled.button`
    width: 50px;
    height: 50px;
    border: 2px solid black;
    border-radius: 35px;
    background-color: ${(props) => props.theme.itemColor};
    color: ${(props) => props.theme.textColor};
    font-weight: bold;
`;

function ToggleBtn(){
    const [DarkMode, setDarkMode] = useRecoilState(isDark);

    const onClick = () => {
        setDarkMode(!DarkMode);
    }

    return (
        <div>
            <Toggles onClick={onClick}>{DarkMode ? "Dark" : "Light"}</Toggles>
        </div>
    );
};

export default ToggleBtn;