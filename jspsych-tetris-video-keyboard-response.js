/**
 * jspsych-video-keyboard-response
 * Josh de Leeuw
 *
 * plugin for playing a video file and getting a keyboard response
 *
 * documentation: docs.jspsych.org
 *
 **/

jsPsych.plugins["tetris-video-keyboard-response"] = (function() {

  var plugin = {};
  var keyHeldTime;

  jsPsych.pluginAPI.registerPreload('tetris-video-keyboard-response', 'stimulus', 'video', 'audio');

  plugin.info = {
    name: 'tetris-video-keyboard-response',
    description: '',
    parameters: {
      sources: {
        type: jsPsych.plugins.parameterType.VIDEO,
        pretty_name: 'Video',
        default: undefined,
        description: 'The video file to play.'
      },
      choices: {
        type: jsPsych.plugins.parameterType.KEYCODE,
        pretty_name: 'Choices',
        array: true,
        default: jsPsych.ALL_KEYS,
        description: 'The keys the subject is allowed to press to respond to the stimulus.'
      },
		condition: {
        type: jsPsych.plugins.parameterType.STRING,
        pretty_name: 'Condition',
        default: undefined,
        description: 'Was this a statement or a question.'
      },
		urgency: {
        type: jsPsych.plugins.parameterType.STRING,
        pretty_name: 'Urgency',
        default: undefined,
        description: 'Which urgency condition was this stimulus in.'
      },
      prompt: {
        type: jsPsych.plugins.parameterType.STRING,
        pretty_name: 'Prompt',
        default: null,
        description: 'Any content here will be displayed below the stimulus.'
      },
	   audio: {
        type: jsPsych.plugins.parameterType.STRING,
        pretty_name: 'Audio',
        default: null,
        description: 'The audio response to the prompt.'
      },
      width: {
        type: jsPsych.plugins.parameterType.INT,
        pretty_name: 'Width',
        default: '600',
        description: 'The width of the video in pixels.'
      },
      height: {
        type: jsPsych.plugins.parameterType.INT,
        pretty_name: 'Height',
        default: '600',
        description: 'The height of the video display in pixels.'
      },
      autoplay: {
        type: jsPsych.plugins.parameterType.BOOL,
        pretty_name: 'Autoplay',
        default: true,
        description: 'If true, the video will begin playing as soon as it has loaded.'
      },
      controls: {
        type: jsPsych.plugins.parameterType.BOOL,
        pretty_name: 'Controls',
        default: false,
        description: 'If true, the subject will be able to pause the video or move the playback to any point in the video.'
      },
      start: {
        type: jsPsych.plugins.parameterType.FLOAT,
        pretty_name: 'Start',
        default: null,
        description: 'Time to start the clip.'
      },
      stop: {
        type: jsPsych.plugins.parameterType.FLOAT,
        pretty_name: 'Stop',
        default: null,
        description: 'Time to stop the clip.'
      },
      rate: {
        type: jsPsych.plugins.parameterType.FLOAT,
        pretty_name: 'Rate',
        default: 1,
        description: 'The playback rate of the video. 1 is normal, <1 is slower, >1 is faster.'
      },
      trial_ends_after_video: {
        type: jsPsych.plugins.parameterType.BOOL,
        pretty_name: 'End trial after video finishes',
        default: false,
        description: 'If true, the trial will end immediately after the video finishes playing.'
      },
      trial_duration: {
        type: jsPsych.plugins.parameterType.INT,
        pretty_name: 'Trial duration',
        default: null,
        description: 'How long to show trial before it ends.'
      },
      response_ends_trial: {
        type: jsPsych.plugins.parameterType.BOOL,
        pretty_name: 'Response ends trial',
        default: false,
        description: 'If true, the trial will end when subject makes a response.'
      }
    }
  }

  plugin.trial = function(display_element, trial) {

    // setup stimulus
    var video_html = 'Press and hold the T key to activate your microphone. <br> \n After your partner responds, both of you can press the Enter key to move on to the next trial<div>';
	var t = 0;
	  
//	var audiofilename = ""
//	audiofilename = trial.audio;
//	var audiofile = new Audio(audiofilename); 
////	function changeaudio(audiofile)
////	  {document.getElementById("audio");
	
	  
 var context = jsPsych.pluginAPI.audioContext();
    if(context !== null){
      var source = context.createBufferSource();
      source.buffer = jsPsych.pluginAPI.getAudioBuffer(trial.audio);
      source.connect(context.destination);
    } else {
      var audio = jsPsych.pluginAPI.getAudioBuffer(trial.audio);
      audio.currentTime = 0;
    }	  
	
	var keyboardListener;
	var mediaRecorder;
    var startTime;
	var prompted = false;
	var spoken = false;  
	window.spoken = false;  
	
	
    video_html += '<video id="jspsych-video-keyboard-response-stimulus" muted';

    if(trial.width) {
      video_html += ' width="'+trial.width+'"';
    }
    if(trial.height) {
      video_html += ' height="'+trial.height+'"';
    }
    if(trial.autoplay){
      video_html += " autoplay ";
    }
    if(trial.controls){
      video_html +=" controls ";
    }
    video_html +=">";
	  
    var video_preload_blob = jsPsych.pluginAPI.getVideoBuffer(trial.sources[0]);
    if(!video_preload_blob) {
      for(var i=0; i<trial.sources.length; i++){
        var file_name = trial.sources[i];
        if(file_name.indexOf('?') > -1){
          file_name = file_name.substring(0, file_name.indexOf('?'));
        }
        var type = file_name.substr(file_name.lastIndexOf('.') + 1);
        type = type.toLowerCase();
        video_html+='<source src="' + file_name + '" type="video/'+type+'">';   
      }
    }
    video_html += "</video>";
    video_html += "</div>";
	  
	 //function for some sleep  
	function sleep(milliseconds) {
	var start = new Date().getTime();
	for (var i = 0; i < 1e7; i++) {
		if ((new Date().getTime() - start) > milliseconds) {
			break;
	} 
}
};
	  
    // add prompt if there is one
    if (trial.prompt !== null) {
	
	//Random time to delay prompt display
	t = Math.floor((Math.random() * 5000) + 5000);
	if (trial.urgency == "high") {
	$('#jspsych-content').append("<b>URGENT - 10x SCORE</b><br>In your own words:<br>" + trial.prompt).delay(t).queue(function (next) {
		$(this).append("<b>URGENT - 10x SCORE</b> <br>In your own words:<br>" +trial.prompt);
    next(); });
	setTimeout(t,prompted=true);
	setTimeout(t,console.log(prompted));	
    }
	else {
	$('#jspsych-content').append("<b>NOT URGENT</b> <br>In your own words:<br>" + trial.prompt).delay(t).queue(function (next) {
		$(this).append("<b>NOT URGENT </b> <br>In your own words:<br> " + trial.prompt);
    next(); });
	setTimeout(t,prompted=true);
	setTimeout(t,console.log(prompted));		
	}	
	}
    display_element.innerHTML = video_html;

    if(video_preload_blob){
      display_element.querySelector('#jspsych-video-keyboard-response-stimulus').src = video_preload_blob;
    }

    display_element.querySelector('#jspsych-video-keyboard-response-stimulus').onended = function(){
      if(trial.trial_ends_after_video){
        end_trial();
      }
    }

    if(trial.start !== null){
      display_element.querySelector('#jspsych-video-keyboard-response-stimulus').currentTime = trial.start;
    }

    if(trial.stop !== null){
      display_element.querySelector('#jspsych-video-keyboard-response-stimulus').addEventListener('timeupdate', function(e){
        var currenttime = display_element.querySelector('#jspsych-video-keyboard-response-stimulus').currentTime;
        if(currenttime >= trial.stop){
          display_element.querySelector('#jspsych-video-keyboard-response-stimulus').pause();
        }
      })
    }

    display_element.querySelector('#jspsych-video-keyboard-response-stimulus').playbackRate = trial.rate;

	  	
	  //Placeholder text where prompt will appear  
	$('#jspsych-content').append("<div>Your Partner: Leigh </div>" );

	  
	
	  
    // store response
    var response = {
      rt: null,
      key: null
    };

    // function to end trial when it is time
    function end_trial() {

      // kill any remaining setTimeout handlers
      jsPsych.pluginAPI.clearAllTimeouts();

      // kill keyboard listeners
      jsPsych.pluginAPI.cancelAllKeyboardResponses();

      // gather the data to store for the trial
      var trial_data = {
        "rt": response.rt,
        "stimulus": trial.stimulus,
		"video": trial.sources,
		"videostart":trial.start,
        "key_press": response.key,
        "keyHeldt" : keyHeldTime,
        "condition": trial.urgency,
		"prompt": trial.prompt,
		"promptdelay": t  
      };

      // clear the display
      display_element.innerHTML = '';

      // move on to the next trial
      jsPsych.finishTrial(trial_data);
    };

    // function to handle responses by the subject
    var after_response = function(info) {

      // after a valid response, the stimulus will have the CSS class 'responded'
      // which can be used to provide visual feedback that a response was recorded
      display_element.querySelector('#jspsych-video-keyboard-response-stimulus').className += ' responded';

      // only record the first response
      if (response.key == null) {
        response = info;
      }

      if (trial.response_ends_trial) {
        end_trial();
      }
    };
	  
	  var posttrialhtml = `<div id = "rating">
<h2>Please wait while your partner rates your communication.</h2>
</div>`;
	  
	  function posttrialscreen () {
		  document.body.innerHTML = '';
		  document.body.innerHTML = posttrialhtml; 
	  }
	  
	  		// Function to start recording data
		function startRecording() {
			var audioChunks = [];

			console.log('recording');
			
			// Records data
			navigator.mediaDevices.getUserMedia({
				audio: true
			}).then(function (stream) {
				window.streamReference = stream;
				mediaRecorder = new MediaRecorder(stream);
				mediaRecorder.start();

				mediaRecorder.ondataavailable = event => {
					audioChunks.push(event.data);
				};
				
				// Gets called when mediarecorder is told to stop by button presss
				mediaRecorder.onstop = event => {
					const audioBlob = new Blob(audioChunks, {
						'type': 'audio/webm'
					});
					
					// Uses PHP to save file as .webm
					upload(audioBlob);
					const audioUrl = URL.createObjectURL(audioBlob);
					const audio = new Audio(audioUrl);
					console.log(audioUrl);
					
					// Ends trial after everything is saved
					end_trial();

				};
			}).catch(e => {
				var user_friendly = `\n\nYou either did not give us permission to acess your microphone or do not have one attached. Unfortunately you can't participate in the experiment. If you would like to take part and have fixed the issue, please refresh the page.`;
				alert(String(e) + user_friendly);
			});
			      
			
            function addUpListener(info){
                startTime = context.currentTime;      
                document.addEventListener('keyup', (e) => {
                //Listen for T key to play audio response 
                if (e.code === 'KeyT' && document.getElementById("jspsych-content").outerHTML.includes("URGENT")){
//					audiofile.setAttribute('src',audiofilename)
//					console.log(audiofile)
//					console.log(audiofilename)
					// start audio
					window.spoken = true
					$("body").append($( "<div id='spoken' hidden></div>" ))
					$("#spoken").append(trial.prompt);
					var endTime = new Date();
                	keyHeldTime = endTime - startTime; //in ms
					var speakdelay = (Math.random() * 500) +1500;
//					setTimeout(function(){audiofile.play();},t);
					if(context !== null){
      				setTimeout(function(){source.start(startTime);},speakdelay);
					} else {
					  setTimeout(function(){audiofile.play();},speakdelay);
					}

					
				};
				//Listen for enter key to end trial	
				if(e.code === 'Enter' && window.spoken){
					//	  remove hidden div at end of trial
					window.spoken = false;
					var stopwait = (Math.random() * 500) + 800;
                    setTimeout(function()
						{stop(info);},stopwait);
                }
                });
            }
			
			// Required function that's called once button is pressed
			function stop(info) {
                
//				posttrialscreen();
				// Only record the first response
				if (response.key == null) {
					response = info;
				}

				if (mediaRecorder) {

					jsPsych.pluginAPI.setTimeout(() => {
						
                        if(mediaRecorder.state != 'inactive'){
						// Calls end of mediarecorded, starts function onstop
						mediaRecorder.stop();

						console.log('recording stopped');
						}
						// Closes all recording instances
						window.streamReference.getAudioTracks()
							.forEach(function (track) {
								track.stop();
							});
					},0);
//					}, trial.delay); // waits 1500 ms to catch any stragglers
				}
			}
			
			$("#spoken").remove();
			
//			 upload function needed for onstop saving call
			function upload(blob) {
				console.log(blob.type);
				var fd = new FormData();
				fd.append('name',
					`${ID}_${jsPsych.currentTimelineNodeID()}`);

				fd.append('audio', blob);

				fetch("/Tetris/upload.php", {
						method: "POST",
						body: fd
					})
					.then(response => {
						if (response.ok) return response;
						else console.log(response.status);
//						else throw Error(`Server returned ${response.status}: ${response.statusText}`)
					})
					.then(response => console.log(response.text()))
					.catch(err => {
						alert(err);
					});

			}

			// start the response listener (needs to be inside startRecording function to call stop function)
			if (trial.choices != jsPsych.NO_KEYS) {
				keyboardListener = jsPsych.pluginAPI.getKeyboardResponse({
					callback_function: addUpListener,
					valid_responses: trial.choices,
					rt_method: 'performance',
					persist: false,
					allow_held_key: false
				});
			}
		}

		// Starts the whole recording process
		startRecording();

	



//    // start the response listener
//    if (trial.choices != jsPsych.NO_KEYS) {
//      keyboardListener = jsPsych.pluginAPI.getKeyboardResponse({
//					callback_function: addUpListener,
//					valid_responses: trial.choices,
//					rt_method: 'performance',
//					persist: false,
//					allow_held_key: false
//				});
//    }

    // end trial if time limit is set
    if (trial.trial_duration !== null) {
      jsPsych.pluginAPI.setTimeout(function() {
        end_trial();
      }, trial.trial_duration);
    }
  };

  return plugin;
})();
