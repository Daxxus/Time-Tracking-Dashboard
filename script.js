const workIcon = document.querySelector(".cardDescription .workIcon")
const playIcon = document.querySelector(".cardDescription .playIcon")
const studyIcon = document.querySelector(".cardDescription .studyIcon")
const exerciseIcon = document.querySelector(".cardDescription .exerciseIcon")
const socialIcon = document.querySelector(".cardDescription .socialIcon")
const selfCareIcon = document.querySelector(".cardDescription .selfCareIcon")

const selfCareDots = document.querySelector(".selfCareDots")
const socialDots = document.querySelector(".socialDots")
const excerciseDots = document.querySelector(".excerciseDots")
const studyDots = document.querySelector(".studyDots")
const playDots = document.querySelector(".playDots")
const workDots = document.querySelector(".workDots")

const closeWork = document.querySelector(".closeWork")
const closePlay = document.querySelector(".closePlay")
const closeStudy = document.querySelector(".closeStudy")
const closeExcercise = document.querySelector(".closeExcercise")
const closeSocial = document.querySelector(".closeSocial")
const closeSelfCare = document.querySelector(".closeSelfCare")

const ulListWork = document.querySelector(".ulWork ")
const ulListPlay = document.querySelector(".ulPlay ")
const ulListStudy = document.querySelector(".ulStudy ")
const ulListExcercise = document.querySelector(".ulExercise ")
const ulListSocial = document.querySelector(".ulSocial ")
const ulListSelfCare = document.querySelector(".ulSelfCare ")

const ulPragraphsWork = document.querySelectorAll(".ulWork p")
const ulPragraphsPlay = document.querySelectorAll(".ulPlay p")
const ulPragraphsStudy = document.querySelectorAll(".ulStudy p")
const ulPragraphsExcercise = document.querySelectorAll(".ulExercise p")
const ulPragraphsSocial = document.querySelectorAll(".ulSocial p")
const ulPragraphsSelfCare = document.querySelectorAll(".ulSelfCare p")

let spanTxt
const spanPeriod = [...document.querySelectorAll("#spanPeriod")]
const daily = document.querySelector(".daily")
const weekly = document.querySelector(".weekly")
const monthly = document.querySelector(".monthly")

const period = document.querySelectorAll(".period p ")
const workCard = document.querySelector("#work")
const playCard = document.querySelector("#play")
const studyCard = document.querySelector("#study")
const exerciseCard = document.querySelector("#exercise")
const socialCard = document.querySelector("#social")
const selfCareCard = document.querySelector("#selfCare")

const start = (target) => {
	fetch("./data.json")
		.then((res) => res.json())
		.then((el) => {
			// zamiast push'a
			// dataObj = el
			process(el, target)
		})
}

const process = (data, target) => {
	// const spanArray = ["Day -", "Week -", "Month -"]
	data.forEach((el) => {
		if (target) {
			if (target.closest("div").matches("#work")) {
				setDataOnCard(workCard, el, target)
			} else if (target.closest("div").matches("#play")) {
				setDataOnCard(playCard, el, target)
			} else if (target.closest("div").matches("#study")) {
				setDataOnCard(studyCard, el, target)
			} else if (target.closest("div").matches("#exercise")) {
				setDataOnCard(exerciseCard, el, target)
			} else if (target.closest("div").matches("#social")) {
				setDataOnCard(socialCard, el, target)
			} else if (target.closest("div").matches("#selfCare")) {
				setDataOnCard(selfCareCard, el, target)
			}
		} else {
			// dataObj = el
			setDataOnCard(workCard, el)
			setDataOnCard(playCard, el)
			setDataOnCard(studyCard, el)
			setDataOnCard(exerciseCard, el)
			setDataOnCard(socialCard, el)
			setDataOnCard(selfCareCard, el)
		}
	})
}
console.log("==================================================")
// czym jest accessor daily itp?? czyli setDay
const setData = (accessor) => (each, hour, el) => {
	each.textContent = el.timeframes[accessor].current
	hour.textContent = el.timeframes[accessor].previous
}
// setData(each,hour,el,"daily")

// currying
const setDay = setData("daily")
// setDay(el,hour,el)

// const day = (each, hour, el) => {
// 	each.textContent = el.timeframes.daily.current
// 	hour.textContent = el.timeframes.daily.previous
// }
console.log("============================================================")
const setDataOnCard = (card, time, target) => {
	const current = card.querySelector("#current")
	const previous = card.querySelector("#spanHours")

	// const dailyCurrent = time.timeframes.daily.current
	// const dailyPrevious = time.timeframes.daily.previous
	// lub poniżej
	const { current: dailyCurrent, previous: dailyPrevious } =
		time.timeframes.daily
	const { current: weeklyCurrent, previous: weeklyPrevious } =
		time.timeframes.weekly
	const { current: monthlyCurrent, previous: monthlyPrevious } =
		time.timeframes.monthly

	if (
		(card.matches("#work") && time.title === "Work") ||
		(card.matches("#play") && time.title === "Play") ||
		(card.matches("#study") && time.title === "Study") ||
		(card.matches("#exercise") && time.title === "Exercise") ||
		(card.matches("#social") && time.title === "Social") ||
		(card.matches("#selfCare") && time.title === "Self Care")
	) {
		checkCard(
			dailyCurrent,
			dailyPrevious,
			weeklyCurrent,
			weeklyPrevious,
			monthlyCurrent,
			monthlyPrevious,
			current,
			previous,
			target
		)
	}
}

