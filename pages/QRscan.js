import React from "react";
import { styles } from "../styles";

import { View, StyleSheet, Alert } from "react-native";
import { Snackbar, Button } from "react-native-paper";

import { BarCodeScanner } from "expo-barcode-scanner";

import { addAttend } from "../functions";

import { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";

function QRscan() {
  const navigation = useNavigation();

  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const currentUser = useSelector((state) => state.currentUser);

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  const handleBarCodeScanned = ({ data }) => {
    setScanned(true);

    let qr_obj;
    try {
      qr_obj = JSON.parse(data);
    } catch (error) {
      Alert.alert("", "QR scan failed.");
      return false;
    }

    addAttend(
      qr_obj.code,
      qr_obj.date,
      qr_obj.timeStamp,
      qr_obj.secretKey,
      currentUser.uid
    )
      .then((done) => {
        Alert.alert("", done.message);
        done.code
          ? navigation.navigate("Course", { code: done.code, name: done.name })
          : undefined;
      })
      .catch((error) => {
        Alert.alert("", "QR scan failed.");
        return false;
      });
    F;
  };

  if (hasPermission === null) {
    return <Snackbar visible={true}>Requesting for camera permission</Snackbar>;
  }
  if (hasPermission === false) {
    return <Snackbar visible={true}>No access to camera</Snackbar>;
  }

  return (
    <View style={{ ...styles.container, marginTop: 32, padding: 0 }}>
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={{ ...StyleSheet.absoluteFillObject, ...styles.scanner }}
      />
      {scanned && (
        <Button
          icon="qrcode-scan"
          mode="contained"
          onPress={() => setScanned(false)}
        >
          Tap to Scan Again
        </Button>
      )}
    </View>
  );
}

export default QRscan;
