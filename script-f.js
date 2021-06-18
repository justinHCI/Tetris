//<!DOCTYPE html>
//<html>
//
//
//
//
//<script>
var timeline = [];
var mediaRecorder;
var ID = jsPsych.randomization.randomID(15);
var audioBlob;
var blobUrl;
var vid1 = ["vids/Tetris.mp4"];
var vid2 = ["vids/Tetris2.mp4"];
var started = false;
var clickedaway = false;

var audio = [
 "audio/Orla/number.mp3",
			"audio/Orla/fruit.mp3",
			"audio/Orla/bed.mp3",
			"audio/Orla/breakfast.mp3",
			"audio/Orla/red.mp3",
			 "audio/Orla/age.mp3",
			"audio/Orla/wolves.mp3",
			 "audio/Orla/icecream.mp3",
			 "audio/Orla/lastmonth.mp3",
			 "audio/Orla/siblings.mp3",
			 "audio/Orla/movie.mp3",
			 "audio/Orla/name.mp3",
			 "audio/Orla/paris.mp3",
			 "audio/Orla/pets.mp3",
			 "audio/Orla/right.mp3",
			 "audio/Orla/grey.mp3",
			 "audio/Orla/weather.mp3",
			 "audio/Orla/tacos.mp3"
			];


var demo = `<div class='demographics'>
    <h1>Post-trial Questionnaire</h1>
    <div class='form'>
        <label for='age'>Age: </label>
        <input type='number' id='age' name='age' min='18' max='100' required>
    </div>
	<br>
    <div class='form'>
        <label for='gender'>Gender: </label>
        <select id='gender' name='gender_drop' required>
            <option disabled selected value> -- select an option -- </option>
            <option>Prefer not to say</option>
            <option>Male</option>
            <option>Female</option>
            <option>Non-binary</option>
        </select>
    </div>
	<br>
    <div class='form'>
        <label for='education'>What is the highest level of education completed? </label>
        <select id='education' name='education_drop' required>
            <option disabled selected value> -- select an option -- </option>
            <option>Prefer not to say</option>
            <option>Secondary or High School</option>
            <option>Vocational Qualification</option>
            <option>Bachelor's Degree</option>
            <option>Master's or Higher</option>
        </select>
    </div>
	<br>
	<div class='form'>
        <label for='tetris'>What is your level of experience with Tetris? </label>
        <select id='tetris' name='tetris_drop' required>
            <option disabled selected value> -- select an option -- </option>
            <option>I am not at all familiar with Tetris.</option>
            <option>I know how Tetris is played, but I have not played Tetris before.</option>
            <option>I have played Tetris before, but I don't play regularly. </option>
            <option>I regularly play Tetris.</option>
        </select>
    </div>

	 <br>
	
	 <div class='form' >
        <label for='stratLowTime'> For non-urgent trials, how did you decide when to deliver messages your partner? </label>
	
		<textarea id="stratLowTime" name= "stratLowTimeName" cols="100" rows="5" required></textarea></div>
		  <br>
	
	
	 <div class='form' >
        <label for='stratLowHow'> For non-urgent trials, how did you decide what to say to your partner? </label>
		<textarea id="stratLowHow" name="stratLowHowName" cols="100" rows="5" required></textarea></div>
		  <br><br>
		 
	<div class='form' >
        <label for='straHighTime'> For urgent trials, how did you decide when to deliver messages your partner? </label>
		<textarea id="stratHighTime" name="stratHighTimeName" cols="100" rows="5" required></textarea></div>
		  <br><br>
	
	
	 <div class='form' >
        <label for='stratHighHow'> For urgent trials, how did you decide what to say to your partner?</label>
		<textarea id="stratHighHow"  name="stratHighHowName" cols="100" rows="5" required> </textarea></div>
		  <br>
	
	 <div class='form' >
        <label for='other'>Do you have any other comments about your experience today? </label>
		<textarea id="other"  name="otherName" cols="100" rows="5" required> </textarea></div>
		  <br>
	
		 
		 
		 <div class='form'>
        <label for='partnerID'>I thought my partner I played the game with today was: </label>
        <select id='partnerID' name='partnerDrop' required>
            <option disabled selected value> -- select an option -- </option>
            <option>A person playing live</option>
			<option>A recording of a person</option>
            <option>A computer</option>
            <option>Not sure</option>
        </select>
    </div>

</div>`

