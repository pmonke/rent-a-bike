
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

// Guided example rows (now 8)
export const exampleRows = [
  {date:'2024-05-20',season:2,holiday:0,weathersit:1,temp:28,humidity:60,windspeed:12,event:0,pred:550,tips:'Clear warm day boosts rentals.', actual:560},
  {date:'2024-12-24',season:4,holiday:1,weathersit:2,temp:5,humidity:72,windspeed:18,event:1,pred:200,tips:'Holiday & mist reduce demand.', actual:190},
  {date:'2024-09-10',season:3,holiday:0,weathersit:3,temp:18,humidity:80,windspeed:10,event:0,pred:320,tips:'Light rain expected, slight drop.', actual:300},
  {date:'2024-07-04',season:2,holiday:1,weathersit:1,temp:30,humidity:55,windspeed:14,event:1,pred:620,tips:'Independence Day spikes trips.', actual:650},
  {date:'2024-03-15',season:1,holiday:0,weathersit:2,temp:12,humidity:68,windspeed:20,event:0,pred:260,tips:'Early spring moderate demand.', actual:255},
  // added examples
  {date:'2024-10-05',season:3,holiday:0,weathersit:1,temp:20,humidity:58,windspeed:13,event:0,pred:400,tips:'Crisp fall weather increases rides.', actual:410},
  {date:'2024-06-01',season:2,holiday:0,weathersit:1,temp:26,humidity:50,windspeed:9,event:0,pred:570,tips:'Early summer sunshine peak demand.', actual:565},
  {date:'2024-11-25',season:4,holiday:1,weathersit:3,temp:7,humidity:85,windspeed:15,event:1,pred:180,tips:'Pre‑holiday rainy day dampens demand.', actual:170}
]

// Main task rows (unchanged)
export const taskRows = [
  {date:'2024-06-15',season:2,holiday:0,weathersit:1,temp:27,humidity:58,windspeed:11,event:0,pred:540,tips:'Warm & clear good demand.'},
  {date:'2024-11-01',season:4,holiday:0,weathersit:2,temp:9,humidity:70,windspeed:16,event:0,pred:230,tips:'Cool & mist moderate demand.'},
  {date:'2024-10-31',season:4,holiday:1,weathersit:3,temp:8,humidity:78,windspeed:17,event:1,pred:210,tips:'Halloween event but rain.'},
  {date:'2024-02-10',season:1,holiday:0,weathersit:3,temp:2,humidity:90,windspeed:22,event:0,pred:120,tips:'Cold & snow decreases trips.'},
  {date:'2024-08-20',season:2,holiday:0,weathersit:1,temp:29,humidity:60,windspeed:12,event:0,pred:580,tips:'Sunny summer high demand.'},
]
