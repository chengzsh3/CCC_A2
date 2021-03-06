// {#Author: Zhe Wang#}
// {#ID: 1064919#}
// {#Team 32#}

// function page(){
//    $.ajax({
//        url: "go_to_chart/",
//        type:"post",
//        async: false,
//        success: function(result){
//            alert(result);
//        }
//    })
// }


function startMap() {
    // this.visible=true
    var map = new google.maps.Map(document.getElementById('startMap'), {
        center: {lat: -37.8, lng: 144.9},
        zoom: 12,
        mapTypeControl: true,
        styles: mapStyle2,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        disableDefaultUI: true

    });
}
var res = {
    loader: $('<div />',{class:'loader'}),
    container: $('#startMap')
}


var sentiment = 5;
console.log(1)
$.ajax({
    url:'../get_sentiments/',
    methods:'get',
    headers:{ 'X-API-KEY': 'de9dECvvcd48CfEdvfDrgbtD'},
    async:false,
    data:{"year":""},
    beforeSend: function(){
        res.container.append(res.loader);
    },
    success: (data) =>{
        res.container.find(res.loader).remove();
        console.log(2);
        sentiment = data;
    }
})

var sentiment_crawl = JSON.parse(sentiment)

var hashtag = 5;
$.ajax({
    url:'../get_hashtags/',
    methods:'get',
    headers:{ 'X-API-KEY': 'de9dECvvcd48CfEdvfDrgbtD'},
    async:false,
    data:{"year":""},
    success: (data) =>{
        console.log(2);
        hashtag = data;
    }
})
var hashtag_crawl = JSON.parse(hashtag)

var sentiment2 = 5;
$.ajax({
    url:'../get_sentiments/',
    methods:'get',
    headers:{ 'X-API-KEY': 'de9dECvvcd48CfEdvfDrgbtD'},
    async:false,
    data:{"year":"2014"},
    success: (data) =>{
        console.log(2);
        sentiment2 = data;
    }
})
var sentiment_2014 = JSON.parse(sentiment2)
var sentiment3 = 5;
$.ajax({
    url:'../get_sentiments/',
    methods:'get',
    headers:{ 'X-API-KEY': 'de9dECvvcd48CfEdvfDrgbtD'},
    async:false,
    data:{"year":"2015"},
    success: (data) =>{
        console.log(2);
        sentiment3 = data;
    }
})
var sentiment_2015 = JSON.parse(sentiment3)

var sentiment4 = 5;
$.ajax({
    url:'../get_sentiments/',
    methods:'get',
    headers:{ 'X-API-KEY': 'de9dECvvcd48CfEdvfDrgbtD'},
    async:false,
    data:{"year":"2016"},
    success: (data) =>{
        console.log(2);
        sentiment4 = data;
    }
})
var sentiment_2016 = JSON.parse(sentiment4)

var sentiment5 = 5;
$.ajax({
    url:'../get_sentiments/',
    methods:'get',
    headers:{ 'X-API-KEY': 'de9dECvvcd48CfEdvfDrgbtD'},
    async:false,
    data:{"year":"2017"},
    success: (data) =>{
        console.log(2);
        sentiment5 = data;
    }
})
var sentiment_2017 = JSON.parse(sentiment5)

var sentiment6 = 5;
$.ajax({
    url:'../get_sentiments/',
    methods:'get',
    headers:{ 'X-API-KEY': 'de9dECvvcd48CfEdvfDrgbtD'},
    async:false,
    data:{"year":"2018"},
    success: (data) =>{
        console.log(2);
        sentiment6 = data;
    }
})
var sentiment_2018 = JSON.parse(sentiment6)
/////////////////////////////////////twitter map//////////////////////////////////////////////////////


