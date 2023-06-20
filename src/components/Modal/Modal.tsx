import React, { useState } from "react";
import { View, Text, Modal, StyleSheet, Button } from "react-native";
import Icon from "react-native-vector-icons/EvilIcons";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import colors from "../../styles/colors";
import { closeModalActionCreator } from "../../redux/features/uiSlice/uiSlice";

const ModalComponent = (): JSX.Element => {
  const [modalVisible, setModalVisible] = useState(true);
  const text = useAppSelector((state) => state.uiActions.modalText);
  const dispatch = useAppDispatch();

  const closeModal = () => {
    setModalVisible(false);
    dispatch(closeModalActionCreator());
  };
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={closeModal}
      style={{ zIndex: 10 }}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Icon
            name="close"
            onPress={() => closeModal()}
            style={{ color: colors.dark, fontSize: 40, textAlign: "center" }}
          />
          <Text
            style={{
              fontFamily: "Roboto",
              fontSize: 23,
              textAlign: "center",
              color: colors.dark,
              paddingLeft: 10,
              paddingRight: 10,
            }}
          >
            {text}
          </Text>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: colors.main,
    borderRadius: 5,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: 20,
    paddingTop: 20,
    paddingBottom: 25,
    marginLeft: 10,
    marginRight: 10,
  },
});

export default ModalComponent;
