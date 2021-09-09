// https://dev.to/code_mystery/simple-countdown-timer-using-javascript-1jab

const SECOND = 1000;
const MINUTE = 60 * SECOND;
const HOUR = 60 * MINUTE;
const DAY = 24 * HOUR;

/**
 * Calculates the difference between two timestamps, returns a quadruple with
 * the difference in days, hours, minutes and seconds.
 *
 * @param {number} future
 */
const timestampDiff =
    future =>
    /** @param {number} past */
    past =>
        [DAY, HOUR, MINUTE, SECOND].map((time, index, times) => {
            const diff = future - past;
            const previousTime = times[index - 1];

            return (
                Math.floor(diff / time) -
                (Math.floor(diff / previousTime) * (previousTime / time) || 0)
            );
        });

/**
 * Start timer and set the content of the element.
 *
 * @param {string} date
 */
const timer =
    date =>
    /** @param {HTMLElement} target */
    target => {
        const diff = timestampDiff(Date.parse(date));

        return setInterval(() => {
            const [days, hours, minutes, seconds] = diff(Date.now());

            // Ideally we should have targets for every element
            // to avoid updating the entire innerHTML of the container with
            // every tick.
            let d = ('0' + days.toString()).slice(-2)
            let h = ('0' + hours.toString()).slice(-2)
            let m = ('0' + minutes.toString()).slice(-2)
            let s = ('0' + seconds.toString()).slice(-2)

            target.innerHTML = `
                <div>${d}<span>Days</span></div>:
                <div>${h}<span>Hours</span></div>:
                <div>${m}<span>Minutes</span></div>:
                <div>${s}<span>Seconds</span></div>
            `;
        }, SECOND);
    };

// We finally run it (and we save the interval return value if we wan to stop it later)
const interval = timer("sep 27, 2021 15:30:00")(document.querySelector(".countdown"));