var exclu = `
<div class='Exlusion'>
    <h1>Demographics Questionnaire</h1>
<div class='form'>
        <label for='native_speaker'>Are you a native speaker of English? </label>
        <select id='native_speaker' name='native_speaker' required>
            <option disabled selected value> -- select an option -- </option>
            <option>Yes</option>
            <option>No</option>
        </select>
    </div>
    <div class='form'>
        <label for='vision'>Do you have normal or corrected vision? </label>
        <select id='vision' name='normal_vision' required>
            <option disabled selected value> -- select an option -- </option>
            <option>Yes</option>
            <option>No</option>
        </select>
    </div>
    <div class='form'>
        <label for='hearing'>Do you have normal or corrected hearing? </label>
        <select id='hearing' name='normal_hearing' required>
            <option disabled selected value> -- select an option -- </option>
            <option>Yes</option>
            <option>No</option>
        </select>
    </div>
    <div class='form'>
        <label for='impairment'>Do you suffer from a diagnosed speech or cognitive impairment? </label>
        <select id='impairment' name='impairment_condition' required>
            <option disabled selected value> -- select an option -- </option>
            <option>Yes</option>
            <option>No</option>
        </select>
    </div>
`

var mictest = `<body>
    <H1>Microphone Testing</H1>
    <p>To take part in this experiment you will require a working microphone. Please test your voice using the record button to make sure that your microphone works.</p>
    <button onclick='record()' id='record'>Record</button>
    <button onclick='stop()' id='stop' disabled>Stop</button>
    <h2>Information Logs</h2>
    <div id='logs'></div>
    <h2>Recordings</h2>
    <div id='recordings'></div>

    <div>
        <p>Please make sure to listen to a few recordings before you press continue. Make sure that you can clearly hear your voice at a regular volume.</p> <button onclick='startExperiment()' id='start' disabled>Continue</button>
    </div>
`

var fullscreen  ={
			type: "fullscreen",
			fullscreen_mode: true
};

var praclow = {
			type: "tetris-video-keyboard-response",
			sources: vid2,
			width: 600,
			height: 600,
			start: 11.5,
			prompt: "ask partner name",
			condition: "PracLowOrla",
			urgency: "lowOrla",
			audio: audio[11],
			on_finish: function (data) {
				started = true;
				$(window).blur(function () {
					if (started) {
						clickedaway = true;
						};
					
        		});
			}
};

var videos = jsPsych.randomization.shuffle( [
		{source: vid1, start: 11.2},
		{source: vid1, start: 70.16}, 
		{source: vid1, start: 143.63},
		{source: vid1, start: 191.56},
		{source: vid1, start: 256.26},
		{source: vid1, start: 320.4}, 
		{source: vid1, start: 377}, 
		{source: vid1, start: 423.53},
		{source: vid2, start: 210.4},
		{source: vid2, start: 287.7}, 
		{source: vid2, start: 483.53},  
		{source: vid2, start: 546.83},
		{source: vid2, start: 635.37},
		{source: vid2, start: 691.9},
		{source: vid2, start: 761.03}, 
		{source: vid2, start: 885.7},  
	]);


var dialogues = jsPsych.randomization.shuffle( [
	{prompt: "ask partner which hand using", condition: "Q",  audio:  audio[14]},
	{prompt: "ask partner any pets", condition: "Q",  audio:  audio[13]},
	{prompt: "ask partner weather", condition: "Q",  audio:  audio[16]},
	{prompt: "ask partner bed time last night", condition: "Q",  audio:  audio[2]},
	{prompt: "ask partner age", condition: "S",  audio:  audio[5]},
	{prompt: "ask partner last series watched", condition: "S",  audio:  audio[6]},
	{prompt: "ask partner any siblings", condition: "S",  audio:  audio[9]},
	{prompt: "ask partner what dinner last night", condition: "S",  audio:  audio[17]},
	{prompt: "ask partner last movie watched", condition: "Q",  audio:  audio[10]},
	{prompt: "ask partner favorite ice cream flavour", condition: "Q",  audio: audio[7]},
	{prompt: "ask partner what breakfast this morning", condition: "Q",  audio:  audio[3]},
	{prompt: "ask partner been to paris", condition: "Q",  audio:  audio[12]},
	{prompt: "ask partner favorite fruit", condition: "S",  audio:  audio[1]},
	{prompt: "ask partner favorite color", condition: "S",  audio:  audio[4]},
	{prompt: "ask partner lucky number", condition: "S", audio:  audio[0]},
	{prompt: "ask partner keyboard color", condition: "S",  audio:  audio[15]}
	]);

