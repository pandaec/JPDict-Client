import React, { FormEvent, ChangeEvent } from "react";
import { Input } from "semantic-ui-react";


interface Props {
    word: string,
    onChange: (evt: ChangeEvent<HTMLInputElement>)=>void,
    onSubmit: (evt: FormEvent<HTMLFormElement>)=>void,
}

const PageSearchBar = (props: Props) => {

    return (
        <form onSubmit={props.onSubmit}>
            <Input
                placeholder='Search...'
                onChange={props.onChange}
                action='Search'
                fluid
                value={props.word}
            />
        </form>
    );
};


export default PageSearchBar;