import { View, Text, Image, Dimensions,FlatList, StyleSheet} from 'react-native'
import React, { useState } from 'react'
import Animated, { FadeIn, FadeOut, interpolate, interpolateColor, runOnJS, SharedValue, useAnimatedScrollHandler, useAnimatedStyle, useSharedValue } from 'react-native-reanimated'


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
const _itemTotalSize = (_itemSize+_spacing)

function CarouselItem ({imageUri,index, scrollX}:{imageUri:string,index:number,scrollX:SharedValue<number>}){
   
  const stylez = useAnimatedStyle(()=>{
    return {
      borderWidth:4,
      borderColor:interpolateColor(
        scrollX.value,
        [index-1,index,index+1],
        ['transparent','white','transparent']
      ),
      transform:[{
        translateY:interpolate(scrollX.value,
          [index-1,index,index+1],
          [_itemSize/3,0,_itemSize/3]
        )
      }]
    }
  })
   
  return (
    <Animated.View style={[{
      width: _itemSize,
      height: _itemSize,
      borderRadius: _itemSize / 2 
    }, stylez]}>
      <Image
        source={{ uri: imageUri }}
        style={{ flex: 1, borderRadius: _itemSize / 2 }}
      />
    </Animated.View>
  );
  
}
const CircularSlider = () => {
  const scrollX = useSharedValue(0);
  const [ activeIndex, setActiveIndex]=useState( 0 )
  const onScroll = useAnimatedScrollHandler(e=>{
    scrollX.value = e.contentOffset.x/_itemTotalSize
    const newActiveIndex = Math.round(scrollX.value)

    if(activeIndex !== newActiveIndex){
     runOnJS(setActiveIndex)(newActiveIndex)

    }

  })
  return (
    <View style={{flex:1, justifyContent:"flex-end", backgroundColor:"black"}}>
      <View style={[StyleSheet.absoluteFillObject]}>
        <Animated.Image 
        entering={FadeIn.duration(300)}
        exiting={FadeOut.duration(300)}
        key={`image-${activeIndex}`}
        source={{uri:images[activeIndex]}}
        style={{flex:1}}
        /> 
        </View>
      <Animated.FlatList
      style={{flexGrow:0,height:_itemSize*2 }}
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
         scrollX = {scrollX}
        />
      }}
      horizontal
      showsHorizontalScrollIndicator={false}
      //scrolling
      onScroll={onScroll}
      //scrollEventThrottle = {1000/60}~ 16ms
      scrollEventThrottle={16}
      snapToInterval={_itemTotalSize}
      decelerationRate={'fast'}
      />
    </View>
  )
}

export default CircularSlider