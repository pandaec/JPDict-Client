import React, {MouseEvent, useEffect, useState} from "react";
import axios from 'axios';
import {useHistory} from "react-router-dom";
import SidebarParent from "../SidebarParent";
import {Button, Grid, GridColumn, Header, Icon, List, Segment} from "semantic-ui-react";

interface DBList {
    owner: string;
    list: DBWord[];
}

interface DBWord {
    _id: string;
    lastUpdated: string;
    word: string;
}

// TODO add loading
const WordList = () => {
    const history = useHistory();
    let [wordList, setWordList] = useState<any>([]);

    useEffect(() => {
        axios.get(`${process.env.BACKEND_HOST}/api/wl/`)
            .then(res => {
                console.log(res);
                const dbList: DBList = res.data;
                dbList.list.sort((a, b) => {
                    if (new Date(a.lastUpdated) < new Date(b.lastUpdated)) {
                        return -1;
                    } else if (new Date(a.lastUpdated) > new Date(b.lastUpdated)) {
                        return 1;
                    } else {
                        return 0;
                    }
                });
                setWordList(dbList.list.reverse());

            }).catch(err => {
            if (err.response.status === 401) {
                // unauthorized
                // redirect to login
                history.push('/login');
            } else {
                console.error(err);
            }
        });


    }, [history]);

    function handleDelete(evt: MouseEvent<HTMLButtonElement>, word: DBWord) {
        evt.preventDefault();

        axios.post(`${process.env.BACKEND_HOST}/api/wl/remove`,
            {
                wid: [word._id],
            })
            .then(res => {
                console.log(res.data);
                if (res.data.success) {
                    // update local state
                    const newWordList = wordList.filter((s: DBWord) => s._id !== word._id);
                    setWordList(newWordList);
                }
            }).catch(err => {
            if (err.response.status === 401) {
                // unauthorized
                // redirect to login
                history.push('/login');
            } else {
                console.error(err);
            }
        });
    }

    return (
        <SidebarParent>
            <Grid textAlign='center' style={{minHeight: '100vh', paddingTop: 20}}>
                <GridColumn style={{maxWidth: 1000}}>
                    <Segment.Group>
                        <Segment textAlign={'left'}>

                            {/*TODO center header*/}
                            <Header as='h2'>
                                <Icon name='bookmark outline'/>
                                <Header.Content>
                                    Vocabulary Bookmarks
                                    <Header.Subheader>Bookmark vocabularies that you want to review later</Header.Subheader>

                                </Header.Content>
                            </Header>

                        </Segment>

                        <Segment textAlign={'left'}>

                            {wordList.length === 0 ?
                                <Header as={'h4'} color={'red'}>The list is currently empty. Add new vocabulary by bookmarking it in the search page.</Header>
                                :
                                <Header as={'h4'} color={'blue'}>Click to go to the vocabulary dictionary page</Header>

                            }



                            <List selection>
                                {wordList.map((dbWord: DBWord) => {
                                    return <List.Item key={dbWord._id} as={'a'} href={`/w/${dbWord.word}`}>
                                        <List.Header>
                                            {dbWord.word}
                                            <Button compact negative style={{float: 'right'}} icon={'trash alternate'}
                                                    onClick={(evt) => {
                                                        handleDelete(evt, dbWord)
                                                    }}></Button>
                                        </List.Header>
                                    </List.Item>;
                                })}

                            </List>
                        </Segment>
                    </Segment.Group>
                </GridColumn>
            </Grid>
        </SidebarParent>


    );
};

export default WordList;