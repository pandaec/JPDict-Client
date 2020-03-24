import React, {ChangeEvent, FormEvent, useEffect, useState} from "react";
import axios from 'axios';
import {Divider, Header} from "semantic-ui-react";
import {useParams} from "react-router";
import JPDef from "./JPDef";
import PageSearchBar from "./PageSearchbar";
import {useHistory} from "react-router-dom";
import {Lang} from "../typings/typings";
import SidebarParent from "./SidebarParent";
import BookmarkToggle from "./BookmarkToggle";


export const WordPage = () => {
    let {word: paramWord} = useParams();
    const [queryWord, setQueryInput] = useState(paramWord);
    const [widLoading, setWidLoading] = useState(true);
    const [wid, setWid] = useState([]);
    const history = useHistory();

    const [star, setStar] = useState(false);

    const hasLogin = localStorage.getItem('jwtToken') !== null;

    // check if word already exists in word list
    useEffect(() => {
        if(!hasLogin){
            return;
        }

        axios.get(`${process.env.REACT_APP_API_HOST}/api/wl/get/${paramWord}`)
            .then(res => {
                if (res.data) {
                    setWidLoading(false);
                    setWid(res.data.wid);
                    if (res.data.wid.length > 0) {
                        setStar(true);
                    } else {
                        setStar(false);
                    }
                }
            })
            .catch(err => {
                console.error(err);
            })
    }, [hasLogin, paramWord]);


    function handleBookmarkCheck(evt: React.MouseEvent<HTMLInputElement>) {
        if(!hasLogin){
            return;
        }

        if (star) {
            // remove word
            axios.post(`${process.env.REACT_APP_API_HOST}/api/wl/remove`,
                {
                    wid: wid,
                })
                .then(res => {
                    console.log(res.data);
                    if (res.data.success) {
                        // update local state
                        setWid([]);
                        setStar(false);
                    }
                })
                .catch(err => {
                    if (err.response && err.response.status === 401) {
                        // unauthorized
                        // redirect to login
                        console.log('unauthorized');
                    } else {
                        console.error(err);
                    }
                });
        } else {
            // add word
            axios.post(`${process.env.REACT_APP_API_HOST}/api/wl/add/${paramWord}`)
                .then(res => {
                    if (res.data.success) {
                        setStar(true);
                    }
                })
                .catch(err => {
                    if (err.response && err.response.status === 401) {
                        // unauthorized
                        // redirect to login
                        console.log('unauthorized');

                    } else {
                        console.error(err);
                    }
                });

        }
    }

    function formatInput(s: string) {
        return encodeURIComponent(s.trim());
    }

    function onChange(evt: ChangeEvent<HTMLInputElement>) {
        setQueryInput(evt.target.value);
    }

    function handleSubmit(evt: FormEvent<HTMLFormElement>) {
        evt.preventDefault();
        if (!queryWord) {
            return;
        }

        history.push(`/w/${formatInput(queryWord)}`);
    }



    return (
        <SidebarParent>
            <div className="container">
                <div className="container_head">
                    <h1 className="title" onClick={() => {
                        history.push('/');
                    }}>JPDict</h1>
                    <PageSearchBar word={queryWord || ''} onChange={onChange} onSubmit={handleSubmit}></PageSearchBar>

                </div>

                <Divider horizontal>
                    <Header as='h4'>
                        Action
                    </Header>
                </Divider>


                <BookmarkToggle checked={star} handleCheck={handleBookmarkCheck} disabled={widLoading} hasLogin={hasLogin}/>

                <Divider horizontal>
                    <Header as='h4'>
                        <span role="img" aria-label="japanese">🇯🇵</span> 日本語
                    </Header>
                </Divider>


                <JPDef key={`jp-${paramWord}`} searchWord={paramWord} lang={Lang.jp}/>


                <Divider horizontal>
                    <Header as='h4'>
                        <span role="img" aria-label="english">🇬🇧</span> English</Header>
                </Divider>

                <JPDef key={`en-${paramWord}`} searchWord={paramWord} lang={Lang.en}/>

            </div>
        </SidebarParent>
    );
};