function initMap(sentiment_data,hashtag_data) {
    map = new google.maps.Map(document.getElementById('startMap'), {
        center: {lat: -37.8, lng: 144.9},
        zoom: 12,
        styles: mapStyle2,
        mapTypeControl: false,

    });
    map.data.loadGeoJson('/static/JSON/vic_geo.json');
    map.data.setStyle((feature) => {
        let name = feature.getProperty('vic_loca_2')
        let total = 0

        // if (aurin[`${name}`]){
        //     if (aurin[`${name}`][`${'econ'}`][`${'unemployment_num'}`]){
        //         total = aurin[`${name}`][`${'econ'}`][`${'unemployment_num'}`]
        //     }
        // }
        if (sentiment_data[`${name}`]){
            if (sentiment_data[`${name}`][`${'1_percent'}`]){
                total= sentiment_data[`${name}`][`${'1_percent'}`]
            }
        }

        let color = '#0098ff08'
        if (total>0)
            color='#f4eef1'
        if (total>0.1)
            color='#efcdd2'
        if (total>0.2)
            color='#d88fa1'
        if (total>0.3)
            color='#b07599'
        if (total>0.4)
            color='#6a4b86'
        if (total>0.5)
            color='#413470'
        if (total>0.6)
            color='#2d2764'
        if (total>0.7)
            color='#1a1956'
        if(total>0.8)
            color='#0d0b39'
        if(total>0.9)
            color='#0d021c'






        return {
            fillColor: color,
            fillOpacity: 0.6,
            strokeWeight: 1,
            strokeColor:"white"
        }
    })




    var infowindow = new google.maps.InfoWindow({
        maxWidth: 500,
        maxHeight: 400
    });
    map.data.addListener('click', function(event) {
        // prepare data

        let name = event.feature.getProperty('vic_loca_2')
        let happyScore = 0

        if (sentiment_data[`${name}`]){
            if (sentiment_data[`${name}`][`${'1_percent'}`]){
                happyScore= sentiment_data[`${name}`][`${'1_percent'}`].toFixed(2)
                subname = name
            }
            else{
                happyScore = "no data"
            }
        }


        infowindow.setContent('<h5 class="font-weight-bold">'+ name +'</h5>'+'<p>Happy Score:'+happyScore+'</p>'+
            '<canvas id="myChart" width="20" height="20"></canvas>'+
            '<canvas id="myChart2" width="10" height="10"></canvas>'+
            '<canvas id="myChart3" width="10" height="10"></canvas>'+
            // '<button class="btn" onclick="happyTag(subname,Happydata)">Positive</button>'+
            // '<button class="btn" onclick="showneg(subname)">hide</button>'+
            '<style>' + 'h5{font-size:15px; text-align: center}'+
            '.btn{background-color: grey; color: white; height:30px;  width:100px; text-align: center; font-size: 15px; align-items: left;}'
            + '</style>')




        infowindow.setPosition(event.latLng)

        infowindow.open(map)
        console.log(document.getElementById('chart'))
    })


    // map.data.addListener('click', function(event) {
    //     test();
    // });
    map.data.addListener('click', function(event) {
        let name = event.feature.getProperty('vic_loca_2')
        if (sentiment_data[`${name}`]){
            subname = name;
            happyTag(subname,hashtag_data);
        }
    });

    map.data.addListener('click', function(event) {
        event.feature.setProperty('isColorful', true);
    });

// When the user hovers, tempt them to click by outlining the letters.
// Call revertStyle() to remove all overrides. This will use the style rules
// defined in the function passed to setStyle()
    map.data.addListener('mouseover', function(event) {
        map.data.revertStyle();
        map.data.overrideStyle(event.feature, {

            fillOpacity: 1,
            // fillColor: '#6e502b',
            strokeWeight: 1,
            // strokeColor: '#bf935a',
        });
    });

    map.data.addListener('mouseout', function(event) {
        map.data.revertStyle();
    });


}

