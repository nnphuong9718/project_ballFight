import React, { Component } from "react";
import { View, TouchableOpacity, ActivityIndicator, StyleSheet, Platform , Text} from "react-native";
import styles from "./styles";

export default class Button extends Component {
  render() {
    const {title, onSubmit} = this.props;
    const onPress = () => {};
    return (
      <TouchableOpacity 
        style={styles.button}
        onPress = {onPress}
      >
        <Text style={styles.textButton}>{title}</Text>
      </TouchableOpacity>
    )
  }
}