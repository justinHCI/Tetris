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

var audio = [];
var orlaaaudio = ["audio/Orla/1984.mp3",
			"audio/Orla/bananas.mp3",
			"audio/Orla/bed.mp3",
			"audio/Orla/breakfast.mp3",
			"audio/Orla/color.mp3",
			 "audio/Orla/down.mp3",
			"audio/Orla/enter.mp3",
			 "audio/Orla/icecream.mp3",
			 "audio/Orla/lastmonth.mp3",
			 "audio/Orla/lines.mp3",
			 "audio/Orla/movie.mp3",
			 "audio/Orla/name.mp3",
			 "audio/Orla/paris.mp3",
			 "audio/Orla/pets.mp3",
			 "audio/Orla/right.mp3",
			 "audio/Orla/Tetris.mp3",
			 "audio/Orla/weather.mp3",
			 "audio/Orla/well.mp3"
			];
var setupaudio = function (){
	
	var orlaaaudio = ["audio/Orla/1984.mp3",
			"audio/Orla/bananas.mp3",
			"audio/Orla/bed.mp3",
			"audio/Orla/breakfast.mp3",
			"audio/Orla/color.mp3",
			 "audio/Orla/down.mp3",
			"audio/Orla/enter.mp3",
			 "audio/Orla/icecream.mp3",
			 "audio/Orla/lastmonth.mp3",
			 "audio/Orla/lines.mp3",
			 "audio/Orla/movie.mp3",
			 "audio/Orla/name.mp3",
			 "audio/Orla/paris.mp3",
			 "audio/Orla/pets.mp3",
			 "audio/Orla/right.mp3",
			 "audio/Orla/Tetris.mp3",
			 "audio/Orla/weather.mp3",
			 "audio/Orla/well.mp3"
			];
var diegoaudio = ["audio/Diego/1984.mp3",
			"audio/Diego/bananas.mp3",
			"audio/Diego/bed.mp3",
			"audio/Diego/breakfast.mp3",
			"audio/Diego/color.mp3",
			 "audio/Diego/down.mp3",
			"audio/Diego/enter.mp3",
			 "audio/Diego/icecream.mp3",
			 "audio/Diego/lastmonth.mp3",
			 "audio/Diego/lines.mp3",
			 "audio/Diego/movie.mp3",
			 "audio/Diego/name.mp3",
			 "audio/Diego/paris.mp3",
			 "audio/Diego/pets.mp3",
			 "audio/Diego/right.mp3",
			 "audio/Diego/Tetris.mp3",
			 "audio/Diego/weather.mp3",
			 "audio/Diego/well.mp3"
			];
	var voicecond = Math.floor(Math.random() * 2) + 1   

	if (voicecond == 1){
		audio.push(orlaaaudio);
		audio = audio[0];
		for (i in audio)
			i = i.valueOf();
	} else {
		audio.push(diegoaudio);
		audio = audio[0];
		for (i in audio)
			i = i.valueOf()
	}
}

