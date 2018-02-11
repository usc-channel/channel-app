import React from 'react'
import { StyleSheet, Text, View, Platform } from 'react-native'
import { Category } from '@types'
import { Theme } from '@config'
import { Touchable } from '@components'
import { decode } from 'he'
import { Button } from 'react-native-elements'

interface Props {
  categories: Category[]
  selectedCategories: number[]
  updateSelectedCategories(categories: number[]): void
}

interface State {
  selectedCategories: number[]
}

class CategoryFilter extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)

    this.state = {
      selectedCategories: props.selectedCategories,
    }
  }

  toggleCategory = (categoryId: number) => {
    const { selectedCategories } = this.state
    this.setState({
      selectedCategories: selectedCategories.includes(categoryId)
        ? selectedCategories.filter(a => a !== categoryId)
        : [...selectedCategories, categoryId],
    })
  }

  render() {
    const { categories, updateSelectedCategories } = this.props

    return (
      <View style={styles.container}>
        <Text style={styles.header}>Categories</Text>

        <View style={styles.categoriesContainer}>
          {categories.map(a => (
            <Touchable
              key={a.categoryId}
              onPress={() => this.toggleCategory(a.categoryId)}
            >
              <Text
                style={[
                  styles.category,
                  this.state.selectedCategories.includes(a.categoryId) &&
                    styles.categorySelected,
                ]}
              >
                {decode(a.name)}
              </Text>
            </Touchable>
          ))}
        </View>

        <View
          style={{
            borderTopWidth: StyleSheet.hairlineWidth,
            borderTopColor: 'rgba(255,255,255,0.56)',
            marginTop: 24,
            marginBottom: 16,
          }}
        />

        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Button
            text="Apply Filters"
            onPress={() =>
              updateSelectedCategories(this.state.selectedCategories)
            }
            textStyle={{
              color: '#fff',
              width: '100%',
              fontFamily: 'NunitoSans-SemiBold',
              fontWeight: '400',
              fontSize: 16,
            }}
            buttonStyle={{
              backgroundColor: Theme.accent,
              borderRadius: 0,
              width: '100%',
              borderWidth: StyleSheet.hairlineWidth,
              borderColor: Theme.accent,
            }}
            containerStyle={{ width: '48%' }}
          />

          <Button
            text="Clear filters"
            onPress={() => updateSelectedCategories([])}
            textStyle={{
              color: '#fff',
              width: '100%',
              fontWeight: Platform.OS === 'ios' ? '500' : '400',
              fontFamily: 'NunitoSans-SemiBold',
              fontSize: 16,
            }}
            buttonStyle={{
              backgroundColor: Theme.primary,
              borderRadius: 0,
              width: '100%',
              borderColor: '#fff',
              borderWidth: StyleSheet.hairlineWidth,
            }}
            containerStyle={{ width: '48%' }}
          />
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Theme.primary,
    padding: 16,
  },
  header: {
    fontFamily: 'NunitoSans-SemiBold',
    color: 'rgba(255,255,255, 0.87)',
  },
  category: {
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.54)',
    paddingVertical: 4,
    paddingHorizontal: 12,
    margin: 4,
    color: '#fff',
    fontSize: 16,
    borderRadius: 16,
    fontFamily: 'NunitoSans-SemiBold',
    overflow: 'hidden',
  },
  categorySelected: {
    backgroundColor: Theme.accent,
    color: '#fff',
    borderColor: Theme.accent,
  },
  categoriesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 8,
    marginLeft: -8,
  },
})

export default CategoryFilter