var trial_num = 0;

var prachigh = {
			type: "tetris-video-keyboard-response",
			sources: vid2,
			width: 600,
			height: 600,
			start: 99.14,
			prompt: "ask partner if played last month",
			condition: "PracHigh",
			urgency: "high",
			audio: audio[8]
			  };


var urgencies = jsPsych.randomization.shuffle( [
	{urgency: "high"},{urgency: "high"},	{urgency: "high"},	{urgency: "high"},
	{urgency: "high"},	{urgency: "high"},	{urgency: "high"},	{urgency: "high"},
	{urgency: "low"},	{urgency: "low"},	{urgency: "low"},   {urgency: "low"},
	{urgency: "low"},	{urgency: "low"},	{urgency: "low"},	{urgency: "low"}
]);



var tetristrial = {
			type: "tetris-video-keyboard-response",
			sources: function() { 
				var vid = videos[trial_num]; 
				return vid.source;
						},
			width: 600,
			height: 600,
			start: function() { 
				var vid = videos[trial_num]; 
				return vid.start;
				},
			prompt: function() { 
				var dial = dialogues[trial_num]; 
				return dial.prompt;
				},
			condition: function() { 
				var dial = dialogues[trial_num]; 
				return dial.condition;
				},
			audio: function() { 
				var dial = dialogues[trial_num]; 
				return dial.audio;
				},
			urgency: function() { 
				var urg = urgencies[trial_num]; 
				return urg.urgency;
				},
			on_finish: function(){ trial_num+=1;
								 }
		};


var rating = {
	type: "html-keyboard-response",
	stimulus: "Please wait while your partner rates your communication.",
	choices: jsPsych.NO_KEYS,
	trial_duration: function () {return Math.random(1000)+2500}

};



var click_warning = {
	type: "external-html",
	url: 'clickwarning.html',
    cont_btn: "continue",
	force_refresh: true,
	execute_script: true
};
		
var if_node = {
    timeline: [click_warning],
    conditional_function: function(){
        // get the data from the previous trial,
        // and check which key was pressed
        if(clickedaway){
			clickedaway = false;
            return true;
        } else {
			clickedaway = false;
            return false;
        }
    }
};

	


var exptimeline = {
timeline: [tetristrial,rating,if_node ],	repetitions: 16
};

	
	


// sample function that might be used to check if a subject has given
// consent to participate.
var check_consent = function (elem) {
    if (document.getElementById('consent_checkbox1').checked && document.getElementById('consent_checkbox2').checked && document.getElementById('consent_checkbox3').checked) {
        return true;
    } else {
        alert("If you wish to participate, you must check all three boxes next to the statements of consent.");
        return false;
    }
    return false;
};

function showAlert(title, text) {
    html = `<div class = 'alert_holder'><div class = 'answer_display'>
  		<h1>${title}</h1>
  		<p>${text}</p>
  		<button id='alert_btn' onclick = 'contExp()' >I understand</button>
  	</div></div>`
//    $('body').append($(html));
	alert(html);
    console.log('blurred');
}
function contExp() {
    jsPsych.resumeExperiment();
    $('.alert_holder').remove();
}
var consent = {
    type: 'external-html',
    url: "consentform.html",
    cont_btn: "start",
    check_fn: check_consent
};




