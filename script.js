var network;
var app = document.getElementById("app");
var cgrp = "", overl = gid("overlay");
var whom;
var incmessage;
var who, elementToRemove;
var grpsin, dmsin;
var message = "";
var chat = gid("chatts")
chat.innerHTML = "<g></g>";
var csgrp, isadmin = false, adminchecks = false, jgrp = false, dev = false, htswm = true, rgs = localStorage.getItem("rgs"), prf = "language";
var usersml = [];
var usd = {}, usic = {};
var anr = false;
var lmu;
var gl1 = gid("rjgrps"), rjgl = [], admde = "", cgrpad = '', badm = true, grpdu, diu, adujts = [];
var cleanUnh, dms = {};
var dms = {}, idmu;

gid("cbx-51").checked = true

if (!rgs) {
	localStorage.setItem("rgs", [])
}


overl.showModal();
burnupwss();

function showmems() {
	gid("gmdv").showModal();
	gid("memdisp").innerHTML = "";
	for (var i = 0; i < usersml.length; i++) {
		var adminTag = (cgrpad == usersml[i] && gid("cbx-51").checked) ? ' <admincc>Admin</admincc>' : '';
		gid("memdisp").innerHTML += `<div class='memdisone' onclick="sprfs(this.innerHTML)">` + usersml[i] + adminTag + `</div>`;
	}

}

function gid(e) {
	return document.getElementById(e);
}

function saydt(oo) {
	let y = messon = {};
	messon.ty = "d";
	messon.de = gid("ud").value;
	messon.ic = gid("prfpics").innerHTML;
	messon.un = gid("un").value;
	messon.ch = cgrp;
	network.send(JSON.stringify(messon)); // DGIVE broadcast
	if (oo != 'ne') {
		adminchecks = true;
		setTimeout(isadminhuh, 1000);
	}
}

function ggo() {
	usersml = [];
	lmu = "";
	let y = messon = {};
	messon.ty = "go";
	messon.un = gid("un").value;
	messon.ad = isadmin;
	messon.ch = cgrp;
	network.send(JSON.stringify(messon)); // DEXIT broadcast to newer
}

function desnak(d) {
	lmu = null;
	let msef = `<div class="desnak">` + d + `</div>`;
	chat.lastElementChild.insertAdjacentHTML("afterend", msef);
	app.scrollTop = app.scrollHeight + 250;

}

function gotoch(e) {
	jgrp = true;
	sgrpl()
	drawgrps()
	// Store the previous value of cgrp
	var prevCgrp = cgrp;
	if (!rjgl.includes(cgrp)) {
		rjgl.push(cgrp);
		if (rjgl.length > 5) {
			rjgl = rjgl.slice(-5);
		}
	}

	grpdu = 'https://chattingly-plus.adthoughtsglobal.repl.co/?grp=' + cgrp;

	if (cgrp !== "" && cgrp !== e.innerHTML) {
		if (confirm("Leave " + cgrp + "?\n\n Your messages will be lost.")) {

			chat.innerHTML = "<g></g>";
			admde = "";
			ggo()
			htswm = true;

		} else {
			// Restore the previous value of cgrp
			cgrp = prevCgrp;

			return;
		}
		let index = grpsin.indexOf(e.innerHTML);

		// Move the element to the first position if it exists in the array
		if (index > -1) {
			grpsin.splice(index, 1);  // Remove the element from its current position
			grpsin.unshift(e.innerHTML);  // Add it to the beginning of the array
		}
	}

	app.showModal();
	gid("gname").innerHTML = e.innerHTML;
	cgrp = e.innerHTML;
	if (gid("chatts").innerHTML == "<g></g>") {
		setTimeout(saydt('oe'), 1000)
	}
}

function adminprevs() {
	if (!gid("cbx-51").checked) { return }
	if (!gid("chatts").innerHTML.includes("You just became the admin")) {
		msnack(`Admin Mode`)
		desnak(`<span class="material-symbols-outlined">
			   shield_person
			   </span>You just became the admin of '` + cgrp + `'`)
	}
}

