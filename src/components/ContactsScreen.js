import React, {Component} from 'react';
import { StyleSheet, Text, View, TextInput, ScrollView, Image, Alert, TouchableOpacity, Linking } from 'react-native';
import { v4 as uuidv4 } from 'uuid';

export class ContactScreen extends Component {

  constructor(props) {
    super(props)
    this.state = {
      contacts: [{name: "John Doe", email: "contact@example.com", phoneNumber: "+1 123 431 213", id: "1", imgUrl:'https://i.iheart.com/v3/re/new_assets/5d0763e1393f956adad9ae13'},
                 {name: "Michael Kors", email: "contact@example.com", phoneNumber: "+1 123 431 213", id: "2", imgUrl:'https://vignette.wikia.nocookie.net/thebiglebowski/images/7/7e/The_Dude.jpeg/revision/latest/scale-to-width-down/340?cb=20111216183045'},
                 {name: "Artur Martines", email: "contact@example.com", phoneNumber: "+1 123 431 213", id: "3", imgUrl:'https://cdnb.artstation.com/p/assets/images/images/009/105/013/large/leo-viti-dudeclean.jpg?1524043387'},
                 {name: "Maria Paola", email: "contact@example.com", phoneNumber: "+1 123 431 213", id: "4", imgUrl:'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQwBu8VpkbgNghQXi2HCDzZkbTHHjM-jvmtpg&usqp=CAU'},
                 {name: "Rob Kross", email: "contact@example.com", phoneNumber: "+1 123 431 213", id: "5", imgUrl:'https://product-image.juniqe-production.juniqe.com/media/catalog/product/cache/x800/133/5/133-5-101P.jpg'}],
      searchValue: "",
      screen: 'ContactScreen',
      name: "", email: "", phoneNumber: "", imgUrl:"",
      display: "none",
      isModalVisible: true,
      userToShowMore: {name: "", email: "", phoneNumber: "" , id: "", imgUrl:''}
    }
  }

  deleteContact = (id) => {
    let prevStateContacts = this.state.contacts
    prevStateContacts.forEach((element, index) => {
      if (element.id === id){
        prevStateContacts.splice(index, 1)
        this.setState({contacts: prevStateContacts});
      }
    });
  }

  clearNewContactInStore = () => {
    this.setState({name: "", email: "", phoneNumber: ""})
  }

  addContact = (data) => {

    if (data.name !== '' && data.email !== '' && data.phoneNumber !== '' && data.email.includes('@') && !/[^[0-9]/.test(data.phoneNumber)){
      let prevState = this.state
      prevState.contacts.push(data)
      this.setState({contacts: prevState});
      this.changeScreen('ContactScreen')
      this.clearNewContactInStore()
    } else {
      this.createInvalidInputAlert()
    }
  }

  changeScreen = (data) => {
    let prevState = this.state
    prevState.screen = data
    this.setState(prevState);
  }

  createDeleteContactAlert = (name, id) =>
    Alert.alert(
      // "Are you sure?",
      "Are you sure?",
      `You want to delete "${name}" contact`,
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        { text: "OK", onPress: () => {
          this.deleteContact(id);
          this.changeScreen('ContactScreen')}}
      ],
      { cancelable: false }
    );

  createInvalidInputAlert = () =>
    Alert.alert(
      "Incorrect input",
      "Please type correct data\n(Only numbers as phone number.\nEmail has to exist \"@\")",
      [
        { text: "OK"}
      ],
      { cancelable: false }
    );

