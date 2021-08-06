import React from 'react'; 
import {Snackbar} from 'react-native-paper';
import {View} from 'react-native';

function Message(props) {

    const [visible, setVisible] = React.useState(true);
    const onToggleSnackBar = () => setVisible(!visible);
    const onDismissSnackBar = () => setVisible(false);
  
    return (
      <View>
        {props.errorMessage && (
              <Snackbar
              visible={visible}
              onDismiss={onDismissSnackBar}
              action={{
                label: 'Dismiss',
                onPress: () => {
                  onToggleSnackBar
                  {props.clearErrorMessage()}
                },
              }}>
             {props.errorMessage}
            </Snackbar>
        )} 
      </View>
    );
  };

export default Message;