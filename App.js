
import React,{Component} from 'react';
import {StyleSheet,Text,View,array,Alert,TextInput,Icon,FlatList,Modal,TouchableOpacity} from 'react-native';

export default class App extends Component{
  constructor(props) {
      super(props);
      this.state={
        amount:0,
        discount:0,
        result:0,
        saved:0,
        error:"",
        modalVisible:false,
        savedVal:[],
      }
    };
  calculate=()=>{
    if(this.state.amount>0 &&this.state.discount>0){
    const n=(this.state.amount*this.state.discount)/100;
    this.setState({result:(this.state.amount-n).toFixed(2),saved:(n).toFixed(2)})
  }
  else{
    this.setState({error:'Please type possitive numbers'})
  }
  }
  save=()=>{
    const obj=this.state.savedVal.concat({
      originalP:this.state.amount,
      discountP:this.state.discount ,
      FinalP:this.state.result,
      id:Math.random().toString()
    });
    this.setState({ savedVal: obj })
  }
  renderItem=({item})=>{
  return(<View >
    <Text >{item.originalP}</Text>
    <Text >{item.discountP}</Text>
    <Text >{item.FinalP}</Text>
  </View>)
  }

  render(){
    return(
    <View style={styles.container}>
      <Modal 
          animationType="slide"
          transparent={true}
          visible={this.state.modalVisible}
        >
          <View style={styles.modalView}>
          <TouchableOpacity style={{width:40,height:40,alignSelf:'flex-end'}} onPress={() => {
            this.setState({ modalVisible:false});
          }}
    ><Text style={{backgroundColor:'#1F9DE7',color:'#D9F1FF',textAlign:'center',borderRadius:5,borderWidth:1,borderColor:"#D9F1FF",fontWeight:'bold'}}>X</Text></TouchableOpacity>
    <View>
          <FlatList style={{padding:30}}
          keyExtractor={(item,index)=>item.id}
          data={this.state.savedVal}
          renderItem={({ item }) => (<View>
          <Text style={styles.TF}>Original Price {item.originalP}</Text>
          <Text style={styles.TF}>Discount {item.discountP}</Text>
          <Text style={styles.TF}>Final Price {item.FinalP}</Text>
          <Text style={styles.TF}>*--------------------*</Text>
        </View>)}
      />
      </View>
          </View>
        </Modal>
      <Text style={styles.Head}>DISCOUNT CALCULATOR</Text>
      <TextInput 
      style={styles.input}
      keyboardType = 'numeric'
      placeholder="Price"
      onChangeText={(val)=> this.setState({amount:parseInt(val),saved:0,result:0})}
      />
      <TextInput 
      style={styles.input}
      keyboardType = 'numeric'
      placeholder="Discount"
      onChangeText={(val)=> this.setState({discount:parseInt(val),saved:0,result:0})}
      />
      <View>
      <Text>{this.state.error}</Text>
      <TouchableOpacity style={styles.calc} onPress={this.calculate}
    ><Text style={styles.btntxt}>calculate</Text></TouchableOpacity>
      </View>
      <TouchableOpacity
          style={styles.calc}
          onPress={() => {
            this.setState({ modalVisible:true });
          }}
        >
          <Text style={styles.btntxt}>History</Text>
        </TouchableOpacity>
    
        <TouchableOpacity style={styles.calc} onPress={this.save}
    ><Text style={styles.btntxt}>Save</Text></TouchableOpacity>
    
      <Text style={styles.saved}>Saved:{this.state.saved}</Text>
    <Text style={styles.result}>Final Price:{this.state.result}</Text>

    </View>
    );
  }
}
const styles = StyleSheet.create({
  container:{
    paddingTop:'50%',
    height:'100%',
    backgroundColor:"#D9F1FF",
    paddingBottom:30
  },
  modalContainer:{
    paddingTop:'30%',
    backgroundColor:"#D9F1FF",
    paddingBottom:30
  },
  modalView:{
    margin: 10,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 10,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  },
  Head:{
    textAlign:'center',
    fontSize:25,
    fontWeight:'bold',
    color:'#1F9DE7'
  },
  input:{
    borderColor:"#1F9DE7",
    borderWidth:1,
    width:'80%',
    alignSelf:"center",
    margin:10,
    padding:4,
    borderRadius:10,
  },
  calc:{
    borderWidth:2,
    borderColor:'grey',
    width:'60%',
    height:50,
    alignSelf:"center",
    margin:10,
    backgroundColor:'#1F9DE7',
    padding:4,
    borderRadius:10
  },
  btntxt:{
    textAlign:'center',color:'#D9F1FF',paddingTop:'4%'
  },
  saved:{
    textAlign:'center',
    fontSize:20,
    fontWeight:'bold',
    color:'#1F9DE7'
  },
  TF :{
    textAlign:'center',
    fontSize:20,
    fontWeight:'bold',
    color:'#1F9DE7'
  },
  result:{
    textAlign:'center',
    fontSize:25,
    fontWeight:'bold',
    color:'#1F9DE7'
  }
});
