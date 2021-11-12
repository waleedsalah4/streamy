import React from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import { fetchStream, editStream } from '../../actions';
import StreamForm from './StreamForm';

class StreamEdit extends React.Component {
    //'props is passed just because stream edit is rendered by  route (continue reading in mapState)
    componentDidMount(){
        this.props.fetchStream(this.props.match.params.id)
    }

    onSubmit = (formValues) => {
        this.props.editStream(this.props.match.params.id, formValues)
    }

    render(){
        
        if(!this.props.stream){
            return <div>Loading...</div>
        }
        return (
            <div>
                <h3>Edit a Stream</h3>
                <StreamForm 
                initialValues={_.pick(this.props.stream, 'title', 'description')} 
                onSubmit={this.onSubmit} />
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    //when mapStateToProps get called 
    //it called with two arguments
    //first: is all the state out of our redux store
    //second: 'ownProps' is the props object that shows up inside of our components
    return { stream: state.streams[ownProps.match.params.id]}
    //when to select any record out of streams obj use []
    //as we had the keys of the obj are the ids of all the stream
}
//now 'props that passed to stream edit have stream property that contains the stream that our user is trying to edit
export default connect(mapStateToProps, {fetchStream, editStream})(StreamEdit);