function waitUntil(conditionFunction, pollInterval = 100) {
	return new Promise((resolve) => {
		function checkCondition() {
			if (conditionFunction()) {
				resolve();
			} else {
				setTimeout(checkCondition, pollInterval);
			}
		}

		checkCondition();
	});
}

async function adminp() {
	gid("grpin").showModal();
	gid("gname2").innerHTML = cgrp;
	if (isadmin) {
		gid("gitxtb").innerHTML = "Admin Panel";
	} else {
		gid("gitxtb").innerHTML = "Group Info";
	}
	gid("ginst").innerHTML = "...";
	await waitUntil(() => usersml.length > 0);
	gid("ginst").innerHTML = usersml.length + " users";
	if (isadmin) {
		gid("ginstmd").innerHTML = `
			<div id="ginstmd">
		<br><div class="admpart"><b>You're An Admin!</b>
		<span>Welcome message: </span><input id="gdein" placeholder="Say, a greeting..." onkeydown="duckadmin(this)" value="`+ admde + `"></div>
			</div>`;
	}
}

function duckadmin(x) {
	// set admin prefered prev group welcome message for save.
	setTimeout(function() {
		admde = x.value;
	}, 500);
}

function isadminhuh() {
	if (!gid("cbx-51").checked) { return }
	adminchecks = false;

	setTimeout(function() {
		if (usersml.length === 1 && usersml[0] === gid("un").value) {
			isadmin = true;

			setTimeout(adminprevs, 1000);
		} else {
			desnak(`<span class="material-symbols-outlined">
error
</span> `+ cgrpad + " is the admin")
		}
	}, 2000);
}

function ngrpms() {
	gid("ngrpm").showModal();
}

function sgrpl() {
	grpsin = Array.from(new Set(grpsin));

	setdb("trojenCat", "grp", grpsin);
}



getdb("trojenCat", "grp").then((value) => {
	if (value) {
		grpsin = value;
		drawgrps();
	} else {
		grpsin = ["Main"];
		drawgrps();
	}
});

function sprfs(unh) {
	// Trim excess spaces from both ends
	cleanUnh = unh.split('<')[0].trim();

	gid("prfmd").showModal();
	gid("tbun").innerHTML = unh.replace(/<admincc.*?<\/admincc>/, '');

	gid("tbud").innerHTML = usd[cleanUnh.replace(/<\/?[^>]+(>|$)/g, "")];
	gid("prfchic").innerHTML = usic[cleanUnh.replace(/<\/?[^>]+(>|$)/g, "")];
}