const checkCard = (
	dailyCurrent,
	dailyPrevious,
	weeklyCurrent,
	weeklyPrevious,
	monthlyCurrent,
	monthlyPrevious,
	current,
	previous,
	target
) => {
	// zamiast wywołania w każdej funkcji checkCard
	if (spanTxt === "Day -") {
		current.innerHTML = dailyCurrent
		previous.innerHTML = dailyPrevious
	} else if (spanTxt === "Week -") {
		current.innerHTML = weeklyCurrent
		previous.innerHTML = weeklyPrevious
	} else if (spanTxt === "Month -") {
		current.innerHTML = monthlyCurrent
		previous.innerHTML = monthlyPrevious
	}
}

const timePeriod = (e) => {
	const target = e.target
	const periods = [daily, weekly, monthly]
	spanPeriod.forEach((span) => {
		if (target.classList.contains("daily")) {
			span.textContent = "Day -"
			periods.forEach((el) => el.classList.remove("white"))
			daily.classList.add("white")
		} else if (target.classList.contains("weekly")) {
			span.textContent = "Week -"
			periods.forEach((el) => el.classList.remove("white"))
			weekly.classList.add("white")
		} else {
			span.textContent = "Month -"
			periods.forEach((el) => el.classList.remove("white"))
			monthly.classList.add("white")
		}
		spanTxt = span.textContent
	})
	start()
}

const cardTime = (e) => {
	// problem ze spanem
	const target = e.target
	spanPeriod.forEach((span) => {
		if (target.classList.contains("daily")) {
			span.textContent = "Day -"
		} else if (target.classList.contains("weekly")) {
			span.textContent = "Week -"
		} else if (target.classList.contains("monthly")) {
			span.textContent = "Month -"
		}
		spanTxt = span.textContent
	})

	if (target.closest("div").matches("#work")) {
		workMenu()
	} else if (target.closest("div").matches("#play")) {
		playMenu()
	} else if (target.closest("div").matches("#study")) {
		studyMenu()
	} else if (target.closest("div").matches("#exercise")) {
		excerciseMenu()
	} else if (target.closest("div").matches("#social")) {
		socialMenu()
	} else if (target.closest("div").matches("#selfCare")) {
		selfCareMenu()
	}
	start(target)
}

const workMenu = () => {
	workIcon.classList.toggle("actIcon")
	ulListWork.classList.toggle("active")
	closeWork.classList.toggle("hide")
	workDots.classList.toggle("hide")
}
const playMenu = () => {
	playIcon.classList.toggle("actIcon")
	ulListPlay.classList.toggle("active")
	closePlay.classList.toggle("hide")
	playDots.classList.toggle("hide")
}
const studyMenu = () => {
	studyIcon.classList.toggle("actIcon")
	ulListStudy.classList.toggle("active")
	closeStudy.classList.toggle("hide")
	studyDots.classList.toggle("hide")
}
const excerciseMenu = () => {
	exerciseIcon.classList.toggle("actIcon")
	ulListExcercise.classList.toggle("active")
	closeExcercise.classList.toggle("hide")
	excerciseDots.classList.toggle("hide")
}
const socialMenu = () => {
	socialIcon.classList.toggle("actIcon")
	ulListSocial.classList.toggle("active")
	closeSocial.classList.toggle("hide")
	socialDots.classList.toggle("hide")
}
const selfCareMenu = () => {
	selfCareIcon.classList.toggle("actIcon")
	ulListSelfCare.classList.toggle("active")
	closeSelfCare.classList.toggle("hide")
	selfCareDots.classList.toggle("hide")
}

workIcon.addEventListener("click", workMenu)
playIcon.addEventListener("click", playMenu)
studyIcon.addEventListener("click", studyMenu)
exerciseIcon.addEventListener("click", excerciseMenu)
socialIcon.addEventListener("click", socialMenu)
selfCareIcon.addEventListener("click", selfCareMenu)

ulPragraphsWork.forEach((el) => el.addEventListener("click", cardTime))
ulPragraphsPlay.forEach((el) => el.addEventListener("click", cardTime))
ulPragraphsStudy.forEach((el) => el.addEventListener("click", cardTime))
ulPragraphsExcercise.forEach((el) => el.addEventListener("click", cardTime))
ulPragraphsSocial.forEach((el) => el.addEventListener("click", cardTime))
ulPragraphsSelfCare.forEach((el) => el.addEventListener("click", cardTime))

period.forEach((el) => el.addEventListener("click", timePeriod))

console.log("-----------------------------------------------")


