import React from 'react';
import { SearchBar as RNSearchBar } from '@rneui/themed';
import { View } from 'react-native';
import styles from './styles';

const SearchBar = ({ search, setSearch }) => {
  return (
    <View style={styles.view}>
      <RNSearchBar
        placeholder="Search Contacts..."
        onChangeText={setSearch}
        value={search}
        inputContainerStyle={styles.sbInputContainerStyle}
        containerStyle={styles.sbContainerStyle}
      />
    </View>
  );
};

export default SearchBar;