function burnupwss() {
	if (window.location.href.includes("?host=")) {
		const params = new Proxy(new URLSearchParams(window.location.search), {
			get: (searchParams, prop) => searchParams.get(prop),
		});
		network = new WebSocket(params.host); /* the channel host */

	} else {
		network = new WebSocket(prompt("enter your socket url:"));
	}
	network.onopen = (event) => {
		console.log("--- -.-");
		overl.style.opacity = "0%";
		setTimeout(() => {
			overl.close();
		}, 700);
	}

	network.onclose = () => {
		gid("bruhmd").showModal()
	}

	network.onerror = (event) => {
		console.log(". .-. .-. --- .-. : " + event.data);
		network.close();
	}


	network.onmessage = (event) => {
		if (dev) {
			console.log(event.data);
		}
		incmessage = event.data;
		if (jgrp) {

			const parsedMessage = JSON.parse(incmessage); // Parse the incoming message
			let chin = parsedMessage.ch;
			if (chin == cgrp) {
				let xy = parsedMessage.ty;
				let zn = parsedMessage.un;

				if (adminchecks && xy == "td") {
					if (parsedMessage.to == gid("un").value) {
						cgrpad = parsedMessage.un;
						if (parsedMessage.gd) {
							if (htswm) {
								gid('welmesv').innerHTML = ""
								gid('welmesv').innerHTML = `Welcome To <h1>` + parsedMessage.ch + `</h1><p>` + parsedMessage.gd + `<br><sup>Admin: ` + parsedMessage.un + `</sup></p><button onclick="gid('welmesd').close()">Close</button>`;

								gid('welmesd').showModal();
								htswm = false;
							}
						}
						if (!usersml.includes(zn)) {
							usersml.push(zn); // Add the username to the usersml array
							usd[zn] = parsedMessage.de;
							usic[zn] = parsedMessage.ic;
						} else {
							if (!usd[zn] == parsedMessage.de) {
								usd[zn] = parsedMessage.de;
							}
						}
					}
					if (parsedMessage.ad) {
						swm(parsedMessage.gd);
					}
				} else if (xy == "msgconf") {
					elementToRemove = document.querySelector(`#arm-` + parsedMessage.di);
					if (dev) console.log("to remove: " + elementToRemove);
					if (elementToRemove) {
						elementToRemove.innerHTML = "?";
					} else {
						console.log("-- . ....")
					}

				} else if (xy == "d") {
					if (zn != gid("un").value) {
						desnak(`<span class="material-symbols-outlined" style="color: green">arrow_forward</span>` + zn + ` just joined`);
					} else if (!gid("youjustjoined")) {
						desnak(`<span class="material-symbols-outlined" style="color: green" id="youjustjoined">arrow_forward</span> You just joined`);
					}
					let y = messon = {};
					messon.ty = "td";
					messon.de = gid("ud").value;
					messon.ic = gid("prfpics").innerHTML;
					messon.ad = isadmin;
					messon.to = zn;
					messon.diu = diu;
					messon.un = gid("un").value;
					messon.ch = cgrp;
					if (!usersml.includes(zn)) {
						usersml.push(zn);
						usd[zn] = parsedMessage.de;
						usic[zn] = parsedMessage.ic;
					} else {
						if (!usd[zn] == parsedMessage.de) {
							usd[zn] = parsedMessage.de;
						}
						if (!usic[zn] == parsedMessage.ic) {
							usic[zn] = parsedMessage.ic;
						}
					}
					if (gid("dmpeople").open) {
						dmsopen();
					}
					if (isadmin) {
						if (gid("gdein") != null) {
							if (gid("gdein").value != "") {
								messon.gd = gid("gdein").value;
							} else {
								desnak("<b>You are missing out on your admin perks!</b><br> set a welcome message that stands out of the norm.")
								messon.gd = 'Powered by Chattingly';
							}
						} else {
							desnak("<b>You are missing out on your admin perks!</b><br> set a welcome message by clicking on the group name in the top nav.")
							messon.gd = 'Powered by Chattingly';
						}
					}
					network.send(JSON.stringify(messon)); // DGIVE broadcast to newer
				} else {
					who = parsedMessage.un;
					if (xy == "m") {
						if (zn == gid("un").value) {
							whom = true;
						} else {
							whom = false;
						}

					}

					if (parsedMessage.mes && parsedMessage.mes.includes("@")) {
						if (parsedMessage.mes.includes("@" + gid("un").value)) {
							gid("pse").play();
						}
						parsedMessage.mes = removeTags(parsedMessage.mes);

						// Replace occurrences of gid("un").value
						parsedMessage.mes = parsedMessage.mes.replace("@" + gid("un").value, "<hg>@" + gid("un").value + "</hg>");

						// Replace occurrences of items in the usersml list
						for (var i = 0; i < usersml.length; i++) {
							var regex = new RegExp("@" + usersml[i], "g");
							parsedMessage.mes = parsedMessage.mes.replace(regex, "<hg>@" + usersml[i] + "</hg>");
						}

						addmessage(formatxd(parsedMessage.mes), parsedMessage.did, true);
					} else if (xy == "dm") {
						if (parsedMessage.tg == gid("un").value || parsedMessage.un == gid("un").value) {
							addmessage(formatxd(removeTags(parsedMessage.mes)), parsedMessage.did, null, true);
							dms.idmu = gid("dmchatts");
						}
					} else if (xy = "m") {
						addmessage(formatxd(removeTags(parsedMessage.mes)), parsedMessage.did);
					}
				}

				if (xy == "yte") {
					if (zn == gid("un").value) {
						whom = true;
					} else {
						whom = false;
					}
					who = parsedMessage.un;
					if (dev) { console.log("YTE with link: " + parsedMessage.li) }
					parsedMessage.li = extractVideoId(parsedMessage.li)
					addmessage(`<a href="` + parsedMessage.li + `"><small>Youtube Video</small></a><iframe class="yteme" width="560" height="315" src="https://www.youtube.com/embed/` + parsedMessage.li + `" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>`, parsedMessage.did)
				} else if (xy == "adt") {
					if (parsedMessage.tg == gid("un").value) {
						desnak("Admin left the chat - And you are the admin now. This is completely random.")
					} else {
						desnak("Admin left the chat, " + parsedMessage.tg + " became the admin. This is 							   completely random.")
					}
				} else if (xy == "bye") {
					desnak(`` + parsedMessage.tg + " just left")
				}
			}
		}
	}
}

