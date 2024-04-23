import { useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { useSharedValue } from 'react-native-reanimated';

import { styles } from './styles';

import { CARD_SIDE, CreditCard } from '@/components/credit-card';
import { Input } from '@/components/input';

export function Payment() {
  const [name, setName] = useState("")
  const [date, setDate] = useState("")
  const [code, setCode] = useState("")
  const [number, setNumber] = useState("")


  const cardSide = useSharedValue(CARD_SIDE.front)

  function showFrontCard() {
    cardSide.value = CARD_SIDE.front
  }

  function showBackCard() {
    cardSide.value = CARD_SIDE.back
  }

  function handleFlipCard() {
    //console.log(cardSide.value)

    if (cardSide.value === CARD_SIDE.front) {
      showBackCard()
    } else {
      showFrontCard()
    }
  }


  return (
    <View style={styles.container}>
      <CreditCard cardSide={cardSide} data={{
        name,
        number: number.replace(/(\d{4})(?=\d)/g, "$1 "),
        date,
        code,
      }} />

      <TouchableOpacity style={styles.button} onPress={handleFlipCard}>
        <Text >Inverter</Text>
      </TouchableOpacity>

      <View style={styles.input}>

        <Input
          placeholder='Nome do titular'
          onChangeText={setName}
          onFocus={showFrontCard}

        />

        <Input
          placeholder='Número do cartão'
          keyboardType='numeric'
          maxLength={16}
          onChangeText={setNumber}
          onFocus={showBackCard}
        />

        <View style={styles.inputInline}>
          <Input
            placeholder='10/32'
            maxLength={5}
            style={styles.inputSmall}
            onChangeText={setDate}
            onFocus={showBackCard}

          />

          <Input
            placeholder='CVV'
            keyboardType='numeric'
            maxLength={3} style={styles.inputSmall}
            onChangeText={setCode}
            onFocus={showBackCard}

          />
        </View>

      </View>
    </View>
  );
}
