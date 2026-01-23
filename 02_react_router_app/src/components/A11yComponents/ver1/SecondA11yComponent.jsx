import {useTheme} from "../useThemeContext.jsx";

export default function SecondA11yComponent({a11y}) {
    const { theme } = useTheme();

    return (
        <div>
            <h2>Second A11y Component</h2>
            <p>This is the second accessible component.</p>
            <p> {theme}</p>
            <p> {a11y.theme} </p>
        </div>
    );
}