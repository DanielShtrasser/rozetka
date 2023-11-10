import { Linking } from "react-native";

export default function openLink(uri) {
  Linking.canOpenURL(uri).then((supported) => {
    supported && Linking.openURL(uri);
  });
}