function happyTag(name,hashdata) {

        var ctx = document.getElementById('myChart');
        var ctx2 = document.getElementById('myChart2');
        var ctx3 = document.getElementById('myChart3');


        var positive_color = ["#5d0937", "#8c0c52", "#cc3b8b", "#e47ab0", "#deb6cc"]
        var negative_color = ["#062735","#0c597b", "#0787bf", "#6abbde", "#b6ced8"]
        var taglist = hashdata[`${name}`][`${"1_hashtags_num"}`];
        var label = hashdata[`${name}`][`${"1_hashtags"}`];

        var top3tag = 0;
        var resultlist = [];
        var labellist = [];
        var color = [];
        var sumtag = hashdata[`${name}`][`${"1_sum"}`];

        if (taglist.length <= 4) {
            for (let i = 0; i < taglist.length; i++) {
                top3tag += taglist[i];
                resultlist.push(taglist[i]);
                labellist.push(label[i]);
                color.push(positive_color[i]);
            }
        }
        if (taglist.length > 4) {
            for (let i = 0; i < 5; i++) {
                top3tag += taglist[i];
                resultlist.push(taglist[i]);
                labellist.push(label[i]);
            }
            resultlist.push(sumtag - top3tag);
            labellist.push("other_p");
            color = ["#5d0937", "#8c0c52", "#cc3b8b", "#e47ab0", "#deb6cc"];
        }


        var myChart = new Chart(ctx2, {
            type: 'pie',
            options: {
                legend: {
                    display: false
                },
                title: {
                    display: true,
                    text: 'positive hashtag',
                },
            },
            data: {
                labels: labellist,
                datasets: [{
                    label: "(millions)",
                    backgroundColor: color,
                    data: resultlist,
                }]
            },
        });
        var taglist_n = hashdata[`${name}`][`${"-1_hashtags_num"}`];
        var label_n = hashdata[`${name}`][`${"-1_hashtags"}`];

        var top3tag_n = 0;
        var resultlist_n = [];
        var labellist_n = [];
        var color_n = [];
        var sumtag_n = hashdata[`${name}`][`${"-1_sum"}`];

        if (taglist_n.length <= 4) {
            for (let i = 0; i < taglist_n.length; i++) {
                top3tag_n += taglist_n[i];
                resultlist_n.push(taglist_n[i]);
                labellist_n.push(label_n[i]);
                color_n.push(negative_color[i]);
            }
        }
        if (taglist_n.length > 4) {
            for (let i = 0; i < 5; i++) {
                top3tag_n += taglist_n[i];
                resultlist_n.push(taglist_n[i]);
                labellist_n.push(label_n[i]);
            }
            resultlist_n.push(sumtag_n - top3tag_n);
            labellist_n.push("other_n");
            color_n = ["#062735","#0c597b", "#0787bf", "#6abbde", "#b6ced8"];
        }



        var myChart2 = new Chart(ctx3, {
            type: 'pie',
            options: {
                legend: {
                    display: false
                },
                title: {
                    display: true,
                    text: 'negative hashtag',
                }
            },
            data: {
                labels: labellist_n,
                datasets: [{
                    backgroundColor: color_n,
                    data: resultlist_n

                }]
            },
        });
        var sumtag_neg = hashdata[`${name}`][`${"-1_sum"}`];
        var sumtag_pos = hashdata[`${name}`][`${"1_sum"}`];
        var sumtag_0 = hashdata[`${name}`][`${"0_sum"}`];
        var myChart3 = new Chart(ctx, {
            type: 'pie',
            options: {
                legend: {
                    display: false
                },
                title: {
                    display: true,
                    text: 'sentiment distribution',
                }
            },
            data: {
                labels: ["neutral","negative","positive"],
                datasets: [{
                    label: "Population (millions)",
                    backgroundColor: ['#6710a7',"#6abbde","#e47ab0"],
                    data: [sumtag_0,sumtag_neg,sumtag_pos]
                }]
            },
        });

    }



