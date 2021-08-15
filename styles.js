import { StyleSheet } from "react-native";

const baseContainer = {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
}
const baseSurface ={
    padding: 15,
    margin: 8,
    marginHorizontal: 15,
    elevation: 4,
    borderRadius: 8,
}
export const styles = StyleSheet.create({
    container: {
      ...baseContainer
    },
    sectionContainer: {
        paddingHorizontal: 24,
        paddingVertical: 100
    },
    margin:{
        marginVertical: 5
    },
    surface: {
        ...baseSurface
    },
    textmuted:{
        color: '#6c757d'
    },
    
    logo: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        paddingBottom: 20
    },
    loading: {
        flex : 1,
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
    },
    course: {
        ...baseSurface,
        alignItems: 'flex-start',
        justifyContent: 'flex-start', 
        borderLeftWidth: 5,
        borderLeftColor: 'rgba(255, 0, 0, 0.4)'
    },
    modalContent: {
        justifyContent: 'center',
        alignItems: 'center',
        margin: 0
    },

    inner: {
        padding: 24,
        flex: 1,
        justifyContent: "space-around"
    },
    

});