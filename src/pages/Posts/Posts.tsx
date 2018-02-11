import React from 'react'
import { NavigationScreenProps } from 'react-navigation'
import { Dimensions, Image, Platform, Text } from 'react-native'
import { NavIcon } from '@components'
import { Theme } from '@config'
import { Scene, TabBar, TabViewAnimated } from 'react-native-tab-view'
import PostPage from './components/Post.page'
import { decode } from 'he'

const initialLayout = {
  height: 0,
  width: Dimensions.get('window').width,
}

interface ScreenProps {
  onSearch(): void
}

interface State {
  tabState: {
    index: number
    routes: Array<{ key: string; title: string }>
  }
}

type Props = NavigationScreenProps<ScreenProps>

class Posts extends React.Component<Props, State> {
  static navigationOptions = ({
    navigation,
  }: NavigationScreenProps<ScreenProps>) => {
    const params = navigation.state.params || {}

    return {
      headerLeft: (
        <Image
          source={require('../../assets/logo-complete.png')}
          style={{
            height: 42,
            width: 150,
            marginLeft: 16,
          }}
          resizeMode="contain"
        />
      ),
      headerRight: (
        <NavIcon
          iconName={Platform.OS === 'android' ? 'search' : 'ios-search-outline'}
          onPress={params.onSearch}
        />
      ),
      headerStyle: {
        elevation: 0,
        borderBottomWidth: 0,
        ...Theme.navigationOptions.headerStyle,
        ...Platform.select({
          ios: {
            height: 60,
          },
        }),
      },
    }
  }

  constructor(props: Props) {
    super(props)

    this.state = {
      tabState: { index: 0, routes: [] },
    }
  }

  componentWillMount() {
    this.props.navigation.setParams({
      onSearch: this.onSearch,
    })
  }

  componentDidMount() {
    this.getCategories()
  }

  getCategories = async () => {
    fetch('http://uscchannel.com/wp-json/wp/v2/categories')
      .then(e => e.json())
      .then(e => {
        this.setState({
          tabState: {
            ...this.state.tabState,
            routes: [
              { key: 'all', title: 'All' },
              ...e.map((a: any) => ({
                key: a.slug,
                title: a.name,
              })),
            ],
          },
        })
      })
      .catch(e => {
        throw new Error(e)
      })
  }

  onSearch = () => {
    alert('Search Pressed')
  }

  handleIndexChange = (index: number) =>
    this.setState({ tabState: { ...this.state.tabState, index } })

  renderHeader = (props: any) => (
    <TabBar
      {...props}
      scrollEnabled
      style={{ backgroundColor: Theme.primary }}
      indicatorStyle={{ backgroundColor: '#fff' }}
      renderLabel={({ route }: Scene<{ title: string }>) => (
        <Text
          style={{
            fontFamily: 'NunitoSans-SemiBold',
            color: '#fff',
            fontSize: 14,
          }}
        >
          {decode(route.title).toUpperCase()}
        </Text>
      )}
    />
  )

  renderScene = () => {
    return <PostPage />
  }

  render() {
    return (
      this.state.tabState.routes.length > 0 && (
        <TabViewAnimated
          style={{ flex: 1 }}
          navigationState={this.state.tabState}
          renderScene={this.renderScene}
          renderHeader={this.renderHeader}
          onIndexChange={this.handleIndexChange}
          initialLayout={initialLayout}
        />
      )
    )
  }
}

export default Posts
