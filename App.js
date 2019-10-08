import React,{Component} from 'react';
import { Text, View, FlatList, Dimensions, Image, Linking } from 'react-native';
import {Divider, Card} from 'react-native-elements'
import {createAppContainer} from 'react-navigation'
import {createStackNavigator} from 'react-navigation-stack'

class App extends Component {
  constructor(props){
    super(props);
    this.state={
      data:[]
    }
    this.getNews=this.getNews.bind(this);
  }
 
 getNews= async () => {
   const res= await fetch('https://newsapi.org/v2/top-headlines?country=in&category=business&apiKey=e48f8e88bf084414ad242326fc1b4221');
   return await res.json();
 };
 
 componentDidMount(){
   this.getNews()
   .then((res)=>{
     this.setState({data:res.articles}); 
   })
 }
  render(){
    return (
      <View style={styles.container}>
        <FlatList
          data={this.state.data}
          // keyExtractor={(index)=>index.toString()}
          renderItem={({item})=>(
            <Card> 
            <View>
              <Text style={{ marginBottom: 10, fontWeight: "bold", fontSize: 24}}>
                {item.title}
              </Text>
              <Divider style={{ backgroundColor: '#dfe6e9' }} />
              <Text style={{ marginTop: 10, marginBottom: 10 }}>
                {item.description} 
              </Text>
              <Text style={{ color: "#4384FF" }} onPress={()=>{this.props.navigation.navigate('News',{news:item});}}>
                Read More
              </Text>
           </View>
          </Card>
          )}
        />
      </View>
    );
  }
  
}
const StackNavigator= createStackNavigator({
  Home:{screen:App},
  News:{screen:News}

})
export default createAppContainer(StackNavigator)

function News(props) {

  const {title,description,content,urlToImage,url}=props.navigation.getParam('news','Null')
  const win = Dimensions.get('window');

  var news = title.split(" - ",1);
  news = news[news.length-1];

  return(
    <View style={styles.container}>
      <Text style={{ margin: 10, fontWeight: "bold", fontSize: 24}}>
        {news}
      </Text>
      <Image style={{width: win.width , height: 200}} resizeMode={'contain'} source={{uri: urlToImage}}/>
      <Text style={{margin:10, fontSize: 16}}>
        {description}
      </Text>
      <Text style={{margin:10, fontSize: 16}}>
        {content}
      </Text>
      <Text style={{ margin:10, color: "#4384FF" }} onPress={ ()=>{ Linking.openURL(url)}}>Read Even More</Text>
    </View>
  )
}

const styles = {
  noteStyle: {
    margin: 5,
    fontStyle: 'italic',
    color: '#b2bec3',
    fontSize: 10
  },
  featuredTitleStyle: {
    marginHorizontal: 5,
    textShadowColor: '#00000f',
    textShadowOffset: { width: 3, height: 3 },
    textShadowRadius: 3
  }
};