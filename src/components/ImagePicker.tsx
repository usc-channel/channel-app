import React from 'react'
import { Platform, StyleSheet, Text, View } from 'react-native'
import { ListItem } from 'react-native-elements'
import ImagePicker, { Image } from 'react-native-image-crop-picker'
import Modal from 'react-native-modal'

import { Theme } from '@config'

interface Props {
  title: string
  isVisible: boolean
  onRequestClose(): void
  onSelectImage(path: string): void
}

const pickerOptions = {
  width: 150,
  height: 150,
  cropping: true,
  waitAnimationEnd: false,
}

export default class PhotoPicker extends React.Component<Props> {
  selectGallery = async () => {
    try {
      const image = (await ImagePicker.openPicker(pickerOptions)) as Image

      this.props.onRequestClose()
      this.props.onSelectImage(image.path)
    } catch (e) {
      // Do nothing
      this.props.onRequestClose()
    }
  }

  takePhoto = async () => {
    try {
      const image = (await ImagePicker.openCamera(pickerOptions)) as Image

      this.props.onRequestClose()
      this.props.onSelectImage(image.path)
    } catch (e) {
      this.props.onRequestClose()
    }
  }

  render() {
    return (
      <View>
        <Modal
          isVisible={this.props.isVisible}
          onBackButtonPress={this.props.onRequestClose}
          onBackdropPress={this.props.onRequestClose}
          style={{
            justifyContent: 'flex-end',
            margin: 0,
          }}
        >
          <View style={{ backgroundColor: '#fff' }}>
            <Text style={[styles.title, styles.titleStyle]}>
              {this.props.title}
            </Text>
            <ListItem
              title="Take a photo"
              titleStyle={styles.titleStyle}
              leftIcon={{ name: 'camera', color: Theme.primary }}
              onPress={this.takePhoto}
            />
            <ListItem
              title="Choose from your photos"
              titleStyle={styles.titleStyle}
              leftIcon={{ name: 'photo-library', color: Theme.primary }}
              onPress={this.selectGallery}
            />
            <ListItem
              title="Cancel"
              titleStyle={styles.titleStyle}
              onPress={this.props.onRequestClose}
              topDivider
              leftIcon={{ name: 'close', color: Theme.primary }}
            />
          </View>
        </Modal>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  title: {
    padding: 16,
    fontSize: 17,
  },
  titleStyle: {
    fontFamily:
      Platform.OS === 'ios' ? Theme.fonts.regular : Theme.fonts.semiBold,
    color: 'rgba(0,0,0,.87)',
  },
})
