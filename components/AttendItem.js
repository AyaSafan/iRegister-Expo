import React , {Component} from 'react';
import { List, Divider } from 'react-native-paper';

import firebase from 'firebase/app'

class AttendItem extends Component {
    state={
        displayName:""
    }
    async getName(uid){
        const db = firebase.firestore(); 
        const doc = await db.collection("users").doc(uid).get()
        this.setState({displayName: doc.data().displayname})
    };
    async componentDidMount(){
        this.getName(this.props.uid);
    };
    render() {
        return (<>
        <List.Item
            title={this.state.displayName}
            right={props => this.props.attendance.students.includes(this.props.uid) ? <List.Icon {...props} icon="check-circle" color={"rgb(11, 184, 218)"}/>: <List.Icon {...props} icon="close-circle" color={"red"}/>}
            style={this.props.attendance.students.includes(this.props.uid) ? null: {opacity: 0.4}}
        />
        <Divider /></>
);
}
}
export default AttendItem;