var demo = `<div class='demographics'>
    <h1>Post-trial Questionnaire</h1>
    <div class='form'>
        <label for='age'>Age: </label>
        <input type='number' id='age' name='age' min='18' max='100' required>
    </div>
	<br><br>
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
	<br><br>
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
	<br><br>
	<div class='form'>
        <label for='tetris'>What is your level of experience with Tetris? </label>
        <select id='tetris' name='tetris_drop' required>
            <option disabled selected value> -- select an option -- </option>
            <option>I am not at all familiar with Tetris.</option>
            <option>I know how Tetris is played, but I have played Tetris before.</option>
            <option>I have played Tetris before, but I don't play regularly. </option>
            <option>I regularly play Tetris.</option>
        </select>
    </div>

	 <br><br>
	
	 <div class='form'>
        <label for='stratLowTime'> For non-urgent trials, how did you decide when to deliver messages your partner? </label></div>
		<textarea id="stratLowTime" cols=100 rows=5 required></textarea>
		  <br><br>
	
	
	 <div class='form'>
        <label for='stratLowHow'> For non-urgent trials, how would you describe the way you delivered messages your partner? </label></div>
		<textarea id="stratLowHow" cols=100 rows=5 required></textarea>
		  <br><br>
		 
	<div class='form'>
        <label for='straHighTime'> For urgent trials, how did you decide when to deliver messages your partner? </label></div>
		<textarea id="stratHighTime" cols=100 rows=5 required></textarea>
		  <br><br>
	
	
	 <div class='form'>
        <label for='stratHighHow'> For urgent trials, how would you describe the way you delivered messages your partner? </label></div>
		<textarea id="stratHighHow" cols=100 rows=5 required></textarea>
		  <br><br>
	
		 
		 
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
        <label for='native'>Are you a native speaker of British English? </label>
        <select id='native' name='native_speaker' required>
            <option disabled selected value> -- select an option -- </option>
            <option>Yes</option>
            <option>No</option>
        </select>
    </div>
    <div class='form'>
        <label for='vision'>Do you have normal to corrected vision? </label>
        <select id='vision' name='normal_vision' required>
            <option disabled selected value> -- select an option -- </option>
            <option>Yes</option>
            <option>No</option>
        </select>
    </div>
    <div class='form'>
        <label for='hearing'>Do you have normal to corrected hearing? </label>
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


var praclow = {
			type: "tetris-video-keyboard-response",
			sources: vid2,
			width: 800,
			height: 600,
			start: 11.5,
			prompt: "NOT URGENT: Ask your partner \"What's your name?\"",
			condition: "PracLow",
			audio: audio[11]
			  };

var prachigh = {
			type: "tetris-video-keyboard-response",
			sources: vid2,
			width: 800,
			height: 600,
			start: 99.14,
			prompt: "URGENT: Ask your partner \"Have you played Tetris in the last month?\"",
			condition: "PracHigh",
			audio: audio[8]
			  };


var exptimeline = {
	timeline : [
		{
			type: "tetris-video-keyboard-response",
			sources: jsPsych.timelineVariable('source'),
			width: 800,
			height: 600,
			start: jsPsych.timelineVariable('start'),
			prompt: jsPsych.timelineVariable('prompt'),
			condition: jsPsych.timelineVariable('condition'),
			audio: jsPsych.timelineVariable('audio')
			
		}],
	timeline_variables: [
		{source: vid1, start: 11.2, prompt: "URGENT: Ask your partner \"Are you using your right or left hand to play?\"", condition: "HighQ", audio:  audio[14]},
		{source: vid1, start: 70.16, prompt: "URGENT: Ask your partner \"Do you have any cats or dogs?\"", condition: "HighQ",audio:  audio[13]},
		{source: vid1, start: 143.63, prompt: "URGENT: Ask your partner \"What's the weather like right now?\"", condition: "HighQ", audio:  audio[16]},
		{source: vid1, start: 191.56, prompt: "URGENT: Ask your partner \"What time did you go to bed last night?\"", condition: "HighQ", audio:  audio[2]},
		{source: vid1, start: 256.26, prompt: "URGENT: Remind your partner \"you can use the down arrow to make pieces drop faster.\"", condition: "HighS", audio:  audio[5]},
		{source: vid1, start: 320.4, prompt: "URGENT: Remind your partner \"you need to press the enter key right after responding.\"", condition: "HighS", audio:  audio[6]},
		{source: vid1, start: 377, prompt: "URGENT: Remind your partner \"We\'ll get more points if you clear more lines.\"", condition: "HighS", audio:  audio[9]},
		{source: vid1, start: 423.53,  prompt: "URGENT: Remind your partner \"the experiment says we're doing well so far.\"", condition: "HighS", audio:  audio[17]},
		{source: vid2, start: 210.4, prompt: "NOT URGENT: Ask your partner \"What was the last movie you watched?\"", condition: "LowQ", audio:  audio[10]},
		{source: vid2, start: 287.7, prompt: "NOT URGENT: Ask your partner \"What's your favorite ice cream flavor?\"", condition: "LowQ", audio: audio[7]},
		{source: vid2, start: 483.53, prompt: "NOT URGENT: Ask your partner \"What did you have for breakfast?\"", condition: "LowQ", audio:  audio[3]},
		{source: vid2, start: 546.83, prompt: "NOT URGENT: Ask your partner \"Have you ever been to Paris?\"", condition: "LowQ", audio:  audio[12]},
		{source: vid2, start: 635.37, prompt: "NOT URGENT: Tell your partner \"My favorite fruit is bananas.\"", condition: "LowS", audio:  audio[1]},
		{source: vid2, start: 691.9, prompt: "NOT URGENT: Tell your partner \"My favorite color is red.\"", condition: "LowS", audio:  audio[4]},
		{source: vid2, start: 761.03, prompt: "NOT URGENT: Tell your partner \"Tetris was first released in 1984.\"", condition: "LowS", audio:  audio[0]},
		{source: vid2, start: 885.7, prompt: "NOT URGENT: Tell your partner \"There are seven different shapes of Tetris piece.?\"", condition: "LowS", audio:  audio[15]}		
	],
	randomize_order: true
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
		saveInfo('completion_code', subject_id);

		var results = jsPsych.data.get();
		var interaction = jsPsych.data.getInteractionData();
		var data = results.join(interaction);
		saveData(subject_id, data.csv());
	}
};



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
    url: 'posttrial.html',
    cont_btn: "continue"
};


var paymenthtml = ` <div class = 'payment code'
	 <p>Please enter your completion code in MTurk to confirm your participation. Your unique completion code is:</p>
    <p class='larger'>${ID}</p>
    <p>You are reminded that all the data has been de-identified. Should you wish to access data relevant to your participation you will be required to use the unique completion code provided.</p>
    <p> If you require any information regarding this study, or your participation in it, please contact:</p>
    <p>
    	Dr Benjamin Cowan <a href='mailto: ucd.ics.research@gmail.com'>(ucd.ics.research@gmail.com)</a><br>
    </p>
    <p>Thank you once again, the time and effort you have taken to participate in this study is greatly appreciated.</p>
</div>`


var payment = {
	type: 'html-keyboard-response',
	stimulus: paymenthtml,
	choices: jsPsych.NO_KEYS
};

var initialize = {
        type: "call-function",
        func: setupaudio
    };

//timeline.push(prepractice, initialize, practimeline, postpractice, initialize, expproc,demographic,debrief, payment);
//timeline.push( exclusion, consent, infosheet,info2,info3,initialize, prepractice,praclow,midpractice,prachigh,postpractice,exptimeline,postrial,demographic, debrief, payment);

timeline.push( initialize,prepractice,praclow,midpractice,prachigh,postpractice,exptimeline,postrial,demographic, debrief, payment);


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
            min_width: 600,
            min_height: 600,
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
