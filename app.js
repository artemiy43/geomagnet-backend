const express = require('express');
var request = require("request");
var rp = require('request-promise');

const { PORT = 3000 } = process.env;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));



app.get('/', (req, res) => {
  //const { lat, lng, year, epoha } = req.body;
  const { year, epoha } = req.body;

  // for (let i = 0; i < 2;i++){
  //   for(let j = 0;j < 2;j++)
  //   {
      // request({
      //   uri: `https://www.geomagnet.ru/calc/?lat=1&lng=2&data=${year}.${epoha}&alt=0&h=4`,
      //   method: "GET"
      // }, function(error, response, body) {
      //   res.send(body);
      // });

      // rp(options)
      // .then(function (repos) {
      //     //console.log('User has %d repos', repos.length);
      //     res.send(repos);
      // })
      // .catch(function (err) {
      //     // API call failed...
      // });

      const arrlat = [];
      for(let j = 0;j < 2;j++)
      {
        arrlat[j] = j;
      }
      const arrlng = [];
      for(let j = 0;j < 2;j++)
      {
        arrlng[j] = j;
      }
      const mainarr = [];

      function pusharr(arr, a) {
        arr.push(a);
        //console.log(arr);
      }
      async function foo (arrlat, arrlng, mainarr) {
        //const mainarr = [];
        // for (i in arrlat)
        // {
        //   for (j in arrlng)
        //   {
        //     var options = {
        //       uri: `https://www.geomagnet.ru/calc/?lat=${i}&lng=${j}&data=${year}.${epoha}&alt=0&h=4`,
        //       method: "GET"
        //     };
        //     try {
        //       let a = await rp(options);
        //       // a contains your response data.
        //       //res.send(a);
        //       mainarr.push(a);
        //     }
        //     catch (e) {
        //       console.error(e)
        //     }
        //   }
        // }

        await Promise.all(arrlat.map(async (i) => {
          arrlng.map(async (j) => {
            var options = {
              uri: `https://www.geomagnet.ru/calc/?lat=${i}&lng=${j}&data=${year}.${epoha}&alt=0&h=4`,
              method: "GET"
            };
            let a = await rp(options);
              // a contains your response data.
              //res.send(a);
            //mainarr.push(a);
            pusharr(mainarr, a);
            //console.log(mainarr);
            //console.log(a);
          })
        }))
        .then((data)=>{
          // console.log(data);
          // console.log(mainarr);
          //res.send(mainarr);
        });
        res.send(mainarr);
     }
     foo(arrlat,arrlng, mainarr);
     //res.send(mainarr);
  //   }
  // }
  // request({
  //   uri: `https://www.geomagnet.ru/calc/?lat=${lat}&lng=${lng}&data=${year}.${epoha}&alt=0&h=4`,
  //   method: "GET"
  // }, function(error, response, body) {
  //   res.send(body);
  // });

});
// {
//   "lat": "0",
//   "lng": "0",
//   "year": "2020",
//   "epoha": "5"
// }
app.listen(PORT);
