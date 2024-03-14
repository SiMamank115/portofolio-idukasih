// document.querySelectorAll("*").forEach(e=> {e.style.outline = 'grey 1px solid'})
const AnimationFunction = () => {
	gsap.registerPlugin(ScrollTrigger);
	document.querySelectorAll(".animate-progress").forEach(e=> {
		// gsap.to(e,{
		// 	scrollTrigger:{

		// 	}
		// })
	})
	if (document.querySelectorAll("#splitText, .delimiter").length == 2) {
		let splitText = document.querySelector("#splitText");
		let delimiter = document.querySelector(".delimiter");
		const write = (e = "") => {
			if (e == true) {
				splitText.textContent = splitText.textContent.slice(0, -1);
			} else {
				splitText.textContent += e;
			}
		};
		const dict = ["Pebisnis", "Designer", "Engineer", "Enthusiast"];
		const duration = [3000, 500];
		const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
		let lastPicked;
		const pickOne = () => {
			let res = Math.floor(Math.random() * dict.length);
			if (lastPicked) {
				if (res == lastPicked) {
					return pickOne();
				} else {
					lastPicked = res;
					return dict[res];
				}
			}
			lastPicked = res;
			return dict[res];
		};
		const loopWrite = async () => {
			let splitted = pickOne().split("");
			let eachCharDuration = Math.floor(((duration[0] * 0.3) / splitted.length) * 0.5);
			for (let i = 0; i < splitted.length; i++) {
				await sleep(eachCharDuration);
				write(splitted[i]);
			}
			await sleep(duration[0] * 0.4);
			for (let i = 0; i < splitted.length; i++) {
				await sleep(eachCharDuration);
				write(true);
			}
			await sleep(duration[0] * 0.3);
			return loopWrite();
		};
		loopWrite();
		setInterval(() => {
			delimiter.textContent = delimiter.textContent == "" ? "|" : "";
		}, duration[1]);
	}

	const sectionArray = document.querySelectorAll("[aria-label='content']");
	const sectionPosition = {};
	const offset = document.querySelector(".navbar").offsetHeight
	sectionArray.forEach((section) => (sectionPosition[section.id] = section.offsetTop));

	window.onscroll = () => {
		let scrollPosition = document.documentElement.scrollTop || document.body.scrollTop;
		for (id in sectionPosition) {
			if (sectionPosition[id] - offset <= scrollPosition) {
				document.querySelectorAll("a[class*='-links'],a[class^='-links']").forEach((e) => {
					e.ariaSelected = false;
				});
				document.querySelectorAll(`a[class*='-links'][href='#${id}']`).forEach((e) => {
					e.ariaSelected = true;
				});
			}
		}
	};
};

document.addEventListener("DOMContentLoaded", (e) => {
	if (!window.localStorage.getItem("theme")) {
		if (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) {
			window.localStorage.setItem("theme", "dark");
		} else {
			window.localStorage.setItem("theme", "lightdim");
		}
	}
	if (window.localStorage.getItem("theme") == "lightdim") {
		document.querySelector("[data-toggle-theme]").checked = true;
	}
	AnimationFunction();
	document.querySelector(`a[href="${window.location.hash}"`) && (document.querySelector(`a[href="${window.location.hash}"`).ariaSelected = true);
});

// Scroll up function
document.addEventListener("scroll", (e) => {
	if (window.scrollY > 200) {
		document.querySelector(".floating")?.classList?.remove?.("d-none");
	} else {
		document.querySelector(".floating")?.classList?.add?.("d-none");
	}
});

// Smooth scrolling for anchor links in navbar
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
	anchor.addEventListener("click", function (e) {
		e.preventDefault();
		window.location.replace(this.getAttribute("href"));
		const targetId = this.getAttribute("href").substring(1);
		const targetElement = document.getElementById(targetId);
		let offset = document.querySelector(".navbar").offsetHeight * .9;
		window.scrollTo({
			top: (targetElement ?? document.body).offsetTop - offset,
			behavior: "smooth",
		});
	});
});

function closeSidebar() {
	document.querySelector("#my-drawer-3").checked = false;
}