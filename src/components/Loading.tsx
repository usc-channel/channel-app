import React from 'react'
import {
  ActivityIndicator,
  Modal,
  ModalProps,
  StyleSheet,
  View,
} from 'react-native'

const Loading: React.SFC<ModalProps> = props => (
  <Modal
    transparent
    animationType="fade"
    onRequestClose={() => null}
    {...props}
  >
    <View style={styles.content}>
      <View style={styles.loaderContainer}>
        <ActivityIndicator color="#fff" size="large" />
      </View>
    </View>
  </Modal>
)

const styles = StyleSheet.create({
  content: {
    backgroundColor: 'rgba(0,0,0,.38)',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loaderContainer: {
    width: 93,
    height: 93,
    backgroundColor: 'rgba(0,0,0,.70)',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
})

export default Loading
