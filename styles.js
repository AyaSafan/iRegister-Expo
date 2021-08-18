import { StyleSheet } from "react-native";

const baseContainer = {
  flex: 1,
  justifyContent: "center",
  alignItems: "center",
};
const baseSurface = {
  padding: 15,
  margin: 8,
  marginHorizontal: 15,
  elevation: 4,
  borderRadius: 8,
};

export const theme = {
  primary: "#dc3545",
  accent: "#289bbd",
  background: "#f2f2f2",
}

export const styles = StyleSheet.create({
  container: {
    ...baseContainer,
  },
  sectionContainer: {
    paddingHorizontal: 24,
    paddingVertical: 100,
  },

  margin: {
    marginVertical: 4,
  },
  surface: {
    ...baseSurface,
  },
  textmuted: {
    color: "#6c757d",
  },
  logo: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    marginBottom: 12,
    height: 200,
  },
  loading: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
  },
  course: {
    ...baseSurface,
    alignItems: "flex-start",
    justifyContent: "flex-start",
    borderLeftWidth: 5,
    borderLeftColor: "rgba(255, 0, 0, 0.4)",
  },
  modalContent: {
    justifyContent: "center",
    alignItems: "center",
    margin: 0,
  },

  inner: {
    padding: 24,
    flex: 1,
    justifyContent: "space-around",
  },

  cardTextThin: {
    alignSelf: "center",
    fontFamily: "Roboto_Thin",
    fontSize: 18,
  },
  cardTextBold: {
    alignSelf: "center",
    fontFamily: "Roboto_Thin",
    fontSize: 30,
    fontWeight: "bold",
  },
  scanner: {
    marginHorizontal: 0,
    marginLeft: 0,
    marginStart: 0,
    paddingHorizontal: 0,
    paddingLeft: 0,
    paddingStart: 0,
    height: "115%",
    padding: 0,
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
    backgroundColor: theme.primary
  },
});
