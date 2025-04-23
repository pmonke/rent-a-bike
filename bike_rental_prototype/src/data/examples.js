export const mapping = {
  season: {1:'Spring',2:'Summer',3:'Fall',4:'Winter'},
  holiday: {0:'No',1:'Yes'},
  weathersit: {
    1:'Clear / Few Clouds / Partly Cloudy',
    2:'Mist / Cloudy',
    3:'Light Snow / Light Rain',
    4:'Heavy Rain / Snow / Fog'
  },
  event:{0:'No Special Event',1:'Special Event'}
}

export const exampleRows = [
  {date:'2024-05-20',season:2,holiday:0,weathersit:1,temp:28,humidity:60,windspeed:12,event:0,pred: 550, tips:'Clear warm day boosts rentals.'},
  {date:'2024-12-24',season:4,holiday:1,weathersit:2,temp:5,humidity:80,windspeed:18,event:1,pred: 200, tips:'Holiday & mist reduce demand.'},
  {date:'2024-09-10',season:3,holiday:0,weathersit:3,temp:18,humidity:70,windspeed:10,event:0,pred: 320, tips:'Light rain expected, slight drop.'},
  {date:'2024-07-04',season:2,holiday:1,weathersit:1,temp:30,humidity:55,windspeed:14,event:1,pred: 620, tips:'Independence day spikes trips.'},
  {date:'2024-03-15',season:1,holiday:0,weathersit:2,temp:12,humidity:65,windspeed:20,event:0,pred: 260, tips:'Early spring moderate demand.'},
]

export const taskRows = [
  {date:'2024-06-15',season:2,holiday:0,weathersit:1,temp:27,humidity:58,windspeed:11,event:0,pred: 540, tips:'Warm & clear good demand.'},
  {date:'2024-11-01',season:4,holiday:0,weathersit:2,temp:9,humidity:75,windspeed:16,event:0,pred: 230, tips:'Cool & mist moderate demand'},
  {date:'2024-10-31',season:4,holiday:1,weathersit:3,temp:8,humidity:85,windspeed:17,event:1,pred: 210, tips:'Halloween event but rain.'},
  {date:'2024-02-10',season:1,holiday:0,weathersit:3,temp:2,humidity:90,windspeed:22,event:0,pred: 120, tips:'Cold & snow decreases trips.'},
  {date:'2024-08-20',season:2,holiday:0,weathersit:1,temp:29,humidity:65,windspeed:12,event:0,pred: 580, tips:'Sunny summer high demand.'},
]