// var can = document.createElement('canvas')
// can.id = "myChart"
// document.body.appendChild(can);








/////////////////////////////////////aurin map//////////////////////////////////////////////////////

function incomeMap(type) {
    map = new google.maps.Map(document.getElementById('startMap'), {
        center: {lat: -37.8, lng: 144.9},
        zoom: 12,
        styles: mapStyle2,
        mapTypeControl: false,

    });
    map.data.loadGeoJson('/static/JSON/vic_geo.json');
    map.data.setStyle((feature) => {
        let name = feature.getProperty('vic_loca_2')
        let total = 0

        // if (aurin[`${name}`]){
        //     if (aurin[`${name}`][`${'econ'}`][`${'unemployment_num'}`]){
        //         total = aurin[`${name}`][`${'econ'}`][`${'unemployment_num'}`]
        //     }
        // }
        // if (aurin[`${name}`]){
        //     if (aurin[`${name}`][`${type[0]}`]){
        //         total= aurin[`${name}`][`${type[0]}`]
        //     }
        // }
        if (aurin[`${name}`]){
            if (aurin[`${name}`][`${type[0]}`]){
                total= (1-aurin[`${name}`][`${type[0]}`]).toFixed(2)
            }
        }

        let color = '#0098ff08'
        if (total>0)
            color='#f4eef1'
        if (total>0.1)
            color='#efcdd2'
        if (total>0.2)
            color='#d88fa1'
        if (total>0.3)
            color='#b07599'
        if (total>0.4)
            color='#6a4b86'
        if (total>0.5)
            color='#413470'
        if (total>0.6)
            color='#2d2764'
        if (total>0.7)
            color='#1a1956'
        if(total>0.8)
            color='#0d0b39'
        if(total>0.9)
            color='#0d021c'


        //https://www.w3schools.com/colors/colors_picker.asp



        return {
            fillColor: color,
            fillOpacity: 0.6,
            strokeWeight: 1,
            strokeColor:"white"
        }
    })




    var infowindow = new google.maps.InfoWindow;
    map.data.addListener('click', function(event) {
        // prepare data

        let name = event.feature.getProperty('vic_loca_2')
        let unemploy = 0
        let score_name = 'Health Score:'
        if (aurin[`${name}`]){
            if (aurin[`${name}`][`${type[0]}`]){
                score= (1-aurin[`${name}`][`${type[0]}`]).toFixed(2)
                subname = name;
            }
        }
        if (type[1] == 1){
            score_name = 'Economy Score: '
        }

        infowindow.setContent('<h5 class="font-weight-bold">'+ name +'</h5>'+
            '<p>'+score_name +score+'</p>'+
            '<canvas id="barChart" ></canvas>'+
            // '<button class="btn" onclick="test()">unemployee</button>'+
            '<style>' + 'h5{font-size:15px; text-align: center}'+'.barChart{height: 85px; width: 170px}'
            + '</style>')




        infowindow.setPosition(event.latLng)

        infowindow.open(map)
        console.log(document.getElementById('chart'))
    })


    map.data.addListener('click', function(event) {
        let name = event.feature.getProperty('vic_loca_2')

        if (aurin[`${name}`]) {
            subname = name;

            if(type[1]==1){
            aurinChart(subname);
            }
            else{
                aurinChart2(subname)
            }
        }

    });


    map.data.addListener('click', function(event) {
        event.feature.setProperty('isColorful', true);
    });


    map.data.addListener('mouseover', function(event) {
        map.data.revertStyle();
        map.data.overrideStyle(event.feature, {

            fillOpacity: 1,
            // fillColor: '#6e502b',
            strokeWeight: 1,
            strokeColor: '#bf935a',
        });
    });

    map.data.addListener('mouseout', function(event) {
        map.data.revertStyle();
    });

    function aurinChart(name) {
        console.log(document.getElementById('barChart'))
        var ctx = document.getElementById('barChart');
        var eco_label = ["total_unemployed","non-school_qualification"]
        var eco_data = [aurin[`${name}`][`${'total_unemployed'}`], aurin[`${name}`][`${"non-school_qualification"}`]]
        var bar_color = ["#8c0c52","#cc3b8b"]
        var myBarChart = new Chart(ctx, {
            type: 'horizontalBar',
            data: {
                labels: eco_label,
                datasets: [{
                    // label: "Population (millions)",
                    backgroundColor: bar_color,
                    label: '# aurin economy data',
                    data: eco_data,
                }]
            },
        });
    }
    function aurinChart2(name) {
        console.log(document.getElementById('barChart'))
        var ctx = document.getElementById('barChart');
        var eco_label = ["death_number", "medical_expense"]
        var eco_data = [aurin[`${name}`][`${'death_number'}`], aurin[`${name}`][`${"medical_expense"}`]]
        var bar_color = ["#0c597b", "#6abbde"]
        var myBarChart = new Chart(ctx, {
            type: 'horizontalBar',
            data: {
                labels: eco_label,
                datasets: [{
                    // label: "Population (millions)",
                    backgroundColor: bar_color,
                    label: '# aurin health data',
                    data: eco_data,
                }]
            },
        });
    }

}


