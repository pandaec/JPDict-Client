import React from "react";
import {Def} from "../typings/typings";
import {Header, List, Segment} from "semantic-ui-react";
import Divider from "semantic-ui-react/dist/commonjs/elements/Divider";

interface Props {
    def: Def,
}

const JPDefWord = (props: Props) => {
    const d = props.def;
    return (
        <Segment raised>
            <Header size='large' as='h2'>
                {d.altWords[0]}{d.accent ? ('[' + d.accent + ']') : ''}
                <Header.Subheader>
                    ({d.reading}) [{d.altWords.join('・')}]
                </Header.Subheader>
            </Header>
            <div>
                {d.senses.map((sense, i) => {
                    return (<div key={i}>
                        {/* {sense.pos} */}
                        <List ordered>
                            {sense.definitions.map(sd => {
                                return <List.Item key={sd}>{sd}</List.Item>
                            })}
                        </List>
                        {(i + 1 < d.senses.length) ? <Divider/> : <div></div>}
                    </div>);
                })}
            </div>
        </Segment>

    );
};

export default JPDefWord;