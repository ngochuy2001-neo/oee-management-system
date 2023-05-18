export function OEECalculator(availability, quality, performance) {

  if (availability < 0 || performance < 0 || quality < 0 || availability > 100 || performance > 100 || quality > 100) {
    throw new Error("Invalid parameter values. The parameters should be between 0 and 100.");
  }

  // Calculate OEE
  const oee = (availability * quality * performance) / 10000
  return Math.floor(oee);
}

export function statisticColor(oeescore) {
  if (oeescore >= 80){
    return ['#19d600','#38702f']
  }
  else if (oeescore >= 60){
    return ['#ede500', '#b5b372']
  }
  else{
    return ['#e03400', '#99695a']
  }
}