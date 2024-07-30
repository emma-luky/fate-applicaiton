import { Stack } from 'expo-router';
import { ScrollView, TextArea, Text, Image } from 'tamagui';
import { StyleSheet, View } from 'react-native';


export default function App() {
  return (
    <>
      <Stack.Screen options={{ title: 'Recipes' }} />
      <ScrollView flex={1}>
        <View style={styles.vertical}>           
          <Text
              padding={40}
              fontSize={40}
              fontStyle='italic'
              fontFamily='$silkscreen'
              alignContent='center'
              justifyContent='center'
              textAlign='center'> 
              Creamiest Mashed Potatoes 
          </Text>
          <Image 
            alignSelf='center'
            marginBottom={40} 
            width={200} 
            height={200} 
            source={require('../../icons/mashedPotatoes.jpg')} />
          <Text
            marginLeft={20}
            marginRight={20}
            marginBottom={20}
            fontSize={20}
            fontStyle='italic'
            fontFamily='$silkscreen'
            alignContent='center'
            justifyContent='center'
            textAlign='center'> 
            Discover the ultimate comfort food with our Creamiest Mashed Potatoes recipe! These potatoes are whipped to perfection, 
            resulting in an incredibly smooth and velvety texture that melts in your mouth. Perfectly seasoned and rich with a blend of butter and cream, 
            each bite is a luxurious experience. Whether you're serving them at a holiday feast or a weeknight dinner, these mashed potatoes are sure to be 
            the star of the meal. Indulge in the perfect side dish that pairs well with just about anything and leaves everyone coming back for seconds!
          </Text>

          <View style={styles.tagContainer}>
            <Text > Prep Time -- 30 Minutes </Text>
          </View>
          <View style={styles.tagContainer}>
            <Text > Cook Time -- 30 Minutes </Text>
          </View>
          <View style={styles.tagContainer}>
            <Text > Total Time -- 60 Minutes </Text>
          </View>
          <View style={styles.ingredientContainer}>
            <Text marginTop={5}> Ingredients </Text>
            <Text marginTop={10}> russet potatoes  |  4</Text>
            <Text > butter  |  6 tbsp</Text>
            <Text > milk  |  1/2 cup </Text>
            <Text > italian seasoning  |  1 tsp </Text>
            <Text > salt  |  1 tsp </Text>
            <Text > black pepper  |  1 tsp </Text>
          </View>

          <View style={styles.instructionsContainer}>
            <Text marginTop={5}> Step 1: </Text>
            <Text marginBottom={10}> Wash potatoes then peel all skin off </Text>
            
            <Text marginTop={5}> Step 2: </Text>
            <Text marginBottom={10}> Cut potatoes into quarters then add into a large pot of boiling water </Text>

            <Text marginTop={5}> Step 3: </Text>
            <Text marginBottom={10}> Once a fork can smoothly enter the potato, drain and mash the potatoes </Text>

            <Text marginTop={5}> Step 4: </Text>
            <Text marginBottom={10}> Add milk, butter, salt, pepper, and italian seasoning to the pot and mash until fully mixed </Text>
          </View>
        </View>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  vertical: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    fontSize: 16,
  },
  horizontal: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 5,
    fontSize: 16,
  }, tagContainer: {
    margin: 5,
    height: 50,
    width: 300,
    borderRadius: 20,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  }, ingredientContainer: {
    margin: 5,
    height: 150,
    width: 300,
    borderRadius: 20,
    borderWidth: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    alignSelf: 'center',
  }, instructionsContainer: {
    margin: 5,
    height: 280,
    width: 300,
    borderRadius: 20,
    borderWidth: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    alignSelf: 'center',
  }});