function JBCountDown(settings) {
	var glob = settings;

	glob.total = Math.floor((glob.endDate - glob.startDate) / 86400);
	glob.days = Math.floor((glob.endDate - glob.now) / 86400);
	glob.hours = 24 - Math.floor(((glob.endDate - glob.now) % 86400) / 3600);
	glob.minutes = 60 - Math.floor((((glob.endDate - glob.now) % 86400) % 3600) / 60);
	glob.seconds = 60 - Math.floor((glob.endDate - glob.now) % 86400 % 3600 % 60);

	if (glob.now >= glob.endDate) {
		return;
	}

	function deg(deg) {
		return (Math.PI / 180) * deg - (Math.PI / 180) * 90;
	}

	var clock = {
		set: {
			hours: function() {
				var cHr = $("#hours").get(0);
				var ctx = cHr.getContext("2d");
				ctx.clearRect(0, 0, cHr.width, cHr.height);
				ctx.beginPath();
				ctx.strokeStyle = "#1e9c01";
				ctx.arc(66, 65, 57, deg(0), deg(15 * glob.hours));
				ctx.lineWidth = 13;
				ctx.stroke();
				$(".hours .inside .num").text(24 - glob.hours);
			},
			minutes: function() {
				var cMin = $("#minutes").get(0);
				var ctx = cMin.getContext("2d");
				ctx.clearRect(0, 0, cMin.width, cMin.height);
				ctx.beginPath();
				ctx.strokeStyle = "#ee3800";
				ctx.arc(66, 65, 57, deg(0), deg(6 * glob.minutes));
				ctx.lineWidth = 13;
				ctx.stroke();
				$(".minutes .inside .num").text(60 - glob.minutes);
			},
			seconds: function() {
				var cSec = $("#seconds").get(0);
				var ctx = cSec.getContext("2d");
				ctx.clearRect(0, 0, cSec.width, cSec.height);
				ctx.beginPath();
				ctx.strokeStyle = "#1e9c01";
				ctx.arc(66, 65, 57, deg(0), deg(6 * glob.seconds));
				ctx.lineWidth = 13;
				ctx.stroke();

				$(".seconds .inside .num").text(60 - glob.seconds);
			}
		},
		start: function() {
			var cdown = setInterval(function() {
				if (glob.seconds > 59) {
					if (60 - glob.minutes == 0 && 24 - glob.hours == 0 && glob.days == 0) {
						clearInterval(cdown);
						return;
					}
					glob.seconds = 1;
					if (glob.minutes > 59) {
						glob.minutes = 1;
						clock.set.minutes();
						if (glob.hours > 23) {
							glob.hours = 1;
							if (glob.days > 0) {
								glob.days--;
								clock.set.days();
							}
						} else {
							glob.hours++;
						}
						clock.set.hours();
					} else {
						glob.minutes++;
					}
					clock.set.minutes();
				} else {
					glob.seconds++;
				}
				clock.set.seconds();
			}, 1000);
		}
	};

	clock.set.hours();
	clock.set.minutes();
	clock.set.seconds();
	clock.start();
}

date = new Date();
start = date.getHours() * 60 * 60 + date.getMinutes() * 60 + date.getSeconds();

$(document).ready(function() {
	JBCountDown({
		startDate: start,
		endDate: "86400",
		now: start
	});
});