import React from "react";
import axios from "axios";
import { Def, Lang } from "../typings/typings";
import JPDefWord from "./JPDefWord";
import { Placeholder, Segment } from "semantic-ui-react";

interface Props {
    searchWord?: string,
    lang: Lang,
}

interface State {
    defs: Def[],
    loading: boolean,

}

const PlaceholderBlock = () => (
    <Segment raised>
        <Placeholder>
            <Placeholder.Paragraph>
                <Placeholder.Line />
                <Placeholder.Line />
                <Placeholder.Line />
                <Placeholder.Line />
                <Placeholder.Line />
                <Placeholder.Line />
                <Placeholder.Line />
            </Placeholder.Paragraph>
        </Placeholder>

    </Segment>
);

const NoResultBlock = () => (
    <Segment>
        Result not found
    </Segment>
);

export default class JPDef extends React.Component<Props, State>{
    constructor(props: Props) {
        super(props);

        this.state = {
            defs: [],
            loading: true,
        }
    }

    componentDidMount() {

        let qpath = '';
        if (this.props.lang === Lang.jp) {
            qpath = `${process.env.BACKEND_HOST}/api/w/jp/${this.props.searchWord}`;
        } else if (this.props.lang === Lang.en) {
            qpath = `${process.env.BACKEND_HOST}/api/w/en/${this.props.searchWord}`;
        }

        axios.get(qpath)
            .then(res => {
                this.setState({
                    defs: res.data,
                    loading: false,
                });

            })
            .catch(err => {
                console.error(err);
            });
    }

    render() {
        const divStyle = {
            width: '90vw',
            maxWidth: '1000px'
        };
        return (
            <div style={divStyle}>
                {
                    !this.state.loading ? (
                        this.state.defs.length > 0 ?
                            this.state.defs.map((item, i) =>
                                <JPDefWord
                                    key={`${item.reading}-${i}`}
                                    def={item} />
                            ) : <NoResultBlock />
                    )
                        :
                        <PlaceholderBlock />


                }
            </div>
        )
    }


}