/////compare
function compareMap(){
    map = new google.maps.Map(document.getElementById('startMap'), {
        center: {lat: -37.8, lng: 144.9},
        zoom: 12,
        styles: mapStyle2,
        mapTypeControl: false,

    });
    map.data.loadGeoJson('/static/JSON/vic_geo.json');
    map.data.setStyle((feature) => {
        let name = feature.getProperty('vic_loca_2')
        let total = 0

        if (sentiment_2014[`${name}`] && sentiment_2015[`${name}`] &&
            sentiment_2016[`${name}`] &&sentiment_2017[`${name}`]
            && sentiment_2018[`${name}`]){
            if(sentiment_2014[`${name}`][`${'1_percent'}`] && sentiment_2015[`${name}`][`${'1_percent'}`] &&
                sentiment_2016[`${name}`][`${'1_percent'}`] &&sentiment_2017[`${name}`][`${'1_percent'}`]
            && sentiment_2018[`${name}`][`${'1_percent'}`]){
            total= ((sentiment_2014[`${name}`][`${'1_percent'}`]+sentiment_2015[`${name}`][`${'1_percent'}`]+
                sentiment_2016[`${name}`][`${'1_percent'}`]+sentiment_2017[`${name}`][`${'1_percent'}`]+sentiment_2018[`${name}`][`${'1_percent'}`])/5).toFixed(2)
        }
        }
        let color = '#0098ff08'
        if (total>0)
            color='#f4eef1'
        if (total>0.1)
            color='#efcdd2'
        if (total>0.2)
            color='#d88fa1'
        if (total>0.3)
            color='#b07599'
        if (total>0.4)
            color='#6a4b86'
        if (total>0.5)
            color='#413470'
        if (total>0.6)
            color='#2d2764'
        if (total>0.7)
            color='#1a1956'
        if(total>0.8)
            color='#0d0b39'
        if(total>0.9)
            color='#0d021c'

        return {
            fillColor: color,
            fillOpacity: 0.6,
            strokeWeight: 1,
            strokeColor:"white"
        }
    })
    var infowindow = new google.maps.InfoWindow;
    map.data.addListener('click', function(event) {
        // prepare data

        let name = event.feature.getProperty('vic_loca_2')
        let meanscore = 0

        if (sentiment_2014[`${name}`] && sentiment_2015[`${name}`] &&
            sentiment_2016[`${name}`] &&sentiment_2017[`${name}`]
            && sentiment_2018[`${name}`]){
            if(sentiment_2014[`${name}`][`${'1_percent'}`] && sentiment_2015[`${name}`][`${'1_percent'}`] &&
                sentiment_2016[`${name}`][`${'1_percent'}`] &&sentiment_2017[`${name}`][`${'1_percent'}`]
                && sentiment_2018[`${name}`][`${'1_percent'}`]){
            meanscore= ((sentiment_2014[`${name}`][`${'1_percent'}`]+sentiment_2015[`${name}`][`${'1_percent'}`]+
                sentiment_2016[`${name}`][`${'1_percent'}`]+sentiment_2017[`${name}`][`${'1_percent'}`]+sentiment_2018[`${name}`][`${'1_percent'}`])/5).toFixed(2)
            subname = name;}
        }
        let alert = ""
        if(!death[`${name}`]) {
            alert = "Sorry... aurin data missing : ("
        }

        infowindow.setContent('<h5 class="font-weight-bold">'+ name +'</h5>'+
            '<p>Average Happy Score: ' +meanscore+'</p>'+
            '<p>'+alert+'</p>'+
            '<canvas id="lineChart" ></canvas>'+
            '<style>' + 'h5{font-size:15px; text-align: center}'+'.barChart{height: 85px; width: 170px}'
            + '</style>')

        infowindow.setPosition(event.latLng)
        infowindow.open(map)

})
    map.data.addListener('click', function(event) {
        let name = event.feature.getProperty('vic_loca_2')

        if (sentiment_2014[`${name}`]) {
            subname = name;
            if(death[`${name}`]){
                lineChart(subname);
            }
            else{
                lineChart2(subname)
            }
        }

    });


    map.data.addListener('click', function(event) {
        event.feature.setProperty('isColorful', true);
    });

    map.data.addListener('mouseover', function(event) {
        map.data.revertStyle();
        map.data.overrideStyle(event.feature, {

            fillOpacity: 1,
            // fillColor: '#6e502b',
            strokeWeight: 1,
            strokeColor: '#bf935a',
        });
    });
    map.data.addListener('mouseout', function(event) {
        map.data.revertStyle();
    });

    function lineChart(name) {
        console.log(document.getElementById('lineChart'))
        var ctx = document.getElementById('lineChart').getContext("2d");
        var year_label = [2014,2015,2016,2017,2018];
        var year_data = [sentiment_2014[`${name}`][`${'1_percent'}`], sentiment_2015[`${name}`][`${'1_percent'}`],
            sentiment_2016[`${name}`][`${'1_percent'}`], sentiment_2017[`${name}`][`${'1_percent'}`], sentiment_2018[`${name}`][`${'1_percent'}`]]
        var health_data = [0,0];
        if(death[`${name}`]){
            health_data = [death[`${name}`][`${'death_2014'}`],death[`${name}`][`${'death_2015'}`]]
            console.log(death[`${name}`][`${'death_2014'}`])
        }
        var myLineChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: year_label,
                datasets: [{
                    fillColor: "rgba(151,187,205,0.2)",
                    strokeColor: "rgba(151,187,205,1)",
                    backgroundColor: "#6fabfa82",
                    borderColor: "#007bff99",
                    pointColor: "rgba(151,187,205,1)",
                    pointStrokeColor: "#fff",
                    pointHighlightFill: "#fff",
                    pointHighlightStroke: "rgba(151,187,205,1)",
                    label: 'happy score #tweets ',
                    data: year_data,
                },
                {
                    label: "health score #aurin",
                    backgroundColor: "#e91e637d",
                    borderColor: "#cc3c8b9c",
                    fillColor: "#cc3b8b",
                    strokeColor: "#cc3b8b",
                    pointColor: "#cc3b8b",
                    pointStrokeColor: "#fff",
                    pointHighlightFill: "#fff",
                    pointHighlightStroke: "rgba(220,220,220,1)",
                    data: health_data
                }]
            },
        });
    }
    function lineChart2(name) {
        console.log(document.getElementById('lineChart'))
        var ctx = document.getElementById('lineChart');
        var year_label = [2014,2015,2016,2017,2018];
        var year_data = [sentiment_2014[`${name}`][`${'1_percent'}`], sentiment_2015[`${name}`][`${'1_percent'}`],
            sentiment_2016[`${name}`][`${'1_percent'}`], sentiment_2017[`${name}`][`${'1_percent'}`], sentiment_2018[`${name}`][`${'1_percent'}`]]

        var myLineChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: year_label,
                datasets: [{
                    fillColor: "rgba(151,187,205,0.2)",
                    strokeColor: "rgba(151,187,205,1)",
                    backgroundColor: "#6fabfa82",
                    borderColor: "#007bff99",
                    pointColor: "rgba(151,187,205,1)",
                    pointStrokeColor: "#fff",
                    pointHighlightFill: "#fff",
                    pointHighlightStroke: "rgba(151,187,205,1)",
                    label: 'happy score #tweets ',
                    data: year_data,
                }]
            },
        });
    }
}

