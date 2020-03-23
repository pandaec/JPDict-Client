import React, {useState} from "react";
import {Icon, Menu, Segment, Sidebar} from "semantic-ui-react";

interface Props {

}

const SidebarParent: React.FC<Props> = (props) => {
    const [visible, setVisible] = useState(false);


    return (
        <Sidebar.Pushable as={Segment} className={'minFullHeight'}>
            <Sidebar
                as={Menu}
                animation='overlay'
                icon='labeled'
                inverted
                onHide={() => setVisible(false)}
                vertical
                visible={visible}
                width='thin'
            >
                <Menu.Item as='a' href={'/'}>
                    <Icon name='book'/>Dictionary
                </Menu.Item>
                <Menu.Item as='a' href={'/login'}>
                    <Icon name='user outline'/>Login
                </Menu.Item>
                <Menu.Item as='a' href={'/wordlist'}>
                    <Icon name='bookmark outline'/>Vocabulary
                </Menu.Item>
            </Sidebar>

            <Sidebar.Pusher dimmed={visible} className={'minFullHeight'}>
                <div>
                    <Icon
                        name='content'
                        className='sidebar_button'
                        bordered
                        color='black'
                        corner='top left'
                        circular
                        size='large'
                        onClick={() => {
                            setVisible(!visible)
                        }}/>
                    {props.children}

                </div>
            </Sidebar.Pusher>
        </Sidebar.Pushable>
    );
};

export default SidebarParent;