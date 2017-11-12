import * as React from "react";
import * as ReactDOM from "react-dom";

import Simple from "./simple";
import withCount from "./hoc/withCount";
import DisplayCount from "./hoc/displayCount";
import LazyLoad from "./lazy/lazyLoad";

interface IAppProps{
    title: string;
}
const Counter = withCount(DisplayCount);
const load = () => import("./lazy/lazyComponent");

const App = ({title}: IAppProps) => <div>
    <h1>{title}</h1>

    <Simple
        customProperty="Simple field component"
        placeholder="type some text..."
        onFocus={() => console.log("is focused!")}
    />

    <Counter title="High Order Component" increment={1} />

    <LazyLoad load={load}/>
</div>;

ReactDOM.render(
    <App  title="Hello, React!"/>,
    document.getElementById('root')
);