function ner() {
	if (anr) {
		alert("ANR Is desabled in your regionm please reload manually.")
	} else {
		location.reload();
	}

}

function extractVideoId(youtubeLink) {
	const regex = /(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
	const match = youtubeLink.match(regex);
	return match ? match[1] : null;
}

function addmessage(ms, idid, ping, ty) {
	if (!idid) {
		return;
	}
	var ww2, tad, sylt;
	if (whom) {
		ww2 = "ums";
	} else {
		ww2 = "";
	}
	let usicn = usic[who];
	if (who == lmu) {
		tad = ``;
		sylt = `style="margin-left: 46px;"`
	} else {
		tad = `<b class="material-symbols-outlined mepfp tooltip" onclick="sprfs(${who})">
			`+ usicn + ` <pre class="tooltiptext">` + usicn.replace("_", " ") + `</pre>
		</b><div><span class="unu" onclick="sprfs(this.innerHTML)">${who}</span><small>` + gettimenow() + `</small>`;
		sylt = ``;
	}
	if (ping) {
		sylt += `background-color:#ffaa3814; border-right: 3px solid #ffb1005e;"`
	} else {
		sylt += ``
	}

	let mse = `<div class="message-container"  id="arm-` + idid + `" ${sylt}> ${tad} <div class="inmessdiv" onclick="msgconcl(this)">` + ms + `</div></div>`;
	if (!ty) {
		chat.lastElementChild.insertAdjacentHTML("afterend", mse);
		app.scrollTop = app.scrollHeight + 250;
	} else {
		gid("dmchatts").lastElementChild.insertAdjacentHTML("afterend", mse);
		gid("dmchat").scrollTop = gid("dmchat").scrollHeight + 250;
	}
	lmu = who;
}

function msgconcl(elementX) {
	if (confirm("Remove that message for all?")) {
		let x = {};
		x.ty = "msgconf";
		x.di = elementX.getAttribute("ididv");
		x.ct = "rem"
		network.send(JSON.stringify(x));
	}
}

function gettimenow() {
	var currentLocalTime = new Date();
	var hours = currentLocalTime.getHours();
	var minutes = currentLocalTime.getMinutes();

	// Format hours to 12-hour format
	var formattedHours = hours % 12 || 12;

	// Add leading zero to minutes if needed
	var formattedMinutes = minutes < 10 ? '0' + minutes : minutes;

	// Determine if it's AM or PM
	var period = hours < 12 ? 'AM' : 'PM';

	return `${formattedHours}:${formattedMinutes} ${period}`;
}

function msnack(e) {
	gid("nbsd").innerHTML = e;
	setTimeout(function() {
		replayAnimation("nbsd")
		gid("nbsd").innerHTML = "connected";
	}, 5000);
	replayAnimation("nbsd")
}

function replayAnimation(elementId) {
	const element = document.getElementById(elementId);

	// Clone the element to reset the animation
	const clone = element.cloneNode(true);
	element.parentNode.replaceChild(clone, element);

	// Add a class to trigger the animation again
	clone.classList.add('play-animation');
}

function seyem() {
	if (cgrp != "" && network && gid("ytlein").value != "") {
		let y = messon = {};
		messon.ty = "yte";
		messon.un = gid("un").value;
		messon.ch = cgrp;
		messon.did = gdid();
		messon.li = gid("ytlein").value;
		network.send(JSON.stringify(messon));
	}
}

function sendm() {
	// send message
	let y = messon = {};
	messon.mes = gid("message").value;
	if (gid("message").value.length > 0 && gid("message").value != " ") {
		messon.ty = "m";
		messon.un = gid("un").value;
		messon.ch = cgrp;
		messon.did = gdid();
		network.send(JSON.stringify(messon)); // NSEND broadcast
		gid("message").value = "";
	}
}

function gdid() {
	const inputElement = document.getElementById("un");
	const inputValue = inputElement.value;
	let generatedId = "";

	if (inputValue.length >= 5) {
		// Use the first 5 characters of the Base64-encoded input name
		generatedId = btoa(inputValue).substring(0, 5);
	} else {
		// If the name is shorter than 5 characters, use the entire Base64-encoded name
		generatedId = btoa(inputValue);
	}

	// Generate 5 random digits and append them to the generated ID
	while (generatedId.length < 10) {
		generatedId += Math.floor(Math.random() * 10); // Generate random digits
	}

	return generatedId;
}

function removeTags(str) {
	if (str === null || str === undefined || str === '') {
		return ''; // Return an empty string if str is undefined, null, or empty
	} else {
		str = str.toString();
		str = str.replace(/(<([^>]+)>)/ig, '');
		str = str.replace(/\n/g, '<br>');
		return str;
	}
}

window.addEventListener('beforeunload', ext);

function ext() {
	// on closing
	let x = {};
	x.ty = "adt";
	x.tg = usersml[Math.floor(Math.random() * usersml.length)];
	network.send(JSON.stringify(x))
}


function formatxd(text) {
	// Bold: **text**
	var bold = /\*\*(.*?)\*\*/gm;
	var htmlBold = text.replace(bold, '<strong>$1</strong>');

	// Italics: *text*
	var italics = /\*(.*?)\*/gm;
	var htmlItalics = htmlBold.replace(italics, '<em>$1</em>');

	// Underline: __text__
	var underline = /__(.*?)__/gm;
	var htmlUnderline = htmlItalics.replace(underline, '<u>$1</u>');

	// Strikethrough: ~~text~~
	var strikethrough = /~~(.*?)~~/gm;
	var htmlStrikethrough = htmlUnderline.replace(strikethrough, '<del>$1</del>');

	// Keyboard: `text`
	var keyboard = /`(.*?)`/gm;
	var htmlKeyboard = htmlStrikethrough.replace(keyboard, '<kbd>$1</kbd>');

	return htmlKeyboard;
}

function kentdm(event) {
	// on enter key press on chat input - but for dm
	if (event.key === "Enter") {
		event.preventDefault();
		sendmdm();
	}
}

function kent(event) {
	// on enter key press on chat input
	if (event.key === "Enter") {
		event.preventDefault();
		sendm();
	}

	if (gid("message").value === "/") {
		gid("quickact").showModal();
		gid("message").value = "";
	}

}

function profile() {
	gid("prfs").showModal();
}

function cngrp() {
	// on clicking check availability button while joining group
	let x = gid("ngrpinp").value;
	if (x !== "" && !grpsin.includes(x)) {
		grpcrt();
	} else {
		if (grpsin.includes(x)) {
			gid("grpcrbtn").innerHTML = "You have aldredy joined this group.";
		} else {
			gid("grpcrbtn").innerHTML = "Group name should not be empty.";
		}
	}
}

function grpcrt() {
	let x = gid("ngrpinp").value;
	grpsin.push(x);
	gid("ngrpm").close();
	gid("ngrpinp").value = "";
	drawgrps()
	if (gid("cbx-52").checked) {
		let y = {}; // Simulating an HTML element
		y.innerHTML = x;
		gotoch(y)
	}
}
function drawgrps(x) {
	// Create a copy of the grpsin array and reverse it
	var reversedGrpsin = Array.from(new Set(grpsin)).reverse();

	if (x) {
		gid("vagrpse").showModal()
	}
	// Get a reference to the element with the ID "groups" or "groups2" based on the value of x
	var targetElementId = x ? "groups2" : "groups";
	var groupsElement = document.getElementById(targetElementId);

	// Check if the element exists
	if (groupsElement) {
		// Clear any existing content inside the target element
		groupsElement.innerHTML = "";

		// Determine the maximum number of elements to create
		var maxElements = Math.min(5, reversedGrpsin.length);

		// Iterate through the "reversedGrpsin" list up to the maximum number
		for (var i = 0; i < maxElements; i++) {
			// Create a <div> element with the "card" class
			var cardDiv = document.createElement("div");
			cardDiv.className = "card";

			// Create a <b> element with an onclick attribute
			var groupNameB = document.createElement("b");
			groupNameB.id = "ggname";
			groupNameB.textContent = reversedGrpsin[i]; // Set the group name

			// Add an onclick attribute to the <b> element
			groupNameB.setAttribute("onclick", "gotoch(this)");

			// Create a <span> element with the "material-symbols-outlined goon" class
			var moreVertSpan = document.createElement("span");
			moreVertSpan.className = "material-symbols-outlined goon";
			moreVertSpan.textContent = "more_vert";

			// Add a click event listener to the span element
			moreVertSpan.addEventListener("click", function() {
				// Trigger the smops function with the 'this' keyword as an argument
				smops(this);
			});

			// Append the <b> and <span> elements to the <div> element
			cardDiv.appendChild(groupNameB);
			cardDiv.appendChild(moreVertSpan);

			// Append the <div> element to the target element
			groupsElement.appendChild(cardDiv);
		}
	}
	sgrpl();
}

// Get the input element
var input = document.getElementById("searchInput");

// Add an event listener for keyup event on the input
input.addEventListener("keyup", function() {
	// Get the value of the input
	var filter = input.value.toUpperCase();

	// Get the container of the cards
	var container = document.getElementById("groups2");

	// Get all cards inside the container
	var cards = container.getElementsByClassName("card");

	// Loop through all cards and hide those that don't match the search query
	for (var i = 0; i < cards.length; i++) {
		var cardText = cards[i].textContent || cards[i].innerText;
		if (cardText.toUpperCase().indexOf(filter) > -1) {
			cards[i].style.display = "";
		} else {
			cards[i].style.display = "none";
		}
	}
});

getdb("trojenCat", "usds").then((value) => {
	if (value != undefined) {
		let x = JSON.parse(value);
		prf = x.ic; // update profile from local
		uid = x.diu; // store diu
		updpf();
	}
});

function updpf() {
	gid("prfpics").innerHTML = prf;
	gid("prfics").close();
}

getdb("trojenCat", "usn").then((value) => {
	if (value) {
		gid("un").value = value;
		snack("Signed in as " + value + "!")
	} else {
		let names = [
			'PixelPioneer',
			'CyberSurfer',
			'DataDreamerX',
			'QuantumQuasar',
			'ByteBard',
			'VirtuosoVortex',
			'NanoNavigator',
			'TechnoTrailblazer',
			'EchoExplorer',
			'BitMingle',
			'LogicLuminary',
			'WebWanderlust',
			'DigitalDynamo',
			'VirtualVoyager',
			'CodeChampion',
			'ByteBreeze',
			'CircuitSculptor',
			'NeuralNomad',
			'BinaryBard',
			'WebWeaverZ'
		];

		let x = Math.floor(Math.random() * 999) + 100;
		let z = names[Math.floor(Math.random() * names.length) + 0];
		let randomUsername = z + x;

		// Set the generated random username in IndexedDB
		setdb("trojenCat", "usn", randomUsername)
			.then(() => {
				gid("un").value = randomUsername;
				setdb("trojenCat", "usds", JSON.stringify({ "ic": "language", "diu": generateUniqueID(12) }))
			})
			.catch((error) => {
				console.error("Error setting username:", error);
			});
	}
});

function generateUniqueID(length) {
	const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
	let uniqueID = '';

	for (let i = 0; i < length; i++) {
		const randomIndex = Math.floor(Math.random() * characters.length);
		uniqueID += characters.charAt(randomIndex);
	}

	return uniqueID;
}

getdb("trojenCat", "usd").then((value) => {
	if (value) {
		gid("ud").value = value;
	} else {
		let names = [
			"Hello! i'm a user!", "Hey there! i am a user!", "Howdy? i'm a user!"
		];

		let z = names[Math.floor(Math.random() * names.length) + 0];
		let randomUsername = z;

		// Set the generated random username in IndexedDB
		setdb("trojenCat", "usd", randomUsername)
			.then(() => {
				gid("ud").value = randomUsername;
			})
			.catch((error) => {
				snack("ERROR: " + error)
				console.error("Error setting ud:", error);
			});
	}
});

function smops(e) {
	// show delete group dialog
	csgrp = e.parentElement;
	gid("mgm").showModal();
}

function delcgrp() {
	remc(grpsin, csgrp.querySelector('#ggname').innerHTML);
	csgrp.remove();
	gid("mgm").close();
	drawgrps();
	snack("Group removed")
}

function susm() {
	setdb("trojenCat", "usn", gid("un").value);
	setdb("trojenCat", "usd", gid("ud").value);
	snack("saved.")
}

function remc(arr, itemToRemove) {
	// remove item from array
	var index = arr.indexOf(itemToRemove);
	if (index !== -1) {
		arr.splice(index, 1);
	}
}

function snack(e) {
	// floating snack
	var x = document.getElementById("snackbar");
	x.innerHTML = e;
	x.className = "show";
	setTimeout(function() { x.className = x.className.replace("show", ""); }, 1200);
}

// Function to open or create an IndexedDB database
function openDB(databaseName, version) {
	return new Promise((resolve, reject) => {
		const request = indexedDB.open(databaseName, version);

		request.onupgradeneeded = (event) => {
			const db = event.target.result;
			db.createObjectStore('store', { keyPath: 'key' });
		};

		request.onsuccess = () => {
			resolve(request.result);
		};

		request.onerror = () => {
			reject(request.error);
		};
	});
}

// Function to set a key-value pair in the database
function setdb(databaseName, key, value) {
	return openDB(databaseName, 1).then((db) => {
		return new Promise((resolve, reject) => {
			const transaction = db.transaction(['store'], 'readwrite');
			const store = transaction.objectStore('store');
			const request = store.put({ key, value });

			request.onsuccess = () => {
				resolve();
			};

			request.onerror = () => {
				reject(request.error);
			};
		});
	});
}

// Function to get a value by key from the database
function getdb(databaseName, key) {
	return openDB(databaseName, 1).then((db) => {
		return new Promise((resolve, reject) => {
			const transaction = db.transaction(['store'], 'readonly');
			const store = transaction.objectStore('store');
			const request = store.get(key);

			request.onsuccess = () => {
				const result = request.result;
				if (result) {
					resolve(result.value);
				} else {
					resolve(null); // Key not found
				}
			};

			request.onerror = () => {
				reject(request.error);
			};
		});
	});
}

function prfpicse() {
	gid("prfics").showModal();
}

function swm(sdt) {
	// was made for a welcome message display, now it have no use.
}


function shsets() {
	// settings
	gid("setsmd").showModal();
}

function chtheme() {
	// theme changes
	const buttons = document.querySelectorAll(".ftsb");
	const te = event.target;

	buttons.forEach(button => {
		button.classList.remove("nhe");
	});

	if (!te.classList.contains("nhe")) {
		te.classList.add("nhe");
	}

	if (te.innerHTML == "Dark") {
		swth("dark")
	} else {
		swth("bright")
	}
}

const savedTheme = localStorage.getItem("theme");

if (!savedTheme) {
	swth("light")
}
if (savedTheme === "dark") {
	swth("dark")
} else {
	swth("light")
}

function swth(eee) {
	if (eee == "dark") {
		document.body.style.setProperty("--bgc", "#313338");
		document.body.style.setProperty("--txc", "#a5b3b9");
		document.body.style.setProperty("--sdc", "#383a40");
		document.body.style.setProperty("--bdc", "#404a4f");
		localStorage.setItem("theme", "dark");
	} else {
		document.body.style.setProperty("--bgc", "#ffffff");
		document.body.style.setProperty("--txc", "#1f1f1f");
		document.body.style.setProperty("--sdc", "#f6fbff");
		localStorage.setItem("theme", "light");
	}
}

async function generateKeyPair() {
	// crypto based key gen for E2EE
	try {
		// Generate an RSA key pair
		const keyPair = await window.crypto.subtle.generateKey(
			{
				name: "RSA-OAEP",
				modulusLength: 2048,
				publicExponent: new Uint8Array([1, 0, 1]),
				hash: "SHA-256",
			},
			true,
			["encrypt", "decrypt"]
		);

		// Export the public key in PEM format
		const publicKey = await window.crypto.subtle.exportKey("spki", keyPair.publicKey);

		// Export the private key in PEM format
		const privateKey = await window.crypto.subtle.exportKey("pkcs8", keyPair.privateKey);

		return { privateKey, publicKey };
	} catch (error) {
		console.error("Key pair generation error:", error);
		throw error;
	}
}

setTimeout(() => {
	// group links
	if (network.readyState === WebSocket.OPEN) {
		const currentUrl = window.location.href;

		const getParameterValue = (paramName) => {
			const urlSearchParams = new URLSearchParams(window.location.search);
			return urlSearchParams.get(paramName);
		};

		const yourParamValue = getParameterValue('grp');
		if (yourParamValue !== null && yourParamValue !== "") {
			let tjgr = yourParamValue;
			let e = {}
			e.innerHTML = tjgr;
			gotoch(e)
			grpsin.push(tjgr);
			drawgrps()
		}
	}
}, 800);

function spfp(e) {
	// save and update profile icon on selection
	setdb("trojenCat", "usds", JSON.stringify({ "ic": e.innerHTML }))
	prf = e.innerHTML;
	updpf();
}

function dmsopen() {
	// show DM's list
	gid("dmpeople").showModal();
	gid("dmslist").innerHTML = "";
	for (var i = 0; i < usersml.length; i++) {
		gid("dmslist").innerHTML += `<div class="dmob" onclick="opengdm('` + usersml[i] + `')">
			<b><span class="material-symbols-outlined ">
				`+ usic[usersml[i]] + `
			</span></b>
			<span>`+ usersml[i] + `</span>
		</div>`;
	}
}

function pingauser() {
	gid("message").value = "@" + cleanUnh;
	sendm();
}

function reconnect() {
	gid("bruhmd").innerHTML = `<small>Connecting...</small>`
	if (!network || network.readyState !== WebSocket.OPEN) {
		burnupwss()
	}
	setTimeout(gid("bruhmd").close(), 3000)
}

function searchondms() {
	gid("dmslist").innerHTML = "";
	let x = gid("dmsearch").value.toLowerCase();

	for (var i = 0; i < usersml.length; i++) {
		let y = usersml[i].toLowerCase();
		if (y.startsWith(x)) {
			gid("dmslist").innerHTML += `<div class="dmob" onclick="opengdm('` + usersml[i] + `')">
					<b><span class="material-symbols-outlined ">
						`+ usic[usersml[i]] + `
					</span></b>
					<span>`+ usersml[i] + `</span>
				</div>`;
		}
	}
}

function opengdm(x) {
	lmu = "";
	gid("dmpeople").close()
	gid("dmchat").showModal()
	idmu = x;
	gid("gdmn").innerHTML = x;
	if (dms[x]) {
		gid("dmchatts").innerHTML = dms[x];
	}
}

function sendmdm() {
	// send direct message
	let y = {};
	y.mes = gid("messagedm").value;
	if (gid("messagedm").value.length > 0 && gid("messagedm").value != " ") {
		y.ty = "dm";
		y.un = gid("un").value;
		y.ch = cgrp;
		y.tg = idmu;
		y.did = gdid();
		network.send(JSON.stringify(y)); // NDMSEND broadcast
		gid("messagedm").value = "";
	}
}