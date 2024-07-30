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
              Easiest Chicken Noodle Soup
          </Text>
          <Image 
            alignSelf='center'
            marginBottom={40} 
            width={200} 
            height={200} 
            source={require('../../icons/chickenNoodleSoup.jpg')} />
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
           Warm up with this easy and comforting Chicken Noodle Soup, perfect for any day of the week. 
           This recipe combines tender chunks of chicken with hearty noodles and fresh vegetables in a flavorful broth. 
           With just a few simple ingredients and a minimal prep time, you'll have a delicious homemade soup that’s 
           both satisfying and nourishing. Ideal for busy weeknights or when you need a little extra comfort, 
           this classic soup is sure to become a favorite go-to recipe. Enjoy a bowlful of warmth and goodness that’s as 
           easy to make as it is to eat!
          </Text>

          <View style={styles.tagContainer}>
            <Text > Prep Time -- 60 Minutes </Text>
          </View>
          <View style={styles.tagContainer}>
            <Text > Cook Time -- 30 Minutes </Text>
          </View>
          <View style={styles.tagContainer}>
            <Text > Total Time -- 90 Minutes </Text>
          </View>
          <View style={styles.ingredientContainer}>
            <Text marginTop={5}> Ingredients </Text>
            <Text marginTop={10}> Bowtie pasta |  1 cup </Text>
            <Text > Chicken stock  |  4 cups </Text>
            <Text > Carrots  |  1/2 cup </Text>
            <Text > Rotisserie chicken |  Whole chicken </Text>
            <Text > Salt  |  to taste </Text>
            <Text > Black pepper  |  to taste </Text>
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