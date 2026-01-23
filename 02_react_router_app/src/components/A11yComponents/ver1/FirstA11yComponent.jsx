
import {A11yComponentsVer1UseA11yNoContext} from './useA11yNoContext.js';
import SecondA11yComponent from "./SecondA11yComponent.jsx";

export default function FirstA11yComponent() {


    return (
        <div>
            <h2>First A11y Component</h2>
            <p>This is the first accessible component.</p>
            <p> {A11yComponentsVer1UseA11yNoContext.theme} </p>
            <SecondA11yComponent a11y={A11yComponentsVer1UseA11yNoContext} />
        </div>
    );
}