
export default function SecondA11yComponent({a11y}) {


    return (
        <div>
            <h2>Second A11y Component</h2>
            <p>This is the second accessible component.</p>
            <p> {a11y.theme} </p>
        </div>
    );
}