import {Checkbox, Header} from "semantic-ui-react";
import React from "react";

interface BookmarkToggleProps {
    checked: boolean,
    handleCheck: (evt: React.MouseEvent<HTMLInputElement>) => void,
    disabled: boolean,
    hasLogin: boolean,
}

const BookmarkToggle : React.FC<BookmarkToggleProps> = (props) => {



    return (<div style={{width: '90vw', maxWidth: 1000}}>
        {!props.hasLogin ?
            <Header as={'h5'} color={'red'}>Login to use the bookmark feature</Header> : <span></span>
        }
        <Checkbox toggle size={'huge'} label={"Bookmark Word"} checked={props.checked} disabled={props.disabled || !props.hasLogin}
        onClick={evt => {props.handleCheck(evt)}}/>

    </div>);
};


export default BookmarkToggle;