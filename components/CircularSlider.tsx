import { View, Text, Image, Dimensions,FlatList} from 'react-native'
import React from 'react'
import Animated, { useAnimatedScrollHandler, useSharedValue } from 'react-native-reanimated'


const images = [
"https://images.unsplash.com/photo-1526512340740-9217d0159da9?q=80&w=2677&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://plus.unsplash.com/premium_photo-1675721844807-a3760e14353b?q=80&w=3687&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1512850183-6d7990f42385?q=80&w=3687&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1564754943164-e83c08469116?q=80&w=3687&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1530236668220-b9c6c098c9aa?q=80&w=3715&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1579099816874-e02eaf257e2a?q=80&w=3687&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1592402637866-1f38043cbd42?q=80&w=3715&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
]

const {width}= Dimensions.get('screen')
const _itemSize = width*0.26
const _spacing = 12;
function CarouselItem ({imageUri,index}:{imageUri:string,index:number}){
    return <View>
        <Image
        source={{uri:imageUri}}
        style={{width:_itemSize,height:_itemSize,borderRadius:_itemSize/2}}
        />
    </View>
}
const CircularSlider = () => {
  const scrollX = useSharedValue(0);
  const onScroll = useAnimatedScrollHandler(e=>{
    scrollX.value = e.contentOffset.x
  })
  return (
    <View style={{flex:1, justifyContent:"flex-end",}}>
      <Animated.FlatList
      style={{flexGrow:0,paddingBottom:_itemSize }}
      contentContainerStyle={{
        gap:_spacing,
        paddingHorizontal: (width-_itemSize)/2
      }}
      data={images}
      keyExtractor={(_,index)=>String(index)}
      renderItem={({item,index})=>{
        return <CarouselItem
         imageUri = {item}
         index = {index}
        />
      }}
      horizontal
      showsHorizontalScrollIndicator={false}
      //scrolling
      onScroll={onScroll}
      //scrollEventThrottle = {1000/60}~ 16ms
      scrollEventThrottle={16}
      snapToInterval={_itemSize+_spacing}
      decelerationRate={'fast'}
      
      />
    </View>
  )
}

export default CircularSlider