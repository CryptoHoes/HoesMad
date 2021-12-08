import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { Text, TouchableOpacity, View, Button, Alert } from 'react-native';
import { GameEngine } from 'react-native-game-engine';
import entities from './entities';
import Physics from './physics';
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import WalletConnectClient from "@walletconnect/client";


// const client = await WalletConnectClient.init({
//   controller: true,
//   relayProvider: "wss://relay.walletconnect.com",
//   metadata: {
//     name: "Test Wallet",
//     description: "Test Wallet",
//     url: "#",
//     icons: ["https://walletconnect.com/walletconnect-logo.png"],
//   },
//   storageOptions: {
//     asyncStorage: AsyncStorage,
//   },
// });


// Web3 Tests
// import WalletConnectProvider, { useWalletConnect } from "react-native-walletconnect";

// const sdk = require('api')('@opensea/v1.0#112zk61okwurz1i6');


// function getNfts(){
//   sdk['getting-assets']({order_direction: 'desc', offset: '0', limit: '5'})
//   .then(res => console.log(res))
//   .catch(err => console.error(err));
// }

// const WalletConnectExample = () => {
//   const {
//     createSession,
//     killSession,
//     session,
//     signTransaction,
//   } = useWalletConnect();
//   const hasWallet = !!session.length;
//   return (
//     <>
//       {!hasWallet && (
//         <View>
//            <Text style={{ textAlign: 'center', fontSize: 40, fontWeight: 'bold', margin: 40 }}>No Hoes :(</Text>
//            {alert('This app is built with React Native, Wallet Connect, and Our native Binance Smart Chain Token. We are in a testing beta, if you have issues please notify us at CryptoHoesDev@gmail.com')}
//            <Button 
//         title="Connect" 
//         onPress={createSession} 
//         style={{ justifyContent:'center' }}
//         />
//         </View>
       
//       )}
//       {!!hasWallet && (
//         <Button
//           title="Sign Transaction"
//           onPress={() => signTransaction({
//             from: "0x788eEf4460Fc1e98e1ad648c9d190535012053EC",
//             to: "0xC76F08B7B723d3b0461cEc8206710cd12D71f2a2",
//             data: "0x",
//             gasPrice: "0x02540be400",
//             gas: "0x9c40",
//             value: "0x00", 
//             nonce: "0x0114",
//           })}
//         />
//       )}
//       {!!hasWallet && (
//         <View>
//         <Button
//           title="Disconnect"
//           onPress={killSession}
//         />

//         </View>
//       )}
//     </>
//   );
// };


export default function App() {
  
  const [running, setRunning] = useState(false)
  const [gameEngine, setGameEngine] = useState(null)
  const [currentPoints, setCurrentPoints] = useState(0)
  useEffect(() => {
    setRunning(false)
  }, [])
  return (
    <View style={{flex: 1, backgroundColor: '#fc7a85' }}>
    {currentPoints === 1 ?
        <Text style={{ textAlign: 'center', fontSize: 40, fontWeight: 'bold', margin: 30 }}>{currentPoints} Hoe</Text>
        : 
        <Text style={{ textAlign: 'center', fontSize: 40, fontWeight: 'bold', margin: 30 }}>{currentPoints} Hoes</Text>
        }
      <GameEngine
        ref={(ref) => { setGameEngine(ref) }}
        systems={[Physics]}
        entities={entities()}
        running={running}
        onEvent={(e) => {
          switch (e.type) {
            case 'game_over':
              setRunning(false)
              gameEngine.stop()
              break;
            case 'new_point':
              setCurrentPoints(currentPoints + 1)
              break;
          }
        }}
        style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}
      >
        <StatusBar style="auto" hidden={true} />
        
      </GameEngine>
      {!running ?
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            {currentPoints === 0 ? <Text style={{ textAlign: 'center', fontSize: 20, fontWeight: 'bold', margin: 35 }}>you have no hoes :(</Text> : null }
          <TouchableOpacity style={{ backgroundColor: 'black', paddingHorizontal: 30, paddingVertical: 10 }}
            onPress={() => {
              setCurrentPoints(0)
              setRunning(true)
              gameEngine.swap(entities())
            }}>
            <Text style={{ fontWeight: 'bold', color: 'white', fontSize: 30 }}>
              START GAME
            </Text>
            
          </TouchableOpacity>
        </View> : null}
      
        
    </View>
  );
}
