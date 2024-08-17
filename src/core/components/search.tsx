import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { colors } from "@/src/core/constant/colors";
import SearchIcon from "@/src/core/assets/icons/search";
import { debounce } from "@/src/core/utils/redux";
import { useAppDispatch } from "@/src/core/hooks/redux";
import { setSearchText } from "@/src/features/gallery/slice/search";

interface SearchProps {
  onCancel?: () => void;
}

export default function Search(props: SearchProps) {
  const dispatch = useAppDispatch();
  const debouncedSearch = debounce((text: string) => {
    dispatch(setSearchText(text.toLowerCase()));
  }, 500);

  return (
    <View style={styles.container}>
      <View style={styles.searchBody}>
        <View style={styles.search}>
          <SearchIcon color="#80808075" />
          <TextInput
            onChangeText={debouncedSearch}
            style={styles.searchInput}
          />
        </View>
        <TouchableOpacity style={styles.cancelBody} onPress={props.onCancel}>
          <Text style={styles.cancel}>Cancel</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    height: 80,
    width: "100%",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  searchBody: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    marginTop: 25,
  },
  search: {
    flex: 1,
    backgroundColor: "#80808033",
    borderRadius: 20,
    flexDirection: "row",
    paddingHorizontal: 10,
    alignItems: "center",
    paddingVertical: 5,
  },
  searchInput: {
    flex: 1,
    paddingHorizontal: 5,
    color: colors.dark[900],
    fontSize: 15,
    fontWeight: "600",
  },
  cancelBody: {
    width: "15%",
    justifyContent: "center",
    alignItems: "flex-end",
  },
  cancel: {
    fontWeight: "bold",
    fontSize: 15,
    color: colors.success[500],
  },
});
