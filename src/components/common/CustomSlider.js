const CustomSlider = ({ value, onValueChange, minimumValue, maximumValue, step }) => {
    const [sliderWidth, setSliderWidth] = useState(0);
  
    const handleLayout = (event) => {
      setSliderWidth(event.nativeEvent.layout.width);
    };
  
    const handlePress = (event) => {
      const { locationX } = event.nativeEvent;
      const newValue = (locationX / sliderWidth) * (maximumValue - minimumValue) + minimumValue;
      const steppedValue = Math.round(newValue / step) * step;
      onValueChange(Math.max(minimumValue, Math.min(maximumValue, steppedValue)));
    };
  
    const fillWidth = ((value - minimumValue) / (maximumValue - minimumValue)) * 100;
  
    return (
      <TouchableWithoutFeedback onPress={handlePress}>
        <View style={styles.sliderContainer} onLayout={handleLayout}>
          <View style={styles.sliderTrack} />
          <View style={[styles.sliderFill, { width: `${fillWidth}%` }]} />
          <View style={[styles.sliderThumb, { left: `${fillWidth}%` }]} />
        </View>
      </TouchableWithoutFeedback>
    );
  };