  render(){
    if (this.state.screen === 'ContactScreen'){
      return (
        <View style={styles.container}>
          <View style={styles.input}>
            <TextInput placeholderTextColor={'#B5B5B5'} placeholder={'Search'}
              onChangeText={(text) => {
                this.setState({searchValue: text})
            }}/>
          </View>
          <ScrollView style={styles.contactsList}>
            {this.state.contacts.map((contact, index) => {
              if (contact.name.toLowerCase().includes(this.state.searchValue.toLowerCase())){
                return (
                  <TouchableOpacity key={index}
                    onPress={() => {
                      this.changeScreen('ShowMore')
                      this.setState({userToShowMore: contact})
                    }}
                  >
                    <View style={styles.contactBlock}>
                      <View style={styles.contactBlock__left}>
                        <Image source={require('../img/contactIcon.png')} style={styles.contactIcon}/>
                        <View style>
                          <Text style={styles.contactName}>{contact.name}</Text>
                          <Text style={styles.contactEmail}>{contact.email}</Text>
                        </View>
                      </View>
                      <View style={styles.iconsContainer}>
                      <TouchableOpacity id={contact.id}
                        onPress={() => {
                          this.createDeleteContactAlert(contact.name, contact.id)
                        }}
                      >
                        <Image source={require('../img/bin.png')} style={styles.deleteIcon}/>
                      </TouchableOpacity>
                        <Image source={require('../img/infoIcon.png')} style={styles.infoIcon}/>
                      </View>
                    </View>
                  </TouchableOpacity>
                )
              }
            })}
          </ScrollView>
          <View style={styles.addContact}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                this.changeScreen('AddContactScreen')
              }}
            >
              <Text style={styles.buttonText}>Add contact</Text>
            </TouchableOpacity>
          </View>

        </View>
      );
    } else if (this.state.screen === 'AddContactScreen'){
      return(
        <View style={styles.container}>
          <View style={styles.createContactContainer}>
            <View style={styles.input}>
              <TextInput placeholderTextColor={'#B5B5B5'} placeholder={'Name'} name='name'
                onChangeText={(text) => {
                  this.setState({name: text})
              }}/>
            </View>
            <View style={styles.input}>
              <TextInput placeholderTextColor={'#B5B5B5'} placeholder={'Phone number'} phoneNumber='phoneNumber'
                onChangeText={(text) => {
                  this.setState({phoneNumber: text})
              }}/>
            </View>
            <View style={styles.input}>
              <TextInput placeholderTextColor={'#B5B5B5'} placeholder={'Email'} email='email'
                onChangeText={(text) => {
                  this.setState({email: text})
              }}/>
            </View>
            <View style={styles.input}>
              <TextInput placeholderTextColor={'#B5B5B5'} placeholder={'Avatar url: (optional)'} email='imgUrl'
                onChangeText={(text) => {
                  this.setState({imgUrl: text})
              }}/>
            </View>
          </View>
          <View style={styles.buttonsContainer}>
            <TouchableOpacity
              style={styles.okButton}
              onPress={() => {
                this.addContact({name: this.state.name, 
                                 email: this.state.email,
                                 phoneNumber: this.state.phoneNumber,
                                 imgUrl: this.state.imgUrl,
                                 id: uuidv4()})
              }}
            >
              <Text style={styles.buttonText}>Ok</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.okButton}
              onPress={() => {
                this.changeScreen('ContactScreen')
              }}
            >
              <Text style={styles.buttonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      )
    } else if (this.state.screen === 'ShowMore'){
      let user = this.state.userToShowMore
      return (
        <View style={styles.container}>
          <TouchableOpacity style={styles.arrowContainer}
            onPress={() => {
              this.changeScreen('ContactScreen')
            }}
          >
            <Image source={require('../img/arrow.png')} style={styles.arrowIcon}/>
          </TouchableOpacity>
          <Image source={{uri: user.imgUrl}} style={styles.avatar}/>
          <View style={styles.contactInfo}>
            <View style={styles.contactInfo__container}>
              <Text style={styles.contact__header}>Name</Text>
              <Text style={styles.contact__data}>{user.name}</Text>
            </View>
            <View style={styles.contactInfo__container}>
              <Text style={styles.contact__header}>Phone number</Text>
              <Text style={styles.contact__data}>{user.phoneNumber}</Text>
            </View>
          </View>

          <View style={styles.buttonsContainer}>
            <TouchableOpacity
              style={styles.okButton}
              onPress={() => {
                Linking.openURL(`tel:${user.phoneNumber}`)
              }}
            >
              <Text style={styles.buttonText}>Call</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.okButton}
              onPress={() => {
                this.createDeleteContactAlert(user.name, user.id)
              }}
            >
              <Text style={styles.buttonText}>Delete</Text>
            </TouchableOpacity>
          </View>

        </View>

      )
    }
  }
}

export default ContactScreen

const styles = StyleSheet.create({
  invalidInputContainer:{
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: 30,
    marginTop: 30
  },
  createContactContainer:{
    width: "100%",
    padding: 10,
    display: "flex",
    marginBottom: 20,
    alignItems: "center"
  },
  container: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    height: "100%",
    position: "relative"
  },
  contactsList:{
    width: "100%",
    padding: 10,
    display: "flex",
    marginBottom: 20
  },
  contactName: {
    marginLeft: 10,
    color: "#1E1E1E",
    fontSize: 18,
    fontFamily: "Roboto",
    fontWeight: "bold"
  },
  contactEmail: {
    color: "#1E1E1E",
    fontSize: 16,
    fontFamily: "Roboto",
  },
  input: {
    width: "80%",
    height: 40,
    backgroundColor: "#fff",
    borderRadius: 30,
    marginBottom: 30,
    borderWidth: 2,
    borderColor: "#B5B5B5",
    display: "flex",
    justifyContent: "center",
    paddingLeft: 15,
  },
  contactBlock: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    height: 60,
    backgroundColor: "#DEEBFF",
    paddingLeft: 35,
    paddingRight: 15,
    marginBottom: 15
  },
  contactBlock__left: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  iconsContainer:{
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  contactIcon:{
    width: 30,
    height:30,
    marginRight: 15
  },
  infoIcon:{
    width: 20,
    height: 20,
    marginLeft: 35
  },
  deleteIcon:{
    width: 20,
    height:20,
  },
  arrowIcon:{
    marginLeft: 20,
    width: 30,
    height:30,
  },
  arrowContainer:{
    width: "100%",
    position: "absolute",
  },
  addContact:{
    width: "100%",
    height: 50,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 15
  },
  buttonsContainerCreate:{
    width: "75%",
    height: 50,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  buttonsContainer:{
    width: "75%",
    height: 50,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  button:{
    backgroundColor: "#387CF4",
    height: 50,
    width: 200,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 100,
  },
  okButton:{
    backgroundColor: "#387CF4",
    height: 50,
    width: 140,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 100,
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 27
  },
  avatar:{
    width: 130,
    height: 130,
    borderRadius: 100,
  },
  contactInfo:{
    width: "100%",
    padding: 30,
  },
  contactInfo__container:{
    width: "100%",
    display: "flex",
    borderBottomWidth: 2,
    borderBottomColor: "#DBDBDB",
    marginTop: 30
  },
  contact__header:{
    color: "#1E1E1E",
    fontSize: 14,
    fontWeight: "bold",
    fontFamily: "Roboto"
  },
  contact__data:{
    color: "#1E1E1E",
    fontSize: 20,
  },
});