var debrief = {
    type: 'external-html',
    url: "debrief.html",
    cont_btn: "Okay",
	
	on_load: function () {
		prevent_leave = false;
		saveInfo('completion_code', ID);

		var results = jsPsych.data.get();
		var interaction = jsPsych.data.getInteractionData();
		var data = results.join(interaction);
		var name = ID + "_F"
		saveData(name, data.csv());
		
		   
       //DJR A bit of hacked together nonsense to get merged demographic data into CSV format
        var demographics = jsPsych.data.get().filter({trial_type: 'survey-html-form'}).values();
        var merged = $.extend({},JSON.parse(demographics[0].responses),JSON.parse(demographics[1].responses));
        var csv = "";
        var headers = "";
        var values = "";
        let keysAmount = Object.keys(merged).length;
        let keysCounter = 0;
        for (var key in merged){
            headers += key + (keysCounter+1 < keysAmount ? ',' : '\r\n' );
            keysCounter++;
        }
        keysCounter = 0       
        for (var key in merged){
            values += "\"" + merged[key] + "\"" + (keysCounter+1 < keysAmount ? ',' : '\r\n' );
            keysCounter++;
        }
        csv = headers + values;
        var name = ID + "_demographics";
        saveData(name,csv);
        var valueList = [ID].concat(Object.values(merged));
        appendDemographics(valueList);
	}
};

function appendDemographics(values){
    var xhr = new XMLHttpRequest();
    xhr.open('POST', 'append_data.php'); // 'write_data.php' is the path to the php file described above.
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify({
        filedata: values
    }));
}

var demographic = { // DEMOGRAPHICS FORM
    type: 'survey-html-form',
    preamble: "Thank you for taking part in the experiment today. We would now like you to complete the following questionnaire.",
    html: demo
};

var exclusion = { // DEMOGRAPHICS FORM
    type: 'survey-html-form',
    preamble: "Thank you for taking part in the experiment today. Before you begin, please answer the following demographic questions.",
    html: exclu
};

var infosheet = {
    type: 'external-html',
    url: 'infosheet.html',
    cont_btn: "continue",
	force_refresh: true,
	execute_script: true
};

var info2 = {
    type: 'external-html',
    url: 'info2.html',
    cont_btn: "continue",
	force_refresh: true,
	execute_script: true
};

var info3 = {
    type: 'external-html',
    url: 'info3.html',
    cont_btn: "continue",
	force_refresh: true,
	execute_script: true
};

var info4 = {
    type: 'external-html',
    url: 'info4.html',
    cont_btn: "continue",
	force_refresh: true,
	execute_script: true
};

var info5 = {
    type: 'external-html',
    url: 'info5.html',
    cont_btn: "continue",
	force_refresh: true,
	execute_script: true
};

var info6 = {
    type: 'external-html',
    url: 'info6.html',
    cont_btn: "continue",
	force_refresh: true,
	execute_script: true
};

var prepractice = {
	type: 'external-html',
	url: 'prepractice.html',
    cont_btn: "continue"
};

var midpractice = {
	type: 'external-html',
	url: 'midpractice.html',
    cont_btn: "continue"
};

var postpractice = {
	type: 'external-html',
	url: 'postpractice.html',
    cont_btn: "continue"
};

var postrial = {
    type: 'external-html',
    url: 'postrial.html',
    cont_btn: "continue"
};

var rating = {
	type: "html-keyboard-response",
	stimulus: "Please wait while your partner rates your communication.",
	choices: jsPsych.NO_KEYS,
	trial_duration : function() { return Math.random(800)+2600},
	force_refresh: true,
	execute_script: true
};



var paymenthtml = ` <div class = 'payment code'
	 <p>Please enter your completion code in MTurk to confirm your participation. Your unique completion code is:</p>
    <p class='larger'>${ID}</p>
    <p>You are reminded that all the data has been de-identified. Should you wish to access data relevant to your participation you will be required to use the unique completion code provided.</p>
    <p> If you require any information regarding this study, or your participation in it, please contact:</p>
    <p>
    	Justin Edwards <a href='mailto: ucd.ics.research@gmail.com'>(ucd.ics.research@gmail.com)</a><br>
    </p>
    <p>Thank you once again, the time and effort you have taken to participate in this study is greatly appreciated.</p>
</div>`


var payment = {
	type: 'html-keyboard-response',
	stimulus: paymenthtml,
	choices: jsPsych.NO_KEYS
};




