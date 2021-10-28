/* eslint-disable prettier/prettier */
import React, {useState} from 'react';
import {View, StyleSheet, Text, Image} from 'react-native';
import {down} from '../assets';
import theme from '../theme';
import {Fonts} from '../utils/Fonts';
import SelectDropdown from 'react-native-select-dropdown';
const HeaderCenterComponent = ({data}) => {
  const countries = [
    {id: 0, name: 'Leaders'},
    {id: 0, name: 'Leaders'},
  ];
  return (
    <SelectDropdown
      rowStyle={styles.dropdown2RowStyle}
      rowTextStyle={styles.dropdown2RowTxtStyle}
      dropdownStyle={{width: '200%', marginTop: 0, borderRadius: 8}}
      buttonStyle={{height: 32, margin: 12, backgroundColor: 'white'}}
      buttonTextStyle={{fontSize:16,fontWeight:'700',color:theme.colors.gray,fontFamily:Fonts.DMBold}}
      renderDropdownIcon={() => {
        return <Image source={down} style={{width: 24, height: 24}} />;
      }}
      dropdownIconPosition={'right'}
      data={countries.map(item => item.name)}
      defaultButtonText={'Select Group'}
      onSelect={(selectedItem, index) => {
        console.log(selectedItem, index);
      }}
      buttonTextAfterSelection={(selectedItem, index) => {
        // text represented after item is selected
        // if data array is an array of objects then return selectedItem.property to render after item is selected
        return selectedItem;
      }}
      rowTextForSelection={(item, index) => {
        // text represented for each item in dropdown
        // if data array is an array of objects then return item.property to represent item in dropdown
        return item;
      }}
    />
  );
};
export default HeaderCenterComponent;
export const styles = StyleSheet.create({
  textStyle: {
    fontSize: 18,
    // backgroundColor:'red',
    // alignSelf:'center',
    fontFamily: Fonts.DMBold,
    color: theme.colors.textHeader,
  },
  dropdownsRow: {
    flexDirection: 'row',
    width: '100%',
    paddingHorizontal: '5%',
  },

  dropdown1BtnStyle: {
    flex: 1,
    height: 50,
    backgroundColor: '#FFF',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#444',
  },
  dropdown1BtnTxtStyle: {color: '#444', textAlign: 'left'},
  dropdown1DropdownStyle: {backgroundColor: '#EFEFEF'},
  dropdown1RowStyle: {
    backgroundColor: '#EFEFEF',
    borderBottomColor: '#C5C5C5',
  },
  dropdown1RowTxtStyle: {color: '#444', textAlign: 'left'},

  dropdown2BtnStyle: {
    flex: 1,
    height: 50,
    backgroundColor: '#FFF',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#444',
  },
  dropdown2BtnTxtStyle: {color: '#444', textAlign: 'left'},
  dropdown2DropdownStyle: {backgroundColor: '#EFEFEF'},
  dropdown2RowStyle: {
    backgroundColor: '#ffffff',
    borderBottomColor: 'white',
  },
  dropdown2RowTxtStyle: {
    color: '#5A6474',
    fontWeight: '700',
    fontSize: 18,
    fontFamily: Fonts.DMRegular,
    textAlign: 'left',
  },
});
