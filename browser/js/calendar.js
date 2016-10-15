
	function init() {
		moment().format();
		scheduler.config.xml_date="%Y-%m-%d %H:%i";
		scheduler.config.first_hour = 7;
		scheduler.config.last_hour = 19;
		scheduler.init('scheduler_here',new Date(),"week");


		var user = {username: "pat"};

		// scheduler.load("./data/events.xml");



/*		var data = [ { name: 'ART 10100-3GJ',
    type: 'LEC (17190)',
    firstDate: 'We',
    secondDate: null,
    startTime: '6:15PM',
    endTime: '9:05PM',
    location: 'Comp Goeth CG236' },
  { name: 'CSC 11300-2B',
    type: 'LEC (58940)',
    firstDate: 'Tu',
    secondDate: null,
    startTime: '9:30AM',
    endTime: '10:45AM',
    location: 'Marshak 417N' },
  { name: 'CSC 21700-P2',
    type: 'LEC (34624)',
    firstDate: 'Tu',
    secondDate: 'Th',
    startTime: '2:00PM',
    endTime: '3:15PM',
    location: 'Marshak 1026' },
  { name: 'CSC 22000-M',
    type: 'LEC (34595)',
    firstDate: 'Tu',
    secondDate: 'Th',
    startTime: '11:00AM',
    endTime: '12:15PM',
    location: 'NAC 4/222' },
  { name: 'CSC 22100-R',
    type: 'LEC (34597)',
    firstDate: 'Tu',
    secondDate: 'Th',
    startTime: '3:30PM',
    endTime: '4:45PM',
    location: 'NAC 6/314' } ];*/

	var pastedText;
	// unsynced schedule
	var mySpecificSchedule;
	$('#submit').click(function(evt){
		var txt = $('#class-text').val();
		pastedText = txt;
		evt.preventDefault();

		var arr = pastedText.split('\n');

		var newArr = [];
		var tempObj = {};
		arr.forEach(function(element,idx){
			var lineType = idx % 5;
			switch (lineType){
				case 0:
					break;
				case 1:
					tempObj.name = element;
					break;
				case 2:
					tempObj.type = element;
					break;
				case 3:
					var timeArr = element.split(' ');
					if (timeArr[0].length === 2){
						tempObj.firstDate = timeArr[0];
						tempObj.secondDate = null;
					} else {
						tempObj.firstDate = timeArr[0].substring(0,2);
						tempObj.secondDate = timeArr[0].substring(2,4);
					}
					tempObj.startTime = timeArr[1];
					tempObj.endTime = timeArr[3];
					break;
				case 4:
					tempObj.location = element;
					newArr.push(tempObj);
					tempObj = {};
			}
			});
			console.log("**********", newArr);
			newArr.forEach(function (classObj) {
				console.log(classObj);
				// $.post("/api/user/class", classObj)
			})
			updateSchedule(newArr, true);
			mySpecificSchedule  = newArr;

			//SOCKET LOGIC BELOW
	var socket = io();
	var roomcode = parseInt(Math.random()*100);
	// var nickname = parseInt(Math.random()*100);
	$('#rooms').val(roomcode);
	// SOCKETIO
	var combinedSchedule;
	$('#create').click(function(evt){
		var nickname = $('#nickname').val();
		evt.preventDefault();
		console.log(mySpecificSchedule);
		socket.emit('create',nickname, roomcode,mySpecificSchedule);
	});
	$('#join').click(function(evt){
		var nickname = $('#nickname').val();
		var roomcode = $('#code').val();
		evt.preventDefault();

		socket.emit('join',nickname, roomcode,mySpecificSchedule);
	});

	socket.on('update schedule',function(users, schedule){
		scheduler.clearAll();
		updateSchedule(schedule, false);
		$('#chat-box-div').show();
	});

	socket.on('chat message', function(chatSender, msg){
		$('#messages').append($('<li>').text(chatSender+' : '+msg));
		$('#messages-div').scrollTop($('#messages').height());
		// $('#messages').animate({scrollTop: ''+$('#messages li').height()});
	});

	$('#chat-input').submit(function(){
		socket.emit('chat message', $('#msg').val());
		$('#msg').val('');
		return false;
	});
	});



	function parsingDataObj(data) {
		var allTheColors = ["red","blue","green","orange","purple","brown","gold","fuchsia","gray"];
		data.forEach(function(evt,idx){
			// console.log(evt.name+" :   "+allTheColors[idx]);
			evt.color = allTheColors[idx];
		});

		for (var i=-1;i<30;i++){
			data.forEach(function(evt){
				var startTime = getNextDayOfWeek(evt.firstDate,i);
				var endTime = startTime;
				var start = startTime+" "+convertTime(evt.startTime);
				var end = endTime+" "+convertTime(evt.endTime);
				scheduler.addEvent({
				    start_date: start,
				    end_date:   end,
				    text:   evt.name+"\n"+evt.location+"\n",
						color: evt.color
				});
				if (evt.secondDate !== null){
						var startTime = getNextDayOfWeek(evt.secondDate,i);
						var endTime = startTime;
						var start = startTime+" "+convertTime(evt.startTime);
						var end = endTime+" "+convertTime(evt.endTime);
						scheduler.addEvent({
							start_date: start,
					    end_date:   end,
					    text:   evt.name+"\n"+evt.location+"\n",
							color: evt.color
						});
				}

			});
		}
	}

/*	$.ajax({
     url: "/api/user/current",
     success: function(user) {
         console.log(user, "((()#($)()#()");
     }
  });*/

	$.get('/api/user/classes')
	.done(function (obj) {
		console.log("OBJ",obj);
		parsingDataObj(obj.classes);
	})


/*	$.get('/api/user/current')
    .done(function (user) {
        console.log(user, "((()#($)()#()");
    })
    .fail(function () {
        console.log("didn't work");
    })
*/
	// Converting time with am/pm to 24 hour time
	// var allEvents = scheduler.getEvents();
	// allEvents.forEach(function(event){
	// 	console.log(event);
	// });

	}

	function updateSchedule(theObject, isRandomColor){
    var allTheColors;
    if (isRandomColor){
      allTheColors = ["red","blue","green","orange","purple","brown","gold","fuchsia","gray"];
  		theObject.forEach(function(evt,idx){
  			// console.log(evt.name+" :   "+allTheColors[idx]);
  			evt.color = allTheColors[idx];
  		});
    }

		for (var i=-1;i<30;i++){
			theObject.forEach(function(evt){
				var startTime = getNextDayOfWeek(evt.firstDate,i);
				var endTime = startTime;
				var start = startTime+" "+convertTime(evt.startTime);
				var end = endTime+" "+convertTime(evt.endTime);

				scheduler.addEvent({
				    start_date: start,
				    end_date:   end,
				    text:   evt.name+"\n"+evt.location+"\n",
						color: evt.color
				});
				if (evt.secondDate !== null){
						var startTime = getNextDayOfWeek(evt.secondDate,i);
						var endTime = startTime;
						var start = startTime+" "+convertTime(evt.startTime);
						var end = endTime+" "+convertTime(evt.endTime);
						scheduler.addEvent({
							start_date: start,
					    end_date:   end,
					    text:   evt.name+"\n"+evt.location+"\n",
							color: evt.color
						});
				}

			});
	}
}

	function convertTime(time){
		var momentObj = moment(time, ["h:mm A"]);
		return momentObj.format("HH:mm");
	}

	function getNextDayOfWeek(dayOfWeekStr, mult) {
		var dayOfWeek;
		var date = new Date();
		switch (dayOfWeekStr) {
			case "Mo":
								dayOfWeek = 1;
			break;
			case "Tu":
								dayOfWeek = 2;
			break;
			case "We":
								dayOfWeek = 3;
			break;
			case "Th":
								dayOfWeek = 4;
			break;
			case "Fr":
								dayOfWeek = 5;
			break;

			default:
			break;

		}



    var resultDate = new Date(date.getTime());

    resultDate.setDate(date.getDate() + (7 + dayOfWeek - date.getDay()) % 7 +(7*mult));
		// console.log(resultDate);

		resultDate = resultDate.toLocaleString().split(',')[0];
		var resultDate = resultDate.split('/');
		var month  = resultDate[0];
		var date = resultDate[1];
		var year = resultDate[2];
		var finalDate = date+"/"+month+"/"+year;
    return finalDate;
}