//timeline.push( infosheet,info2, consent, fullscreen, exclusion, info3, info4, info5, info6, prepractice, praclow, rating, midpractice, prachigh, rating, postpractice, exptimeline, postrial, demographic, debrief, payment);
timeline.push( praclow, rating, midpractice, prachigh, rating, postpractice, exptimeline, postrial, demographic, debrief, payment);
//timeline.push(consent, exptimeline);




// Save completion code to IndexDB
function saveInfo(name, data){
  try {
  	localStorage.setItem(name, data);
    } catch (e) {
  	if (e == QUOTA_EXCEEDED_ERR) {
  	  alert('Storage limit exceeded');
  	}
  }
}

var reject_part = {
	timeline: [{
		type: 'html-keyboard-response',
		choices: jsPsych.NO_KEYS,
		stimulus: `Unfortunately you have not met the requirments for this experiment and are not eligible to participate.`
    }],
	conditional_function: function () {
		var data = jsPsych.data.get().filter({
			trial_type: 'survey-html-form'
		}).values()[0].responses;
		data = JSON.parse(data);

		if ((data.impairment_condition == 'Yes') || (data.normal_hearing == 'No') || (data.normal_vision == 'No') || ((data.native_speaker == 'No'))) {
			return true
		} else {
			return false
		}

	}
}

var prevent_leave = true;
window.onbeforeunload = function (e) {
	e = e || window.event;

	if (prevent_leave) {
		// Cancel the event
		e.preventDefault();
		e.returnValue = 'Your progress will not be saved if you leave the site. Are you sure you want to continue?';
	} else {
		delete e['returnValue'];
	}

};

// Check if experiment already completed
if (localStorage.getItem('completion_code')) {
  var completion_code = localStorage.getItem('completion_code');
  alert("You have already completed this experiment. Your completion code is: " + completion_code);
}

function saveData(name, data) {
    var xhr = new XMLHttpRequest();
    xhr.open('POST', 'write_data.php'); // 'write_data.php' is the path to the php file described above.
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify({
        filename: name,
        filedata: data
    }));
}

// Change demos questionnnaire depending on answers
function demoCheck() {
	// Add extra questions based on use of assistants
	$('#speech').change(function () {
		if (this.value != 'Never') {
			$('.optionals').removeClass('hidden');
		} else {
			$('.optionals').addClass('hidden');
		}
	});

	// Add textbox for 'other'
	$('#assistant').change(function () {
		if (this.value == 'Other') {
			$('#ass_holder').removeClass('hidden');
		} else {
			$('#ass_holder').addClass('hidden');
		}
	});

	$('#device').change(function () {
		if (this.value == 'Other') {
			$('#dev_holder').removeClass('hidden');
		} else {
			$('#dev_holder').addClass('hidden');
		}
	});

	$('#native').change(function () {
		if (this.value == 'No') {
			$('#english_holder').removeClass('hidden');
		} else {
			$('#english_holder').addClass('hidden');
		}
	});
}

function saveAudio(blob) {
    fetch('/upload.php', {
            method: "POST",
            body: blob
        })
        .then(response => {
            if (response.ok) return response;
            else throw Error('Server returned ${response.status}: ${response.statusText}')
        })
        .then(response => console.log(response.text()))
        .catch(err => {
            alert(err);
        });
}

function saveInfo(name, data) {
	try {
		localStorage.setItem(name, data);
	} catch (e) {
		if (e == QUOTA_EXCEEDED_ERR) {
			alert('Storage limit exceeded');
		}
	}
}

// Check if experiment already completed
if (localStorage.getItem('completion_code')) {
	var completion_code = localStorage.getItem('completion_code');
	alert("You have already completed this experiment. Your completion code is: " + completion_code);
}

function startExperiment() {
    jsPsych.init({
        exclusions: {
//            min_width: 800,
//            min_height: 800,
            audio: true
        },
        timeline: timeline,
//        preload_images: images,
		preload_audio: audio,
//		preload_video: "vids/Tetris.mp4",
        on_finish: function () {
            mediaRecorder.stop();
            jsPsych.data.get().addToAll({
                subject_id: ID
            });
//            saveData(ID, jsPsych.data.get().csv());
            //            saveData(ID, audioBlob);
            //            console.log(blobUrl);
            jsPsych.data.displayData();

        }
    });
};

//
//</script>
//
//</html>