function auspolMap(){
    map = new google.maps.Map(document.getElementById('startMap'), {
        center: {lat: -37.8, lng: 144.9},
        zoom: 12,
        styles: mapStyle2,
        mapTypeControl: false,

    });
    map.data.loadGeoJson('/static/JSON/vic_geo.json');
    map.data.setStyle((feature) => {
        let name = feature.getProperty('vic_loca_2')
        let total = 0

        if (auspol[`${name}`]){

            total = auspol[`${name}`][`${"2014"}`][`${"auspol"}`]+
                auspol[`${name}`][`${"2015"}`][`${"auspol"}`]+
                auspol[`${name}`][`${"2016"}`][`${"auspol"}`]+
                auspol[`${name}`][`${"2017"}`][`${"auspol"}`]+
                auspol[`${name}`][`${"2017"}`][`${"auspol"}`]
        }
        let color = '#0098ff08'
        if (total==0)
            color='#f4eef1'
        if (total>0)
            color='#efcdd2'
        if (total>5)
            color='#d88fa1'
        if (total>10)
            color='#b07599'
        if (total>15)
            color='#6a4b86'
        if (total>20)
            color='#413470'
        if (total>25)
            color='#2d2764'
        if (total>30)
            color='#1a1956'
        if(total>35)
            color='#0d0b39'
        if(total>40)
            color='#0d021c'

        return {
            fillColor: color,
            fillOpacity: 0.6,
            strokeWeight: 1,
            strokeColor:"white"
        }
    })
    var infowindow = new google.maps.InfoWindow;
    map.data.addListener('click', function(event) {
        // prepare data

        let name = event.feature.getProperty('vic_loca_2')
        let auspoltweet = 0

        if (auspol[`${name}`]){
                auspoltweet = auspol[`${name}`][`${"2014"}`][`${"auspol"}`]+
                    auspol[`${name}`][`${"2015"}`][`${"auspol"}`]+
                    auspol[`${name}`][`${"2016"}`][`${"auspol"}`]+
                    auspol[`${name}`][`${"2017"}`][`${"auspol"}`]+
                    auspol[`${name}`][`${"2017"}`][`${"auspol"}`];
                subname = name;
        }
        var alert = "";
        if(!death[`${name}`]) {
            alert = "Sorry... aurin data missing : ("
        }

        infowindow.setContent('<h5 class="font-weight-bold">'+ name +'</h5>'+
            '<p>#Auspol Tweets: ' +auspoltweet+'</p>'+
            '<p>'+alert+'</p>'+
            '<canvas id="ausChart" ></canvas>'+
            '<style>' + 'h5{font-size:15px; text-align: center}'+'.barChart{height: 85px; width: 170px}'
            + '</style>')

        infowindow.setPosition(event.latLng)
        infowindow.open(map)

    })
    map.data.addListener('click', function(event) {
        let name = event.feature.getProperty('vic_loca_2')

        if (auspol[`${name}`]) {
            subname = name;

            if(death[`${name}`]){
            ausChart(subname);
            }
            else{
                ausChart2(subname)
            }
        }

    });


    map.data.addListener('click', function(event) {
        event.feature.setProperty('isColorful', true);
    });

    map.data.addListener('mouseover', function(event) {
        map.data.revertStyle();
        map.data.overrideStyle(event.feature, {

            fillOpacity: 1,
            // fillColor: '#6e502b',
            strokeWeight: 1,
            strokeColor: '#bf935a',
        });
    });
    map.data.addListener('mouseout', function(event) {
        map.data.revertStyle();
    });



    function ausChart(name) {
        console.log(document.getElementById('ausChart'))
        var ctx = document.getElementById('ausChart').getContext("2d");
        var year_label = [2014,2015,2016,2017,2018];

        var year_data = [auspol[`${name}`][`${'2014'}`][`${'auspol_1_percent'}`]/100,
            auspol[`${name}`][`${'2015'}`][`${'auspol_1_percent'}`]/100,auspol[`${name}`][`${'2016'}`][`${'auspol_1_percent'}`]/100,
            auspol[`${name}`][`${'2017'}`][`${'auspol_1_percent'}`]/100,auspol[`${name}`][`${'2018'}`][`${'auspol_1_percent'}`]/100]
        var health_data = [0,0];
        if(death[`${name}`]){
            health_data = [death[`${name}`][`${'death_2014'}`],death[`${name}`][`${'death_2015'}`]]
        }
        console.log(death[`${name}`][`${'death_2014'}`])
        var myLineChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: year_label,
                datasets: [{
                    fillColor: "rgba(151,187,205,0.2)",
                    strokeColor: "rgba(151,187,205,1)",
                    backgroundColor: "#6fabfa82",
                    borderColor: "#007bff99",
                    pointColor: "rgba(151,187,205,1)",
                    pointStrokeColor: "#fff",
                    pointHighlightFill: "#fff",
                    pointHighlightStroke: "rgba(151,187,205,1)",
                    label: ' positive #auspol from tweets',
                    data: year_data,
                },
                    {
                        label: "health score from aurin",
                        backgroundColor: "#e91e637d",
                        borderColor: "#cc3c8b9c",
                        fillColor: "#cc3b8b",
                        strokeColor: "#cc3b8b",
                        pointColor: "#cc3b8b",
                        pointStrokeColor: "#fff",
                        pointHighlightFill: "#fff",
                        pointHighlightStroke: "rgba(220,220,220,1)",
                        data: health_data
                    }]
            },
        });
    }
    function ausChart2(name) {
        console.log(document.getElementById('ausChart'))
        var ctx = document.getElementById('ausChart');
        var year_label = [2014,2015,2016,2017,2018];

        var year_data = [auspol[`${name}`][`${'2014'}`][`${'auspol_1_percent'}`]/100,
            auspol[`${name}`][`${'2015'}`][`${'auspol_1_percent'}`]/100,auspol[`${name}`][`${'2016'}`][`${'auspol_1_percent'}`]/100,
            auspol[`${name}`][`${'2017'}`][`${'auspol_1_percent'}`]/100,auspol[`${name}`][`${'2018'}`][`${'auspol_1_percent'}`]/100]

        var myLineChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: year_label,
                datasets: [{
                    fillColor: "rgba(151,187,205,0.2)",
                    strokeColor: "rgba(151,187,205,1)",
                    backgroundColor: "#6fabfa82",
                    borderColor: "#007bff99",
                    pointColor: "rgba(151,187,205,1)",
                    pointStrokeColor: "#fff",
                    pointHighlightFill: "#fff",
                    pointHighlightStroke: "rgba(151,187,205,1)",
                    label: ' positive #auspol from tweets',
                    data: year_data,
                }
                    ]
            },
        });
    }
}