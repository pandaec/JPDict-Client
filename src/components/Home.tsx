import React, {useState} from "react";
import {Input} from "semantic-ui-react";
import {useHistory} from "react-router-dom";
import SidebarParent from "./SidebarParent";

const Home = () => {
    const history = useHistory();
    const [queryWord, setQueryInput] = useState('');

    function formatInput(s: string) {
        return encodeURIComponent(s.trim());
    }

    function handleSubmit(evt: any) {
        evt.preventDefault();

        if (queryWord === '') {
            return;
        }

        history.push(`/w/${formatInput(queryWord)}`);
    }


    return (
        <SidebarParent>

            <div className="main_container">
                <h2>JPDict</h2>
                <div className="main_div">
                    <form onSubmit={handleSubmit}>
                        <Input
                            fluid
                            placeholder='Search Word...'
                            action='Search'
                            value={queryWord}
                            onChange={(evt) => setQueryInput(evt.target.value)}
                        />

                    </form>
                </div>

                <p>JPDict is a japanese dictionary that provides explanation in Japanese and English at the same
                    time.</p>

            </div>
        </SidebarParent>

    );

}

export default Home;